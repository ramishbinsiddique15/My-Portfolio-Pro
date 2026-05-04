import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import { Terminal } from 'lucide-react';

const MagneticButton = ({ children, className, href, download }) => {
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

    x.set(xPct * 12);
    y.set(yPct * 12);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    boundingRef.current = null;
  }, [x, y]);

  return (
    <motion.a
      href={href}
      download={download}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: useMotionTemplate`${mouseYSpring}deg`,
        rotateY: useMotionTemplate`${mouseXSpring}deg`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const About = () => {

  const sectionRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseEnter = useCallback((e) => {
    sectionRef.current = e.currentTarget.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current;

    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  const socials = [
    { icon: FaGithub, link: "https://github.com/ramishbinsiddique15", label: "GitHub" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/ramish15", label: "LinkedIn" },
    { icon: FaEnvelope, link: "mailto:ramishbinsiddique24@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="about"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden border-t border-zinc-900 group"
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
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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

      {}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none z-0" style={{ transform: 'translateZ(0)' }} />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 pointer-events-none">

        {}
        <div className="lg:col-span-5 space-y-12 pointer-events-auto" style={{ perspective: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            {}
            <div className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-full text-indigo-500 font-mono text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.05)]">
              <Terminal className="w-4 h-4" />
              <span>Identity</span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-zinc-50 leading-none mb-10">
              RAMISH BIN<br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800" style={{ WebkitTextStroke: '1px #fafafa' }}>SIDDIQUE</span>
            </h2>

            <div className="space-y-4 border-l border-zinc-800 pl-8 relative before:absolute before:left-[-1px] before:top-0 before:w-[2px] before:h-1/3 before:bg-indigo-500">
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
                <span className="text-zinc-100">Role:</span> Full-Stack MERN Architect
              </p>
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
                <span className="text-zinc-100">Status:</span> 7th Sem Computer Science
              </p>
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
                <span className="text-zinc-100">Focus:</span> AI Integration & Scalable Web
              </p>
            </div>
          </motion.div>

          {}
          <div className="flex flex-wrap gap-4">
            {socials.map((social, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                <MagneticButton
                  href={social.link}
                  className="relative w-14 h-14 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center text-xl overflow-hidden transition-colors duration-300 group hover:border-indigo-500 hover:text-indigo-400 shadow-xl cursor-crosshair"
                >
                  <span className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <social.icon style={{ transform: "translateZ(20px)" }} className="relative z-10 drop-shadow-lg pointer-events-none" title={social.label} />
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </div>

        {}
        <div className="lg:col-span-7 space-y-16 pointer-events-auto" style={{ perspective: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-zinc-100">
              Engineering <span className="text-indigo-400 italic">robust digital architectures</span> where research-driven AI meets production code.
            </p>

            <div className="space-y-6 text-zinc-500 font-medium text-lg leading-relaxed max-w-2xl">
              <p>
                As a specialized <span className="text-zinc-200">Full-Stack Developer</span>, my focus is on the MERN stack and the integration of machine learning models into scalable web environments.
              </p>
              <p>
                My current work involves architecting a multi-tier vehicle detection system for my Final Year Project, bridging the gap between Python-based AI engines and real-time JavaScript-driven telemetry.
              </p>
            </div>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <MagneticButton
              href="/Resume.pdf"
              download="Ramish_Siddique_Resume.pdf"
              className="group relative inline-flex items-center justify-between gap-10 px-10 py-5 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm text-zinc-50 font-black uppercase tracking-[0.35em] text-[10px] overflow-hidden transition-colors duration-300 hover:border-indigo-500 shadow-xl cursor-crosshair block w-fit"
            >
              {}
              <span className="absolute inset-0 bg-indigo-500/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10 pointer-events-none" />

              <span className="relative z-10 flex items-center gap-3 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                <FaFileDownload className="text-lg text-indigo-500 group-hover:text-indigo-400 group-hover:-translate-y-1 transition-all duration-300" />
                Pull_Credentials.pdf
              </span>
            </MagneticButton>

            <div className="mt-6 flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-300">
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent" />
              <span className="font-mono text-[8px] uppercase tracking-widest whitespace-nowrap text-zinc-500">
                Path: Public/Resume.pdf
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;