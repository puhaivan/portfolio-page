import { useEffect, useLayoutEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  LayoutGrid,
  X,
  ChevronLeft,
  Globe,
  Smartphone,
} from 'lucide-react';
import {
  SiGooglechrome,
  SiSafari,
  SiFirefoxbrowser,
  SiApple,
} from 'react-icons/si';
import { FaWindows } from 'react-icons/fa';
import { projects } from '@/utils/constans';
import Popover from './Popover';

export default function ProjectSlider({
  theme,
  platformPopover,
  setPlatformPopover,
}) {
  const platformIcons = {
    web: { Icon: Globe, label: 'Web' },
    ios: { Icon: SiApple, label: 'iOS' },
    android: { Icon: Smartphone, label: 'Android' },
    chrome: { Icon: SiGooglechrome, label: 'Chrome' },
    safari: { Icon: SiSafari, label: 'Safari' },
    firefox: { Icon: SiFirefoxbrowser, label: 'Firefox' },
    desktop: { Icon: FaWindows, label: 'Windows' },
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isShowAll, setIsShowAll] = useState(false);
  const [isShowNudgeHint, setIsShowNudgeHint] = useState(true);

  const articleRef = useRef(null);
  const [measuredH, setMeasuredH] = useState(360);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lockedMinH, setLockedMinH] = useState(null);

  useLayoutEffect(() => {
    if (!articleRef.current) return;
    const el = articleRef.current;

    const update = () => {
      requestAnimationFrame(() => {
        const h = el.scrollHeight || 360;
        if (!isTransitioning) setMeasuredH(Math.ceil(h));
      });
    };

    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();

    return () => ro.disconnect();
  }, [currentIndex, isTransitioning]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      position: 'absolute',
      inset: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      position: 'absolute',
      inset: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    }),
  };

  useEffect(() => {
    if (theme === 'immersive') {
      document.documentElement.setAttribute('data-project', currentIndex);
    }
  }, [theme, currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setIsShowNudgeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const paginate = (dir) => {
    if (articleRef.current) {
      const h = articleRef.current.scrollHeight || measuredH;
      setLockedMinH(Math.ceil(h));
    }
    setIsTransitioning(true);
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + projects.length) % projects.length);
  };

  const handlePlatformMouseEnter = (e, key) => {
    const def = platformIcons[key] || { label: key };
    setPlatformPopover({
      isVisible: true,
      content: def.label,
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handlePlatformMouseMove = (e) =>
    setPlatformPopover((p) => ({ ...p, x: e.clientX, y: e.clientY }));
  const handlePlatformMouseLeave = () =>
    setPlatformPopover((p) => ({ ...p, isVisible: false }));

  const goToIndex = (index) => {
    if (index === currentIndex) {
      setIsShowAll(false);
      return;
    }

    if (articleRef.current) {
      const h = articleRef.current.scrollHeight || measuredH;
      setLockedMinH(Math.ceil(h));
    }

    setIsTransitioning(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsShowAll(false);
  };

  return (
    <div className="relative w-full group/nav overflow-hidden isolate">
      <div className="absolute left-2 md:left-4 bottom-2 md:bottom-4 z-50 opacity-0 group-hover/nav:opacity-100 transition-opacity">
        <button
          onClick={() => paginate(-1)}
          className="px-3 py-1 rounded-full bg-black/40 dark:bg-white/10 immersive:bg-white/10 
                 text-white dark:text-neutral-200 immersive:text-neutral-200 
                 text-[10px] md:text-xs font-medium cursor-pointer"
        >
          Slide Left
        </button>
      </div>
      <div className="absolute right-2 md:right-4 bottom-2 md:bottom-4 z-50 opacity-0 group-hover/nav:opacity-100 transition-opacity">
        <button
          onClick={() => paginate(1)}
          className="px-3 py-1 rounded-full bg-black/40 dark:bg-white/10 immersive:bg-white/10 
                 text-white dark:text-neutral-200 immersive:text-neutral-200 
                 text-[10px] md:text-xs font-medium cursor-pointer"
        >
          Slide Right
        </button>
      </div>

      <AnimatePresence>
        {isShowNudgeHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, 0, -10, -10],
              transition: {
                duration: 2.5,
                times: [0, 0.2, 0.8, 1],
                ease: 'easeInOut',
              },
            }}
            exit={{ opacity: 0 }}
            className="absolute top-[55%] right-4 -translate-y-1/2 z-40 pointer-events-none"
          >
            <ChevronLeft className="w-6 h-6 dark:text-white/60 immersive:text-white/60 text-black/60" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full" style={{ overflow: 'hidden' }}>
        <div
          aria-hidden
          className="w-full"
          style={{
            height: isTransitioning ? (lockedMinH ?? measuredH) : measuredH,
          }}
        />
        <div className="absolute inset-0">
          <AnimatePresence
            custom={direction}
            initial={false}
            mode="wait"
            onExitComplete={() => {
              if (articleRef.current) {
                const h = articleRef.current.scrollHeight || measuredH;
                setMeasuredH(Math.ceil(h));
              }
              setIsTransitioning(false);
              setLockedMinH(null);
            }}
          >
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              whileDrag={{ scale: 0.97, opacity: 0.85 }}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x + velocity.x * 0.5;
                if (swipe < -100) paginate(1);
                else if (swipe > 100) paginate(-1);
              }}
              className="w-full cursor-grab active:cursor-grabbing z-10"
            >
              <motion.article ref={articleRef} className="w-full flex flex-col">
                <div className="w-full h-[120px] sm:h-[120px] md:h-[160px] lg:h-[200px] overflow-hidden rounded-t-3xl shadow-lg flex items-center justify-center bg-black">
                  <img
                    src={projects[currentIndex].image}
                    alt={projects[currentIndex].title}
                    className="w-full h-full object-cover rounded-t-3xl"
                    draggable={false}
                    onLoad={() => {
                      if (articleRef.current) {
                        const h = articleRef.current.scrollHeight || measuredH;
                        setMeasuredH(Math.ceil(h));
                      }
                    }}
                  />
                </div>

                <div className="flex-shrink-0 p-6 md:p-8 text-neutral-900 dark:text-neutral-100 immersive:text-neutral-100 bg-neutral-100/80 dark:bg-neutral-900/50 immersive:bg-neutral-800/80 border-black/5 dark:border-white/10 immersive:border-white/10 backdrop-blur-lg rounded-b-3xl shadow-sm transition-colors duration-300">
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-1">
                        {projects[currentIndex].title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 immersive:bg-white/10 backdrop-blur-sm font-medium text-neutral-600 dark:text-neutral-400 immersive:text-neutral-400">
                        {projects[currentIndex].year}
                      </span>
                    </div>
                    <a
                      href={projects[currentIndex].url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-shrink-0 text-xs text-neutral-700 dark:text-neutral-300 immersive:text-neutral-300 hover:text-black dark:hover:text-white immersive:hover:text-white transition-colors flex items-center gap-1 group bg-black/10 dark:bg-white/10 immersive:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium whitespace-nowrap"
                    >
                      View Project
                      <ArrowUpRight className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
                    </a>
                  </div>

                  <p className="text-sm text-neutral-700 dark:text-neutral-300 immersive:text-neutral-300 mb-4 leading-relaxed max-w-2xl">
                    {projects[currentIndex].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {projects[currentIndex].tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-black/10 dark:bg-white/10 immersive:bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400 immersive:text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {Array.isArray(projects[currentIndex].platforms) &&
                    projects[currentIndex].platforms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-black/5 dark:border-white/10 immersive:border-white/10">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 mr-1">
                          Platforms:
                        </span>
                        {projects[currentIndex].platforms.map((raw) => {
                          const key = String(raw).toLowerCase();
                          const entry = platformIcons[key];
                          const Icon = entry?.Icon || Globe;

                          return (
                            <div
                              key={raw}
                              className="flex items-center justify-center p-1.5 bg-black/5 dark:bg-white/5 immersive:bg-white/5 rounded-md cursor-default"
                              onMouseEnter={(e) =>
                                handlePlatformMouseEnter(e, key)
                              }
                              onMouseMove={handlePlatformMouseMove}
                              onMouseLeave={handlePlatformMouseLeave}
                              data-stopdrag
                            >
                              <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300 immersive:text-neutral-300" />
                            </div>
                          );
                        })}
                      </div>
                    )}

                  <div className="flex justify-center items-center gap-4 mt-4">
                    <span className="text-xs">
                      {currentIndex + 1} / {projects.length}
                    </span>
                    <button
                      onClick={() => setIsShowAll(true)}
                      className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 immersive:hover:bg-white/10 cursor-pointer"
                      aria-label="Show all projects"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isShowAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsShowAll(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-neutral-800 immersive:bg-neutral-800 rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-4 md:p-6"
            >
              <h3 className="text-lg font-medium mb-6 text-center">
                All Projects
              </h3>
              <button
                onClick={() => setIsShowAll(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full cursor-pointer text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 immersive:hover:bg-neutral-700 transition-colors"
                aria-label="Close project overview"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {projects.map((project, index) => (
                  <button
                    key={project.title}
                    onClick={() => goToIndex(index)}
                    className={`relative group block w-full aspect-square rounded-lg overflow-hidden hover:scale-[1.02] cursor-pointer ${
                      currentIndex === index ? 'ring-2 ring-sky-500' : ''
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <h4 className="text-xs font-medium text-white truncate">
                        {project.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Popover
        isVisible={platformPopover.isVisible}
        content={platformPopover.content}
        x={platformPopover.x}
        y={platformPopover.y}
      />
    </div>
  );
}
