import React, { useState } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  User, 
  PlusCircle, 
  RotateCcw, 
  Check, 
  FolderKanban, 
  Briefcase, 
  BookOpen,
  Sparkles,
  Github
} from 'lucide-react';
import { UserProfile, Project, ExperienceItem, BlogPost, ProjectCategory } from '../types';

interface PortfolioCustomizerModalProps {
  profile: UserProfile;
  darkMode: boolean;
  onClose: () => void;
  onSaveProfile: (profile: UserProfile) => void;
  onAddProject: (project: Project) => void;
  onAddExperience: (item: ExperienceItem) => void;
  onAddBlogPost: (post: BlogPost) => void;
  onResetData: () => void;
  onOpenGitHub?: () => void;
  isGitHubConnected?: boolean;
  gitHubUsername?: string;
}

export const PortfolioCustomizerModal: React.FC<PortfolioCustomizerModalProps> = ({
  profile,
  darkMode,
  onClose,
  onSaveProfile,
  onAddProject,
  onAddExperience,
  onAddBlogPost,
  onResetData,
  onOpenGitHub,
  isGitHubConnected,
  gitHubUsername,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'add-project' | 'add-exp' | 'add-blog'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<UserProfile>({ ...profile });

  // New Project Form State
  const [projForm, setProjForm] = useState({
    title: '',
    subtitle: '',
    category: 'UI/UX & Design' as Exclude<ProjectCategory, 'All'>,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    description: '',
    tags: 'React, TypeScript, Tailwind CSS',
    client: '',
    role: 'Lead Designer',
    year: 2026,
    liveUrl: '',
    githubUrl: '',
  });

  // New Experience Form State
  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    location: 'Remote',
    period: '2025 - Present',
    type: 'Full-time' as const,
    category: 'Engineering' as const,
    summary: '',
    achievements: 'Architected component library\nBoosted team performance by 30%',
    technologies: 'React, TypeScript, Tailwind CSS',
  });

  // New Blog Post Form State
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '# New Blog Article\n\nWrite your thoughts here...',
    category: 'Design Systems',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    tags: 'Design Systems, React',
    readTime: '5 min read',
  });

  const showSavedBadge = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSaveProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profileForm);
    showSavedBadge();
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projForm.title.trim()) return;

    const newProject: Project = {
      id: `proj-user-${Date.now()}`,
      title: projForm.title.trim(),
      subtitle: projForm.subtitle.trim() || 'Custom Creative Project',
      category: projForm.category,
      featured: true,
      thumbnail: projForm.thumbnail.trim(),
      images: [projForm.thumbnail.trim()],
      description: projForm.description.trim() || 'A custom project created in portfolio editor.',
      longDescription: projForm.description.trim(),
      tags: projForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      metrics: [{ label: 'User Feedback', value: '100%' }],
      client: projForm.client.trim() || 'Client Project',
      role: projForm.role,
      duration: '3 Months',
      year: projForm.year,
      liveUrl: projForm.liveUrl.trim() || undefined,
      githubUrl: projForm.githubUrl.trim() || undefined,
      highlights: ['Custom project created via live customizer.'],
    };

    onAddProject(newProject);
    showSavedBadge();
    setProjForm({ ...projForm, title: '', description: '' });
  };

  const handleAddExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.role.trim() || !expForm.company.trim()) return;

    const newExp: ExperienceItem = {
      id: `exp-user-${Date.now()}`,
      role: expForm.role.trim(),
      company: expForm.company.trim(),
      location: expForm.location,
      period: expForm.period,
      isCurrent: expForm.period.toLowerCase().includes('present'),
      type: expForm.type,
      category: expForm.category,
      summary: expForm.summary.trim() || 'Delivered key features and design initiatives.',
      achievements: expForm.achievements.split('\n').map(a => a.trim()).filter(Boolean),
      technologies: expForm.technologies.split(',').map(t => t.trim()).filter(Boolean),
    };

    onAddExperience(newExp);
    showSavedBadge();
    setExpForm({ ...expForm, role: '', company: '', summary: '' });
  };

  const handleAddBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim()) return;

    const newPost: BlogPost = {
      id: `post-user-${Date.now()}`,
      title: blogForm.title.trim(),
      slug: blogForm.title.toLowerCase().replace(/\s+/g, '-'),
      excerpt: blogForm.excerpt.trim() || 'Read thoughts and design system insights.',
      content: blogForm.content,
      coverImage: blogForm.coverImage.trim(),
      category: blogForm.category,
      tags: blogForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: blogForm.readTime,
      author: {
        name: profileForm.name,
        avatar: profileForm.avatar,
        role: profileForm.title,
      },
      likes: 12,
      featured: true,
    };

    onAddBlogPost(newPost);
    showSavedBadge();
    setBlogForm({ ...blogForm, title: '', excerpt: '' });
  };

  return (
    <div
      id="customizer-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="customizer-modal-content"
        className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className={`p-6 border-b flex items-center justify-between ${
          darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-extrabold">Customize Portfolio Content</h2>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 flex items-center gap-1 animate-fadeIn">
                <Check className="w-3.5 h-3.5" />
                Saved!
              </span>
            )}
            <button
              onClick={onResetData}
              id="btn-reset-demo-data"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 flex items-center gap-1"
              title="Restore original portfolio demo content"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>
            <button
              onClick={onClose}
              id="btn-close-customizer"
              className={`p-2 rounded-full border transition-colors ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            id="tab-edit-profile"
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'border-indigo-500 text-indigo-500 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
          <button
            onClick={() => setActiveTab('add-project')}
            id="tab-add-project"
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'add-project'
                ? 'border-indigo-500 text-indigo-500 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Add Project</span>
          </button>
          <button
            onClick={() => setActiveTab('add-exp')}
            id="tab-add-exp"
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'add-exp'
                ? 'border-indigo-500 text-indigo-500 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
          <button
            onClick={() => setActiveTab('add-blog')}
            id="tab-add-blog"
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'add-blog'
                ? 'border-indigo-500 text-indigo-500 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Publish Article</span>
          </button>
          {onOpenGitHub && (
            <button
              onClick={() => {
                onClose();
                onOpenGitHub();
              }}
              id="tab-open-github"
              className="px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Sync {isGitHubConnected ? `(@${gitHubUsername})` : ''}</span>
            </button>
          )}
        </div>

        {/* Modal Scroll Content Body */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
          
          {/* TAB 1: Edit Profile */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfileSubmit} className="space-y-4">
              {/* GitHub Integration Banner */}
              {onOpenGitHub && (
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                        GitHub Profile & Repositories
                        {isGitHubConnected && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">Connected</span>
                        )}
                      </h4>
                      <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {isGitHubConnected ? `Connected as @${gitHubUsername}. Sync bio, avatar & import projects.` : 'Connect your GitHub profile to showcase real repositories and live stats.'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenGitHub();
                    }}
                    className="shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    {isGitHubConnected ? 'Manage GitHub' : 'Connect GitHub'}
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Title / Profession</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Bio / Introduction</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Location</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={profileForm.socialLinks.linkedin || ''}
                    placeholder="https://www.linkedin.com/in/..."
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      socialLinks: { ...profileForm.socialLinks, linkedin: e.target.value }
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={profileForm.socialLinks.github || ''}
                    placeholder="https://github.com/..."
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      socialLinks: { ...profileForm.socialLinks, github: e.target.value }
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">X (Twitter) Profile URL</label>
                  <input
                    type="url"
                    value={profileForm.socialLinks.twitter || ''}
                    placeholder="https://x.com/..."
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      socialLinks: { ...profileForm.socialLinks, twitter: e.target.value }
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Experience (Yrs)</label>
                  <input
                    type="number"
                    min="0"
                    value={profileForm.stats.yearsExperience}
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      stats: { ...profileForm.stats, yearsExperience: parseInt(e.target.value) || 0 }
                    })}
                    className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Projects Built</label>
                  <input
                    type="number"
                    min="0"
                    value={profileForm.stats.completedProjects}
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      stats: { ...profileForm.stats, completedProjects: parseInt(e.target.value) || 0 }
                    })}
                    className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Certifications</label>
                  <input
                    type="number"
                    min="0"
                    value={profileForm.stats.certifications || 3}
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      stats: { ...profileForm.stats, certifications: parseInt(e.target.value) || 0 }
                    })}
                    className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Save Profile Changes
              </button>
            </form>
          )}

          {/* TAB 2: Add Project */}
          {activeTab === 'add-project' && (
            <form onSubmit={handleAddProjectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Studio"
                    value={projForm.title}
                    onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Category</label>
                  <select
                    value={projForm.category}
                    onChange={(e) => setProjForm({ ...projForm, category: e.target.value as any })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="UI/UX & Design">UI/UX & Design</option>
                    <option value="Full Stack Web">Full Stack Web</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Creative AI & Tools">Creative AI & Tools</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Real-time Design System Workbench"
                  value={projForm.subtitle}
                  onChange={(e) => setProjForm({ ...projForm, subtitle: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of the project..."
                  value={projForm.description}
                  onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Tailwind CSS, Figma"
                  value={projForm.tags}
                  onChange={(e) => setProjForm({ ...projForm, tags: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Project to Gallery</span>
              </button>
            </form>
          )}

          {/* TAB 3: Add Experience */}
          {activeTab === 'add-exp' && (
            <form onSubmit={handleAddExperienceSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Product Engineer"
                    value={expForm.role}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stripe or Freelance"
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Period</label>
                  <input
                    type="text"
                    placeholder="2024 - Present"
                    value={expForm.period}
                    onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Category</label>
                  <select
                    value={expForm.category}
                    onChange={(e) => setExpForm({ ...expForm, category: e.target.value as any })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design & Strategy">Design & Strategy</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Summary</label>
                <textarea
                  rows={2}
                  placeholder="High-level role overview..."
                  value={expForm.summary}
                  onChange={(e) => setExpForm({ ...expForm, summary: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Experience Entry</span>
              </button>
            </form>
          )}

          {/* TAB 4: Publish Article */}
          {activeTab === 'add-blog' && (
            <form onSubmit={handleAddBlogSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Web Architecture Patterns"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Design Systems or AI"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-1">Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 min read"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  placeholder="Short summary of the article..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block mb-1">Content (Markdown Format)</label>
                <textarea
                  rows={5}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-mono border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Blog Article</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
