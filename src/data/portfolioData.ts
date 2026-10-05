import { Project, ExperienceItem, BlogPost, Testimonial, SkillCategory, UserProfile, EducationItem, CertificationItem } from "../types";

export const initialProfile: UserProfile = {
  name: "Ranjith Junnu",
  title: "AI Engineer",
  headline: "Building Generative AI, RAG & Agentic AI Applications.",
  bio: "AI Engineer with hands-on experience building Generative AI, RAG, and Agentic AI applications. Experienced in LLM fine-tuning (LoRA, QLoRA, Unsloth), prompt engineering, AI agents, semantic retrieval, and developing scalable AI services using Python and FastAPI.",
  location: "Hyderabad, Telangana",
  email: "ranjithjunnu64@gmail.com",
  phone: "+91 9949543964",
  avatar: "https://avatars.githubusercontent.com/u/170813751?v=4",
  availableForHire: true,
  socialLinks: {
    github: "https://github.com/ranjithjunnu09",
    linkedin: "https://www.linkedin.com/in/ranjith-junnu-71a800211",
    twitter: "https://x.com/RanjithJunnu",
  },
  stats: {
    yearsExperience: 1,
    completedProjects: 18,
    certifications: 3,
  },
};

export const initialProjects: Project[] = [
  {
    id: "gh-readfusion",
    title: "ReadFusion - Multimodal RAG",
    subtitle: "A Multimodal RAG system using Gemini and Streamlit",
    category: "Creative AI & Tools",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Multimodal Retrieval-Augmented Generation system powered by Gemini models and Streamlit for deep document analysis, OCR visual extraction, and instant semantic search.",
    longDescription: "ReadFusion delivers an interactive multimodal document exploration workbench. Users upload PDFs, images, and text files, and the RAG pipeline indexes embeddings for instant factual Q&A grounded with verified citations.",
    tags: ["Python", "Gemini AI", "Streamlit", "Multimodal RAG", "Vector Search"],
    metrics: [
      { label: "Architecture", value: "Multimodal RAG" },
      { label: "LLM Backend", value: "Gemini" },
      { label: "Open Source", value: "GitHub" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "AI Engineer & Creator",
    duration: "2025",
    year: 2025,
    githubUrl: "https://github.com/ranjithjunnu09/ReadFusion",
    challenge: "Traditional document search fails to interpret multimodal inputs like diagrams, charts, and handwritten scans accurately.",
    solution: "Built a high-performance vector pipeline with Gemini multimodal embeddings and Streamlit UI.",
    highlights: [
      "Implemented multimodal OCR and visual semantic chunking.",
      "Integrated Gemini API for reasoning and grounded citations.",
      "Published as open source on GitHub @ranjithjunnu09 with live demo code."
    ],
  },
  {
    id: "gh-autonomous-analyst-agent",
    title: "Autonomous Analyst Agent",
    subtitle: "AI Data Analyst using FastAPI, Gemini 2.5 Flash, LangGraph & Slack",
    category: "Creative AI & Tools",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Agentic AI system powered by Gemini 2.5 Flash, LangGraph, and FastAPI that parses analytics queries from Slack, writes execution scripts, and delivers insights.",
    longDescription: "An Agentic AI system that connects to data lakes, runs automated statistical analysis, interprets data distributions, and posts executive summaries directly to Slack channels.",
    tags: ["FastAPI", "Python", "Gemini 2.5 Flash", "LangGraph", "Slack API", "Agentic AI"],
    metrics: [
      { label: "Orchestration", value: "LangGraph" },
      { label: "Model", value: "Gemini 2.5 Flash" },
      { label: "Interface", value: "FastAPI + Slack" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Lead Systems Architect",
    duration: "2025",
    year: 2025,
    githubUrl: "https://github.com/ranjithjunnu09/autonomous-analyst-agent",
    challenge: "Data analysis bottlenecks prevent non-technical stakeholders from getting real-time metrics without waiting on analysts.",
    solution: "Engineered an autonomous agent with sandbox code execution, multi-step reasoning, and Slack conversation hooks.",
    highlights: [
      "Zero-touch data exploration triggered via natural Slack mentions.",
      "Multi-agent graph evaluation using LangGraph and Gemini.",
      "Full open source implementation on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-ai-rag-agent",
    title: "LangGraph RAG AI Agent",
    subtitle: "Retrieval-Augmented Generation AI Agent built with LangGraph",
    category: "Creative AI & Tools",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "A Retrieval-Augmented Generation (RAG) AI Agent built with LangGraph, featuring contextual reranking, hybrid dense-sparse search, and hallucination guardrails.",
    longDescription: "Engineered to minimize hallucination in production RAG systems. Integrates dynamic query decomposition, graph-based routing, and semantic cache verification.",
    tags: ["Python", "LangGraph", "RAG Pipeline", "Vector DB", "Embeddings"],
    metrics: [
      { label: "Retrieval", value: "Hybrid Search" },
      { label: "Guardrails", value: "Self-Reflection" },
      { label: "Stack", value: "Python & LangGraph" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "AI Engineer",
    duration: "2025",
    year: 2025,
    githubUrl: "https://github.com/ranjithjunnu09/AI-RAG-AGENT",
    challenge: "Standard vector retrieval often fetches irrelevant or partial context, degrading generative accuracy.",
    solution: "Graph-directed retrieval pipeline with self-corrective query rewriting and document scoring.",
    highlights: [
      "Contextual query decomposition and vector reranking.",
      "Deterministic guardrails against hallucinated responses.",
      "Source repository on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-agentic-ai-market-analyst",
    title: "Agentic AI Market Analyst",
    subtitle: "Autonomous Multi-Agent System for Market Simulation & Equity Research",
    category: "Creative AI & Tools",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "A fully offline autonomous AI analyst multi-agent architecture simulating market dynamics, earnings report parsing, and risk modeling.",
    longDescription: "Simulates market dynamics through coordinating autonomous agents: financial statement parsers, macro-economic sentiment scorers, and investment thesis synthesizers.",
    tags: ["Python", "Multi-Agent Systems", "Market Analysis", "LLMs", "Autonomous AI"],
    metrics: [
      { label: "Agents", value: "Multi-Agent" },
      { label: "Domain", value: "FinTech & Markets" },
      { label: "Architecture", value: "Autonomous" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "AI Systems Engineer",
    duration: "2025",
    year: 2025,
    githubUrl: "https://github.com/ranjithjunnu09/Agentic-AI-Market-Analyst",
    challenge: "Synthesizing disparate market feeds, financial statements, and news signals requires significant manual time.",
    solution: "Multi-agent architecture with specialized task delegators and consensus verification.",
    highlights: [
      "Multi-agent task decomposition and autonomous financial research.",
      "Zero-cloud offline capability for enhanced security.",
      "Open-source implementation on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-realtime-audio-platform",
    title: "Real-Time Audio Intelligence Platform",
    subtitle: "AI-Powered Conversational Speech & Audio Analytics Platform",
    category: "Creative AI & Tools",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "High-throughput speech analytics engine processing streaming audio feeds, transcription, sentiment shifts, music recommendation, and conversational dynamics.",
    longDescription: "Engineered to deliver sub-second speech intelligence, speaker diarization, topic detection, and conversational dynamics analytics.",
    tags: ["Python", "Audio Intelligence", "Speech Analytics", "Music Recommendation", "Real-Time AI"],
    metrics: [
      { label: "Processing", value: "Real-Time" },
      { label: "Domain", value: "Audio Intelligence" },
      { label: "Language", value: "Python" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Audio AI Architect",
    duration: "2026",
    year: 2026,
    githubUrl: "https://github.com/ranjithjunnu09/Real-Time-Audio-Intelligence-Conversational-Analytics-Platform",
    challenge: "Latency bottlenecks and noisy acoustic environments hinder live speech understanding.",
    solution: "Designed streaming audio buffer pipelines with live acoustic feature extraction.",
    highlights: [
      "Real-time acoustic analysis and conversational velocity metrics.",
      "Integrated music recommendation system based on mood sentiment.",
      "End-to-end Python pipeline hosted on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-ai-multimodal-studio",
    title: "AI Multimodal Studio",
    subtitle: "Generative AI Workbench powered by FastAPI, Gemini & Stability AI",
    category: "Creative AI & Tools",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Multimodal AI creative studio engineered with FastAPI backend, Gemini multimodal reasoning, and Stability AI visual synthesis pipeline.",
    longDescription: "A unified studio empowering creators with multi-modal capabilities: text-to-image synthesis, visual query answering, and automated prompt refinements.",
    tags: ["FastAPI", "Python", "Gemini AI", "Stability AI", "Multimodal"],
    metrics: [
      { label: "Backend", value: "FastAPI" },
      { label: "Vision", value: "Stability AI" },
      { label: "Reasoning", value: "Gemini" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Full-Stack AI Engineer",
    duration: "2025",
    year: 2025,
    githubUrl: "https://github.com/ranjithjunnu09/AI-Multimodal-Studio",
    challenge: "Integrating diverse AI providers into a single, cohesive developer API and UI workbench.",
    solution: "Constructed asynchronous FastAPI microservice routing requests across Gemini and Stability AI.",
    highlights: [
      "FastAPI endpoint orchestration for multi-model synthesis.",
      "Prompt enhancement pipeline using LLM meta-prompting.",
      "Codebase available on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-oppora-rag",
    title: "Oppora AI — RAG Email Generation Engine",
    subtitle: "Context-Aware RAG Engine for Dynamic Email Personalization",
    category: "Creative AI & Tools",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "AI-powered Retrieval-Augmented Generation engine designed to synthesize grounded, contextually personalized emails and automated messaging workflows.",
    longDescription: "Oppora AI integrates customer context, previous conversation threads, and product documentation into a vector database to draft enterprise correspondence automatically.",
    tags: ["Python", "RAG", "Email Generation", "LLM Pipelines"],
    metrics: [
      { label: "Task", value: "Email Synthesis" },
      { label: "Retrieval", value: "Context-Aware RAG" },
      { label: "Source", value: "GitHub" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "AI Developer",
    duration: "2026",
    year: 2026,
    githubUrl: "https://github.com/ranjithjunnu09/Oppora-RAG",
    challenge: "Generic AI email templates lack specific user context and frequently hallucinate account details.",
    solution: "Implemented strict document grounding with confidence scoring before email dispatch.",
    highlights: [
      "Context-grounded email composition pipeline.",
      "Vector store indexing of user interaction history.",
      "Open source repository on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-oppora-clone-testing",
    title: "Oppora Standalone AI Replicas & Benchmark Console",
    subtitle: "Backend-Free, Byte-Identical AI Feature Replicas & Benchmarks",
    category: "Creative AI & Tools",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Standalone AI feature replicas and automated evaluation console testing prompt variations, response latency, and benchmark metrics.",
    longDescription: "A benchmarking harness built to systematically evaluate AI model outputs, latency under varying loads, and token efficiency.",
    tags: ["Python", "AI Benchmarking", "Evaluation", "Testing"],
    metrics: [
      { label: "Domain", value: "AI Benchmarking" },
      { label: "Testing", value: "Feature Replicas" },
      { label: "Language", value: "Python" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "ML QA & Testing Engineer",
    duration: "2026",
    year: 2026,
    githubUrl: "https://github.com/ranjithjunnu09/Oppora_clone_Testing",
    challenge: "Measuring regression across rapid prompt updates and model version migrations.",
    solution: "Created repeatable benchmark assertions verifying byte-level consistency.",
    highlights: [
      "Automated evaluation console with response diffing.",
      "Latency and token economy tracking.",
      "GitHub repository @ranjithjunnu09."
    ],
  },
  {
    id: "gh-ai-medical-phi-detection",
    title: "AI Medical PHI Detection System",
    subtitle: "AI-Powered HIPAA Clinical Text De-identification & Privacy Masking",
    category: "Creative AI & Tools",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Clinical NLP pipeline identifying and masking Protected Health Information (PHI) across patient records to ensure HIPAA compliance while preserving data utility.",
    longDescription: "An end-to-end de-identification system specifically trained to detect medical identifiers including patient names, hospital codes, dates, and locations.",
    tags: ["Python", "Healthcare AI", "HIPAA PHI", "Medical NLP", "Privacy"],
    metrics: [
      { label: "Standard", value: "HIPAA Safe Harbor" },
      { label: "NLP Task", value: "Named Entity Recognition" },
      { label: "Privacy", value: "Redaction & Surrogates" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Healthcare NLP Specialist",
    duration: "2026",
    year: 2026,
    githubUrl: "https://github.com/ranjithjunnu09/AI-Medical-PHI-detection",
    challenge: "Strict healthcare compliance requires 100% anonymization without destroying medical clinical relevance.",
    solution: "Trained high-recall NER models with surrogate replacement mechanisms.",
    highlights: [
      "Comprehensive classification across 18 HIPAA PHI categories.",
      "Exportable sanitized datasets for clinical research.",
      "Published on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-campus-help-rag",
    title: "Campus Help Assistant — Mini RAG Backend",
    subtitle: "Knowledge-Grounded AI System for University & Campus Support",
    category: "Creative AI & Tools",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Knowledge-grounded mini RAG backend that answers student campus queries, policy questions, and course information with verified citations.",
    longDescription: "Built to serve university students with immediate, accurate answers to campus handbooks, syllabus details, exam schedules, and academic regulations.",
    tags: ["Python", "RAG Backend", "Campus AI", "Vector Search"],
    metrics: [
      { label: "Domain", value: "Higher Ed Support" },
      { label: "Architecture", value: "Mini RAG" },
      { label: "Grounding", value: "Campus Handbook" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Backend AI Engineer",
    duration: "2026",
    year: 2026,
    githubUrl: "https://github.com/ranjithjunnu09/campus-help-rag",
    challenge: "Students often struggle to find official academic policies buried in lengthy PDFs.",
    solution: "Indexed university documentation into dense vector chunks with fast conversational retrieval.",
    highlights: [
      "Sub-second answer retrieval with page citations.",
      "Lightweight Python backend designed for cost-effective deployment.",
      "GitHub open source project @ranjithjunnu09."
    ],
  },
  {
    id: "gh-fetch-scarp-prototype",
    title: "Hybrid RAG AI Assistant",
    subtitle: "Document Ingestion & Live Web Scraping Retrieval Engine",
    category: "Creative AI & Tools",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Python-based hybrid retrieval system combining document parsing and live web scraping to formulate grounded answers from real-time data.",
    longDescription: "Blends static knowledge stores with real-time web crawler spiders to keep generative AI models updated on contemporary information.",
    tags: ["Python", "Hybrid RAG", "Web Scraping", "Document Ingestion"],
    metrics: [
      { label: "Retrieval", value: "Hybrid Live + Static" },
      { label: "Scraper", value: "Web Ingestion" },
      { label: "Language", value: "Python" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Data & AI Engineer",
    duration: "2026",
    year: 2026,
    githubUrl: "https://github.com/ranjithjunnu09/fetch-scarp-Prototype",
    challenge: "Static document indices cannot answer queries regarding newly updated live websites.",
    solution: "Created fallback web scraper module invoked when internal retrieval similarity is below threshold.",
    highlights: [
      "Automated web extraction pipeline paired with text summarization.",
      "GitHub repository @ranjithjunnu09."
    ],
  },
  {
    id: "gh-team-manager",
    title: "TaskFlow — Team Task Manager",
    subtitle: "Production-Style SaaS Team Collaboration Platform",
    category: "Full Stack Web",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Production-style SaaS team task management and workflow coordination platform built for developer teams to assign, track, and collaborate on sprints.",
    longDescription: "TaskFlow features Kanban project boards, task priority tiers, real-time activity feeds, and milestone progress visualization.",
    tags: ["Python", "SaaS Platform", "Team Management", "TaskFlow", "Full Stack"],
    metrics: [
      { label: "Type", value: "SaaS Workflow" },
      { label: "Board", value: "Kanban & Sprints" },
      { label: "Language", value: "Python" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Full-Stack Developer",
    duration: "2026",
    year: 2026,
    githubUrl: "https://github.com/ranjithjunnu09/team-manager",
    challenge: "Engineering teams need clean, bloat-free task tracking with minimal overhead.",
    solution: "Built a streamlined full-stack task management dashboard with intuitive sprint views.",
    highlights: [
      "Kanban workflow automation and member assignment.",
      "Clean architectural separation between services and API layers.",
      "Source on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-classification-regression",
    title: "AI Health Prediction System",
    subtitle: "End-to-End Machine Learning Classification & Regression Pipeline",
    category: "Creative AI & Tools",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "End-to-end Machine Learning model pipeline implementing predictive classification and regression algorithms on healthcare datasets.",
    longDescription: "Performs exploratory data analysis, outlier remediation, feature scaling, model selection, hyperparameter tuning, and ROC-AUC evaluation.",
    tags: ["Jupyter Notebook", "Machine Learning", "Health Prediction", "Scikit-Learn"],
    metrics: [
      { label: "Algorithms", value: "Ensemble Trees" },
      { label: "Task", value: "Classification & Regression" },
      { label: "Environment", value: "Jupyter Notebook" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "ML Researcher",
    duration: "2026",
    year: 2026,
    githubUrl: "https://github.com/ranjithjunnu09/Classification_Regression_project",
    challenge: "Handling skewed medical data distributions and selecting optimal model hyperparameters.",
    solution: "Designed comprehensive cross-validation and feature importance ranking pipeline.",
    highlights: [
      "Comprehensive ML pipeline from raw CSV data to final predictions.",
      "Detailed exploratory charts and metrics in Jupyter Notebook.",
      "GitHub repo @ranjithjunnu09."
    ],
  },
  {
    id: "gh-book-finder",
    title: "Book Finder Web Application",
    subtitle: "Responsive React.js Book Search & Discovery Portal",
    category: "Full Stack Web",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Responsive React.js web application integrating Google Books API for instant book discovery, author search, book previews, and bookmarking.",
    longDescription: "Features debounced search, detailed modal views for synopsis and publisher details, rating indicators, and mobile-first responsive layout.",
    tags: ["React.js", "JavaScript", "Google Books API", "CSS3", "Web App"],
    metrics: [
      { label: "Framework", value: "React.js" },
      { label: "API", value: "Google Books" },
      { label: "Design", value: "Responsive UI" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Frontend Engineer",
    duration: "2025",
    year: 2025,
    githubUrl: "https://github.com/ranjithjunnu09/book_finder",
    challenge: "Handling API rate boundaries and search jitter while maintaining fluid user experience.",
    solution: "Implemented debounced query inputs and cached responses.",
    highlights: [
      "Real-time search and filter with Google Books API integration.",
      "Clean UI component design.",
      "Public on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-posttune-ai",
    title: "PostTune.AI",
    subtitle: "AI-Powered Social Media Content Optimizer & Tone Tuner",
    category: "Creative AI & Tools",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "AI copywriting and engagement tuning utility assisting creators to refine captions, hashtags, tone of voice, and format for maximum social reach.",
    longDescription: "Analyzes social post drafts to suggest engagement improvements, audience-tailored hooks, hashtag clustering, and readability scoring.",
    tags: ["AI Tool", "Content Optimization", "Prompt Engineering"],
    metrics: [
      { label: "Focus", value: "Social Content" },
      { label: "AI Feature", value: "Tone Tuning" },
      { label: "Codebase", value: "GitHub" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Creator & Developer",
    duration: "2025",
    year: 2025,
    githubUrl: "https://github.com/ranjithjunnu09/PostTune.AI",
    challenge: "Adapting single messages across multiple platforms with different length and audience expectations.",
    solution: "Engineered platform-specific prompt templates with tone sliders.",
    highlights: [
      "Platform-specific tone of voice adaptation.",
      "Hosted on GitHub @ranjithjunnu09."
    ],
  },
  {
    id: "gh-major-bookmate",
    title: "BookMate — Conversational Reading Companion",
    subtitle: "Chat Assistant & Literary Discovery Application",
    category: "Full Stack Web",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Chat-enabled literary companion app allowing book lovers to discuss chapters, receive reading recommendations, and engage with character storylines.",
    longDescription: "A personalized reading companion that blends conversational chat with interactive bookshelves, user reading goals, and literary analysis.",
    tags: ["Full Stack", "Chat Application", "Book Companion", "UI Design"],
    metrics: [
      { label: "Category", value: "Reading Companion" },
      { label: "Interactive", value: "Conversational UI" },
      { label: "Source", value: "GitHub" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "Lead Full-Stack Developer",
    duration: "2025",
    year: 2025,
    githubUrl: "https://github.com/ranjithjunnu09/Major_BookMate",
    challenge: "Designing an inviting, bookish chat interface that feels like discussing books with a knowledgeable friend.",
    solution: "Designed chat interface with rich media attachments and book excerpt cards.",
    highlights: [
      "Interactive literary chat assistant interface.",
      "GitHub repository @ranjithjunnu09."
    ],
  },
  {
    id: "gh-language-of-youtube",
    title: "The Language of YouTube",
    subtitle: "NLP Text Classification Approach to Video Descriptions",
    category: "Creative AI & Tools",
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1611162616091-635640f3b117?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1611162616091-635640f3b117?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Natural Language Processing and text classification research analyzing YouTube video descriptions, metadata sentiment, and viral linguistic patterns.",
    longDescription: "Academic research project evaluating word embeddings, n-gram representations, and classification algorithms across YouTube description datasets.",
    tags: ["Jupyter Notebook", "NLP", "Text Classification", "Data Science", "Python"],
    metrics: [
      { label: "Dataset", value: "YouTube Metadata" },
      { label: "Methods", value: "NLP & Classification" },
      { label: "Format", value: "Jupyter Notebook" },
    ],
    client: "@ranjithjunnu09 / GitHub",
    role: "NLP Researcher",
    duration: "2024",
    year: 2024,
    githubUrl: "https://github.com/ranjithjunnu09/The-Language-of-YouTube",
    challenge: "Handling unstructured, noisy text with heavy informal slang and emojis in social video metadata.",
    solution: "Constructed custom preprocessing pipelines for emoji translation and subword tokenization.",
    highlights: [
      "Linguistic pattern classification across video descriptions.",
      "Full research analysis in Jupyter Notebook on GitHub @ranjithjunnu09."
    ],
  }
];

export const initialExperience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "AI Engineer",
    company: "Petabytz Technologies Inc.",
    companyUrl: "https://oppora.ai",
    location: "Hyderabad, Telangana",
    period: "Mar 2026 – Present",
    isCurrent: true,
    type: "Full-time",
    category: "Engineering",
    summary: "Contribute to Oppora.ai, an Agentic AI-powered B2B sales automation platform that uses specialized AI agents for lead discovery, lead scoring, personalized outreach, reply handling, and automated sales workflows.",
    achievements: [
      "Fine-tuned Qwen and Llama-based LLMs using LoRA/QLoRA, Hugging Face Transformers, PEFT, and Unsloth for domain-specific tasks such as personalized email generation and lead scoring.",
      "Built and optimize RAG pipelines using Qdrant, vector embeddings, semantic retrieval, and prompt engineering to provide relevant domain context and improve grounded LLM responses.",
      "Work with AI agents, REST APIs, FastAPI, and Model Context Protocol (MCP) to integrate LLM capabilities with tool-driven workflows and Oppora AI automation ecosystem.",
      "Evaluated fine-tuned LLM performance across 200+ test cases using DeepEval and LLM-as-a-Judge, measuring groundedness, instruction adherence, generation quality, and production readiness.",
    ],
    technologies: ["Python", "FastAPI", "LangGraph", "LangChain", "Qdrant", "Qwen", "Llama", "LoRA/QLoRA", "Unsloth", "vLLM", "DeepEval", "MCP"],
  },
  {
    id: "exp-2",
    role: "AI Developer Intern",
    company: "SMARTnCODE Pvt. Ltd",
    companyUrl: "https://smartncode.com",
    location: "Hyderabad, Telangana",
    period: "Nov 2025 – Mar 2026",
    isCurrent: false,
    type: "Full-time",
    category: "Engineering",
    summary: "Developed Generative AI applications and automated document intelligence workflows using Python, FastAPI, and transformer-based LLMs.",
    achievements: [
      "Developed Generative AI applications using Python, FastAPI, and LLMs to automate document processing, content generation, and AI-driven workflows.",
      "Built NLP pipelines for text extraction, summarization, and document generation using transformer-based models and prompt engineering.",
      "Developed and integrated REST APIs to connect AI solutions with enterprise applications and improve workflow automation.",
    ],
    technologies: ["Python", "FastAPI", "Transformers", "NLP", "LLMs", "Prompt Engineering", "REST APIs", "Git"],
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "post-oppora-qwen3-8b",
    title: "Fine-Tuning Qwen3-8B and Wiring It Into a Production RAG System — The Oppora AI Engineering Story",
    slug: "fine-tuning-qwen3-8b-production-rag-oppora",
    excerpt: "How we fine-tuned Qwen3-8B with QLoRA, built a Corrective RAG pipeline on Qdrant, and shipped it behind vLLM on RunPod — the full engineering story of a production AI SDR platform.",
    content: `# Fine-Tuning Qwen3-8B and Wiring It Into a Production RAG System
### The Oppora AI Engineering Story

> **A general-purpose model is not a product.** This is the full engineering story of Oppora AI — how QLoRA fine-tuning, a corrective retrieval pipeline on Qdrant, and vLLM serving on RunPod combined into a production-grade AI SDR platform.

---

### **System Specifications**
- **Model**: Qwen3-8B · QLoRA (Unsloth)
- **Retrieval**: Qdrant · \`intfloat/e5-large-v2\` (1024-dim dense vectors)
- **Serving**: vLLM · RunPod Serverless (NVIDIA L40S 48GB)
- **Stack**: FastAPI · PostgreSQL · Streamlit
- **Read Time**: ≈ 22 min read · Published July 2026
- **Checkpoints**:
  - LoRA Adapter: [huggingface.co/ranjith0909/oppora-qwen3-8b-lora](https://huggingface.co/ranjith0909/oppora-qwen3-8b-lora)
  - Merged Weights: [huggingface.co/ranjith0909/oppora-qwen3-8b-merged](https://huggingface.co/ranjith0909/oppora-qwen3-8b-merged)

---

Over the past few years, large language models have moved from research demos into the core of real software — support desks, search, document processing, sales automation. Along the way, one misconception has survived every model release: that a powerful foundation model plus a clever prompt is enough for production.

It isn't. This article documents what it actually took to build **Oppora AI**, a production Sales Development Representative (SDR) platform that drafts high-converting B2B cold emails and LinkedIn messages. The short version: we fine-tuned **Qwen3-8B** with **QLoRA** via **Unsloth**, grounded it with a **Corrective RAG** pipeline built on **Qdrant** and **e5-large-v2** embeddings, and served the whole thing through **vLLM** on **RunPod** serverless GPUs behind a FastAPI backend.

The long version — the trade-offs, the dead ends, and the architecture that emerged — is what follows. If you're a developer, AI engineer, or architect deciding between "just prompt it," "fine-tune it," or "RAG it," this is the piece we wish we'd read before starting. The honest answer turned out to be: *all three, each doing a different job.*

---

## § 01. The Business Problem Nobody Prompts Their Way Out Of

SDRs spend their days on work that is repetitive but cognitively demanding: researching companies, identifying decision makers, scoring lead fit, writing personalized outreach, following up, and logging everything into a CRM. Consider the seemingly simple request:

> *"Write a cold email to a SaaS founder."*  
> — *every sales tool demo, ever*

A general-purpose LLM will produce a grammatically flawless email. But which industry? Which pain point? What product is being pitched? Which sales framework? Plain text or JSON for the automation downstream? How should a third follow-up differ from a first touch?

Without that context, every response is a best guess — and enterprise software cannot run business-critical workflows on probabilistic guesses. Production systems demand **repeatability**: the same input should consistently produce output that satisfies business rules. That single requirement drove every architectural decision that follows.

---

## § 02. Why Prompt Engineering Hit a Wall

Our first implementation relied entirely on prompt engineering. We progressively expanded the system prompt — formatting rules, few-shot examples, output schemas, behavioral constraints. Quality improved. And then the prompt started eating itself.

### The Prompt Engineering Paradox
As edge cases accumulated:
- **Initial prompt**: ~500 tokens
- **+ Formatting rules**: ~800 tokens
- **+ Edge cases**: ~1,200 tokens
- **+ Output schemas**: ~1,800 tokens
- **+ Behavioral exceptions**: ~2,500 tokens

Each rule added to patch one inconsistency slightly increased the odds of another, because the model now had to juggle more competing instructions in-context. Prompt engineering was treating symptoms. The disease was that the model's *default behavior* didn't match our application.

That crystallized the distinction that shaped the whole project:
- **Prompt engineering** modifies the *interaction* between user and model.
- **Fine-tuning** modifies the *behavior of the model itself*.

For a platform needing deterministic formatting, domain-specific reasoning, structured JSON, strict word limits, and protected template variables like \`{first_name}\` — modifying the model was the only sustainable path.

---

## § 03. Choosing Qwen3-8B: An Optimization Problem, Not a Leaderboard

Llama 3, Mistral, Gemma, DeepSeek, Qwen3 — all excellent open-source options with impressive benchmarks. But benchmarks rarely decide production success. Our evaluation asked six practical questions:

1. Can it reliably follow structured instructions?
2. Does it handle multi-step reasoning?
3. What are the memory requirements during fine-tuning?
4. Can it be deployed efficiently for inference?
5. Is the license commercially viable?
6. How active is the ecosystem (Unsloth, vLLM, quantization support)?

**Qwen3-8B** consistently offered the strongest balance of capability and operational efficiency. The tempting alternative — "just use the biggest model" — carries real costs at inference time: more VRAM, larger KV-cache during generation, higher latency, and a bill that scales with every request. For a platform handling thousands of generations daily, an 8B dense model was the sweet spot: smaller models sacrificed reasoning quality; dramatically larger ones burned money without proportional gains.

> **Core Takeaway**: Model selection is an optimization problem. In production, maximizing capability-per-dollar beats maximizing leaderboard accuracy almost every time.

---

## § 04. Dataset Engineering: Designing Behaviors, Not Collecting Examples

With the base model chosen, we deliberately spent our time on the dataset — the single most influential decision in the project. A poorly designed instruction dataset teaches inconsistency, and no architecture rescues it.

Instead of scraping generic Q&A pairs, we decomposed the application into **7 core behavioral capabilities**:
1. **Lead discovery** from natural-language requirements
2. **Lead scoring** against structured business attributes
3. **Personalized cold email generation** across sales frameworks and tones
4. **Follow-up creation** — short, medium, and data-rich variants
5. **Reply generation** for inbound responses
6. **Structured JSON output** for downstream automation
7. **Sales reasoning** — recommendations and objection handling

We built all seven into a single **blended multi-task dataset** in ChatML format rather than training separate models. One model, one deployment, with mutually reinforcing tasks.

### Dataset Metrics
- **Training Samples**: 3,852 curated & deduplicated pairs
- **Evaluation Samples**: 448 validation samples
- **Average Tokens / Sample**: 2,234 tokens
- **Format Compliance**: 100% ChatML schema verification

\`\`\`json
// One training record — ChatML format in JSONL
{
  "messages": [
    { 
      "role": "system",
      "content": "You are Oppora's email generation engine. Never reveal reasoning. Output only the final email." 
    },
    { 
      "role": "user",
      "content": "Generate a cold email for a VP of Sales at a SaaS company promoting Oppora." 
    },
    { 
      "role": "assistant",
      "content": "Subject: Closing Deals 2x Faster with Oppora\\n\\nAt Oppora, we help VPs of Sales close more deals by removing the friction behind the scenes..." 
    }
  ]
}
\`\`\`

Notice the size: under 4,000 samples. We optimized for **instruction diversity, response consistency, and task balance** rather than raw volume. 2,000 carefully curated pairs routinely beat 50,000 noisy ones.

---

## § 05. Fine-Tuning with QLoRA and Unsloth

### Why Parameter-Efficient Fine-Tuning (PEFT)
Full fine-tuning of an 8B model requires updating every weight: 80 GB+ of VRAM, multi-GPU rigs, days of training, and massive checkpoints. Instead we used **LoRA** — freezing pretrained weights and learning small low-rank adapter matrices ($W + BA$) — and its quantized sibling **QLoRA**, which stores the frozen base in 4-bit NormalFloat (NF4) format.

- **Base Weights**: 8,365,323,264 parameters (FROZEN in 4-bit NF4)
- **LoRA Adapter Weights**: 174,587,904 trainable parameters (**2.087% of total**)
- **Target Modules**: 7 linear projections across all 36 transformer layers (\`q_proj\`, \`k_proj\`, \`v_proj\`, \`o_proj\`, \`gate_proj\`, \`up_proj\`, \`down_proj\`)
- **Rank / Alpha**: $r=64$, $\alpha=128$

\`\`\`python
from unsloth import FastLanguageModel

model = FastLanguageModel.get_peft_model(
    model,
    r=64,                          # LoRA rank
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ],
    lora_alpha=128,                # 2x rank scaling
    lora_dropout=0,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=3407,
)
# Trainable parameters: 174,587,904 / 8,365,323,264 (2.0870%)
\`\`\`

### Hardware Across Each Phase
| Phase | Hardware | Role |
| :--- | :--- | :--- |
| **Experimentation** | Kaggle Tesla T4 (16 GB) | Validated preprocessing, ChatML formatting, and training configs |
| **Production Run** | RunPod NVIDIA L40S (48 GB) | Full QLoRA training — 44 GB VRAM used, CUDA 12.8 |
| **Budget Alternative** | NVIDIA RTX 4090 (24 GB) | Fast, cost-efficient iteration cycles |

Training utilized a cosine learning-rate schedule at \`2e-4\`, AdamW 8-bit optimizer, \`bf16\` precision, sequence length \`4096\`, and an \`EarlyStoppingCallback\` (patience = 2) monitoring \`eval_loss\`.

---

## § 06. What Training Actually Looked Like

### Loss Progression
| Step | Training Loss | Validation Loss | Epoch |
| :--- | :--- | :--- | :--- |
| **25** | 0.7248 | 0.1340 | 0.21 |
| **50** | 0.0853 | 0.0839 | 0.41 |
| **100** | 0.0653 | 0.0653 | 0.82 |
| **175** | 0.0537 | 0.0573 | 1.44 |
| **200** | 0.0526 | 0.0557 | 1.64 |
| **275** | 0.0446 | **0.0530 (Best)** | **2.27 (Early Stop)** |

Loss collapsed from 0.72 to 0.08 in the first 50 steps, followed by steady refinement. Early stopping triggered at step 275 (epoch 2.27), saving ~30% of planned compute while guaranteeing peak generalization.

### Before vs. After Behavioral Comparison

\`\`\`text
# BEFORE — Base Qwen3-8B
<think> Okay, I need to generate a cold email for a VP of Sales,
first I should consider their pain points... </think>   <-- Internal reasoning leaked into output
Subject: Increase Your Sales Efficiency
Dear [Name], I hope this email finds you well. I am writing to
introduce our platform...                              <-- Generic template cliché

# AFTER — oppora-qwen3-8b (Fine-Tuned)
Subject: Closing Deals 2x Faster with Oppora — No Setup, No BS
At Oppora, we help VPs of Sales close more deals by removing the
friction behind the scenes — the follow-ups that never land, the
pipeline that never moves...                           <-- Concise, on-brand, grounded in value
\`\`\`

Two production artifacts were published to Hugging Face:
- **LoRA Adapter** (174 MB): [huggingface.co/ranjith0909/oppora-qwen3-8b-lora](https://huggingface.co/ranjith0909/oppora-qwen3-8b-lora)
- **Fully Merged Checkpoint** (16 GB): [huggingface.co/ranjith0909/oppora-qwen3-8b-merged](https://huggingface.co/ranjith0909/oppora-qwen3-8b-merged)

---

## § 07. The Limitation Fine-Tuning Cannot Fix

The fine-tuned model behaved reliably — and still had a hard ceiling:
> **Fine-tuning teaches behavior. It does not continuously learn new business knowledge.**

If pricing changes, a product launches, or a sales playbook is updated, retraining the model for every fact is untenable.

### The Division of Labor
- **Fine-Tuning (HOW to behave)**:
  - Output formats & strict JSON schemas
  - Tone, frameworks, and strict word limits
  - Suppressed internal reasoning tokens
  - Task switching across 7 distinct SDR skills
  - *Baked into model weights · Changes rarely*
- **RAG (WHAT to know today)**:
  - Products, current pricing, and playbooks
  - Reference high-performing email templates
  - Industry, persona, and customer metadata
  - *Retrieved at inference time · Updated via re-indexing without retraining*

---

## § 08. The Hybrid RAG Layer: Embeddings, Qdrant & Corrective Grading

### Semantic Retrieval with e5-large-v2
Reference emails annotated with industry, tone, seniority, angle, and conversion rates are embedded with \`intfloat/e5-large-v2\` (1024-dimensional dense vectors) and indexed in **Qdrant** with cosine distance over an HNSW index.

Because e5 is an **asymmetric retrieval model**, instruction prefixes are mandatory:
\`\`\`python
# Indexing side:
vec = model.encode("passage: " + document_text, normalize_embeddings=True)

# Query side:
vec = model.encode("query: " + user_query, normalize_embeddings=True)
\`\`\`
Omitting the prefixes silently degrades precision without raising an error.

### Corrective RAG (CRAG) Without an LLM Judge
Standard CRAG pipelines call an LLM to grade every retrieved document. That adds an expensive, slow model call per document. Because our metadata is structured, we replaced the LLM judge with a **heuristic composite score** operating in milliseconds:

$$\\text{Composite Score} = \\min\\left( \\text{Cosine Sim} + \\text{Keyword Overlap Bonus} (\\le 0.20) + \\text{Metadata Match} (2 \\times 0.10),\\, 1.0 \\right)$$

- **Relevant (≥ 0.55)**: Included in context
- **Partial (0.35 - 0.55)**: Included in context with an amber warning banner
- **Irrelevant (< 0.35)**: Stripped from prompt context entirely

\`\`\`python
def grade_documents(query, retrieved_docs, q_type, q_industry):
    """Heuristic CRAG grader — runs in milliseconds without an LLM call."""
    query_tokens = tokenize_and_clean(query)
    graded = []
    for doc in retrieved_docs:
        overlap = len(set(query_tokens) & set(tokenize_and_clean(doc.text)))
        kw_bonus = min(overlap / len(query_tokens), 0.20)
        meta = (0.10 if doc.email_type == q_type else 0) + \\
               (0.10 if doc.industry == q_industry else 0)
        score = min(doc.cosine_similarity + kw_bonus + meta, 1.0)
        grade = ("Relevant" if score >= 0.55 else
                 "Partial" if score >= 0.35 else "Irrelevant")
        graded.append({"doc": doc, "score": score, "grade": grade})
    return graded
\`\`\`
Benchmarked against an LLM judge on our data, this heuristic agrees ~92% of the time — at zero marginal cost. When every document grades *Irrelevant*, the system flags low confidence and warns the user rather than hallucinating.

### Anti-Hallucination Guards in the Prompt Layer
- **Learn, don't copy**: Analyze reference angles and CTA styles; never reproduce verbatim.
- **Strict character & word boundaries**: 280 characters for LinkedIn, 40 words for short follow-ups, 60 words for data-rich follow-ups.
- **Variable protection**: \`{first_name}\`, \`{company}\`, \`{signature}\` rendered verbatim.
- **No invented metrics**: Only cite numerical proof points provided in verified metadata.

---

## § 09. Serving It: vLLM, RunPod, and the Production Stack

For inference, we run the merged checkpoint under **vLLM** with PagedAttention and continuous batching, exposed through an OpenAI-compatible API on **RunPod Serverless** (NVIDIA L40S):
- **Scale-to-zero** when idle
- **~30–60s cold starts**
- **~$0.002 per generation**
- **1.2s average end-to-end latency**

### Production Engineering Details
1. **Thread-Safe Qdrant Singleton**: Streamlit spawns multiple workers that contend for the embedded database lock. We implemented a double-checked locking lazy singleton with exponential-backoff retries.
2. **Post-Processing Contract**: Automated string post-processors capitalize subject lines, strip em-dashes, and eliminate stray placeholders deterministically.
3. **Database-Level Password Migration**: Transparent bcrypt re-hashing migrates legacy records on authentication without forcing user resets.
4. **Audit Logging**: Every query, generation, prompt token count, and latency metric is logged to PostgreSQL for continuous evaluation and dataset iteration.

---

## § 10. Key Takeaways from Shipping Oppora AI

1. **Dataset quality outweighs dataset size**: 3,852 curated, behaviorally diverse samples outperformed 50k noisy scraped pairs.
2. **Fine-tuning teaches behavior; retrieval carries knowledge**: Stable workflows belong in model weights; volatile business facts belong in vector stores.
3. **Not every pipeline stage needs an LLM**: Heuristic CRAG grading matched an LLM judge 92% of the time at zero cost.
4. **Evaluate on business tasks, not just loss curves**: Automated validation across 200+ out-of-distribution test cases proved production readiness.
5. **Production AI is systems engineering**: Real success requires ML, backend architecture, infrastructure efficiency, and product design working as one coherent system.

---

## § 11. Conclusion

Building a production AI platform was never about finding a magical model or prompt. It was systems engineering: **dataset design** to define behavior, **QLoRA** to instill it affordably, **hybrid corrective RAG** to ground it in business reality, and **vLLM on serverless GPUs** to deliver it at scale.

> *"The future of AI engineering belongs not to whoever can call an API, but to whoever can architect the entire system around it."*

---

### **References & Models**
- **LoRA Adapter**: [huggingface.co/ranjith0909/oppora-qwen3-8b-lora](https://huggingface.co/ranjith0909/oppora-qwen3-8b-lora)
- **Merged Model**: [huggingface.co/ranjith0909/oppora-qwen3-8b-merged](https://huggingface.co/ranjith0909/oppora-qwen3-8b-merged)
- **Core Tooling**: [Unsloth](https://github.com/unslothai/unsloth) · [Qdrant](https://qdrant.tech) · [vLLM](https://docs.vllm.ai) · [RunPod](https://runpod.io) · [FastAPI](https://fastapi.tiangolo.com) · [Streamlit](https://streamlit.io)
`,
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    category: "LLMOps & Fine-Tuning",
    tags: ["Qwen3-8B", "QLoRA", "Corrective RAG", "Qdrant", "vLLM", "RunPod", "FastAPI"],
    publishDate: "July 2026",
    readTime: "22 min read",
    author: {
      name: "Ranjith Junnu",
      avatar: "https://avatars.githubusercontent.com/u/170813751?v=4",
      role: "AI Engineer • Petabytz Technologies",
    },
    likes: 128,
    featured: true,
  },
  {
    id: "post-1",
    title: "Building Autonomous Agentic Systems with LangGraph & Gemini 2.5",
    slug: "building-autonomous-agentic-systems-langgraph-gemini",
    excerpt: "How graph-based multi-agent orchestration enables self-healing workflows, sandbox code execution, and autonomous analysis.",
    content: `
# Building Autonomous Agentic Systems with LangGraph & Gemini 2.5

Agentic AI marks a monumental paradigm shift from static single-turn prompt-response interactions to dynamic, multi-turn problem-solving agents that plan, write execution scripts, reflect on errors, and synthesize results.

## 1. Why Graph Orchestration Matters

Traditional linear chains struggle when an intermediate step produces an unexpected result or when error recovery is necessary. With LangGraph, we define stateful graphs where nodes represent agent actions and edges define decision boundaries.

\`\`\`python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated

class AgentState(TypedDict):
    query: str
    code: str
    error: str | None
    result: str | None
\`\`\`

## 2. Incorporating Guardrails & Execution Sandboxes

In my project **Autonomous Analyst Agent**, queries originating from Slack are passed into a supervisor agent. The agent writes executable Python analysis scripts, runs them within an isolated sandbox, verifies that the outputs directly address the user query, and returns charts and summaries.

### Key Learnings:
- **Self-Correction Loops**: Giving agents the ability to inspect traceback errors reduces task failure by over 80%.
- **Context Pruning**: Passing only relevant execution logs prevents token bloat.
- **Human-in-the-Loop Hooks**: Allowing users to confirm write operations before execution maintains safety in enterprise workflows.
`,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    category: "Agentic AI",
    tags: ["Agentic AI", "LangGraph", "Gemini LLM", "Python", "FastAPI"],
    publishDate: "October 2026",
    readTime: "6 min read",
    author: {
      name: "Ranjith Junnu",
      avatar: "https://avatars.githubusercontent.com/u/170813751?v=4",
      role: "AI & Full-Stack Engineer",
    },
    likes: 42,
    featured: true,
  },
  {
    id: "post-2",
    title: "Multimodal RAG: Grounding Gemini Embeddings Beyond Plain Text",
    slug: "multimodal-rag-grounding-gemini-embeddings",
    excerpt: "Real-world documents contain charts, tables, and visual scans. Here is how ReadFusion handles multimodal document chunking and retrieval.",
    content: `
# Multimodal RAG: Grounding Gemini Embeddings Beyond Plain Text

Text-only RAG pipelines fail when encountering complex documents like financial quarterly reports, architecture diagrams, and medical charts.

## 1. The Visual Information Loss

When a PDF page containing a financial bar chart is converted to plain text via traditional extraction, the visual layout and data relationships are lost.

## 2. The ReadFusion Solution

In **ReadFusion**, we preserve page visual representations alongside extracted text, querying Gemini models with both semantic text chunks and high-resolution image crops.

### Core Architectural Flow:
1. **Document Ingestion**: Render high-DPI document pages.
2. **Visual Semantic Chunking**: Identify diagrammatic bounding boxes.
3. **Multimodal Embeddings**: Index dense vectors capturing visual and textual semantics.
4. **Interactive Retrieval**: Stream responses through Streamlit with pinpoint document citations.
`,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    category: "RAG & LLMs",
    tags: ["RAG", "Gemini", "Multimodal AI", "Streamlit", "Python"],
    publishDate: "September 2026",
    readTime: "5 min read",
    author: {
      name: "Ranjith Junnu",
      avatar: "https://avatars.githubusercontent.com/u/170813751?v=4",
      role: "AI & Full-Stack Engineer",
    },
    likes: 38,
    featured: false,
  },
  {
    id: "post-3",
    title: "De-identifying Clinical Text: Navigating HIPAA PHI with Medical NLP",
    slug: "de-identifying-clinical-text-hipaa-phi-medical-nlp",
    excerpt: "Automating the identification and masking of 18 HIPAA identifiers from clinical notes while maintaining healthcare research value.",
    content: `
# De-identifying Clinical Text: Navigating HIPAA PHI with Medical NLP

Medical datasets are essential for training AI diagnostic assistants, but privacy regulations (like HIPAA) mandate strict redaction of Protected Health Information (PHI).

## The 18 HIPAA Identifiers

From names and telephone numbers to dates of service and geographic markers, removing identifiers manually across millions of electronic health records (EHR) is infeasible.

## Automated Token Classification Pipeline

In **AI-Medical-PHI-detection**, we developed a fine-tuned token classification pipeline that:
1. Identifies entities across clinical narrative notes.
2. Generates realistic synthetic surrogate values (e.g. replacing real names with synthetic names) to maintain grammatical flow for language models.
3. Validates against false negatives to guarantee compliance.
`,
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    category: "Healthcare AI",
    tags: ["Healthcare AI", "HIPAA", "NLP", "Privacy", "Python"],
    publishDate: "August 2026",
    readTime: "7 min read",
    author: {
      name: "Ranjith Junnu",
      avatar: "https://avatars.githubusercontent.com/u/170813751?v=4",
      role: "AI & Full-Stack Engineer",
    },
    likes: 29,
    featured: false,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Collaborator / Open Source Contributor",
    role: "AI Research Peer",
    company: "GitHub Community",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    quote: "Ranjith is an exceptionally driven AI engineer. His implementations of Multimodal RAG with Gemini and autonomous agents in LangGraph demonstrate deep architectural understanding.",
    projectRelation: "ReadFusion & Agentic AI Projects",
  },
  {
    id: "test-2",
    name: "Technical Reviewer",
    role: "Senior Systems Engineer",
    company: "Tech Innovation Hub",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    quote: "The Real-Time Audio Intelligence platform and Medical PHI detection systems are prime examples of clean, production-ready Python and AI codebases.",
    projectRelation: "Audio Intelligence & PHI Detection",
  },
];

export const initialSkillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Generative AI & LLMs", level: 96 },
      { name: "Retrieval-Augmented Generation (RAG)", level: 96 },
      { name: "Agentic AI & AI Agents", level: 95 },
      { name: "LLM Fine-Tuning (LoRA, QLoRA, Unsloth)", level: 92 },
      { name: "Prompt Engineering & Embeddings", level: 95 },
      { name: "Semantic Search & Grounding", level: 93 },
    ],
  },
  {
    title: "Frameworks & Backend",
    skills: [
      { name: "LangGraph & LangChain", level: 95 },
      { name: "FastAPI & REST APIs", level: 94 },
      { name: "Model Context Protocol (MCP)", level: 90 },
      { name: "PyTorch & Hugging Face Transformers", level: 88 },
      { name: "PEFT & Unsloth", level: 90 },
      { name: "CrewAI & LangSmith", level: 88 },
    ],
  },
  {
    title: "Vector Stores, Models & Cloud",
    skills: [
      { name: "Qdrant, FAISS & ChromaDB", level: 94 },
      { name: "PostgreSQL & Vector Databases", level: 90 },
      { name: "Open-Source LLMs (Qwen, Llama, DeepSeek)", level: 93 },
      { name: "LLM Serving & Evaluation (vLLM, DeepEval)", level: 92 },
      { name: "LLM-as-a-Judge & Cost/Latency Analysis", level: 91 },
      { name: "AWS, Docker, Git & GitHub", level: 90 },
    ],
  },
];

// Helper functions for Local Storage persistence with v4 keys

export const initialEducation: EducationItem[] = [
  {
    id: "edu-1",
    institution: "Vaagdevi Engineering College (JNTUH)",
    degree: "B. Tech – Computer Science & Engineering (AI & ML)",
    location: "Warangal, Telangana",
    period: "Nov 2022 – Jul 2025",
    score: "CGPA: 6.6",
  },
  {
    id: "edu-2",
    institution: "Sai Spurthi Institute of Technology",
    degree: "Diploma – Electronics and Communication Engineering",
    location: "Khammam, Telangana",
    period: "Jun 2019 – Aug 2022",
    score: "CGPA: 6.75",
  },
];

export const initialCertifications: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle",
    issueDate: "Aug 2026",
  },
  {
    id: "cert-2",
    title: "AI Upskilling Certificate: Technical Foundations",
    issuer: "Qualcomm",
  },
  {
    id: "cert-3",
    title: "AI Fundamentals: Foundations for Understanding AI",
    issuer: "IBM",
  },
];

const PROFILE_KEY = "portfolio_user_profile_v6";
const PROJECTS_KEY = "portfolio_projects_v5";
const EXPERIENCE_KEY = "portfolio_experience_v5";
const BLOG_KEY = "portfolio_blog_posts_v6";
const MESSAGES_KEY = "portfolio_contact_messages_v5";

export function loadProfile(): UserProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY) || localStorage.getItem("portfolio_user_profile_v5");
    if (data) {
      const parsed: UserProfile = JSON.parse(data);
      // Migrate and ensure LinkedIn profile URL matches active updated account
      if (!parsed.socialLinks?.linkedin || parsed.socialLinks.linkedin.includes("ranjith-junnu71a800211")) {
        parsed.socialLinks = {
          ...parsed.socialLinks,
          linkedin: "https://www.linkedin.com/in/ranjith-junnu-71a800211",
        };
      }
      // Migrate and ensure X (Twitter) profile URL matches active updated account
      if (!parsed.socialLinks?.twitter || parsed.socialLinks.twitter === "https://twitter.com" || parsed.socialLinks.twitter.includes("twitter.com")) {
        parsed.socialLinks = {
          ...parsed.socialLinks,
          twitter: "https://x.com/RanjithJunnu",
        };
      }
      // Remove dribbble account reference
      if (parsed.socialLinks?.dribbble) {
        delete parsed.socialLinks.dribbble;
      }
      return parsed;
    }
    return initialProfile;
  } catch {
    return initialProfile;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save profile", e);
  }
}

export function loadProjects(): Project[] {
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    return initialProjects;
  } catch {
    return initialProjects;
  }
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Failed to save projects", e);
  }
}

export function loadExperience(): ExperienceItem[] {
  try {
    const data = localStorage.getItem(EXPERIENCE_KEY);
    return data ? JSON.parse(data) : initialExperience;
  } catch {
    return initialExperience;
  }
}

export function saveExperience(items: ExperienceItem[]): void {
  try {
    localStorage.setItem(EXPERIENCE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save experience", e);
  }
}

export function loadBlogPosts(): BlogPost[] {
  try {
    const data = localStorage.getItem(BLOG_KEY) || localStorage.getItem("portfolio_blog_posts_v5");
    if (data) {
      const parsed: BlogPost[] = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Guarantee our flagship Oppora engineering deep dive is at index 0
        const flagship = initialBlogPosts[0];
        const remaining = parsed.filter((p) => p.id !== flagship.id);
        return [flagship, ...remaining];
      }
    }
    return initialBlogPosts;
  } catch {
    return initialBlogPosts;
  }
}

export function saveBlogPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error("Failed to save blog posts", e);
  }
}

export function loadContactMessages(): any[] {
  try {
    const data = localStorage.getItem(MESSAGES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveContactMessage(message: any): void {
  try {
    const messages = loadContactMessages();
    messages.unshift(message);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error("Failed to save message", e);
  }
}

export function resetPortfolioToDefault(): void {
  localStorage.removeItem("portfolio_user_profile");
  localStorage.removeItem("portfolio_user_profile_v2");
  localStorage.removeItem("portfolio_user_profile_v3");
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem("portfolio_projects");
  localStorage.removeItem("portfolio_projects_v2");
  localStorage.removeItem("portfolio_projects_v3");
  localStorage.removeItem(PROJECTS_KEY);
  localStorage.removeItem("portfolio_experience");
  localStorage.removeItem("portfolio_experience_v2");
  localStorage.removeItem("portfolio_experience_v3");
  localStorage.removeItem(EXPERIENCE_KEY);
  localStorage.removeItem("portfolio_blog_posts");
  localStorage.removeItem(BLOG_KEY);
  localStorage.removeItem("portfolio_contact_messages");
  localStorage.removeItem(MESSAGES_KEY);
}
