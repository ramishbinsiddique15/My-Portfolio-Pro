import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { Code, ChevronLeft, Terminal, Globe, Database, Cpu } from 'lucide-react';
import { fypProject, productionApps, completeApps, smallProjects } from '../data/projects';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

const ArchiveCard = ({ p, i }) => {
  const boundingRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseEnter = useCallback((e) => {
    boundingRef.current = e.currentTarget.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!boundingRef.current) return;
    const { left, top, width, height } = boundingRef.current;
    const xPct = (e.clientX - left - width / 2) / (width / 2);
    const yPct = (e.clientY - top - height / 2) / (height / 2);
    x.set(xPct * 8);
    y.set(yPct * 8);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    boundingRef.current = null;
  }, [x, y]);

  return (
    <motion.div variants={itemVariants} className="perspective-1000">
      <motion.article
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: useMotionTemplate`${mouseYSpring}deg`,
          rotateY: useMotionTemplate`${mouseXSpring}deg`,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}

        className="group/card relative p-8 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm hover:bg-zinc-50 hover:border-zinc-50 transition-colors duration-700 flex flex-col justify-between aspect-square overflow-hidden shadow-xl cursor-crosshair"
      >
        {}
        <span className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {}
        <span
          style={{ transform: "translateZ(30px)" }}
          className="absolute top-4 right-6 text-5xl font-black text-zinc-900 group-hover/card:text-zinc-200 transition-colors duration-700 pointer-events-none drop-shadow-lg"
        >
          {String(i + 1).padStart(2, '0')}
        </span>

        <div className="relative z-10 pointer-events-none" style={{ transform: "translateZ(40px)" }}>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-500 group-hover/card:text-zinc-500 mb-4 block transition-colors duration-500">
            {p.command || 'exec_binary'}
          </span>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-50 group-hover/card:text-zinc-950 transition-colors duration-500 mb-4">
            {p.title}
          </h3>
          <p className="text-sm text-zinc-400 group-hover/card:text-zinc-600 transition-colors duration-500 leading-relaxed line-clamp-3 font-medium">
            {p.description}
          </p>
        </div>

        {}
        <div
          className="relative z-10 pt-8 border-t border-zinc-800 group-hover/card:border-zinc-300 transition-all duration-700"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="text-[10px] font-mono text-zinc-500 group-hover/card:text-zinc-500 mb-4 truncate tracking-widest font-bold">
              {p.techStack?.join(' · ')}
          </div>

          <div className="flex gap-4 pointer-events-auto">
            {p.liveDemo && (
              <a
                href={p.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-800 group-hover/card:border-zinc-300 flex items-center justify-center text-zinc-500 group-hover/card:text-zinc-950 hover:!bg-zinc-950 hover:!text-zinc-50 transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-800 group-hover/card:border-zinc-300 flex items-center justify-center text-zinc-500 group-hover/card:text-zinc-950 hover:!bg-zinc-950 hover:!text-zinc-50 transition-all duration-300"
              >
                <Code className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

const ProjectSector = ({ title, icon: Icon, projects, label }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="mb-24 relative z-10">
      <div className="flex items-center gap-4 mb-10 border-b border-zinc-900 pb-6">
        <div className="p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg text-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-100">{title}</h2>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] mt-1">{label}</p>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((p, i) => (
          <ArchiveCard key={i} p={p} i={i} />
        ))}
      </motion.div>
    </div>
  );
};

const ProjectsArchive = () => {

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleGlobalMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Projects | Ramish Bin Siddique';
  }, []);

  return (
    <main
      onMouseMove={handleGlobalMouseMove}
      className="min-h-screen bg-zinc-950 text-zinc-50 pt-32 pb-20 px-6 md:px-12 relative overflow-hidden group"
    >
      {}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ transform: 'translateZ(0)' }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
        }} />
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(99, 102, 241, 0.05),
                transparent 80%
              )
            `,
            willChange: "background",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            {}
            <div className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-full text-indigo-500 font-mono text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.05)]">
              <Terminal className="w-4 h-4" />
                <span>System</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none text-zinc-50">
              DIRECTORY<br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800" style={{ WebkitTextStroke: '1px #fafafa' }}>.LOG</span>
            </h1>
          </div>

          <Link
            to="/"
            className="group/btn relative flex items-center gap-3 px-6 py-3 border border-zinc-800 bg-zinc-950/80 backdrop-blur-md hover:border-zinc-50 overflow-hidden transition-colors duration-500 cursor-crosshair"
          >
            <span className="absolute inset-0 bg-zinc-50 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out -z-10" />
            <ChevronLeft className="w-4 h-4 text-indigo-500 group-hover/btn:text-zinc-950 transition-colors" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold group-hover/btn:text-zinc-950 transition-colors">Terminate Session</span>
          </Link>
        </header>

        <ProjectSector
          title="Flagship Architecture"
          label="Sector_01"
          icon={Cpu}
          projects={fypProject}
        />

        <ProjectSector
          title="Production Systems"
          label="Sector_02"
          icon={Globe}
          projects={productionApps}
        />

        <ProjectSector
          title="Engineered Apps"
          label="Sector_03"
          icon={Database}
          projects={completeApps}
        />

        <ProjectSector
          title="Technical Labs"
          label="Sector_04"
          icon={Terminal}
          projects={smallProjects}
        />
      </div>

      <footer className="mt-40 border-t border-zinc-900 pt-10 text-center opacity-30 relative z-10">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[1em]">
          End of Directory Transmission
        </span>
      </footer>
    </main>
  );
};

export default ProjectsArchive;