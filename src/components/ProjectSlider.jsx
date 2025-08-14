import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, LayoutGrid, X, ChevronLeft, Globe, Monitor, Smartphone } from 'lucide-react';
import { SiGooglechrome, SiSafari, SiFirefoxbrowser, SiApple } from 'react-icons/si';
import { FaWindows } from 'react-icons/fa';
import { createPortal } from 'react-dom';

function Popover({ isVisible, content, x, y }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!isVisible || !mounted) return null;

  return createPortal(
    <div
      className="z-[999] pointer-events-none px-2 py-1 text-[11px] rounded-md text-white bg-black/70 dark:bg-white dark:text-black shadow-md"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        transform: 'translate(-50%, 12px)',
      }}
    >
      {content}
    </div>,
    document.body
  );
}

export default function ProjectSlider() {
  const projects = [
    {
      title: 'Promtify AIG',
      year: '2025',
      url: 'https://promtify-aig.com',
      tagline: 'AI-powered prompts & workflows',
      description: 'AI-powered prompts & workflows to speed up your creative process.',
      tech: ['React', 'Tailwind'],
      image: '/images/promtify-aig.png',
      platforms: ['web', 'chrome', 'desktop'],
    },
    {
      title: 'Planets Awaken',
      year: '2025',
      url: 'https://planets-awaken.com',
      tagline: 'Interactive planetary experience',
      description: 'Scroll through planets in a beautiful 3D interactive space journey.',
      tech: ['React', 'Three.js'],
      image: '/images/project2.jpg',
      platforms: ['web', 'safari', 'firefox', 'ios'],
    },
  ];

  const platformIcons = {
    web: { Icon: Globe, label: 'Web' },
    ios: { Icon: SiApple, label: 'iOS' },
    android: { Icon: Smartphone, label: 'Android' },
    chrome: { Icon: SiGooglechrome, label: 'Chrome' },
    safari: { Icon: SiSafari, label: 'Safari' },
    firefox: { Icon: SiFirefoxbrowser, label: 'Firefox' },
    desktop: { Icon: FaWindows, label: 'Windows' },
  };

  const SWIPE_THRESHOLD_PX = 60;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowAll, setIsShowAll] = useState(false);
  const [isShowNudgeHint, setIsShowNudgeHint] = useState(true);
  const [dragState, setDragState] = useState({
    startX: 0,
    dx: 0,
    isDragging: false,
    usedMouse: false,
  });

  const [platformPopover, setPlatformPopover] = useState({
    isVisible: false,
    content: '',
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsShowNudgeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const goNext = () => setCurrentIndex((i) => (i + 1) % projects.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);

  // Touch
  const onTouchStart = (e) =>
    setDragState({ startX: e.touches[0].clientX, dx: 0, isDragging: true, usedMouse: false });
  const onTouchMove = (e) => {
    if (!dragState.isDragging) return;
    setDragState((d) => ({ ...d, dx: e.touches[0].clientX - d.startX }));
  };
  const onTouchEnd = () => {
    if (!dragState.isDragging) return;
    if (dragState.dx > SWIPE_THRESHOLD_PX) goPrev();
    else if (dragState.dx < -SWIPE_THRESHOLD_PX) goNext();
    setDragState({ startX: 0, dx: 0, isDragging: false, usedMouse: false });
  };

  // Mouse
  const onMouseDown = (e) =>
    setDragState({ startX: e.clientX, dx: 0, isDragging: true, usedMouse: true });
  const onMouseMove = (e) => {
    if (!dragState.isDragging || !dragState.usedMouse) return;
    setDragState((d) => ({ ...d, dx: e.clientX - d.startX }));
  };
  const endMouseDrag = () => {
    if (!dragState.isDragging) return;
    if (dragState.dx > SWIPE_THRESHOLD_PX) goPrev();
    else if (dragState.dx < -SWIPE_THRESHOLD_PX) goNext();
    setDragState({ startX: 0, dx: 0, isDragging: false, usedMouse: false });
  };

  // Platform popover
  const handlePlatformMouseEnter = (e, key) => {
    const def = platformIcons[key] || { label: key };
    setPlatformPopover({
      isVisible: true,
      content: def.label,
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handlePlatformMouseMove = (e) => {
    setPlatformPopover((p) => ({ ...p, x: e.clientX, y: e.clientY }));
  };
  const handlePlatformMouseLeave = () => {
    setPlatformPopover((p) => ({ ...p, isVisible: false }));
  };

  return (
    <div
      className="relative w-full h-full cursor-grab active:cursor-grabbing group/nav"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endMouseDrag}
      onMouseLeave={endMouseDrag}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Hover hints (visual only) */}
      <div className="absolute left-2 md:left-4 bottom-2 md:bottom-4 z-20 pointer-events-none transition-opacity duration-300 opacity-0 group-hover/nav:opacity-100">
        <div className="px-3 py-1 rounded-full bg-black/40 dark:bg-white/10  text-white dark:text-neutral-200 text-[10px] md:text-xs font-medium whitespace-nowrap">
          Slide Right
        </div>
      </div>
      <div className="absolute right-2 md:right-4 bottom-2 md:bottom-4 z-20 pointer-events-none transition-opacity duration-300 opacity-0 group-hover/nav:opacity-100">
        <div className="px-3 py-1 rounded-full bg-black/40 dark:bg-white/10  text-white dark:text-neutral-200 text-[10px] md:text-xs font-medium whitespace-nowrap">
          Slide Left
        </div>
      </div>

      {/* Nudge arrow hint */}
      <AnimatePresence>
        {isShowNudgeHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, 0, -10, -10],
              transition: { duration: 2.5, times: [0, 0.2, 0.8, 1], ease: 'easeInOut' },
            }}
            exit={{ opacity: 0 }}
            className="absolute top-[55%] right-4 -translate-y-1/2 z-10 pointer-events-none"
          >
            <ChevronLeft className="w-6 h-6 text-white/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slides */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translateX(calc(${-currentIndex * 100}% + ${
              dragState.isDragging ? dragState.dx : 0
            }px))`,
          }}
        >
          {projects.map((p, i) => (
            <article key={p.title} className="min-w-full min-h-full flex flex-col ">
              {/* Image area — transparent, no inner rounding; outer card clips */}
              <div className="w-full  overflow-hidden rounded-tl-3xl shadow-lg">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full  inset-0 object-cover"
                  loading="lazy"
                  decoding="async"
                  style={{ imageRendering: 'auto' }}
                />
              </div>

              {/* Info panel — transparent, inherit text, no rounding, subtle divider */}
              <div className="flex-shrink-0 p-6 md:p-8 text-neutral-900 dark:text-neutral-100 bg-neutral-100/80 dark:bg-neutral-800/80 border-black/5 dark:border-white/10 backdrop-blur-lg rounded-b-3xl shadow-sm transition-colors duration-300">
                <div className="flex items-start justify-between mb-3 gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-1">
                      {p.title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {p.year}
                    </span>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-shrink-0 text-xs text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group bg-black/10 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium whitespace-nowrap"
                  >
                    View Project <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed max-w-2xl">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {Array.isArray(p.platforms) && p.platforms.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-black/5 dark:border-white/10">
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mr-1">
                      Platforms:
                    </span>

                    {p.platforms.map((raw) => {
                      const key = String(raw).toLowerCase();
                      const entry = platformIcons[key];
                      const Icon = entry?.Icon || Globe; // <- fallback to Globe
                      const label = entry?.label || raw;

                      return (
                        <div
                          key={raw}
                          className="flex items-center justify-center p-1.5 bg-black/5 dark:bg-white/5 rounded-md cursor-default"
                          onMouseEnter={(e) => handlePlatformMouseEnter(e, label)}
                          onMouseMove={handlePlatformMouseMove}
                          onMouseLeave={handlePlatformMouseLeave}
                          onTouchStart={(e) =>
                            setPlatformPopover({
                              isVisible: true,
                              content: label,
                              x: e.touches[0].clientX,
                              y: e.touches[0].clientY,
                            })
                          }
                          onTouchEnd={() =>
                            setPlatformPopover((pp) => ({ ...pp, isVisible: false }))
                          }
                        >
                          <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-center items-center gap-4 mt-4">
                  <span className="text-xs">
                    {i + 1} / {projects.length}
                  </span>
                  <button
                    onClick={() => setIsShowAll(true)}
                    className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    aria-label="Show all projects"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Overview Modal */}
      <AnimatePresence>
        {isShowAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsShowAll(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-4 md:p-6"
            >
              <h3 className="text-lg font-medium mb-6 text-center">All Projects</h3>
              <button
                onClick={() => setIsShowAll(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Close project overview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {projects.map((project, index) => (
                  <button
                    key={project.title}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsShowAll(false);
                    }}
                    className={`relative group block w-full aspect-square rounded-lg overflow-hidden ${
                      currentIndex === index ? 'ring-2 ring-sky-500' : ''
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <h4 className="text-xs font-medium text-white truncate">{project.title}</h4>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating platform popover */}
      <Popover
        isVisible={platformPopover.isVisible}
        content={platformPopover.content}
        x={platformPopover.x}
        y={platformPopover.y}
      />
    </div>
  );
}
