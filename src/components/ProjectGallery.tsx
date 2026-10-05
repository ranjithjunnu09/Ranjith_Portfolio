import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Github, 
  Layers, 
  LayoutGrid, 
  List, 
  Star, 
  ArrowUpRight, 
  Sparkles,
  Tag
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';

interface ProjectGalleryProps {
  projects: Project[];
  darkMode: boolean;
  onSelectProject: (project: Project) => void;
}

const categories: ProjectCategory[] = [
  'All',
  'UI/UX & Design',
  'Full Stack Web',
  'Mobile Apps',
  'Creative AI & Tools',
];

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  darkMode,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'title'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [projects]);

  // Only display categories that actually contain projects
  const availableCategories = useMemo(() => {
    const presentCats = new Set<string>(['All']);
    projects.forEach(p => presentCats.add(p.category));
    return categories.filter(c => presentCats.has(c));
  }, [projects]);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Category filter
        if (selectedCategory !== 'All' && project.category !== selectedCategory) {
          return false;
        }
        // Tag filter
        if (selectedTag && !project.tags.includes(selectedTag)) {
          return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = project.title.toLowerCase().includes(q);
          const matchDesc = project.description.toLowerCase().includes(q);
          const matchSubtitle = project.subtitle.toLowerCase().includes(q);
          const matchTag = project.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchSubtitle && !matchTag) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.year - a.year;
        }
        if (sortBy === 'newest') {
          return b.year - a.year;
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [projects, selectedCategory, selectedTag, searchQuery, sortBy]);

  return (
    <section 
      id="projects" 
      className={`py-20 transition-colors ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100/70 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 mb-3 border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Creative Projects & Case Studies
            </h2>
            <p className={`mt-2 text-base max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Organized by category. Click any project card to inspect deep-dive architectural challenges, metrics, and interactive demos.
            </p>
          </div>

          {/* View Mode & Count */}
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Showing {filteredProjects.length} of {projects.length}
            </span>
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                id="btn-view-grid"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                id="btn-view-list"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className={`p-4 rounded-2xl border mb-8 shadow-xs space-y-4 ${
          darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Top Control Row: Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="input-search-projects"
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm transition-colors border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-indigo-500"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <label htmlFor="select-sort-projects" className={`text-xs font-semibold whitespace-nowrap ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Sort by:
              </label>
              <select
                id="select-sort-projects"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`px-3 py-2 rounded-xl text-sm border font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest First</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {availableCategories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  id={`btn-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : darkMode
                      ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Active Tag Filter Pills (If any tag clicked) */}
          {selectedTag && (
            <div className="flex items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-800 text-xs">
              <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Filtered by tag:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                <Tag className="w-3 h-3" />
                {selectedTag}
                <button
                  onClick={() => setSelectedTag(null)}
                  className="ml-1 hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Gallery Content */}
        {filteredProjects.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl border ${
            darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold">No matching projects found</h3>
            <p className={`text-sm mt-1 max-w-md mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Try clearing your search query or selecting a different project category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:bg-indigo-700"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                id={`project-card-${project.id}`}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.018] hover:shadow-2xl cursor-pointer flex flex-col justify-between will-change-transform ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800/80 hover:border-indigo-500/60 hover:shadow-indigo-500/10'
                    : 'bg-white border-slate-200 hover:border-indigo-400/60 hover:shadow-indigo-500/15'
                }`}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-800">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                    {project.category}
                  </span>

                  {/* Featured Badge */}
                  {project.featured && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-indigo-500 transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                    </div>
                    <p className={`text-xs font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      {project.subtitle}
                    </p>
                    <p className={`text-sm line-clamp-2 leading-relaxed ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Key Metrics Pill Row */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg border text-center ${
                            darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <span className="block text-xs font-bold text-indigo-500">{m.value}</span>
                          <span className={`block text-[10px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag === selectedTag ? null : tag);
                        }}
                        className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                          selectedTag === tag
                            ? 'bg-indigo-600 text-white'
                            : darkMode
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className={`text-[11px] px-1.5 py-0.5 font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* List View Layout */
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                id={`project-list-card-${project.id}`}
                className={`group p-4 sm:p-6 rounded-2xl border transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.012] hover:shadow-xl cursor-pointer flex flex-col md:flex-row gap-6 items-center will-change-transform ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/60 hover:shadow-indigo-500/10'
                    : 'bg-white border-slate-200 hover:border-indigo-400/60 hover:shadow-indigo-500/10'
                }`}
              >
                {/* List Thumbnail */}
                <div className="w-full md:w-56 aspect-16/10 rounded-xl overflow-hidden bg-slate-800 relative flex-shrink-0">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {project.featured && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                {/* List Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                      {project.category}
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      • {project.year} • {project.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight group-hover:text-indigo-500 transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className={`text-sm line-clamp-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                          darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="w-full md:w-auto flex md:flex-col justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
                  <button className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-xs hover:bg-indigo-700 whitespace-nowrap">
                    View Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
