import React, { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  darkMode: boolean;
  onOpenResume: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  darkMode,
  onOpenResume,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'timeline' | 'cards'>('timeline');

  const filteredExperience = experience.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory || item.type === selectedCategory;
  });

  return (
    <section 
      id="experience" 
      className={`py-20 transition-colors ${
        darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 mb-3 border border-purple-200 dark:border-purple-800">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Work Experience & Track Record
            </h2>
            <p className={`mt-2 text-base max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Hands-on production experience building Generative AI, RAG pipelines, and Agentic AI applications using LangGraph, Python, and FastAPI.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenResume}
              id="btn-experience-resume-modal"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View Interactive CV</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto">
            {['All', 'Full-time', 'Internship'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                id={`btn-exp-cat-${cat.toLowerCase().replace(/[^a-z]/g, '')}`}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : darkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? 'All Roles' : cat}
              </button>
            ))}
          </div>

          <div className={`p-1 rounded-xl border flex items-center gap-1 ${
            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setViewMode('timeline')}
              id="btn-exp-timeline-view"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode('cards')}
              id="btn-exp-cards-view"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'cards'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Card View
            </button>
          </div>
        </div>

        {/* Timeline View Layout */}
        {viewMode === 'timeline' ? (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 dark:border-indigo-500/20 space-y-12">
            {filteredExperience.map((exp, index) => (
              <div key={exp.id} className="relative group">
                
                {/* Timeline Node Icon */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-4 flex items-center justify-center transition-colors ${
                  exp.isCurrent
                    ? 'bg-indigo-600 border-indigo-200 dark:border-indigo-900 shadow-md animate-pulse'
                    : darkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-300'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Experience Item Container */}
                <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 group-hover:shadow-lg ${
                  darkMode
                    ? 'bg-slate-950/60 border-slate-800 group-hover:border-indigo-500/40'
                    : 'bg-slate-50/80 border-slate-200 group-hover:border-indigo-500/40'
                }`}>
                  
                  {/* Top Bar: Role & Company */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold tracking-tight">{exp.role}</h3>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500 text-slate-950">
                            Present Role
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-indigo-500 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {exp.company}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>•</span>
                        <span className={`text-xs flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                      }`}>
                        <Calendar className="w-3 h-3 inline mr-1 text-indigo-500" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {exp.summary}
                  </p>

                  {/* Achievements bullet list */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Key Contributions & Impact:
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills/Tech Used */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                          darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200/80 text-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Cards Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExperience.map((exp) => (
              <div
                key={exp.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-500">
                      {exp.period}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{exp.location}</span>
                  </div>

                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-sm font-bold text-indigo-500">{exp.company}</p>

                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {exp.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1">
                  {exp.technologies.map((t) => (
                    <span key={t} className={`text-[11px] px-2 py-0.5 rounded ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
