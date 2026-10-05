import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Send, 
  Check,
  User
} from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost, Comment } from '../types';

interface BlogReaderModalProps {
  post: BlogPost | null;
  darkMode: boolean;
  onClose: () => void;
  onLikePost: (postId: string) => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  darkMode,
  onClose,
  onLikePost,
}) => {
  if (!post) return null;

  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [copiedLink, setCopiedLink] = useState(false);

  // Local Comments State
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      postId: post.id,
      authorName: 'Sarah Jenkins',
      content: 'Incredible breakdown on direct token synchronization! Implementing this approach reduced our team design QA time significantly.',
      timestamp: '2 days ago',
    },
    {
      id: 'c2',
      postId: post.id,
      authorName: 'David K.',
      content: 'Loved the section on prefers-reduced-motion accessibility. Great design leadership!',
      timestamp: '1 day ago',
    },
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikesCount(prev => prev + 1);
      onLikePost(post.id);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      postId: post.id,
      authorName: newCommentName.trim() || 'Anonymous Reader',
      content: newCommentText.trim(),
      timestamp: 'Just now',
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setNewCommentName('');
  };

  return (
    <div
      id="blog-reader-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="blog-reader-content"
        className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-colors ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Controls */}
        <div className={`p-4 sm:p-6 border-b flex items-center justify-between sticky top-0 z-10 backdrop-blur-md ${
          darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white/90'
        }`}>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              {post.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              id="btn-like-article"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                hasLiked
                  ? 'bg-rose-500 text-white border-rose-500 scale-105'
                  : darkMode ? 'bg-slate-800 border-slate-700 text-rose-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-rose-600 hover:bg-slate-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleShare}
              id="btn-share-article"
              className={`p-2 rounded-full border text-xs font-semibold transition-colors ${
                copiedLink
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title="Copy article link"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              id="btn-close-blog-reader"
              className={`p-2 rounded-full border transition-colors ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Scroll View */}
        <div className="p-6 sm:p-10 max-h-[75vh] overflow-y-auto space-y-8">
          
          {/* Header Title */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between border-y border-slate-200 dark:border-slate-800 py-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{post.author.name}</p>
                  <p className="text-[11px]">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  {post.publishDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Cover Hero Image */}
          <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Markdown Content Body */}
          <div className={`prose max-w-none leading-relaxed ${
            darkMode ? 'prose-invert text-slate-300' : 'text-slate-800'
          }`}>
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => <h1 className="text-2xl sm:text-3xl font-black mt-8 mb-4 tracking-tight" {...props} />,
                h2: ({ ...props }) => <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-3 text-indigo-500 tracking-tight border-b pb-2 border-slate-200 dark:border-slate-800" {...props} />,
                h3: ({ ...props }) => <h3 className="text-base sm:text-lg font-bold mt-6 mb-2" {...props} />,
                p: ({ ...props }) => <p className="mb-4 text-sm sm:text-base leading-relaxed" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc list-inside space-y-1.5 mb-4 pl-2 text-sm sm:text-base" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal list-inside space-y-1.5 mb-4 pl-2 text-sm sm:text-base" {...props} />,
                blockquote: ({ ...props }) => <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-5 italic bg-indigo-50/60 dark:bg-indigo-950/30 rounded-r-2xl" {...props} />,
                table: ({ ...props }) => (
                  <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse" {...props} />
                  </div>
                ),
                th: ({ ...props }) => <th className="p-3 bg-slate-100 dark:bg-slate-800/90 font-bold border-b border-slate-200 dark:border-slate-700" {...props} />,
                td: ({ ...props }) => <td className="p-3 border-b border-slate-200/60 dark:border-slate-800/60" {...props} />,
                code: ({ className, children, ...props }: any) => {
                  const isBlock = className || (typeof children === 'string' && children.includes('\n'));
                  if (!isBlock) {
                    return <code className="px-1.5 py-0.5 rounded-md font-mono text-xs bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold" {...props}>{children}</code>;
                  }
                  return (
                    <div className="my-5 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
                      <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono overflow-x-auto bg-slate-950 text-slate-100 leading-relaxed" {...props}>
                        <code>{children}</code>
                      </pre>
                    </div>
                  );
                },
                a: ({ ...props }) => <a className="text-indigo-500 hover:underline font-semibold" target="_blank" rel="noreferrer" {...props} />,
                hr: () => <hr className="my-8 border-slate-200 dark:border-slate-800" />,
              }}
            >
              {post.content}
            </Markdown>
          </div>

          {/* Article Tags */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Comments Section */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              <h3 className="text-xl font-bold">Discussion ({comments.length})</h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  id="input-comment-name"
                  className={`px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <textarea
                placeholder="Share your thoughts on this article..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                id="textarea-comment-content"
                rows={3}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button
                type="submit"
                id="btn-submit-comment"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-4 pt-2">
              {comments.map((comm) => (
                <div
                  key={comm.id}
                  className={`p-4 rounded-xl border space-y-1.5 ${
                    darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-indigo-500">{comm.authorName}</span>
                    <span className="text-slate-400 font-normal">{comm.timestamp}</span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {comm.content}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
