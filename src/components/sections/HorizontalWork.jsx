import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { allProjects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
  const boundingRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const handleMouseEnter = useCallback((e) => {
    boundingRef.current = e.currentTarget.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!boundingRef.current) return;
    const { left, top, width, height } = boundingRef.current;
    const xPct = (e.clientX - left - width / 2) / (width / 2);
    const yPct = (e.clientY - top - height / 2) / (height / 2);
    x.set(xPct * 4);
    y.set(yPct * 4);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    boundingRef.current = null;
  }, [x, y]);

  return (
    <div className="h-screen w-screen flex items-center justify-center p-6 md:p-20 perspective-1000">
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: useMotionTemplate`${mouseYSpring}deg`,
          rotateY: useMotionTemplate`${mouseXSpring}deg`,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}

        className="group/card w-full h-[85vh] md:h-full relative border border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex flex-col justify-between p-8 md:p-16 hover:bg-zinc-50 hover:text-zinc-900 transition-colors duration-700 shadow-2xl cursor-crosshair overflow-hidden"
      >
        {}
        <span
          style={{ transform: "translateZ(20px)" }}
          className="absolute -left-6 -top-8 text-[7rem] md:text-[10rem] leading-[0.85] font-black opacity-20 text-zinc-50 pointer-events-none select-none transition-all duration-700 group-hover/card:opacity-20 group-hover/card:text-zinc-900"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
          {}
          <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 border border-zinc-800 bg-zinc-950 rounded-full text-indigo-500 font-mono text-[10px] uppercase tracking-widest transition-colors duration-700 group-hover/card:bg-zinc-100 group-hover/card:border-zinc-300">
            <Terminal className="w-3 h-3 group-hover/card:text-zinc-900" />
            <span className="group-hover/card:text-zinc-900 transition-colors duration-700">Payload</span>
          </div>

          <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 drop-shadow-lg group-hover/card:drop-shadow-none transition-all duration-700">
            {project.title}
          </h3>
          <p className="text-lg md:text-2xl font-medium max-w-xl text-zinc-400 group-hover/card:text-zinc-600 transition-colors duration-700">
            {project.description}
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6" style={{ transform: "translateZ(30px)" }}>
          <span className="font-mono uppercase tracking-widest text-xs md:text-sm text-indigo-400 group-hover/card:text-zinc-500 transition-colors duration-700">
            {project.techStack?.join(' · ')}
          </span>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-current flex items-center justify-center group-hover/card:bg-zinc-950 group-hover/card:text-zinc-50 transition-all duration-500 hover:scale-110">
            <span className="text-xl md:text-2xl group-hover/card:rotate-45 transition-transform duration-500">→</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HorizontalWork = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleGlobalMouseMove = useCallback((e) => {

    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const highlightTitles = [
    'NextGen Traffic',
    'ASCND Dashboard',
    'Uber Clone',
  ];

  const projects = useMemo(() => {
    return highlightTitles.map((t) => allProjects.find((p) => p.title === t)).filter(Boolean);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current) return;

    const totalSlides = projects.length + 1;
    const distance = `-${(totalSlides - 1) * 100}vw`;

let ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: distance,
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: () => `+=${totalSlides * 1000}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section
      onMouseMove={handleGlobalMouseMove}
      className="overflow-hidden bg-zinc-950 transition-colors duration-700 relative group"
    >
      {}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
        }} />
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-screen"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(99, 102, 241, 0.08),
                transparent 80%
              )
            `,
            willChange: "background",
          }}
        />
      </div>

      {}
      <div ref={triggerRef} className="relative z-10">
        <div
          ref={sectionRef}
          className="h-screen flex flex-row relative will-change-transform"
          style={{ width: `${(projects.length + 1) * 100}vw` }}
        >
          {}
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}

          {}
          <div className="h-screen w-screen flex items-center justify-center p-6 md:p-20 perspective-1000">
            <Link
              to="/projects"

              className="group/archive relative w-full h-[85vh] md:h-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden hover:bg-zinc-50 hover:text-zinc-950 transition-all duration-700 shadow-2xl cursor-crosshair"
            >
              {}
              <div className="absolute inset-0 flex flex-col justify-center opacity-[0.03] group-hover/archive:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="text-[12vw] font-black uppercase leading-[0.8] whitespace-nowrap -ml-10 text-zinc-50 group-hover/archive:text-zinc-900">
                    ACCESS ARCHIVE • ACCESS ARCHIVE •
                  </span>
                ))}
              </div>

              {}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-zinc-700 group-hover/archive:border-zinc-950 flex items-center justify-center group-hover/archive:scale-110 group-hover/archive:bg-zinc-950 group-hover/archive:text-zinc-50 transition-all duration-500 shadow-[0_0_30px_rgba(99,102,241,0.1)] group-hover/archive:shadow-[0_0_50px_rgba(0,0,0,0.2)]">
                  <span className="text-4xl md:text-5xl group-hover/archive:rotate-45 transition-transform duration-500">→</span>
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Full Archive</h2>
                  <p className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-indigo-500 group-hover/archive:text-zinc-500 mt-4 transition-colors duration-700">View All Transmission Logs</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalWork;