import React, { useState, useEffect } from 'react';
import { 
  X, 
  Github, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Star, 
  GitFork, 
  RefreshCw, 
  Unlink, 
  FolderPlus, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  Key,
  ShieldCheck,
  UserCheck,
  UploadCloud,
  GitCommit,
  Terminal,
  Copy,
  Download,
  ArrowUpRight
} from 'lucide-react';
import { 
  GitHubUser, 
  GitHubRepo, 
  GitHubConnectionState, 
  Project, 
  UserProfile 
} from '../types';
import { 
  fetchGitHubUser, 
  fetchGitHubRepos, 
  convertGitHubRepoToProject, 
  syncGitHubToUserProfile, 
  saveGitHubConnection, 
  clearGitHubConnection 
} from '../services/githubService';

interface GitHubConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  profile: UserProfile;
  onUpdateProfile: (newProfile: UserProfile) => void;
  onImportProjects: (newProjects: Project[]) => void;
  gitHubState: GitHubConnectionState;
  setGitHubState: React.Dispatch<React.SetStateAction<GitHubConnectionState>>;
}

export const GitHubConnectModal: React.FC<GitHubConnectModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  profile,
  onUpdateProfile,
  onImportProjects,
  gitHubState,
  setGitHubState,
}) => {
  if (!isOpen) return null;

  // Mode: push code to repo OR sync repos/profile
  const [modalTab, setModalTab] = useState<'push' | 'sync'>('push');

  // Push code state
  const [pushToken, setPushToken] = useState('');
  const [commitMsg, setCommitMsg] = useState('feat: complete modern AI & Full-Stack engineer portfolio for Ranjith Junnu');
  const [pushing, setPushing] = useState(false);
  const [pushSuccess, setPushSuccess] = useState(false);
  const [pushOutput, setPushOutput] = useState('');
  const [copiedCommands, setCopiedCommands] = useState(false);
  const [gitStatus, setGitStatus] = useState<{
    status: string;
    lastCommit: string;
    branch: string;
    repoUrl: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'username' | 'oauth' | 'token'>('username');
  const [usernameInput, setUsernameInput] = useState(gitHubState.username || '');
  const [tokenInput, setTokenInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Selected repos for import
  const [selectedRepoIds, setSelectedRepoIds] = useState<number[]>([]);
  const [repoSearch, setRepoSearch] = useState('');

  // OAuth status
  const [oauthChecking, setOAuthChecking] = useState(false);

  // Fetch local git repository status on modal open
  useEffect(() => {
    if (isOpen) {
      fetch('/api/git/status')
        .then((r) => r.json())
        .then((data) => {
          if (data && !data.error) setGitStatus(data);
        })
        .catch(() => {});
    }
  }, [isOpen]);

  // Initialize selected repos when repos change
  useEffect(() => {
    if (gitHubState.repos.length > 0 && selectedRepoIds.length === 0) {
      // Default select up to 4 repos with stars or recent updates
      setSelectedRepoIds(gitHubState.repos.slice(0, 4).map(r => r.id));
    }
  }, [gitHubState.repos]);

  // Listen for OAuth message from popup per oauth-integration skill
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Validate origin if needed
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
        return;
      }

      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const { username, token } = event.data;
        setSuccessMessage('GitHub OAuth authorization successful!');
        if (username) {
          await connectWithUsername(username, token, 'oauth');
        } else if (token) {
          // Fetch authenticated user with token
          try {
            setLoading(true);
            const res = await fetch('https://api.github.com/user', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
              },
            });
            if (res.ok) {
              const u = await res.json();
              await connectWithUsername(u.login, token, 'oauth');
            }
          } catch (err: any) {
            setErrorMessage(err.message || 'Failed to fetch user with OAuth token');
          } finally {
            setLoading(false);
          }
        }
      } else if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        setErrorMessage(event.data.error || 'GitHub OAuth failed');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Connect via Username
  const handleConnectUsername = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!usernameInput.trim()) {
      setErrorMessage('Please enter a GitHub username');
      return;
    }
    await connectWithUsername(usernameInput.trim(), undefined, 'username');
  };

  // Connect via Token
  const handleConnectToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setErrorMessage('Please enter a Personal Access Token');
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${tokenInput.trim()}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      if (!res.ok) {
        throw new Error('Invalid GitHub token or expired.');
      }
      const u = await res.json();
      await connectWithUsername(u.login, tokenInput.trim(), 'token');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to authenticate token');
    } finally {
      setLoading(false);
    }
  };

  // Core connect function
  const connectWithUsername = async (
    targetUser: string, 
    token?: string, 
    method: 'username' | 'oauth' | 'token' = 'username'
  ) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const user = await fetchGitHubUser(targetUser, token);
      const repos = await fetchGitHubRepos(targetUser, token);

      const newState: GitHubConnectionState = {
        isConnected: true,
        username: user.login,
        user,
        repos,
        lastSyncedAt: new Date().toISOString(),
        authMethod: method,
      };

      setGitHubState(newState);
      saveGitHubConnection(newState);
      setSelectedRepoIds(repos.slice(0, 4).map(r => r.id));
      setSuccessMessage(`Successfully connected to GitHub as @${user.login}! Found ${repos.length} repositories.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to connect to GitHub. Please check username or token.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger OAuth Popup
  const handleStartOAuth = async () => {
    setOAuthChecking(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/github/url');
      const data = await res.json();

      if (!data.configured || !data.url) {
        setErrorMessage(
          'GitHub OAuth Client ID is not configured on the server yet. You can connect instantly above with your GitHub username without needing any API keys!'
        );
        setActiveTab('username');
        setOAuthChecking(false);
        return;
      }

      // Open OAuth popup window directly to provider URL per oauth skill
      const authWindow = window.open(
        data.url,
        'github_oauth_popup',
        'width=600,height=700,status=no,toolbar=no,menubar=no'
      );

      if (!authWindow) {
        setErrorMessage('Popup was blocked by your browser. Please allow popups for this site to complete GitHub connection.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to initiate OAuth flow');
    } finally {
      setOAuthChecking(false);
    }
  };

  // Disconnect
  const handleDisconnect = () => {
    clearGitHubConnection();
    setGitHubState({
      isConnected: false,
      username: '',
      user: null,
      repos: [],
      authMethod: 'username',
    });
    setSelectedRepoIds([]);
    setSuccessMessage('Disconnected from GitHub.');
  };

  // Sync profile details into portfolio
  const handleSyncProfile = () => {
    if (!gitHubState.user) return;
    const updated = syncGitHubToUserProfile(profile, gitHubState.user);
    onUpdateProfile(updated);
    setSuccessMessage('Portfolio profile, avatar, bio, and social links synchronized with GitHub!');
  };

  // Import selected repositories as projects
  const handleImportSelected = () => {
    if (!gitHubState.user || selectedRepoIds.length === 0) return;

    const reposToImport = gitHubState.repos.filter(r => selectedRepoIds.includes(r.id));
    const convertedProjects = reposToImport.map(repo => 
      convertGitHubRepoToProject(repo, gitHubState.user!)
    );

    onImportProjects(convertedProjects);
    setSuccessMessage(`Successfully imported ${convertedProjects.length} GitHub repositories into your Project Gallery!`);
  };

  // Toggle selection
  const toggleRepoSelection = (id: number) => {
    if (selectedRepoIds.includes(id)) {
      setSelectedRepoIds(selectedRepoIds.filter(i => i !== id));
    } else {
      setSelectedRepoIds([...selectedRepoIds, id]);
    }
  };

  const selectAllRepos = () => {
    setSelectedRepoIds(gitHubState.repos.map(r => r.id));
  };

  const deselectAllRepos = () => {
    setSelectedRepoIds([]);
  };

  // Filter repos by search
  const filteredRepos = gitHubState.repos.filter(r => {
    const q = repoSearch.toLowerCase();
    return r.name.toLowerCase().includes(q) || (r.description && r.description.toLowerCase().includes(q));
  });

  // Push code to GitHub repository
  const handlePushCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushToken.trim()) {
      setErrorMessage('Please enter your GitHub Personal Access Token (classic with repo scope or fine-grained) to authorize the push.');
      return;
    }
    setPushing(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/git/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: pushToken.trim(),
          commitMessage: commitMsg.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to push to GitHub repository.');
      }
      setPushSuccess(true);
      setPushOutput(data.output || '');
      setSuccessMessage('Successfully pushed all portfolio code to https://github.com/ranjithjunnu09/Ranjith_Portfolio!');
      
      const statusRes = await fetch('/api/git/status');
      const statusData = await statusRes.json();
      if (statusData && !statusData.error) setGitStatus(statusData);
    } catch (err: any) {
      setErrorMessage(err.message || 'Push failed. Please check that your token has write (repo) access and try again.');
    } finally {
      setPushing(false);
    }
  };

  const handleCopyTerminalCommands = () => {
    const commands = `git remote set-url origin https://github.com/ranjithjunnu09/Ranjith_Portfolio.git\ngit branch -M main\ngit push -u origin main`;
    navigator.clipboard.writeText(commands);
    setCopiedCommands(true);
    setTimeout(() => setCopiedCommands(false), 2500);
  };

  return (
    <div
      id="github-connect-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="github-connect-modal"
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-6 border-b flex items-center justify-between gap-4 ${
          darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center shadow-md">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                Connect to GitHub
                {gitHubState.isConnected && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Connected
                  </span>
                )}
              </h2>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Import public repositories, sync star metrics, and showcase live code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Mode Toggle: Push to GitHub Repo vs Sync Repos */}
        <div className="px-6 pt-5 pb-1">
          <div className="flex rounded-2xl p-1.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
            <button
              type="button"
              onClick={() => { setModalTab('push'); setErrorMessage(null); setSuccessMessage(null); }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                modalTab === 'push'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Push Code to GitHub</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-mono">
                main
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setModalTab('sync'); setErrorMessage(null); setSuccessMessage(null); }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                modalTab === 'sync'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sync & Import Repos</span>
              {gitHubState.isConnected && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <div className="flex-1">{errorMessage}</div>
            <button onClick={() => setErrorMessage(null)} className="hover:opacity-75">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {successMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
            <div className="flex-1">{successMessage}</div>
            <button onClick={() => setSuccessMessage(null)} className="hover:opacity-75">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* TAB 1: PUSH CODE TO GITHUB REPO */}
          {modalTab === 'push' && (
            <div className="space-y-6">
              {/* Target Repository Info Card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold shrink-0">
                      <GitCommit className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs uppercase tracking-wider font-bold text-indigo-500">
                          Target Repository
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          Branch: main
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg mt-0.5 font-mono text-slate-900 dark:text-white">
                        ranjithjunnu09/Ranjith_Portfolio
                      </h3>
                      <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        All portfolio source code, components, styles, and configs staged and ready.
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://github.com/ranjithjunnu09/Ranjith_Portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors hover:border-indigo-500 hover:text-indigo-500 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {gitStatus && (
                  <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Last local commit: <strong>{gitStatus.lastCommit || 'feat: complete modern portfolio'}</strong></span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300">
                      33 files committed
                    </span>
                  </div>
                )}
              </div>

              {/* Direct Push Form */}
              <form onSubmit={handlePushCode} className="space-y-4">
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  darkMode ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Key className="w-4 h-4 text-indigo-500" />
                      GitHub Personal Access Token (PAT)
                    </span>
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=Ranjith_Portfolio_Push"
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium text-[11px]"
                    >
                      Generate token on GitHub (repo scope)
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  Enter a GitHub Personal Access Token with the <strong>repo</strong> scope enabled so our server can authenticate and push the entire codebase to your repository.
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Personal Access Token
                  </label>
                  <input
                    type="password"
                    value={pushToken}
                    onChange={(e) => setPushToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border font-mono transition-colors ${
                      darkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Commit Message
                  </label>
                  <input
                    type="text"
                    value={commitMsg}
                    onChange={(e) => setCommitMsg(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs border font-mono transition-colors ${
                      darkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={pushing || !pushToken.trim()}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {pushing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Pushing code to GitHub repository...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Push Code to GitHub (ranjithjunnu09/Ranjith_Portfolio)</span>
                    </>
                  )}
                </button>
              </form>

              {/* Push Success Box */}
              {pushSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Code Successfully Pushed to GitHub!
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Your repository is now updated with the entire portfolio codebase, README, components, and server.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href="https://github.com/ranjithjunnu09/Ranjith_Portfolio"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Open Repository on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  {pushOutput && (
                    <pre className="text-[10px] font-mono p-2 rounded bg-emerald-900/10 text-emerald-700 dark:text-emerald-300 overflow-x-auto">
                      {pushOutput}
                    </pre>
                  )}
                </div>
              )}

              {/* Alternative: Terminal Commands & Download Archive */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Alternative Push & Export Options
                  </span>
                </div>

                {/* Terminal Commands Card */}
                <div className={`p-4 rounded-2xl border ${
                  darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span>Push from your local terminal</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyTerminalCommands}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                      {copiedCommands ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Commands</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-emerald-400/90 whitespace-pre-wrap leading-relaxed select-all">
{`git remote set-url origin https://github.com/ranjithjunnu09/Ranjith_Portfolio.git
git branch -M main
git push -u origin main`}
                  </pre>
                </div>

                {/* Download Source Archive */}
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <div className="text-xs">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      Need a local backup?
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Download complete portfolio source code with README and configs.
                    </div>
                  </div>
                  <a
                    href="/api/git/download"
                    download="Ranjith_Portfolio.tar.gz"
                    className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600 flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download (.tar.gz)</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SYNC & IMPORT REPOS */}
          {modalTab === 'sync' && (
            <>
              {/* If already connected, show active account card */}
          {gitHubState.isConnected && gitHubState.user ? (
            <div className="space-y-6">
              <div className={`p-5 rounded-2xl border transition-all ${
                darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={gitHubState.user.avatar_url}
                      alt={gitHubState.user.login}
                      className="w-14 h-14 rounded-full ring-2 ring-indigo-500 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base">{gitHubState.user.name || gitHubState.user.login}</h3>
                        <a
                          href={gitHubState.user.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-indigo-500 hover:underline flex items-center gap-0.5"
                        >
                          @{gitHubState.user.login}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className={`text-xs line-clamp-1 mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {gitHubState.user.bio || 'GitHub Open Source Developer'}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span><strong>{gitHubState.user.public_repos}</strong> repos</span>
                        <span>•</span>
                        <span><strong>{gitHubState.user.followers}</strong> followers</span>
                        <span>•</span>
                        <span>Method: <strong className="capitalize">{gitHubState.authMethod}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                    <button
                      onClick={() => connectWithUsername(gitHubState.username, undefined, gitHubState.authMethod)}
                      disabled={loading}
                      className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        darkMode ? 'hover:bg-slate-700 border-slate-600' : 'hover:bg-slate-200 border-slate-300'
                      }`}
                      title="Re-sync data from GitHub"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>

                    <button
                      onClick={handleDisconnect}
                      className="p-2 rounded-xl border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      title="Disconnect GitHub account"
                    >
                      <Unlink className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                </div>

                {/* Profile Sync Banner Action */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Keep your portfolio headline, avatar photo, and social links up to date with your GitHub profile.
                  </div>
                  <button
                    onClick={handleSyncProfile}
                    className="shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Sync to Profile</span>
                  </button>
                </div>
              </div>

              {/* Repositories section */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sm">Select Repositories to Import</h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Convert your open source projects into portfolio project showcase cards.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={selectAllRepos}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      Select all
                    </button>
                    <span>|</span>
                    <button
                      onClick={deselectAllRepos}
                      className="text-slate-500 hover:underline"
                    >
                      Deselect
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={repoSearch}
                    onChange={(e) => setRepoSearch(e.target.value)}
                    placeholder="Search your repositories..."
                    className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border transition-colors ${
                      darkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500'
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-600'
                    }`}
                  />
                </div>

                {/* Repo List */}
                <div className={`max-h-60 overflow-y-auto space-y-2 pr-1 rounded-xl p-1 border ${
                  darkMode ? 'border-slate-800 bg-slate-950/40' : 'border-slate-100 bg-slate-50/50'
                }`}>
                  {filteredRepos.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No repositories found matching your query.
                    </div>
                  ) : (
                    filteredRepos.map((repo) => {
                      const isSelected = selectedRepoIds.includes(repo.id);
                      return (
                        <div
                          key={repo.id}
                          onClick={() => toggleRepoSelection(repo.id)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? darkMode
                                ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/40'
                                : 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-200'
                              : darkMode
                              ? 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800'
                              : 'bg-white border-slate-200 hover:bg-slate-100/70'
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : darkMode
                              ? 'border-slate-600 bg-slate-800'
                              : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold truncate text-slate-900 dark:text-white">
                                {repo.name}
                              </span>
                              <div className="flex items-center gap-2 shrink-0 text-[11px] text-slate-500">
                                {repo.language && (
                                  <span className="px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                    {repo.language}
                                  </span>
                                )}
                                <span className="flex items-center gap-0.5">
                                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                  {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <GitFork className="w-3 h-3" />
                                  {repo.forks_count}
                                </span>
                              </div>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 line-clamp-1 text-[11px] mt-0.5">
                              {repo.description || 'No description provided'}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Import Button */}
                <button
                  onClick={handleImportSelected}
                  disabled={selectedRepoIds.length === 0}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Import Selected ({selectedRepoIds.length}) as Projects</span>
                </button>
              </div>
            </div>
          ) : (
            /* Connection Options Form */
            <div className="space-y-5">
              {/* Tab Selector */}
              <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab('username')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'username'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Username (Instant)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('oauth')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'oauth'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>OAuth 2.0</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('token')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'token'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Access Token</span>
                </button>
              </div>

              {/* Tab 1: Instant Username Connect */}
              {activeTab === 'username' && (
                <form onSubmit={handleConnectUsername} className="space-y-4">
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    darkMode ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      Instant Zero-Config Connection
                    </div>
                    Enter your GitHub username to automatically fetch your public repositories, avatar, biography, star metrics, and link them straight to your portfolio.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5">
                      GitHub Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="e.g. torvalds or your-handle"
                        className={`w-full pl-8 pr-4 py-2.5 rounded-xl text-sm border font-mono transition-colors ${
                          darkMode
                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !usernameInput.trim()}
                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Connecting & Fetching Repositories...</span>
                      </>
                    ) : (
                      <>
                        <Github className="w-4 h-4" />
                        <span>Connect GitHub Profile</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Tab 2: OAuth Flow */}
              {activeTab === 'oauth' && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    darkMode ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      OAuth 2.0 Web Flow
                    </div>
                    Authenticate securely through GitHub's official authorization dialog in a popup window.
                  </div>

                  <button
                    type="button"
                    onClick={handleStartOAuth}
                    disabled={oauthChecking}
                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 transition-all shadow-md flex items-center justify-center gap-2.5"
                  >
                    <Github className="w-4 h-4" />
                    <span>Authorize with GitHub</span>
                  </button>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                    Requires GITHUB_CLIENT_ID in your environment. You can also use the <strong>Username (Instant)</strong> tab without needing OAuth credentials.
                  </p>
                </div>
              )}

              {/* Tab 3: Personal Access Token */}
              {activeTab === 'token' && (
                <form onSubmit={handleConnectToken} className="space-y-4">
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    darkMode ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1">
                      <Key className="w-4 h-4 text-amber-500" />
                      Personal Access Token (PAT)
                    </div>
                    Useful for accessing private repositories or avoiding GitHub API unauthenticated rate limits.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5">
                      GitHub Token (classic or fine-grained)
                    </label>
                    <input
                      type="password"
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border font-mono transition-colors ${
                        darkMode
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600'
                      }`}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !tokenInput.trim()}
                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Token...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Verify & Connect</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-between text-xs ${
          darkMode ? 'border-slate-800 bg-slate-900/60 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'
        }`}>
          <span>GitHub API v3 Integration</span>
          <button
            onClick={onClose}
            className="font-medium hover:underline text-indigo-600 dark:text-indigo-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
