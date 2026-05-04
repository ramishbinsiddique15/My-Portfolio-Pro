import React, { useRef, useCallback } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Terminal, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import logo from '../../assets/icons/dodo-softec.png';

const ExperienceDetailCard = ({ detail, isEven }) => {
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
    x.set(xPct * 6);
    y.set(yPct * 6);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    boundingRef.current = null;
  }, [x, y]);

  return (
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
      className="group/detail relative p-6 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm hover:bg-zinc-50 hover:border-zinc-50 transition-colors duration-500 cursor-crosshair w-full overflow-hidden shadow-lg"
    >
      {}
      <div
        className={`relative z-10 flex items-start gap-4 pointer-events-none ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}
        style={{ transform: "translateZ(20px)" }}
      >
        {}
        <div className="mt-1 shrink-0">
          <ChevronRight className={`w-5 h-5 text-indigo-500 group-hover/detail:text-zinc-950 transition-transform duration-500 ${isEven ? 'md:rotate-180' : ''}`} />
        </div>

        {}
        <p className={`text-zinc-400 group-hover/detail:text-zinc-950 font-medium leading-relaxed transition-colors duration-500 text-sm w-full ${isEven ? 'md:text-right text-left' : 'text-left'}`}>
          {detail}
        </p>
      </div>

      {}
      <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover/detail:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

const Experience = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

const sectionRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  const experiences = [
    {
      role: "Frontend Developer",
      company: "Dodo Softec",
      duration: "Sep 2024 – Present",
      details: [
        "Engineered responsive, high-performance UIs using React.js and Tailwind CSS, ensuring cross-platform consistency.",
        "Integrated RESTful APIs, optimizing data flow, dynamic rendering, and reducing application load times.",
        "Collaborated with backend teams for seamless MERN stack integration and scalable architecture deployment."
      ]
    },
    {
      role: "Frontend Intern",
      company: "Dodo Softec",
      duration: "Jun 2024 – Aug 2024",
      details: [
        "Developed modular, user-facing components utilizing HTML, CSS, and JavaScript within the React ecosystem.",
        "Refactored legacy codebases and debugged core features to improve overall code quality and maintainability."
      ]
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-zinc-950 py-32 px-6 md:px-12 border-t border-zinc-900 overflow-hidden group"
    >
      {}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
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
          willChange: "background",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {}
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-full text-indigo-500 font-mono text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.05)]"
            >
              <Terminal className="w-4 h-4" />
              <span>Archive</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-zinc-50 leading-none">
              EXPER<br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800" style={{ WebkitTextStroke: '1px #fafafa' }}>IENCE</span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-500 font-mono text-sm max-w-xs"
          >
            PRODUCTION ROLES, TIMELINES, AND DELIVERY HISTORY.
          </motion.p>
        </div>

        <div className="relative">
          {}
          <motion.div
            style={{ scaleY }}
            className="absolute left-8 md:left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-indigo-500 via-indigo-400 to-indigo-900 origin-top -translate-x-1/2 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-20"
          />
          <div className="absolute left-8 md:left-1/2 top-0 w-[2px] h-full bg-zinc-900 -translate-x-1/2 z-10" />

          {}
          <div className="space-y-32 perspective-1000 relative z-30 pt-4">
            {experiences.map((exp, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative w-full"
                >
                  {}
                  <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 z-40">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center border-4 border-zinc-950 shadow-[0_0_20px_rgba(99,102,241,0.2)] cursor-pointer hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-shadow duration-500"
                    >
                      <img src={logo} alt={exp.company} className="w-10 h-10 object-contain" />
                    </motion.div>
                  </div>

                  {}
                  <div className={`w-full md:w-[45%] pl-28 md:pl-0 ${isEven ? 'md:pr-12 md:mr-auto' : 'md:pl-12 md:ml-auto'}`}>

                    {}
                    <div className={`mb-8 ${isEven ? 'md:text-right text-left' : 'text-left'}`}>
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-50 mb-3 drop-shadow-lg">
                        {exp.role}
                      </h3>
                      <div className={`flex items-center gap-3 text-indigo-400 font-mono text-xs uppercase tracking-widest ${isEven ? 'md:justify-end justify-start' : 'justify-start'}`}>
                        <Briefcase className="w-4 h-4" />
                        <span className="font-bold">{exp.company}</span>
                      </div>
                    </div>

                    {}
                    <div className="space-y-4 flex flex-col perspective-1000">
                      {exp.details.map((detail, idx) => (
                        <ExperienceDetailCard key={idx} detail={detail} isEven={isEven} />
                      ))}

                      {}
                      <div className={`mt-6 inline-flex items-center gap-3 px-6 py-2.5 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-full text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] shadow-lg w-fit ${isEven ? 'md:ml-auto md:mr-0 ml-0' : 'ml-0'}`}>
                        <Calendar className="w-3 h-3 text-indigo-500" />
                        {exp.duration}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;