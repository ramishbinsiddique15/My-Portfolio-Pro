import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';

const Loader = () => {
  const [counter, setCounter] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const { isAppLoaded, setAppLoaded } = useUIStore();

const bootLogs = [
    "INITIALIZING_VITE_BUNDLER...",
    "MOUNTING_REACT_DOM...",
    "ESTABLISHING_EXPRESS_ROUTES...",
    "CONNECTING_MONGODB_ATLAS...",
    "HYDRATING_UI_COMPONENTS...",
    "COMPILING_TAILWIND_STYLES...",
    "OPTIMIZING_ASSETS...",
    "SERVER_READY_FOR_TRAFFIC."
  ];

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 4) + 1;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => setAppLoaded(true), 900);
      }
      setCounter(count);

      const newLogIndex = Math.floor((count / 100) * bootLogs.length);
      if (newLogIndex < bootLogs.length) {
        setLogIndex(newLogIndex);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [setAppLoaded]);

  const shutterVariants = {
    initial: { y: "0%" },
    exit: (i) => ({
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
    })
  };

  return (
    <AnimatePresence>
      {!isAppLoaded && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, transition: { duration: 0, delay: 1.2 } }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 flex w-full h-full z-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={shutterVariants}
                initial="initial"
                exit="exit"
                className="relative w-1/4 h-full bg-zinc-950 dark:bg-zinc-50 border-r border-white/5 dark:border-black/5"
              />
            ))}
          </div>

          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 z-10"
          >
            <div className="w-full h-full bg-grid-pattern animate-pan" />
          </motion.div>

          <motion.div
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.6, ease: "easeInOut" } }}
            className="absolute z-20 flex flex-col w-full h-full px-8 py-12 text-zinc-50 dark:text-zinc-950"
          >
            <div className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col gap-1 font-mono text-[10px] md:text-xs tracking-widest uppercase opacity-70">
              <div className="flex items-center gap-2 mb-2 text-indigo-400 dark:text-indigo-600">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span>Localhost Active</span>
              </div>
              {bootLogs.slice(0, logIndex + 1).map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === logIndex ? "text-zinc-50 dark:text-zinc-900 font-bold" : "text-zinc-500"}
                >
                  &gt; {log}
                </motion.div>
              ))}
            </div>

            <div className="absolute top-8 right-8 md:top-12 md:right-12 font-mono text-[10px] md:text-xs text-right uppercase tracking-widest opacity-50">
              <p>LAT: 33.5984° N</p>
              <p>LNG: 73.0441° E</p>
              <p>PORT: 5173</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              <div className="relative w-full max-w-[95vw] mx-auto text-center overflow-hidden">
                <motion.h1
                  initial={{ y: "100%", opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  className="text-[clamp(1.5rem,5vw,8rem)] font-black tracking-tighter uppercase whitespace-nowrap"
                  style={{ perspective: "1000px" }}
                >
                  Ramish Bin Siddique
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, tracking: "0em" }}
                  animate={{ opacity: 0.5, tracking: "0.5em" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="mt-2 text-xs md:text-sm font-mono uppercase"
                >
                  Full-Stack Web Development
                </motion.p>
              </div>

              <div className="flex flex-col items-center gap-4 mt-8">
                <div className="text-4xl md:text-6xl font-black font-mono tracking-tighter w-32 text-center">
                  {counter.toString().padStart(3, '0')}
                  <span className="text-xl md:text-3xl text-zinc-600">.JS</span>
                </div>

                <div className="flex gap-1 md:gap-2">
                  {[...Array(10)].map((_, i) => {
                    const threshold = (i + 1) * 10;
                    const isActive = counter >= threshold;
                    return (
                      <div
                        key={i}
                        className={`w-6 h-2 md:w-12 md:h-3 transition-colors duration-200 ${
                          isActive
                            ? 'bg-zinc-50 dark:bg-zinc-950 shadow-[0_0_10px_rgba(255,255,255,0.5)] dark:shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                            : 'bg-zinc-800 dark:bg-zinc-300'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;