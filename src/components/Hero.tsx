import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  Mail, 
  Sparkles, 
  CheckCircle, 
  Briefcase, 
  Award, 
  Code2, 
  Github, 
  Linkedin 
} from 'lucide-react';
import { XIcon } from './XIcon';
import { UserProfile } from '../types';

interface HeroProps {
  profile: UserProfile;
  darkMode: boolean;
  onOpenResume: () => void;
  onOpenGitHub?: () => void;
  isGitHubConnected?: boolean;
  gitHubUsername?: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  profile, 
  darkMode, 
  onOpenResume,
  onOpenGitHub,
  isGitHubConnected,
  gitHubUsername
}) => {
  return (
    <section 
      id="top" 
      className={`relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden transition-colors ${
        darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background ambient lighting subtle shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-xs bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Open to work: AI-powered solutions & projects</span>
            </div>

            {/* Headline / Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </h1>
              <p className={`text-xl sm:text-2xl font-semibold tracking-tight ${
                darkMode ? 'text-indigo-300' : 'text-indigo-700'
              }`}>
                {profile.title}
              </p>
            </div>

            {/* Headline / Bio */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {profile.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                id="hero-btn-projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all shadow-md hover:shadow-indigo-500/25"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                id="hero-btn-contact"
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all border shadow-xs ${
                  darkMode
                    ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                    : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                }`}
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>Get in Touch</span>
              </a>

              <button
                onClick={onOpenResume}
                id="hero-btn-resume"
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all border ${
                  darkMode
                    ? 'bg-indigo-950/40 border-indigo-800/80 text-indigo-300 hover:bg-indigo-900/60'
                    : 'bg-indigo-50/80 border-indigo-200 text-indigo-800 hover:bg-indigo-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Social Links & GitHub Status */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Connect:
              </span>

              {onOpenGitHub && (
                <button
                  onClick={onOpenGitHub}
                  id="hero-github-connect-btn"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-xs transition-all hover:scale-105 ${
                    isGitHubConnected
                      ? darkMode
                        ? 'bg-slate-800 border-emerald-600 text-emerald-300 hover:bg-slate-700'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                      : darkMode
                      ? 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400'
                  }`}
                  title={isGitHubConnected ? `Connected to GitHub as @${gitHubUsername}` : 'Connect your GitHub profile'}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{isGitHubConnected ? `@${gitHubUsername}` : 'Connect GitHub'}</span>
                  {isGitHubConnected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                </button>
              )}

              <div className="flex items-center gap-3">
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    id="hero-social-github"
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    id="hero-social-linkedin"
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.socialLinks.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    id="hero-social-x"
                    title="X Profile (@RanjithJunnu)"
                    className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                      darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    aria-label="X Profile (@RanjithJunnu)"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Side Visual & Profile Display */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative glowing ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl transform scale-105" />
              
              <div className={`relative rounded-3xl p-6 border shadow-xl ${
                darkMode ? 'bg-slate-800/90 border-slate-700/80' : 'bg-white border-slate-200/80'
              }`}>
                {/* Profile Portrait */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-6 group">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <p className="text-white font-bold text-base">{profile.name}</p>
                      <p className="text-slate-300 text-xs">{profile.location}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Impact Metrics Grid (3 Verified Engineering Pillars) */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className={`p-3 rounded-2xl border transition-all ${
                    darkMode ? 'bg-slate-900/60 border-slate-700/50' : 'bg-slate-50 border-slate-200/60'
                  }`}>
                    <div className="flex items-center gap-1.5 text-indigo-500 mb-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black">{profile.stats.yearsExperience}+ Yrs</p>
                    <span className="text-[10px] text-slate-400 font-medium block truncate">AI Engineering</span>
                  </div>

                  <div className={`p-3 rounded-2xl border transition-all ${
                    darkMode ? 'bg-slate-900/60 border-slate-700/50' : 'bg-slate-50 border-slate-200/60'
                  }`}>
                    <div className="flex items-center gap-1.5 text-purple-500 mb-1">
                      <Code2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Projects</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black">{profile.stats.completedProjects}+ Built</p>
                    <span className="text-[10px] text-slate-400 font-medium block truncate">Production & OSS</span>
                  </div>

                  <div className={`p-3 rounded-2xl border transition-all ${
                    darkMode ? 'bg-slate-900/60 border-slate-700/50' : 'bg-slate-50 border-slate-200/60'
                  }`}>
                    <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                      <Award className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Credentials</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black">{profile.stats.certifications || 3} Certified</p>
                    <span className="text-[10px] text-slate-400 font-medium block truncate">Oracle & Qualcomm</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
