import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Play, 
  Sliders, 
  Layers, 
  ArrowRight,
  Monitor
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  darkMode: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  darkMode,
  onClose,
}) => {
  if (!project) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'demo'>('overview');

  // Mini Interactive Prototype State for "demo" tab
  const [demoPrompt, setDemoPrompt] = useState('Create a sleek cyber-dark dashboard component');
  const [demoGenerating, setDemoGenerating] = useState(false);
  const [demoTheme, setDemoTheme] = useState<'indigo' | 'emerald' | 'purple'>('indigo');
  const [demoSlider, setDemoSlider] = useState(78);

  const images = project.images && project.images.length > 0 ? project.images : [project.thumbnail];

  return (
    <div 
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="project-modal-content"
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className={`p-6 border-b flex items-start justify-between gap-4 ${
          darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50/80'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                {project.category}
              </span>
              <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {project.year} • {project.duration}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{project.title}</h2>
            <p className={`text-sm font-medium ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            id="btn-close-project-modal"
            className={`p-2.5 rounded-full border transition-colors ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Main Image & Gallery Switcher */}
          <div className="space-y-3">
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
              <img
                src={images[activeImageIndex]}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-white backdrop-blur-md border border-white/20">
                Image {activeImageIndex + 1} of {images.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 aspect-16/9 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-indigo-500 scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Details Bar */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border ${
            darkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className={`block text-[11px] font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Role
              </span>
              <span className="text-sm font-bold">{project.role}</span>
            </div>
            <div>
              <span className={`block text-[11px] font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Client / Company
              </span>
              <span className="text-sm font-bold">{project.client || 'Client Project'}</span>
            </div>
            <div>
              <span className={`block text-[11px] font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Timeline
              </span>
              <span className="text-sm font-bold">{project.duration} ({project.year})</span>
            </div>
            <div>
              <span className={`block text-[11px] font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Category
              </span>
              <span className="text-sm font-bold text-indigo-500">{project.category}</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              id="tab-overview"
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-500'
                  : darkMode ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Overview & Outcomes
            </button>
            <button
              onClick={() => setActiveTab('challenge')}
              id="tab-challenge"
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'challenge'
                  ? 'border-indigo-500 text-indigo-500'
                  : darkMode ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Challenge & Solution
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              id="tab-demo"
              className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'demo'
                  ? 'border-indigo-500 text-indigo-500'
                  : darkMode ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-4 h-4 text-indigo-500" />
              <span>Interactive Simulator</span>
            </button>
          </div>

          {/* Tab 1: Overview & Outcomes */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-3">
                <h3 className="text-lg font-bold">Project Summary</h3>
                <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Key Business Outcomes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border text-center ${
                          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <p className="text-2xl font-black text-indigo-500">{m.value}</p>
                        <p className={`text-xs font-medium mt-0.5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Implementation Highlights</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        darkMode
                          ? 'bg-slate-800 border-slate-700 text-indigo-300'
                          : 'bg-indigo-50 border-indigo-100 text-indigo-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Challenge & Solution */}
          {activeTab === 'challenge' && (
            <div className="space-y-6 animate-fadeIn">
              <div className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-amber-950/30 border-amber-800/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                  <span>The Core Challenge</span>
                </h3>
                <p className="text-sm leading-relaxed">
                  {project.challenge || "Balancing intuitive user interface ease with deep backend algorithmic performance under high concurrency constraints."}
                </p>
              </div>

              <div className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-indigo-950/30 border-indigo-800/40 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
              }`}>
                <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                  <span>Architectural Solution</span>
                </h3>
                <p className="text-sm leading-relaxed">
                  {project.solution || "Constructed modular component primitives, optimistic state management, and clear spatial layouts."}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive Demo Simulator */}
          {activeTab === 'demo' && (
            <div className="space-y-6 animate-fadeIn">
              <div className={`p-6 rounded-2xl border space-y-4 ${
                darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 text-white border-slate-800'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-400 font-mono ml-2">demo_sandbox://{project.title.toLowerCase().replace(/\s+/g, '-')}.app</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                    Interactive Prototype
                  </span>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Interactive State Controls
                  </label>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl">
                      {(['indigo', 'emerald', 'purple'] as const).map((color) => (
                        <button
                          key={color}
                          onClick={() => setDemoTheme(color)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                            demoTheme === color ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300 flex-1 min-w-[200px]">
                      <span>Intensity:</span>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={demoSlider}
                        onChange={(e) => setDemoSlider(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                      <span className="font-mono font-bold w-8">{demoSlider}%</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Canvas Output */}
                <div className={`p-6 rounded-xl border relative overflow-hidden min-h-[180px] flex flex-col justify-center items-center text-center transition-all ${
                  demoTheme === 'indigo' ? 'bg-indigo-950/40 border-indigo-700/50' :
                  demoTheme === 'emerald' ? 'bg-emerald-950/40 border-emerald-700/50' :
                  'bg-purple-950/40 border-purple-700/50'
                }`}>
                  <Sparkles className="w-8 h-8 text-indigo-400 mb-2 animate-bounce" />
                  <h4 className="font-bold text-lg text-white mb-1">{project.title} Prototype</h4>
                  <p className="text-xs text-slate-300 max-w-md">
                    Simulating real-time render output configured at {demoSlider}% load capacity.
                  </p>
                  
                  {/* Visual Bar representation */}
                  <div className="w-full max-w-sm bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full transition-all duration-300" 
                      style={{ width: `${demoSlider}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className={`p-6 border-t flex flex-wrap items-center justify-between gap-4 ${
          darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                id="btn-project-live-link"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shadow-md"
              >
                <span>Visit Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                id="btn-project-github-link"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            id="btn-project-modal-done"
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs border transition-colors ${
              darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Close Modal
          </button>
        </div>

      </div>
    </div>
  );
};
