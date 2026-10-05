import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  Briefcase, 
  FolderKanban, 
  BookOpen, 
  User, 
  Mail, 
  SlidersHorizontal,
  Code,
  Github,
  Linkedin,
  Cpu
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenCustomizer: () => void;
  onOpenGitHub?: () => void;
  isGitHubConnected?: boolean;
  gitHubUsername?: string;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  darkMode,
  setDarkMode,
  onOpenCustomizer,
  onOpenGitHub,
  isGitHubConnected,
  gitHubUsername,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Projects', href: '#projects', icon: FolderKanban, id: 'projects' },
    { label: 'Skills', href: '#skills', icon: Cpu, id: 'skills' },
    { label: 'Experience', href: '#experience', icon: Briefcase, id: 'experience' },
    { label: 'Blogs', href: '#blog', icon: BookOpen, id: 'blog' },
    { label: 'About', href: '#about', icon: User, id: 'about' },
    { label: 'Contact', href: '#contact', icon: Mail, id: 'contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Name Logo */}
        <a 
          href="#top" 
          className="flex items-center gap-3 group focus:outline-none"
          id="header-brand-link"
        >
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {profile.availableForHire && (
              <span 
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" 
                title="Available for new opportunities"
              />
            )}
          </div>
          <div>
            <span className={`font-bold text-lg tracking-tight transition-colors ${
              darkMode ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'
            }`}>
              {profile.name}
            </span>
            <p className={`text-xs font-medium tracking-wide ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Portfolio
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                id={`nav-link-${item.id}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                    : darkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions (GitHub, Customizer & Theme Toggle) */}
        <div className="flex items-center gap-2">
          {/* GitHub Connect Button */}
          {onOpenGitHub && (
            <button
              onClick={onOpenGitHub}
              id="btn-header-github"
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border shadow-xs ${
                isGitHubConnected
                  ? darkMode
                    ? 'bg-slate-800 border-emerald-600/60 text-emerald-300 hover:bg-slate-700'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                  : darkMode
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={isGitHubConnected ? `Connected as @${gitHubUsername}` : 'Connect your GitHub profile'}
            >
              <Github className="w-3.5 h-3.5" />
              {isGitHubConnected ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline">@{gitHubUsername}</span>
                </span>
              ) : (
                <span className="hidden sm:inline">GitHub</span>
              )}
            </button>
          )}

          {/* LinkedIn Direct Link */}
          {profile.socialLinks.linkedin && (
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              id="btn-header-linkedin"
              className={`p-2 rounded-full border transition-all duration-200 ${
                darkMode
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="View LinkedIn Profile (ranjith-junnu-71a800211)"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-500" />
            </a>
          )}

          {/* Customizer Button */}
          <button
            onClick={onOpenCustomizer}
            id="btn-open-customizer"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border shadow-sm ${
              darkMode
                ? 'bg-indigo-950/60 border-indigo-700/60 text-indigo-200 hover:bg-indigo-900/80'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
            }`}
            title="Edit profile & content in customizer mode"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Edit Content</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            id="btn-theme-toggle"
            className={`p-2.5 rounded-full transition-all duration-200 border ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="btn-mobile-menu"
            className={`md:hidden p-2.5 rounded-full border transition-colors ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className={`md:hidden border-b px-4 pt-3 pb-6 space-y-2 animate-fadeIn ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  darkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="w-5 h-5 text-indigo-500" />
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2 px-2">
            {onOpenGitHub && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGitHub();
                }}
                id="mobile-btn-github"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold w-full justify-center border shadow-xs transition-colors ${
                  isGitHubConnected
                    ? darkMode
                      ? 'bg-slate-800 border-emerald-600 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>{isGitHubConnected ? `Connected as @${gitHubUsername}` : 'Connect GitHub Account'}</span>
              </button>
            )}

            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                id="mobile-btn-linkedin"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold w-full justify-center border shadow-xs transition-colors ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span>LinkedIn: ranjith-junnu-71a800211</span>
              </a>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              id="mobile-btn-customizer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 text-white w-full justify-center shadow-md"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Customize Portfolio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
