import React from 'react';
import { ArrowUp, Github, Linkedin, Heart } from 'lucide-react';
import { XIcon } from './XIcon';
import { UserProfile } from '../types';

interface FooterProps {
  profile: UserProfile;
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ profile, darkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors ${
      darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="space-y-1 text-center md:text-left">
            <p className="text-white font-bold text-lg">{profile.name}</p>
            <p className="text-xs text-slate-400">{profile.title}</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-indigo-400 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-indigo-400 transition-colors">Experience</a>
            <a href="#blog" className="hover:text-indigo-400 transition-colors">Blogs</a>
            <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {profile.socialLinks.github && (
                <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a 
                  href={profile.socialLinks.twitter} 
                  target="_blank" 
                  rel="noreferrer" 
                  title="X Profile (@RanjithJunnu)"
                  aria-label="X Profile (@RanjithJunnu)"
                  className="p-2 hover:text-white transition-colors flex items-center justify-center"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={scrollToTop}
              id="btn-scroll-top"
              className="p-2.5 rounded-full bg-slate-800 hover:bg-indigo-600 text-white transition-all shadow-sm"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current inline" />
            <span>React, TypeScript & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
