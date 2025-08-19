import avatar from '/images/avatar.png';

const ProfileInfo = function ({ setPopover }) {
  return (
    <>
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
                    setPopover({
                      isVisible: true,
                      content: 'GitHub',
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                  onMouseMove={(e) =>
                    setPopover((prev) => ({
                      ...prev,
                      x: e.clientX,
                      y: e.clientY,
                    }))
                  }
                  onMouseLeave={() => setPopover((prev) => ({ ...prev, isVisible: false }))}
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

                <a
                  href="https://linkedin.com/in/ivan-puga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 wiggle text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 hover:text-black dark:hover:text-white immersive:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black immersive:focus-visible:ring-offset-black rounded-lg"
                  aria-label="LinkedIn"
                  tabIndex="0"
                  onMouseEnter={(e) =>
                    setPopover({
                      isVisible: true,
                      content: 'LinkedIn',
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                  onMouseMove={(e) =>
                    setPopover((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))
                  }
                  onMouseLeave={() => setPopover((prev) => ({ ...prev, isVisible: false }))}
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

                <a
                  href="mailto:unsaightly@gmail.com"
                  className="p-1.5 wiggle text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 hover:text-black dark:hover:text-white immersive:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black immersive:focus-visible:ring-offset-black rounded-lg"
                  aria-label="Email"
                  tabIndex="0"
                  onMouseEnter={(e) =>
                    setPopover({
                      isVisible: true,
                      content: 'Email',
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                  onMouseMove={(e) =>
                    setPopover((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))
                  }
                  onMouseLeave={() => setPopover((prev) => ({ ...prev, isVisible: false }))}
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

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Ivan_Puha_Resume.pdf"
                  className="p-1.5 wiggle text-neutral-500 dark:text-neutral-400 immersive:text-neutral-400 hover:text-black dark:hover:text-white immersive:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black immersive:focus-visible:ring-offset-black rounded-lg"
                  aria-label="Resume"
                  tabIndex="0"
                  onMouseEnter={(e) =>
                    setPopover({
                      isVisible: true,
                      content: 'Resume',
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                  onMouseMove={(e) =>
                    setPopover((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))
                  }
                  onMouseLeave={() => setPopover((prev) => ({ ...prev, isVisible: false }))}
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
    </>
  );
};

export default ProfileInfo;
