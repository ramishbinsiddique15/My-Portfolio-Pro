import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { Terminal, Activity, Zap, ShieldAlert } from 'lucide-react';

// 3D Magnetic Wrapper
const MagneticElement = ({ children, className, tiltMax = 10 }) => {
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

const Lab = () => {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleGlobalMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  // Links removed. These are now strictly display nodes.
  const experiments = [
    { id: "EXP_01", title: "Physics Engine", type: "WebGL / Three.js", icon: Activity, status: "Offline" },
    { id: "EXP_02", title: "Auth Rate Limiter", type: "Node.js / Redis", icon: ShieldAlert, status: "In_Dev" },
    { id: "EXP_03", title: "Kinetic Typography", type: "React / GSAP", icon: Zap, status: "Offline" },
    { id: "EXP_04", title: "Socket Mesh", type: "WebSockets", icon: Activity, status: "Volatile" },
    { id: "EXP_05", title: "Custom Hooks Kit", type: "React", icon: Zap, status: "Offline" },
    { id: "EXP_06", title: "Data Visualizer", type: "D3.js", icon: Activity, status: "In_Dev" },
  ];

  return (
    <main ref={sectionRef} onMouseMove={handleGlobalMouseMove} className="min-h-screen bg-zinc-950 text-zinc-50 pt-32 pb-20 px-6 md:px-12 relative overflow-hidden group">
      
      {/* Background Grid & Spotlight */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)', backgroundSize: '4rem 4rem', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)' }} />
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.05), transparent 80%)` }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-full text-indigo-500 font-mono text-[10px] uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>System // Root // Lab</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-zinc-50 break-words overflow-wrap-break-word">
              EXPERI<br className="md:hidden"/>MENTAL<span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800" style={{ WebkitTextStroke: '1px #fafafa' }}>_NODE</span>
            </h1>
          </div>
          <p className="text-zinc-500 font-mono text-sm max-w-xs uppercase tracking-widest">Isolated micro-services, UI experiments, and volatile code components.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {experiments.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
              <MagneticElement tiltMax={12} className="h-full">
                {/* RESTORED: hover:bg-zinc-50 is back in this class list! */}
                <div className="group/lab relative h-full min-h-[300px] p-8 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm hover:bg-zinc-50 hover:border-zinc-50 transition-colors duration-500 flex flex-col justify-between overflow-hidden shadow-xl cursor-crosshair">
                  
                  {/* Grid overlay for lab feel */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px] pointer-events-none group-hover/lab:opacity-30 transition-opacity" />
                  
                  <div className="relative z-10 flex justify-between items-start pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover/lab:text-zinc-400 transition-colors">
                      {exp.id}
                    </span>
                    {/* Status Badge */}
                    <div className={`px-3 py-1 rounded-full font-mono text-[8px] uppercase tracking-widest border ${
                      exp.status === 'Offline' ? 'border-zinc-500 text-zinc-500 bg-zinc-500/10' : 
                      exp.status === 'In_Dev' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : 
                      'border-red-500 text-red-500 bg-red-500/10'
                    }`}>
                      {exp.status}
                    </div>
                  </div>

                  <div className="relative z-10 pointer-events-none" style={{ transform: "translateZ(40px)" }}>
                    <exp.icon className="w-10 h-10 text-zinc-700 group-hover/lab:text-indigo-500 mb-6 transition-colors duration-500" />
                    <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-50 mb-2 group-hover/lab:text-zinc-950 transition-colors duration-500">
                      {exp.title}
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-widest text-indigo-500/70 group-hover/lab:text-zinc-500 transition-colors duration-500">
                      {exp.type}
                    </p>
                  </div>

                </div>
              </MagneticElement>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Lab;