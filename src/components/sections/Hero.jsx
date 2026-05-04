import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Hero = () => {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-svh flex flex-col items-center justify-center px-4 overflow-hidden pt-20 bg-zinc-950 text-zinc-50 group"
    >
      {}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
        }} />
      </div>

      {}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      {}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] blur-[140px] rounded-full bg-indigo-900/20 pointer-events-none z-0" />

      <div className="relative z-20 flex flex-col items-center w-full max-w-[1200px] text-center">

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 mt-4 flex items-center justify-center gap-3 px-5 py-2.5 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-full text-indigo-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.05)]"
        >
          <Terminal className="w-4 h-4" />
          <span>Process</span>
          <span className="text-zinc-700 mx-1">|</span>
          <span className="flex items-center gap-2 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-indigo-500"></span>
            Rawalpindi • MERN Architect
          </span>
        </motion.div>

        {}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[12vw] md:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter text-zinc-50"
        >
          ENGINEERING
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[12vw] md:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800"
          style={{ WebkitTextStroke: '1px #fafafa' }}
        >
          HIGH-PERFORMANCE
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[12vw] md:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter text-zinc-50"
        >
          WEB PLATFORMS
        </motion.h1>

        {}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 text-base md:text-lg font-medium max-w-2xl text-zinc-400 leading-relaxed font-mono"
        >
          <span className="text-indigo-500 mr-2">{`>`}</span>
          I build high-performance web applications from the ground up.
          Specializing in the MERN stack—MongoDB, Express, React, and Node.js—to deliver scalable digital experiences.
        </motion.p>
      </div>

      {}
      <div className="absolute bottom-8 flex flex-col items-center gap-3">
        <div className="w-[1px] h-16 bg-zinc-900 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
        <span className="font-mono text-[9px] text-zinc-600 tracking-[0.3em] uppercase">Scroll_Sequence</span>
      </div>
    </section>
  );
};

export default Hero;