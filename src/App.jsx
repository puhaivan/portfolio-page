import { useState, useEffect } from 'react';
import avatar from '/images/avatar.png';
import ProjectSlider from './components/ProjectSlider';
import Popover from './components/Popover';
import GitHubContributions from './components/GitHubStatus';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import CatModel from './components/CatModel';

import { onPlatformEnter, onPlatformLeave } from './utils/helper';

const App = function () {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'immersive';
  });

  const [platformPopover, setPlatformPopover] = useState({
    isVisible: false,
    content: '',
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'immersive');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className=" w-full p-4 md:p-6 lg:p-8 overflow-hidden transition-background duration-1000 ease-in-out">
      <div className="fixed bottom-6 left-6 z-50 group">
        <button
          onClick={() => {
            setTheme((prev) =>
              prev === 'light' ? 'dark' : prev === 'dark' ? 'immersive' : 'light'
            );
          }}
          onMouseEnter={(e) => {
            setPlatformPopover({
              isVisible: true,
              content:
                theme === 'light'
                  ? 'Switch to Dark'
                  : theme === 'dark'
                  ? 'Switch to Immersion'
                  : 'Switch to Light',
              x: e.clientX,
              y: e.clientY,
            });
          }}
          onMouseMove={(e) => {
            setPlatformPopover((prev) => ({
              ...prev,
              x: e.clientX,
              y: e.clientY,
            }));
          }}
          onMouseLeave={() => setPlatformPopover((prev) => ({ ...prev, isVisible: false }))}
          className="p-2 w-9 h-9 flex items-center justify-center rounded-full 
 bg-neutral-200/70 immersive:bg-neutral-800/70 dark:bg-neutral-800/70 backdrop-blur-sm 
 border border-black/10 dark:border-white/10 immersive:border-white/10
 text-neutral-700 dark:text-neutral-300 immersive:text-neutral-300
 hover:text-black dark:hover:text-white immersive:hover:text-white
 hover:scale-110 transition-all duration-200 
 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme} // key makes AnimatePresence re-render per theme
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-5"
            >
              {theme === 'light' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sun w-5 h-5"
                >
                  {' '}
                  <circle cx="12" cy="12" r="4" /> <path d="M12 2v2" /> <path d="M12 20v2" />{' '}
                  <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" />{' '}
                  <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" />{' '}
                  <path d="m19.07 4.93-1.41 1.41" />{' '}
                </svg>
              )}{' '}
              {theme === 'dark' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-cat w-5 h-5"
                >
                  {' '}
                  <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />{' '}
                  <path d="M8 14v.5" /> <path d="M16 14v.5" />{' '}
                  <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />{' '}
                </svg>
              )}{' '}
              {theme === 'immersive' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sparkles w-5 h-5"
                >
                  {' '}
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>{' '}
                  <path d="M20 3v4"></path> <path d="M22 5h-4"></path> <path d="M4 17v2"></path>{' '}
                  <path d="M5 18H3"></path>{' '}
                </svg>
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-6 h-full">
          <div
            className="col-span-1 lg:col-span-2 flex flex-col gap-4 md:gap-6 overflow-hidden"
            onMouseEnter={onPlatformEnter}
            onMouseLeave={onPlatformLeave}
          >
            <div className="flex-1 min-h-0">
              <div className="bg-neutral-100/80 dark:bg-[#1D1D1F]/80 immersive:bg-neutral-800/80 border-black/5 dark:border-white/10 immersive:border-white/10 backdrop-blur-lg rounded-3xl shadow-sm transition-colors duration-300 h-full flex flex-col p-6 md:p-8 overflow-hidden text-neutral-900 dark:text-neutral-100 immersive:text-neutral-100">
                <div className="flex-grow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0transition-transform duration-200 hover:scale-105">
                      <img
                        src={avatar}
                        alt="Ivan Puha profile picture"
                        className="absolute inset-0 w-full h-full object-cover text-transparent"
                      />
                    </div>
                    <div>
                      <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white immersive:text-white mb-0.5">
                        Ivan Puha
                      </h1>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 immersive:text-neutral-400">
                        Front-end Developer & Full-stack Developer
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-700 dark:text-neutral-300 immersive:text-neutral-300 leading-relaxed mb-3">
                    Full-stack developer &amp; creative tech enthusiast based in New York, USA.{' '}
                    <strong className="font-medium text-black dark:text-white immersive:text-white">
                      Dedicated to collaborating
                    </strong>{' '}
                    with innovative teams to build interactive, scalable web experiences.
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 immersive:text-neutral-300 leading-relaxed mb-6">
                    Currently developing{' '}
                    <strong className="font-medium text-black dark:text-white immersive:text-white">
                      side projects
                    </strong>{' '}
                    to expand my portfolio and showcase technical creativity. Open to international
                    contract opportunities in{' '}
                    <strong className="font-medium text-black dark:text-white immersive:text-white">
                      North America, Europe, and the UK
                    </strong>
                    . Also, a big fan of cats.
                  </p>
                </div>

                <div className="mt-auto border-t border-black/5 dark:border-white/10 immersive:border-white/10 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                    <div>
                      <h3 className="flex items-center gap-1.5 font-medium text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 mb-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        LOCATION
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-300 immersive:text-neutral-300">
                        🇺🇸 New York, USA
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 text-[11px]">
                        (Open to relocate)
                      </p>
                    </div>
                    <div>
                      <h3 className="flex items-center gap-1.5 font-medium text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 mb-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-languages w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="m5 8 6 6"></path>
                          <path d="m4 14 6-6 2-3"></path>
                          <path d="M2 5h12"></path>
                          <path d="M7 2h1"></path>
                          <path d="m22 22-5-10-5 10"></path>
                          <path d="M14 18h6"></path>
                        </svg>
                        LANGUAGES
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-300 immersive:text-neutral-300">
                        🇬🇧 English (Fluent)
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-300 immersive:text-neutral-300">
                        🇺🇦 Ukrainian (Native)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/5 dark:border-white/10 immersive:border-white/10 pt-4 mb-4">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400">
                      Get in touch:
                    </span>

                    <div className="flex gap-3">
                      <a
                        href="https://github.com/puhaivan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 wiggle text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 hover:text-black dark:hover:text-white immersive:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black immersive:focus-visible:ring-offset-black rounded-lg"
                        aria-label="GitHub"
                        tabIndex="0"
                        onMouseEnter={(e) =>
                          setPlatformPopover({
                            isVisible: true,
                            content: 'GitHub',
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                        onMouseMove={(e) =>
                          setPlatformPopover((prev) => ({
                            ...prev,
                            x: e.clientX,
                            y: e.clientY,
                          }))
                        }
                        onMouseLeave={() =>
                          setPlatformPopover((prev) => ({ ...prev, isVisible: false }))
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-github w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                          <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                      </a>
                      {/* LinkedIn */}
                      <a
                        href="https://linkedin.com/in/ivan-puga"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 wiggle text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 hover:text-black dark:hover:text-white immersive:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black immersive:focus-visible:ring-offset-black rounded-lg"
                        aria-label="LinkedIn"
                        tabIndex="0"
                        onMouseEnter={(e) =>
                          setPlatformPopover({
                            isVisible: true,
                            content: 'LinkedIn',
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                        onMouseMove={(e) =>
                          setPlatformPopover((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))
                        }
                        onMouseLeave={() =>
                          setPlatformPopover((prev) => ({ ...prev, isVisible: false }))
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-linkedin w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      {/* Email */}
                      <a
                        href="mailto:unsaightly@gmail.com"
                        className="p-1.5 wiggle text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 hover:text-black dark:hover:text-white immersive:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black immersive:focus-visible:ring-offset-black rounded-lg"
                        aria-label="Email"
                        tabIndex="0"
                        onMouseEnter={(e) =>
                          setPlatformPopover({
                            isVisible: true,
                            content: 'Email',
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                        onMouseMove={(e) =>
                          setPlatformPopover((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))
                        }
                        onMouseLeave={() =>
                          setPlatformPopover((prev) => ({ ...prev, isVisible: false }))
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-mail w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </a>
                      {/* Resume */}
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download="Ivan_Puha_Resume.pdf"
                        className="p-1.5 wiggle text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 hover:text-black dark:hover:text-white immersive:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black immersive:focus-visible:ring-offset-black rounded-lg"
                        aria-label="Resume"
                        tabIndex="0"
                        onMouseEnter={(e) =>
                          setPlatformPopover({
                            isVisible: true,
                            content: 'Resume',
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                        onMouseMove={(e) =>
                          setPlatformPopover((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))
                        }
                        onMouseLeave={() =>
                          setPlatformPopover((prev) => ({ ...prev, isVisible: false }))
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-download w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-4 grid auto-rows-auto gap-4 md:gap-6">
            <div className="row-span-1 w-full  lg:h-full">
              <div className="bg-neutral-100/80 dark:bg-neutral-800/80 immersive:bg-neutral-800/80 border-black/5 dark:border-white/10 immersive:border-white/10 backdrop-blur-lg rounded-b-3xl shadow-sm transition-colors duration-300 rounded-3xl h-full overflow-hidden !p-0 text-neutral-900 dark:text-neutral-100 immersive:text-neutral-100">
                <ProjectSlider
                  theme={theme}
                  platformPopover={platformPopover}
                  setPlatformPopover={setPlatformPopover}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-1 md:col-span-7 min-h-0 overflow-hidden">
                <div
                  className="bg-neutral-100/80 dark:bg-neutral-800/80 immersive:bg-neutral-800/80 border-black/5 dark:border-white/10 immersive:border-white/10 backdrop-blur-lg rounded-3xl shadow-sm transition-colors duration-300 h-full p-4 md:p-4 flex flex-col text-neutral-900 dark:text-neutral-100 immersive:text-neutral-100"
                  onMouseEnter={onPlatformEnter}
                  onMouseLeave={onPlatformLeave}
                >
                  <GitHubContributions username="puhaivan" />
                </div>
              </div>
              <div className="col-span-1 md:col-span-5 min-h-0 overflow-hidden">
                <div
                  className="bg-neutral-100/80 dark:bg-neutral-800/80 immersive:bg-neutral-800/80 border-black/5 dark:border-white/10 immersive:border-white/10 backdrop-blur-lg rounded-3xl shadow-sm transition-colors duration-300 h-full !p-0 overflow-hidden relative text-neutral-900 dark:text-neutral-100 immersive:text-neutral-100"
                  onMouseEnter={onPlatformEnter}
                  onMouseLeave={onPlatformLeave}
                >
                  <div className="relative w-full h-full overflow-hidden pointer-events-auto touch-auto">
                    <div className="w-full h-full">
                      <Canvas
                        shadows
                        camera={{
                          position: [0, 2, 10], // 🔥 move camera back & a little up
                          fov: 45, // field of view (zoom level)
                        }}
                      >
                        <ambientLight intensity={0.6} />
                        <directionalLight
                          position={[5, 10, 5]}
                          intensity={1}
                          castShadow
                          shadow-mapSize-width={20}
                          shadow-mapSize-height={20}
                          shadow-camera-near={1}
                          shadow-camera-far={20}
                          shadow-camera-left={-5}
                          shadow-camera-right={5}
                          shadow-camera-top={5}
                          shadow-camera-bottom={-5}
                        />
                        <CatModel />
                      </Canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popover
        isVisible={platformPopover.isVisible}
        content={platformPopover.content}
        x={platformPopover.x}
        y={platformPopover.y}
      />
    </div>
  );
};

export default App;
