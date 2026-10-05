import React from 'react';
import { 
  User, 
  Sparkles, 
  Layers, 
  Code, 
  Palette, 
  Server, 
  CheckCircle2, 
  Award,
  ShieldCheck,
  Brain,
  Cpu
} from 'lucide-react';
import { SkillCategory, Testimonial, EducationItem, CertificationItem } from '../types';

interface AboutAndSkillsProps {
  skills?: SkillCategory[];
  testimonials?: Testimonial[];
  education?: EducationItem[];
  certifications?: CertificationItem[];
  darkMode: boolean;
}

export const AboutAndSkills: React.FC<AboutAndSkillsProps> = ({
  education = [],
  certifications = [],
  darkMode,
}) => {
  return (
    <section 
      id="about" 
      className={`py-20 transition-colors ${
        darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-3 border border-emerald-200 dark:border-emerald-800">
            <User className="w-3.5 h-3.5" />
            <span>About & Engineering Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            AI Architecture & Technical Core
          </h2>
          <p className={`mt-2 text-base max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Designing production-grade Agentic AI workflows, high-precision RAG pipelines, and scalable Python backend architectures.
          </p>
        </div>

        {/* Philosophy & Approach Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`p-8 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Agentic AI & Multi-Agent Graphs</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Orchestrating stateful multi-agent workflows using LangGraph and MCP for self-corrective reasoning, tool usage, and automated enterprise task execution.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">High-Recall RAG & Vector Systems</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Building semantic retrieval pipelines with Qdrant, FAISS, and dense embeddings to minimize hallucination and ground responses with verified citations.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Fine-Tuning & Production Serving</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Parameter-efficient fine-tuning (LoRA, QLoRA, Unsloth) on Qwen and Llama models, paired with vLLM serving and DeepEval evaluation benchmarks.
            </p>
          </div>
        </div>

        {/* Verified Certifications & Accreditations (Clean, high-impact credentials grid) */}
        {certifications && certifications.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Verified Certifications & Accreditations</h3>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Formally assessed & certified domain proficiencies in Agentic AI and foundation models
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 w-fit">
                3 Certified Credentials
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                    darkMode ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700' : 'bg-slate-50/90 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                        <Award className="w-5 h-5 text-indigo-500" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {cert.issuer}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                        {cert.title}
                      </h4>
                      <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Issued by <span className="font-semibold text-indigo-500">{cert.issuer}</span>
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {cert.issueDate ? `Issued ${cert.issueDate}` : 'Industry Verified'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
