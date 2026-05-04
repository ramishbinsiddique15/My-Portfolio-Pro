import React, { useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { Terminal, FileText, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// 3D Magnetic Wrapper
const MagneticElement = ({ children, className, tiltMax = 8 }) => {
  const boundingRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    if (!boundingRef.current) return;
    const { left, top, width, height } = boundingRef.current;
    const xPct = (e.clientX - left - width / 2) / (width / 2);
    const yPct = (e.clientY - top - height / 2) / (height / 2);
    x.set(xPct * tiltMax);
    y.set(yPct * tiltMax);
  }, [x, y, tiltMax]);

  return (
    <motion.div
      onMouseEnter={(e) => (boundingRef.current = e.currentTarget.getBoundingClientRect())}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); boundingRef.current = null; }}
      style={{ rotateX: useMotionTemplate`${mouseYSpring}deg`, rotateY: useMotionTemplate`${mouseXSpring}deg`, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Logs = () => {
  useEffect(() => {
    document.title = 'Transmission Logs | Ramish Bin Siddique';
  }, []);
  
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleGlobalMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  const transmissions = [
    {
      id: "LOG_042",
      title: "Optimizing Multi-Tier YOLO Architectures",
      date: "2026.05.12",
      readTime: "8 MIN READ",
      tags: ["AI", "PYTHON", "REACT"],
      excerpt: "A deep dive into bridging the gap between Python-based object detection models and real-time JavaScript telemetry for NextGen Traffic."
    },
    {
      id: "LOG_041",
      title: "State Management in Highly Scalable MERN Apps",
      date: "2026.04.28",
      readTime: "5 MIN READ",
      tags: ["REACT", "REDUX", "NODE"],
      excerpt: "Why standard context APIs fail under load, and how to architect predictable state layers for production-grade enterprise software."
    },
    {
      id: "LOG_040",
      title: "Designing the Cyber-Spatial Interface",
      date: "2026.04.10",
      readTime: "12 MIN READ",
      tags: ["UI/UX", "FRAMER", "TAILWIND"],
      excerpt: "Breaking down the mathematics and Framer Motion physics required to build hardware-accelerated 3D user interfaces on the web."
    }
  ];

  return (
    <main ref={sectionRef} onMouseMove={handleGlobalMouseMove} className="min-h-screen bg-zinc-950 text-zinc-50 pt-32 pb-20 px-6 md:px-12 relative overflow-hidden group">
      
      {/* Background Grid & Spotlight */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)', backgroundSize: '4rem 4rem', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)' }} />
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.05), transparent 80%)` }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-24">
          <div className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-full text-indigo-500 font-mono text-[10px] uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            <span>System // Root // Logs</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-zinc-50 break-words overflow-wrap-break-word">
            TRANS<br className="md:hidden"/>MISSION<span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800" style={{ WebkitTextStroke: '1px #fafafa' }}>_LOGS</span>
          </h1>
          <p className="mt-8 text-zinc-500 font-mono text-sm max-w-md uppercase tracking-widest">Post-mortems, architecture breakdowns, and engineering philosophy.</p>
        </header>

        <div className="space-y-6 perspective-1000">
          {transmissions.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <MagneticElement tiltMax={4}>
                <Link to={`/logs/${log.id}`} className="group/log block w-full relative p-8 md:p-10 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm hover:bg-zinc-50 transition-colors duration-700 overflow-hidden shadow-xl cursor-crosshair">
                  <span className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/log:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-zinc-800 group-hover/log:border-zinc-300 pb-6 transition-colors duration-700">
                      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-500 group-hover/log:text-indigo-600">
                        <span className="px-3 py-1 border border-indigo-500/30 rounded-full">{log.id}</span>
                        <span>{log.date}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 group-hover/log:text-zinc-500">
                        <Clock className="w-3 h-3" />
                        <span>{log.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-50 group-hover/log:text-zinc-950 mb-4 transition-colors duration-700">
                      {log.title}
                    </h2>
                    
                    <p className="text-zinc-400 group-hover/log:text-zinc-600 font-medium leading-relaxed max-w-2xl mb-8 transition-colors duration-700">
                      {log.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover/log:text-zinc-400">
                        {log.tags.map(tag => <span key={tag}>// {tag}</span>)}
                      </div>
                      <div className="w-10 h-10 rounded-full border border-zinc-800 group-hover/log:border-zinc-950 flex items-center justify-center text-zinc-500 group-hover/log:bg-zinc-950 group-hover/log:text-zinc-50 transition-all duration-500 group-hover/log:scale-110">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </MagneticElement>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Logs;