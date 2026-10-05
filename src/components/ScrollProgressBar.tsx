import React, { useEffect, useState } from 'react';

interface ScrollProgressBarProps {
  darkMode?: boolean;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const docElement = document.documentElement;
      const totalHeight = docElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY || docElement.scrollTop;
        const progress = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial check
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-slate-200/40 dark:bg-slate-800/40 backdrop-blur-[1px]"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        id="scroll-progress-bar"
        className="relative h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(99,102,241,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      >
        {scrollProgress > 0 && scrollProgress < 100 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_6px_#38bdf8] opacity-80" />
        )}
      </div>
    </div>
  );
};
