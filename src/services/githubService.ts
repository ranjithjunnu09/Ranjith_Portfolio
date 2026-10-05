import { GitHubUser, GitHubRepo, GitHubConnectionState, Project, ProjectCategory, UserProfile } from '../types';
import { initialGitHubConnection } from '../data/githubDefaultData';

const STORAGE_KEY = 'portfolio_github_connection_v2';

// Default state pre-connected to user's real GitHub account
export const defaultGitHubState: GitHubConnectionState = initialGitHubConnection;

// Load saved connection from localStorage
export function loadGitHubConnection(): GitHubConnectionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.isConnected) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to parse GitHub connection state', err);
  }
  return defaultGitHubState;
}

// Save connection to localStorage
export function saveGitHubConnection(state: GitHubConnectionState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save GitHub connection state', err);
  }
}

// Clear connection
export function clearGitHubConnection(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear GitHub connection', err);
  }
}

// Fetch GitHub user profile
export async function fetchGitHubUser(username: string, token?: string): Promise<GitHubUser> {
  const cleanUsername = username.trim().replace(/^@/, '');
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token.trim()}`;
  }

  // Attempt direct fetch to GitHub API (CORS enabled)
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}`, {
    headers,
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`GitHub user "${cleanUsername}" was not found. Please check spelling.`);
    }
    if (res.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Try adding a Personal Access Token or try again shortly.');
    }
    throw new Error(`GitHub API error (${res.status}): ${res.statusText}`);
  }

  return await res.json();
}

// Fetch GitHub repositories for user
export async function fetchGitHubRepos(username: string, token?: string): Promise<GitHubRepo[]> {
  const cleanUsername = username.trim().replace(/^@/, '');
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token.trim()}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(cleanUsername)}/repos?sort=updated&per_page=30`,
    { headers }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch repositories (${res.status}): ${res.statusText}`);
  }

  const repos: GitHubRepo[] = await res.json();
  return repos;
}

// Choose an appropriate high-res tech thumbnail based on language or title
function getLanguageThumbnail(language: string | null, title: string): string {
  const lang = (language || '').toLowerCase();
  const t = title.toLowerCase();

  if (lang.includes('python') || t.includes('ai') || t.includes('ml') || t.includes('gemini') || t.includes('model')) {
    return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';
  }
  if (lang.includes('typescript') || lang.includes('javascript') || lang.includes('react') || lang.includes('vue')) {
    return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
  }
  if (lang.includes('swift') || lang.includes('kotlin') || t.includes('app') || t.includes('mobile')) {
    return 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800';
  }
  if (lang.includes('rust') || lang.includes('go') || lang.includes('c++') || lang.includes('docker')) {
    return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800';
  }
  if (t.includes('design') || t.includes('ui') || lang.includes('css') || lang.includes('html')) {
    return 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800';
  }
  return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
}

// Helper to determine ProjectCategory
function categorizeRepo(repo: GitHubRepo): Exclude<ProjectCategory, 'All'> {
  const lang = (repo.language || '').toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());
  const allText = `${repo.name} ${repo.description || ''} ${topics.join(' ')}`.toLowerCase();

  if (allText.includes('ai') || allText.includes('gpt') || allText.includes('gemini') || allText.includes('machine-learning') || allText.includes('nlp')) {
    return 'Creative AI & Tools';
  }
  if (allText.includes('mobile') || allText.includes('ios') || allText.includes('android') || allText.includes('flutter') || allText.includes('react-native') || lang === 'swift' || lang === 'kotlin') {
    return 'Mobile Apps';
  }
  if (allText.includes('design-system') || allText.includes('ui') || allText.includes('ux') || allText.includes('portfolio') || allText.includes('tailwind') || allText.includes('css')) {
    return 'UI/UX & Design';
  }
  return 'Full Stack Web';
}

// Helper to format repository name into title (e.g. "my-awesome-app" -> "My Awesome App")
function formatRepoTitle(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

// Convert a GitHubRepo into a Portfolio Project
export function convertGitHubRepoToProject(repo: GitHubRepo, user: GitHubUser): Project {
  const category = categorizeRepo(repo);
  const title = formatRepoTitle(repo.name);
  const thumbnail = getLanguageThumbnail(repo.language, repo.name);
  
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics.slice(0, 3));
  }
  if (tags.length === 0) tags.push('Open Source', 'GitHub');

  return {
    id: `gh-${repo.id}`,
    title,
    subtitle: repo.description || `Open source project on GitHub by @${user.login}`,
    category,
    featured: repo.stargazers_count >= 5 || repo.forks_count >= 2,
    thumbnail,
    images: [thumbnail],
    description: repo.description || `Public GitHub repository ${repo.full_name} created by @${user.login}.`,
    longDescription: `${repo.description || 'Open source project hosted on GitHub.'}\n\nBuilt with ${repo.language || 'modern technology'}, this repository is maintained by @${user.login}. Includes open source code, issue tracking, and version history.`,
    tags,
    metrics: [
      { label: 'GitHub Stars', value: `${repo.stargazers_count}` },
      { label: 'Forks', value: `${repo.forks_count}` },
      { label: 'Primary Tech', value: repo.language || 'Code' },
    ],
    client: `@${user.login} / Open Source`,
    role: 'Creator & Maintainer',
    duration: 'Ongoing',
    year: new Date(repo.updated_at).getFullYear(),
    liveUrl: repo.homepage || undefined,
    githubUrl: repo.html_url,
    challenge: 'Architecting clean, scalable, maintainable open-source code with clear documentation and community collaboration.',
    solution: 'Designed and deployed modular code repository with automated workflows, unit testing, and accessible developer documentation.',
    highlights: [
      `Earned ${repo.stargazers_count} GitHub star${repo.stargazers_count === 1 ? '' : 's'} and ${repo.forks_count} fork${repo.forks_count === 1 ? '' : 's'}.`,
      `Authored in ${repo.language || 'TypeScript/JavaScript'} with active git version control.`,
      `Available public repository at github.com/${repo.full_name}.`,
    ],
  };
}

// Merge GitHub profile data into existing UserProfile
export function syncGitHubToUserProfile(currentProfile: UserProfile, ghUser: GitHubUser): UserProfile {
  return {
    ...currentProfile,
    name: ghUser.name || currentProfile.name || ghUser.login,
    bio: ghUser.bio || currentProfile.bio,
    avatar: ghUser.avatar_url || currentProfile.avatar,
    location: ghUser.location || currentProfile.location,
    socialLinks: {
      ...currentProfile.socialLinks,
      github: ghUser.html_url,
      twitter: ghUser.twitter_username ? `https://twitter.com/${ghUser.twitter_username}` : currentProfile.socialLinks.twitter,
      website: ghUser.blog ? (ghUser.blog.startsWith('http') ? ghUser.blog : `https://${ghUser.blog}`) : currentProfile.socialLinks.website,
    },
    stats: {
      ...currentProfile.stats,
      // If completedProjects is less than GitHub public repos, we can update or keep user's completedProjects
      completedProjects: Math.max(currentProfile.stats.completedProjects, ghUser.public_repos),
    },
  };
}
