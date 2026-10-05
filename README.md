# Ranjith Junnu — AI & Full-Stack Solutions Portfolio

> Modern, high-performance portfolio engineered with React 19, TypeScript, Tailwind CSS, and Node.js/Express. Highlights production AI systems, agentic workflows, verified credentials, technical blogs, and GitHub integration.

[![Portfolio Live](https://img.shields.io/badge/Portfolio-Live_Preview-indigo?style=for-the-badge&logo=react)](https://github.com/ranjithjunnu09/Ranjith_Portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ranjith-junnu-71a800211)
[![X (Twitter)](https://img.shields.io/badge/X-Follow-black?style=for-the-badge&logo=x)](https://x.com/RanjithJunnu)
[![GitHub](https://img.shields.io/badge/GitHub-ranjithjunnu09-181717?style=for-the-badge&logo=github)](https://github.com/ranjithjunnu09)

---

## 🌟 Key Features

- **⚡ Modern Responsive UI**: Engineered with React, TypeScript, and Tailwind CSS with instant Dark / Light mode switching and scroll progress tracking.
- **🤖 Production AI Focus**: Featured showcase of real-world AI systems including **Oppora.ai** (Multi-Agent RAG Orchestration with LangGraph, MCP, and DeepEval).
- **📊 Technical Proficiency Matrix**: Categorized proficiency grid spanning Agentic AI & LLMs, Full-Stack Architecture, Data & Cloud Platforms, and DevOps.
- **📜 Verified Certifications**: High-impact accreditation cards showcasing credentials from **Oracle** (*Agentic AI Certified Foundations Associate*), **Qualcomm** (*AI Upskilling Certificate: Technical Foundations*), and **IBM** (*AI Fundamentals*).
- **✍️ Technical Blogs & Insights**: Interactive blog reader featuring in-depth articles on Enterprise Agentic RAG Architectures, Self-Reflective Loops, and Autonomous Systems.
- **🐙 Live GitHub Sync & Importer**: Directly syncs public repositories, star counts, and latest projects directly from GitHub via the GitHub REST API or OAuth.
- **📄 ATS-Optimized CV / Resume Modal**: Interactive print-ready and exportable resume highlighting experience, projects, skills, and direct channels.
- **🎨 Live Portfolio Customizer**: In-browser customizer allowing dynamic edits to profile bio, headline, links, and avatar.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React Icons
- **Backend / API**: Node.js, Express, Vite Middlewares
- **Integrations**: GitHub REST API & OAuth, Direct Contact Dispatcher
- **Testing & Tooling**: TypeScript Compiler (`tsc`), ESLint

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ranjithjunnu09/Ranjith_Portfolio.git
   cd Ranjith_Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables (optional)**:
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Preview production build**:
   ```bash
   npm run start
   ```

---

## 📁 Project Architecture

```
├── src/
│   ├── components/
│   │   ├── AboutAndSkills.tsx          # About bio & 3-card verified certifications
│   │   ├── BlogReaderModal.tsx         # Full-screen markdown/HTML blog reader
│   │   ├── BlogSection.tsx             # Filterable technical blog list
│   │   ├── ContactSection.tsx          # Direct contact channels (Email, LinkedIn, X, Location)
│   │   ├── ExperienceSection.tsx       # Timeline of professional experience & achievements
│   │   ├── Footer.tsx                  # Footer links & copyright
│   │   ├── GitHubConnectModal.tsx      # GitHub sync, repo importer & repository push manager
│   │   ├── Header.tsx                  # Navigation header with dark mode toggle & social links
│   │   ├── Hero.tsx                    # Interactive hero section with CTA buttons
│   │   ├── PortfolioCustomizerModal.tsx # In-app content customizer
│   │   ├── ProjectGallery.tsx          # Filterable project portfolio cards
│   │   ├── ProjectModal.tsx            # Deep-dive project details modal
│   │   ├── ResumeModal.tsx             # ATS-friendly interactive CV/Resume modal
│   │   ├── ScrollProgressBar.tsx       # Top scroll reading progress indicator
│   │   ├── SkillsSection.tsx           # Technical proficiency matrix
│   │   └── XIcon.tsx                   # Official X logo component
│   ├── data/
│   │   ├── githubDefaultData.ts        # Default pre-synced GitHub data
│   │   └── portfolioData.ts            # Core portfolio data and local storage sync
│   ├── services/
│   │   └── githubService.ts            # GitHub API client & repo-to-project parser
│   ├── types.ts                        # TypeScript data contracts & interfaces
│   ├── App.tsx                         # Main application container
│   ├── main.tsx                        # React application bootstrap
│   └── index.css                       # Global Tailwind styling & theme variables
├── server.ts                           # Express server with Vite SSR/middleware & API proxy
├── package.json
└── tsconfig.json
```

---

## 📬 Contact & Connect

- **Author**: Ranjith Junnu
- **LinkedIn**: [linkedin.com/in/ranjith-junnu-71a800211](https://www.linkedin.com/in/ranjith-junnu-71a800211)
- **X (Twitter)**: [@RanjithJunnu](https://x.com/RanjithJunnu)
- **GitHub**: [github.com/ranjithjunnu09](https://github.com/ranjithjunnu09)
- **Portfolio Repository**: [github.com/ranjithjunnu09/Ranjith_Portfolio](https://github.com/ranjithjunnu09/Ranjith_Portfolio)
