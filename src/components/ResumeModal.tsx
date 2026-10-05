import React from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  ExternalLink,
  GraduationCap,
  Award,
  Briefcase,
  Code2,
  FolderKanban
} from 'lucide-react';
import { UserProfile, ExperienceItem, EducationItem, CertificationItem } from '../types';
import { XIcon } from './XIcon';

interface ResumeModalProps {
  profile: UserProfile;
  experience: ExperienceItem[];
  education?: EducationItem[];
  certifications?: CertificationItem[];
  darkMode: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  profile,
  experience,
  education = [],
  certifications = [],
  darkMode,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="resume-modal-content"
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-4 sm:my-8 transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className={`p-4 sm:p-6 border-b flex items-center justify-between gap-4 ${
          darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">Curriculum Vitae / Resume</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              ATS-Optimized
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="btn-print-cv"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              id="btn-close-cv-modal"
              className={`p-2 rounded-full border transition-colors ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
              aria-label="Close resume modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 space-y-7 max-h-[78vh] overflow-y-auto font-sans print:p-0 print:max-h-none print:overflow-visible">
          
          {/* Header Contact details matching Resume */}
          <div className="text-center border-b pb-6 border-slate-200 dark:border-slate-800 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase">
              R A N J I T H &nbsp; J U N N U
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium pt-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-indigo-500" />
                +91 9949543964
              </span>
              <span>•</span>
              <a href="mailto:ranjithjunnu64@gmail.com" className="flex items-center gap-1 hover:text-indigo-500 transition-colors">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                ranjithjunnu64@gmail.com
              </a>
              <span>•</span>
              <a 
                href="https://www.linkedin.com/in/ranjith-junnu-71a800211" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-500 hover:underline"
              >
                <Linkedin className="w-3.5 h-3.5" />
                linkedin.com/in/ranjith-junnu-71a800211
              </a>
              <span>•</span>
              <a 
                href="https://github.com/ranjithjunnu09" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-500 hover:underline"
              >
                <Github className="w-3.5 h-3.5" />
                github.com/ranjithjunnu09
              </a>
              <span>•</span>
              <a 
                href="https://x.com/RanjithJunnu" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-500 hover:underline"
              >
                <XIcon className="w-3.5 h-3.5" />
                x.com/RanjithJunnu
              </a>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/60 pb-1">
              Professional Summary
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              AI Engineer with hands-on experience building Generative AI, RAG, and Agentic AI applications. Experienced in LLM fine-tuning, prompt engineering, AI agents, semantic retrieval, and developing scalable AI services using Python and FastAPI. Contributing to production AI solutions involving LLMs, multi-agent workflows, and intelligent automation.
            </p>
          </div>

          {/* Section: Technical Skills */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/60 pb-1">
              Technical Skills
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div className="space-y-1.5">
                <p>
                  <strong className="text-slate-900 dark:text-white">Programming Languages:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-300">Python, SQL</span>
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">AI & Machine Learning:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Agentic AI, AI Agents, LLM Fine-Tuning (LoRA, QLoRA), Prompt Engineering, Embeddings, Semantic Search
                  </span>
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">Frameworks & Libraries:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    LangChain, LangGraph, LangSmith, FastAPI, PyTorch, TensorFlow, Hugging Face Transformers, PEFT, Unsloth, CrewAI
                  </span>
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">Backend & Integration:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    FastAPI, REST APIs, Model Context Protocol (MCP)
                  </span>
                </p>
              </div>

              <div className="space-y-1.5">
                <p>
                  <strong className="text-slate-900 dark:text-white">Databases & Vector Stores:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    PostgreSQL, Qdrant, FAISS, ChromaDB, Vector Databases
                  </span>
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">LLMs & Open-Source Models:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    Qwen, Llama, DeepSeek, GLM, MiniMax, Open-Weight LLM Evaluation, Model Benchmarking, LLM Inference
                  </span>
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">LLM Serving & Evaluation:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    vLLM, DeepEval, LLM-as-a-Judge, Groundedness Evaluation, Latency & Cost Analysis
                  </span>
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">Cloud & Developer Tools:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    AWS, Docker, Git, GitHub
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Section: Work Experience & Internships */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/60 pb-1">
              Work Experience & Internships
            </h3>

            <div className="space-y-5">
              {/* Petabytz Technologies */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    AI Engineer &bull; <span className="text-indigo-600 dark:text-indigo-400">Petabytz Technologies Inc.</span>
                  </h4>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Mar 2026 – Present | Hyderabad, India
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-1 leading-relaxed">
                  <li>
                    Contribute to <strong>Oppora.ai</strong>, an Agentic AI-powered B2B sales automation platform using specialized AI agents for lead discovery, lead scoring, personalized outreach, reply handling, and automated sales workflows.
                  </li>
                  <li>
                    Fine-tuned Qwen and Llama-based LLMs using LoRA/QLoRA, Hugging Face Transformers, PEFT, and Unsloth for domain-specific tasks such as personalized email generation and lead scoring.
                  </li>
                  <li>
                    Built and optimize RAG pipelines using Qdrant, vector embeddings, semantic retrieval, and prompt engineering to provide relevant domain context and improve grounded LLM responses.
                  </li>
                  <li>
                    Work with AI agents, REST APIs, FastAPI, and Model Context Protocol (MCP) to integrate LLM capabilities with tool-driven workflows and Oppora's AI automation ecosystem.
                  </li>
                  <li>
                    Evaluated fine-tuned LLM performance across 200+ test cases using DeepEval and LLM-as-a-Judge, measuring groundedness, instruction adherence, generation quality, and production readiness.
                  </li>
                </ul>
              </div>

              {/* SMARTnCODE */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    AI Developer Intern &bull; <span className="text-indigo-600 dark:text-indigo-400">SMARTnCODE Pvt. Ltd</span>
                  </h4>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Nov 2025 – Mar 2026 | Hyderabad, India
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-1 leading-relaxed">
                  <li>
                    Developed Generative AI applications using Python, FastAPI, and LLMs to automate document processing, content generation, and AI-driven workflows.
                  </li>
                  <li>
                    Built NLP pipelines for text extraction, summarization, and document generation using transformer-based models and prompt engineering.
                  </li>
                  <li>
                    Developed and integrated REST APIs to connect AI solutions with enterprise applications and improve workflow automation.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Flagship Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/60 pb-1">
              Key Projects
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between items-baseline font-bold">
                  <span className="text-slate-900 dark:text-white">
                    Oppora.ai – Agentic AI B2B Sales Automation Platform | Petabytz Technologies
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Production Agentic AI platform for B2B sales automation, covering lead discovery, lead scoring, personalized outreach, reply handling, and sales workflow automation. Built multi-agent workflows, RAG pipelines, and tool interactions using LangChain, LangGraph, Qdrant, FastAPI, and MCP with Qwen/Llama fine-tuning.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline font-bold">
                  <span className="text-slate-900 dark:text-white">
                    AI Data-Analyst Agent – Agentic AI System &bull;{' '}
                    <a href="https://github.com/ranjithjunnu09/autonomous-analyst-agent" target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline inline-flex items-center gap-0.5 font-normal">
                      GitHub Link <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Autonomous Agentic AI system using LangChain and LangGraph for multi-step reasoning and workflow orchestration. Integrated PostgreSQL, REST APIs, and persistent memory to automate data analysis with FastAPI and Slack notifications.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline font-bold">
                  <span className="text-slate-900 dark:text-white">
                    ReadFusion – Multimodal RAG System &bull;{' '}
                    <a href="https://github.com/ranjithjunnu09/ReadFusion" target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline inline-flex items-center gap-0.5 font-normal">
                      GitHub Link <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Retrieval-Augmented Generation (RAG) system using LangChain, FAISS, FastAPI, and Streamlit for intelligent document-based Q&A with multimodal chunking, vector embeddings, and semantic search.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/60 pb-1">
              Education
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <strong className="text-slate-900 dark:text-white text-sm">Vaagdevi Engineering College (JNTUH)</strong>
                  <p className="text-slate-600 dark:text-slate-300">
                    B. Tech – Computer Science & Engineering (AI & ML) • <span className="font-semibold text-indigo-500">CGPA: 6.6</span>
                  </p>
                </div>
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Nov 2022 – Jul 2025 | Warangal, Telangana
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline pt-1">
                <div>
                  <strong className="text-slate-900 dark:text-white text-sm">Sai Spurthi Institute of Technology</strong>
                  <p className="text-slate-600 dark:text-slate-300">
                    Diploma – Electronics Communication and Engineering • <span className="font-semibold text-indigo-500">CGPA: 6.75</span>
                  </p>
                </div>
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Jun 2019 – Aug 2022 | Khammam, Telangana
                </span>
              </div>
            </div>
          </div>

          {/* Section: Certifications */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/60 pb-1">
              Certifications
            </h3>

            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-1">
              <li>
                <strong>Agentic AI Certified Foundations Associate</strong> &mdash; <em>Oracle</em> | Aug 2026
              </li>
              <li>
                <strong>AI Upskilling Certificate: Technical Foundations</strong> &mdash; <em>Qualcomm</em>
              </li>
              <li>
                <strong>AI Fundamentals: Foundations for Understanding AI</strong> &mdash; <em>IBM</em>
              </li>
            </ul>
          </div>

          {/* Section: Hobbies & Interests */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900/60 pb-1">
              Hobbies & Interests
            </h3>

            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-1">
              <li>Building intelligent systems and exploring emerging AI research.</li>
              <li>Personal investing and financial data analysis.</li>
              <li>Continuous learning through technical reading and experimentation.</li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex justify-between items-center ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
          <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            Ranjith Junnu &bull; AI Engineer
          </div>
          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-semibold border ${
              darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
