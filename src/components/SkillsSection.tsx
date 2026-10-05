import React, { useState } from 'react';
import { 
  Cpu, 
  Brain, 
  Server, 
  Database, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Zap,
  ShieldCheck,
  Terminal,
  Code
} from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsSectionProps {
  skills: SkillCategory[];
  darkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories = selectedCategory === 'all'
    ? skills
    : skills.filter(cat => cat.title.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Category Icon & Theme helper
  const getCategoryTheme = (title: string) => {
    if (title.toLowerCase().includes('machine learning') || title.toLowerCase().includes('ai')) {
      return {
        icon: Brain,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        gradient: 'from-indigo-500 to-purple-600',
        pill: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300',
      };
    }
    if (title.toLowerCase().includes('frameworks') || title.toLowerCase().includes('backend')) {
      return {
        icon: Server,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        gradient: 'from-emerald-500 to-teal-600',
        pill: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
      };
    }
    return {
      icon: Database,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      gradient: 'from-blue-500 to-cyan-600',
      pill: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300',
    };
  };

  const corePills = [
    'Python', 'LangGraph', 'LangChain', 'FastAPI', 'Qdrant', 'FAISS', 
    'PyTorch', 'LoRA / QLoRA', 'Unsloth', 'Transformers', 'MCP Protocol', 
    'vLLM', 'DeepEval', 'PostgreSQL', 'Docker', 'AWS'
  ];

  return (
    <section 
      id="skills" 
      className={`py-20 transition-colors border-t ${
        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Proficiency Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Engineering Competencies & AI Stack
            </h2>
            <p className={`text-base max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Quantified, production-tested proficiencies across Agentic AI workflows, vector retrieval pipelines, parameter-efficient fine-tuning, and scalable Python backend architectures.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Domains
            </button>
            <button
              onClick={() => setSelectedCategory('ai')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'ai'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              AI & ML
            </button>
            <button
              onClick={() => setSelectedCategory('frameworks')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'frameworks'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Frameworks
            </button>
            <button
              onClick={() => setSelectedCategory('vector')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'vector'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Vector & Cloud
            </button>
          </div>
        </div>

        {/* Technical Proficiency Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, idx) => {
            const theme = getCategoryTheme(category.title);
            const Icon = theme.icon;

            return (
              <div
                key={idx}
                className={`p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                  darkMode 
                    ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="space-y-6">
                  {/* Category Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl ${theme.bg} ${theme.color} flex items-center justify-center font-bold`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {category.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {category.skills.length} Evaluated Proficiencies
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Progress Bars */}
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5 group">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className={`${darkMode ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-950'} transition-colors`}>
                            {skill.name}
                          </span>
                          <span className={`${theme.color} font-mono font-bold text-xs`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800/90 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-700 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Sub-Footer info */}
                <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Production Verified
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Hands-On Experience
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast-Scan Technology Stack Tags */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-500" />
              <h4 className="text-sm font-bold uppercase tracking-wider">Core Tooling & Stack Directory</h4>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Primary production libraries & frameworks utilized in Oppora.ai & open-source agents
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {corePills.map((pill) => (
              <span
                key={pill}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:scale-105 ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Quantified AI Engineering Highlights Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border text-center space-y-1 ${
            darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              95%+
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Agentic Reasoning Adherence
            </p>
          </div>

          <div className={`p-5 rounded-2xl border text-center space-y-1 ${
            darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              200+
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              DeepEval Benchmarked Cases
            </p>
          </div>

          <div className={`p-5 rounded-2xl border text-center space-y-1 ${
            darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              &lt;120ms
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Qdrant Vector Retrieval
            </p>
          </div>

          <div className={`p-5 rounded-2xl border text-center space-y-1 ${
            darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Zero
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hallucination Guardrails
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
