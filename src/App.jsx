import { useState, useEffect } from 'react';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Html } from '@react-three/drei';

import ProjectSlider from './components/ProjectSlider';
import Popover from './components/Popover';
import GitHubContributions from './components/GitHubStatus';
import CatModel from './components/CatModel';
import ThemeSwitcher from './components/ThemeSwitcher';
import ProfileInfo from './components/ProfileInfo';

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
      <ThemeSwitcher theme={theme} setTheme={setTheme} setPopover={setPlatformPopover} />
      <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-6 h-full">
          <div
            className="col-span-1 lg:col-span-2 flex flex-col gap-4 md:gap-6 overflow-hidden"
            onMouseEnter={onPlatformEnter}
            onMouseLeave={onPlatformLeave}
          >
            <ProfileInfo setPopover={setPlatformPopover} />
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
                          position: [0, 2, 10],
                          fov: 45,
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
                        <Suspense
                          fallback={
                            <Html>
                              <div className="flex items-center justify-center w-full h-full">
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                  Loading model...
                                </span>
                              </div>
                            </Html>
                          }
                        >
                          <CatModel />
                        </Suspense>
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
