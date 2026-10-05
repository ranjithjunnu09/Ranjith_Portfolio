import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  User 
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  darkMode: boolean;
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  darkMode,
  onSelectPost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Design Systems', 'UI/UX Design', 'AI & Engineering'];

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory !== 'All' && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchTag = post.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchTag) return false;
    }
    return true;
  });

  return (
    <section 
      id="blog" 
      className={`py-20 transition-colors ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100/60 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 mb-3 border border-amber-200 dark:border-amber-800">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Blogs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Blogs & Engineering Notes
            </h2>
            <p className={`mt-2 text-base max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Deep dives on Agentic AI architecture, RAG pipelines, fine-tuning, and scalable Python systems.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="input-search-blog"
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              id={`btn-blog-cat-${cat.toLowerCase().replace(/[^a-z]/g, '')}`}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : darkMode
                  ? 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              id={`blog-card-${post.id}`}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer flex flex-col justify-between ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50'
                  : 'bg-white border-slate-200 hover:border-indigo-500/50'
              }`}
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-16/9 overflow-hidden bg-slate-800">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-white backdrop-blur-md">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-500" />
                      {post.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight leading-snug group-hover:text-indigo-500 transition-colors">
                    {post.title}
                  </h3>

                  <p className={`text-sm line-clamp-2 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {post.author.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-rose-500">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>{post.likes}</span>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
