import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { Terminal, Server, Layers, Cpu, Zap, ArrowRight } from 'lucide-react';

// 3D Magnetic Wrapper
const MagneticElement = ({ children, className, tiltMax = 5 }) => {
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

const Capabilities = () => {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleGlobalMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  const capabilities = [
    {
      id: "01",
      title: "Frontend Architecture",
      icon: Layers,
      description: "Developing hyper-responsive, fluid user interfaces. Utilizing React and Next.js to construct complex state-driven environments, paired with Framer Motion for hardware-accelerated kinetic physics.",
      stack: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
      id: "02",
      title: "Backend Systems",
      icon: Server,
      description: "Designing robust, highly-available server topologies. Building secure RESTful APIs and middleware pipelines capable of handling intense data loads with zero bottlenecks.",
      stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth"]
    },
    {
      id: "03",
      title: "AI Integration",
      icon: Cpu,
      description: "Bridging the gap between raw machine learning models and end-user platforms. Specializing in taking Python-based AI engines (like YOLO) and integrating them seamlessly into modern web telemetry.",
      stack: ["Python", "Flask/FastAPI", "Object Detection", "Model Parsing"]
    },
    {
      id: "04",
      title: "Deployment & DevOps",
      icon: Zap,
      description: "Executing smooth transitions from local environments to live production. Managing cloud instances, configuring continuous deployment pipelines, and ensuring SSL-secured, domain-mapped delivery.",
      stack: ["DigitalOcean", "Vercel", "GitHub Actions", "Nginx", "Linux Protocol"]
    }
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
              <span>System // Root // Capabilities</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-zinc-50 break-words overflow-wrap-break-word">
              CAPA<br className="md:hidden"/>BILITIES<span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800" style={{ WebkitTextStroke: '1px #fafafa' }}>_MATRIX</span>
            </h1>
          </div>
          <p className="text-zinc-500 font-mono text-sm max-w-xs uppercase tracking-widest">Core technical competencies and production-grade infrastructure services.</p>
        </header>

        <div className="space-y-8 perspective-1000">
          {capabilities.map((cap, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}>
              <MagneticElement tiltMax={3}>
                <div className="group/cap relative w-full p-8 md:p-12 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm hover:bg-zinc-50 hover:border-zinc-50 transition-colors duration-700 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center overflow-hidden shadow-2xl cursor-crosshair">
                  
                  {/* Background Hover Sweep */}
                  <span className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/cap:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* ID & Icon */}
                  <div className="flex flex-col items-center justify-center shrink-0 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                    <span className="text-6xl md:text-8xl font-black text-zinc-900 group-hover/cap:text-zinc-200 transition-colors duration-700">
                      {cap.id}
                    </span>
                    <cap.icon className="w-8 h-8 text-indigo-500 absolute group-hover/cap:text-zinc-950 transition-colors duration-700" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 relative z-10 pointer-events-none" style={{ transform: "translateZ(40px)" }}>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-50 group-hover/cap:text-zinc-950 mb-4 transition-colors duration-700">
                      {cap.title}
                    </h2>
                    <p className="text-zinc-400 group-hover/cap:text-zinc-600 font-medium leading-relaxed max-w-2xl mb-8 transition-colors duration-700">
                      {cap.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {cap.stack.map(tech => (
                        <span key={tech} className="px-4 py-1.5 border border-zinc-800 group-hover/cap:border-zinc-300 rounded-full font-mono text-[10px] uppercase tracking-widest text-zinc-500 group-hover/cap:text-zinc-500 bg-zinc-900/50 group-hover/cap:bg-white transition-all duration-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Arrow Interaction */}
                  <div className="hidden md:flex items-center justify-center shrink-0 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
                    <div className="w-16 h-16 rounded-full border border-zinc-800 group-hover/cap:border-zinc-950 flex items-center justify-center text-zinc-500 group-hover/cap:bg-zinc-950 group-hover/cap:text-zinc-50 transition-all duration-500 group-hover/cap:scale-110">
                      <ArrowRight className="w-6 h-6" />
                    </div>
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

export default Capabilities;