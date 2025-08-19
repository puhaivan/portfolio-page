// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const ThemeSwitcher = function ({ theme, setTheme, setPopover }) {
  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 group">
        <button
          onClick={() => {
            setTheme((prev) =>
              prev === 'light' ? 'dark' : prev === 'dark' ? 'immersive' : 'light'
            );
          }}
          onMouseEnter={(e) => {
            setPopover({
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
            setPopover((prev) => ({
              ...prev,
              x: e.clientX,
              y: e.clientY,
            }));
          }}
          onMouseLeave={() => setPopover((prev) => ({ ...prev, isVisible: false }))}
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
              key={theme}
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
    </>
  );
};

export default ThemeSwitcher;
