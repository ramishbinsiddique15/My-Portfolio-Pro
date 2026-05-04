import React, { useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { Terminal, Activity, Crosshair, Binary, Dumbbell } from 'lucide-react';

const MagneticElement = ({ children, className, tiltMax = 6 }) => {
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

const Identity = () => {
  useEffect(() => {
    document.title = 'Identity | Ramish Bin Siddique';
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

  return (
    <main ref={sectionRef} onMouseMove={handleGlobalMouseMove} className="min-h-screen bg-zinc-950 text-zinc-50 pt-32 pb-20 px-6 md:px-12 relative overflow-hidden group">

      {}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)', backgroundSize: '4rem 4rem', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)' }} />
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.05), transparent 80%)` }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-full text-indigo-500 font-mono text-[10px] uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>System</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-zinc-50">
              OPERAT<br className="md:hidden"/>IONAL<span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800" style={{ WebkitTextStroke: '1px #fafafa' }}>_LOGIC</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start perspective-1000">

          {}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <MagneticElement tiltMax={8}>
              <div className="p-8 border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-2xl cursor-crosshair group/stat hover:bg-zinc-50 transition-colors duration-700">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 group-hover/stat:bg-indigo-500/20 transition-colors">
                  <Binary className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-black uppercase text-zinc-50 group-hover/stat:text-zinc-950 mb-2 transition-colors duration-700">The Architect</h3>
                <p className="font-mono text-xs text-zinc-500 leading-relaxed uppercase tracking-widest group-hover/stat:text-zinc-600 transition-colors duration-700">
                  Ramish Bin Siddique, 25.<br/>
                  7th Semester CS, UET Taxila.<br/>
                  Based in Rawalpindi, PK.
                </p>
              </div>
            </MagneticElement>

            <MagneticElement tiltMax={8}>
              <div className="p-8 border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-2xl cursor-crosshair group/stat hover:bg-zinc-50 transition-colors duration-700">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 group-hover/stat:bg-indigo-500/20 transition-colors">
                  <Activity className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-black uppercase text-zinc-50 group-hover/stat:text-zinc-950 mb-2 transition-colors duration-700">The Aesthetic</h3>
                <p className="font-mono text-xs text-zinc-500 leading-relaxed uppercase tracking-widest group-hover/stat:text-zinc-600 transition-colors duration-700">
                  Cyberpunk / Dark-Mode.<br/>
                  High-contrast geometry.<br/>
                  Hardware-accelerated motion.
                </p>
              </div>
            </MagneticElement>
          </div>

          {}
          <div className="lg:col-span-8 space-y-12">

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <MagneticElement tiltMax={4}>
                <div className="p-10 md:p-14 border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-2xl cursor-crosshair group/phil hover:bg-zinc-50 transition-colors duration-700">
                  <div className="flex items-center gap-4 mb-8">
                    <Crosshair className="w-6 h-6 text-indigo-500" />
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-50 group-hover/phil:text-zinc-950 transition-colors duration-700">Systems over Syntax</h2>
                  </div>
                  <div className="space-y-6 text-zinc-400 group-hover/phil:text-zinc-600 font-medium leading-relaxed md:text-lg transition-colors duration-700">
                    <p>
                      I don't just write code; I engineer systems. As a Full-Stack MERN developer, I view every application as a living architecture. From the depth of the MongoDB aggregation pipelines to the real-time client state in React, every layer must communicate flawlessly.
                    </p>
                    <p>
                      My current focus lies at the intersection of web platforms and Artificial Intelligence. Bridging robust Python detection models (like YOLO) into highly scalable JavaScript environments requires a mindset focused on optimization, latency reduction, and structural integrity.
                    </p>
                  </div>
                </div>
              </MagneticElement>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <MagneticElement tiltMax={4}>
                <div className="p-10 md:p-14 border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-2xl cursor-crosshair group/phil hover:bg-zinc-50 transition-colors duration-700 relative overflow-hidden">

                  {}
                  <div className="absolute -bottom-10 -right-10 opacity-10 group-hover/phil:opacity-5 transition-opacity">
                    <Activity className="w-64 h-64 text-indigo-500" />
                  </div>

                  <div className="relative z-10 pointer-events-none">
                    <div className="flex items-center gap-4 mb-8">
                      <Terminal className="w-6 h-6 text-indigo-500" />
                      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-50 group-hover/phil:text-zinc-950 transition-colors duration-700">The Hardware Protocol</h2>
                    </div>
                    <div className="space-y-6 text-zinc-400 group-hover/phil:text-zinc-600 font-medium leading-relaxed md:text-lg transition-colors duration-700">
                      <p>
                        High-performance engineering extends beyond the IDE. I approach digital architecture with the exact same discipline required for physical training.
                      </p>
                      <p>
                        Operating on a structured 6-day muscle split has taught me the mechanics of progressive overload. Just as a scalable server must balance intense traffic loads with proper caching, a physical training regimen demands deliberate recovery. By intentionally structuring my protocol—such as isolating leg training to once per week—I optimize for long-term consistency over short-term burnout.
                      </p>
                      <p className="text-indigo-400 group-hover/phil:text-indigo-600 font-mono text-sm tracking-widest mt-4">

                      </p>
                    </div>
                  </div>

                </div>
              </MagneticElement>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Identity;