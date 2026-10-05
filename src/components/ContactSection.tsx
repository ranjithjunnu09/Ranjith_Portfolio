import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Calendar,
  Inbox,
  X,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, ContactMessage } from '../types';
import { saveContactMessage, loadContactMessages } from '../data/portfolioData';

interface ContactSectionProps {
  profile: UserProfile;
  darkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    projectType: 'Agentic AI & Multi-Agent Workflows',
    budget: '$10k - $25k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showInboxModal, setShowInboxModal] = useState(false);
  const [inboxMessages, setInboxMessages] = useState<ContactMessage[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || 'Portfolio Inquiry',
      projectType: formData.projectType,
      budget: formData.budget,
      message: formData.message.trim(),
      timestamp: new Date().toLocaleString(),
    };

    saveContactMessage(newMessage);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setSubmitted(true);
  };

  const handleOpenInbox = () => {
    setInboxMessages(loadContactMessages());
    setShowInboxModal(true);
  };

  return (
    <section 
      id="contact" 
      className={`py-20 transition-colors relative ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Let's Start a Conversation
          </h2>
          <p className={`text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Have an exciting AI project, RAG pipeline, full-time role, or architecture challenge? Drop a message below or schedule a call.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-8 rounded-3xl border space-y-8 ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">Direct Channels</h3>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  I typically respond to inquiries within 24 business hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 font-bold">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Email
                    </span>
                    <a href={`mailto:${profile.email}`} className="font-bold text-base hover:text-indigo-500 transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>

                {profile.socialLinks.linkedin && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 font-bold">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        LinkedIn
                      </span>
                      <a 
                        href={profile.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noreferrer" 
                        id="contact-direct-linkedin"
                        className="font-bold text-base hover:text-blue-500 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Connect on LinkedIn</span>
                        <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 font-bold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Location
                    </span>
                    <p className="font-bold text-base">{profile.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Availability
                    </span>
                    <p className="font-bold text-base text-emerald-500">
                      Open to work: AI-powered solutions and projects
                    </p>
                  </div>
                </div>
              </div>

              {/* Sent Messages Drawer Button */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleOpenInbox}
                  id="btn-open-sent-inbox"
                  className={`w-full py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-colors ${
                    darkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Inbox className="w-4 h-4 text-indigo-500" />
                  <span>View Submitted Messages (Inbox)</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 rounded-3xl border ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold">Message Sent Successfully!</h3>
                  <p className={`text-sm max-w-md mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Thank you for reaching out, <span className="font-bold">{formData.name}</span>! I've received your inquiry and will respond shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        projectType: 'Full-Stack Web App',
                        budget: '$10k - $25k',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="input-contact-name" className={`text-xs font-bold uppercase tracking-wider block ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="input-contact-name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="input-contact-email" className={`text-xs font-bold uppercase tracking-wider block ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="input-contact-email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <label htmlFor="select-contact-type" className={`text-xs font-bold uppercase tracking-wider block ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Project Type
                      </label>
                      <select
                        id="select-contact-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="Agentic AI & Multi-Agent Workflows">Agentic AI & Multi-Agent Workflows</option>
                        <option value="RAG Pipeline & Semantic Retrieval">RAG Pipeline & Semantic Retrieval</option>
                        <option value="LLM Fine-Tuning & Serving">LLM Fine-Tuning & Serving (vLLM)</option>
                        <option value="FastAPI / Python AI Backend">FastAPI / Python AI Backend Service</option>
                        <option value="Full-Time AI Engineering Role">Full-Time AI Engineering Role</option>
                      </select>
                    </div>

                    {/* Estimated Budget */}
                    <div className="space-y-2">
                      <label htmlFor="select-contact-budget" className={`text-xs font-bold uppercase tracking-wider block ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Estimated Budget
                      </label>
                      <select
                        id="select-contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="<$10k">&lt; $10,000</option>
                        <option value="$10k - $25k">$10,000 - $25,000</option>
                        <option value="$25k - $50k">$25,000 - $50,000</option>
                        <option value="$50k+">$50,000+</option>
                        <option value="N/A - Salary/Full-Time">N/A (Salary / Full-Time)</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="input-contact-subject" className={`text-xs font-bold uppercase tracking-wider block ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Subject
                    </label>
                    <input
                      id="input-contact-subject"
                      type="text"
                      placeholder="e.g. Design System Redesign or Web App Build"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="textarea-contact-message" className={`text-xs font-bold uppercase tracking-wider block ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="textarea-contact-message"
                      required
                      rows={4}
                      placeholder="Tell me a bit about your project, timeline, or objectives..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-submit-contact-form"
                    className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Inbox Submissions Modal Drawer */}
      {showInboxModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowInboxModal(false)}
        >
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-bold">Received Messages Inbox</h3>
              </div>
              <button
                onClick={() => setShowInboxModal(false)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {inboxMessages.length === 0 ? (
              <p className="text-center py-8 text-sm text-slate-400">No submitted messages yet. Use the form above to send one!</p>
            ) : (
              <div className="space-y-4">
                {inboxMessages.map((msg) => (
                  <div key={msg.id} className={`p-4 rounded-xl border space-y-2 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm">{msg.name} ({msg.email})</p>
                        <p className="text-xs text-indigo-500 font-semibold">{msg.subject} • {msg.projectType} ({msg.budget})</p>
                      </div>
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
