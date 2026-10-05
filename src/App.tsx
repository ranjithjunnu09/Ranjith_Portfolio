import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { ProjectModal } from './components/ProjectModal';
import { ExperienceSection } from './components/ExperienceSection';
import { BlogSection } from './components/BlogSection';
import { BlogReaderModal } from './components/BlogReaderModal';
import { SkillsSection } from './components/SkillsSection';
import { AboutAndSkills } from './components/AboutAndSkills';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioCustomizerModal } from './components/PortfolioCustomizerModal';
import { GitHubConnectModal } from './components/GitHubConnectModal';
import { Footer } from './components/Footer';

import { Project, BlogPost, ExperienceItem, UserProfile, GitHubConnectionState } from './types';
import { 
  loadProfile, 
  saveProfile, 
  loadProjects, 
  saveProjects, 
  loadExperience, 
  saveExperience, 
  loadBlogPosts, 
  saveBlogPosts,
  initialSkillCategories,
  initialTestimonials,
  initialEducation,
  initialCertifications,
  resetPortfolioToDefault
} from './data/portfolioData';
import { loadGitHubConnection } from './services/githubService';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [experience, setExperience] = useState<ExperienceItem[]>(loadExperience);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(loadBlogPosts);

  // Active Modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [customizerModalOpen, setCustomizerModalOpen] = useState(false);
  const [gitHubModalOpen, setGitHubModalOpen] = useState(false);

  // GitHub Connection State
  const [gitHubState, setGitHubState] = useState<GitHubConnectionState>(loadGitHubConnection);

  // Active section tracking
  const [activeSection, setActiveSection] = useState('projects');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Section Observer for nav highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'skills', 'experience', 'blog', 'about', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers for Customizer actions
  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  const handleAddProject = (newProject: Project) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    saveProjects(updated);
  };

  const handleImportGitHubProjects = (newProjects: Project[]) => {
    const existingIds = new Set(projects.map(p => p.id));
    const uniqueNew = newProjects.filter(p => !existingIds.has(p.id));
    const updated = [...uniqueNew, ...projects];
    setProjects(updated);
    saveProjects(updated);
  };

  const handleAddExperience = (newExp: ExperienceItem) => {
    const updated = [newExp, ...experience];
    setExperience(updated);
    saveExperience(updated);
  };

  const handleAddBlogPost = (newPost: BlogPost) => {
    const updated = [newPost, ...blogPosts];
    setBlogPosts(updated);
    saveBlogPosts(updated);
  };

  const handleLikeBlogPost = (postId: string) => {
    const updated = blogPosts.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setBlogPosts(updated);
    saveBlogPosts(updated);
  };

  const handleResetData = () => {
    if (window.confirm("Reset portfolio data back to default initial state?")) {
      resetPortfolioToDefault();
      setProfile(loadProfile());
      setProjects(loadProjects());
      setExperience(loadExperience());
      setBlogPosts(loadBlogPosts());
      setCustomizerModalOpen(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Horizontal Scroll Progress Bar */}
      <ScrollProgressBar darkMode={darkMode} />
      
      {/* Header Bar */}
      <Header
        profile={profile}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCustomizer={() => setCustomizerModalOpen(true)}
        onOpenGitHub={() => setGitHubModalOpen(true)}
        isGitHubConnected={gitHubState.isConnected}
        gitHubUsername={gitHubState.username}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          profile={profile}
          darkMode={darkMode}
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenGitHub={() => setGitHubModalOpen(true)}
          isGitHubConnected={gitHubState.isConnected}
          gitHubUsername={gitHubState.username}
        />

        {/* Filterable Project Gallery */}
        <ProjectGallery
          projects={projects}
          darkMode={darkMode}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Technical Proficiency Matrix / Skills Section */}
        <SkillsSection
          skills={initialSkillCategories}
          darkMode={darkMode}
        />

        {/* Professional Experience */}
        <ExperienceSection
          experience={experience}
          darkMode={darkMode}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* Blogs Section */}
        <BlogSection
          posts={blogPosts}
          darkMode={darkMode}
          onSelectPost={(post) => setSelectedBlogPost(post)}
        />

        {/* About & Certifications */}
        <AboutAndSkills
          certifications={initialCertifications}
          darkMode={darkMode}
        />

        {/* Contact Form Section */}
        <ContactSection
          profile={profile}
          darkMode={darkMode}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        darkMode={darkMode}
      />

      {/* MODALS */}
      
      {/* Project Detail Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        darkMode={darkMode}
        onClose={() => setSelectedProject(null)}
      />

      {/* Blog Article Reader Modal */}
      <BlogReaderModal
        post={selectedBlogPost}
        darkMode={darkMode}
        onClose={() => setSelectedBlogPost(null)}
        onLikePost={handleLikeBlogPost}
      />

      {/* Printable Resume / CV Modal */}
      {resumeModalOpen && (
        <ResumeModal
          profile={profile}
          experience={experience}
          education={initialEducation}
          certifications={initialCertifications}
          darkMode={darkMode}
          onClose={() => setResumeModalOpen(false)}
        />
      )}

      {/* Portfolio Content Customizer Modal */}
      {customizerModalOpen && (
        <PortfolioCustomizerModal
          profile={profile}
          darkMode={darkMode}
          onClose={() => setCustomizerModalOpen(false)}
          onSaveProfile={handleSaveProfile}
          onAddProject={handleAddProject}
          onAddExperience={handleAddExperience}
          onAddBlogPost={handleAddBlogPost}
          onResetData={handleResetData}
          onOpenGitHub={() => setGitHubModalOpen(true)}
          isGitHubConnected={gitHubState.isConnected}
          gitHubUsername={gitHubState.username}
        />
      )}

      {/* GitHub Connect Modal */}
      <GitHubConnectModal
        isOpen={gitHubModalOpen}
        onClose={() => setGitHubModalOpen(false)}
        darkMode={darkMode}
        profile={profile}
        onUpdateProfile={handleSaveProfile}
        onImportProjects={handleImportGitHubProjects}
        gitHubState={gitHubState}
        setGitHubState={setGitHubState}
      />

    </div>
  );
}
