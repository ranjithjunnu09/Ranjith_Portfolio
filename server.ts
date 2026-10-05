import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. Endpoint to generate GitHub OAuth URL (Popup-based OAuth)
  app.get('/api/auth/github/url', (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
    const redirectUri = `${appUrl}/auth/callback`;

    if (!clientId) {
      return res.json({
        configured: false,
        message: 'GITHUB_CLIENT_ID is not configured in environment variables. You can still connect instantly using your GitHub username or Personal Access Token.',
        redirectUri,
        url: null,
      });
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'read:user,repo',
      allow_signup: 'true',
    });

    const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
    return res.json({
      configured: true,
      url,
      redirectUri,
    });
  });

  // 2. OAuth Callback endpoint (serves lightweight popup script with postMessage)
  const handleOAuthCallback = async (req: express.Request, res: express.Response) => {
    const code = req.query.code as string;
    const error = req.query.error as string;

    if (error || !code) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Authentication Failed</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .box { background: #1e293b; border: 1px solid #334155; padding: 2rem; border-radius: 1rem; text-align: center; max-width: 400px; }
              h2 { color: #f87171; margin-top: 0; }
              button { background: #6366f1; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; margin-top: 1rem; }
            </style>
          </head>
          <body>
            <div class="box">
              <h2>Authentication Cancelled</h2>
              <p>${error || 'No authorization code received.'}</p>
              <button onclick="window.close()">Close Window</button>
            </div>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: ${JSON.stringify(error || 'Cancelled')} }, '*');
              }
            </script>
          </body>
        </html>
      `);
    }

    let accessToken: string | null = null;
    let githubUsername: string | null = null;
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (clientId && clientSecret) {
      try {
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
          }),
        });

        const tokenData = await tokenRes.json();
        accessToken = tokenData.access_token || null;

        if (accessToken) {
          const userRes = await fetch('https://api.github.com/user', {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `Bearer ${accessToken}`,
              'User-Agent': 'Portfolio-App',
            },
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            githubUsername = userData.login || null;
          }
        }
      } catch (e) {
        console.error('Failed to exchange GitHub code for token:', e);
      }
    }

    // Return popup postMessage script per OAuth skill guidelines
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>GitHub Connected</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { background: #1e293b; border: 1px solid #334155; padding: 2.5rem; border-radius: 1rem; text-align: center; max-width: 420px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
            h2 { color: #34d399; margin-top: 0; font-size: 1.5rem; }
            p { color: #cbd5e1; font-size: 0.95rem; line-height: 1.5; }
            .spinner { width: 32px; height: 32px; border: 3px solid rgba(99,102,241,0.2); border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 1rem auto; }
            @keyframes spin { to { transform: rotate(360deg); } }
          </style>
        </head>
        <body>
          <div class="box">
            <div class="spinner"></div>
            <h2>Connected to GitHub!</h2>
            <p>Authentication was successful. Syncing your repositories...</p>
          </div>
          <script>
            try {
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_AUTH_SUCCESS',
                  token: ${JSON.stringify(accessToken)},
                  username: ${JSON.stringify(githubUsername)},
                  code: ${JSON.stringify(code)}
                }, '*');
                setTimeout(function() {
                  window.close();
                }, 800);
              } else {
                window.location.href = '/';
              }
            } catch (err) {
              console.error(err);
            }
          </script>
        </body>
      </html>
    `);
  };

  app.get(['/auth/callback', '/auth/callback/'], handleOAuthCallback);

  // 3. GitHub API Proxy endpoints (CORS safe)
  app.get('/api/github/user/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      };
      if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
      }
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/github/repos/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      };
      if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
      }
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`, { headers });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 4. Git Push to GitHub Repo endpoint
  app.post('/api/git/push', async (req, res) => {
    try {
      const { token, commitMessage } = req.body;
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ 
          error: 'GitHub Personal Access Token is required to push to github.com/ranjithjunnu09/Ranjith_Portfolio.' 
        });
      }

      const cleanToken = token.trim();
      const repoUrl = `https://x-access-token:${cleanToken}@github.com/ranjithjunnu09/Ranjith_Portfolio.git`;
      const msg = (commitMessage || 'feat: update portfolio with latest projects, certifications and blog').replace(/["`$\\]/g, '');

      // Ensure git identity
      await execAsync('git config user.name "ranjithjunnu09" && git config user.email "angidivijaykumar21@gmail.com"');

      // Add all changes and commit if any untracked or modified
      await execAsync('git add .');
      try {
        await execAsync(`git commit -m "${msg}"`);
      } catch (commitErr: any) {
        // Nothing to commit is okay
      }

      // Ensure branch main
      await execAsync('git branch -M main');

      // Execute push to GitHub repository
      const { stdout, stderr } = await execAsync(`git push "${repoUrl}" main:main --force`);

      return res.json({
        success: true,
        message: 'Successfully pushed all portfolio code to https://github.com/ranjithjunnu09/Ranjith_Portfolio!',
        output: (stdout || stderr || 'Pushed successfully').toString().replace(/x-access-token:[^@]+@/g, '***@')
      });
    } catch (err: any) {
      console.error('Git push error:', err);
      let errorMsg = err.message || 'Failed to push to GitHub repository';
      if (typeof errorMsg === 'string') {
        errorMsg = errorMsg.replace(/x-access-token:[^@]+@/g, '***@');
      }
      return res.status(500).json({ error: errorMsg });
    }
  });

  // 5. Git Status endpoint to check repo state
  app.get('/api/git/status', async (_req, res) => {
    try {
      const { stdout: statusOut } = await execAsync('git status --short');
      const { stdout: logOut } = await execAsync('git log -1 --pretty=format:"%h - %s (%cd)" --date=relative');
      const { stdout: branchOut } = await execAsync('git branch --show-current');
      return res.json({
        status: statusOut.trim() || 'Working tree clean',
        lastCommit: logOut.trim(),
        branch: branchOut.trim() || 'main',
        repoUrl: 'https://github.com/ranjithjunnu09/Ranjith_Portfolio.git'
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Mount Vite or static dist
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
