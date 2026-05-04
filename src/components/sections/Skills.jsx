import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGithub, FaGitAlt, FaBootstrap
} from 'react-icons/fa';
import {
  SiMongodb, SiExpress, SiTailwindcss, SiNextdotjs, SiFirebase,
  SiVite, SiPostman, SiThreedotjs, SiDigitalocean
} from 'react-icons/si';
import { Terminal, Cpu, Layout, Wrench, Cloud } from 'lucide-react';

const SkillCard = ({ skill, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

mouseX.set(clientX - left);
    mouseY.set(clientY - top);

const xPct = (clientX - left - width / 2) / (width / 2);
    const yPct = (clientY - top - height / 2) / (height / 2);
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        rotateX: useMotionTemplate`${mouseYSpring}deg`,
        rotateY: useMotionTemplate`${mouseXSpring}deg`,
        transformStyle: "preserve-3d",
      }}
      className="relative group p-8 border border-zinc-800 bg-zinc-950/80 backdrop-blur-md overflow-hidden rounded-sm hover:border-zinc-500 transition-colors cursor-crosshair"
    >
      {}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <span className="absolute -top-6 -right-4 text-8xl font-black text-zinc-900/40 select-none group-hover:text-zinc-800/80 transition-colors" style={{ transform: "translateZ(20px)" }}>
        0{index + 1}
      </span>

      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center gap-4 mb-6">
          <skill.icon className="text-4xl drop-shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300" style={{ color: skill.color }} />
          <h3 className="text-xl font-bold uppercase tracking-tight text-zinc-50">{skill.name}</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-8 font-mono leading-relaxed h-12">{`> ${skill.desc}`}</p>

        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-mono tracking-widest text-zinc-500">
            <span>INTENSITY</span>
            <span className="text-indigo-400">{skill.level}%</span>
          </div>
          <div className="h-[2px] bg-zinc-900 w-full relative overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: `${skill.level - 100}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 + (index * 0.1) }}
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Core');

  const skillData = {
    'Core': {
      label: 'MERN Stack',
      icon: Cpu,
      skills: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 92, desc: 'NoSQL mastery & aggregation pipelines' },
        { name: 'Express.js', icon: SiExpress, color: '#ffffff', level: 88, desc: 'RESTful API & Middleware architecture' },
        { name: 'React.js', icon: FaReact, color: '#61DAFB', level: 95, desc: 'Component architecture & state management' },
        { name: 'Node.js', icon: FaNodeJs, color: '#339933', level: 90, desc: 'Asynchronous server-side logic' },
      ]
    },
    'Frontend': {
      label: 'Interface',
      icon: Layout,
      skills: [
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', level: 90, desc: 'ES6+ and modern patterns' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', level: 85, desc: 'Full-stack React with SSR/SSG' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 96, desc: 'Utility-first rapid styling' },
        { name: 'Three.js', icon: SiThreedotjs, color: '#ffffff', level: 72, desc: '3D interactive visualizations' },
      ]
    },
    'Infrastructure': {
      label: 'Cloud',
      icon: Cloud,
      skills: [
        { name: 'DigitalOcean', icon: SiDigitalocean, color: '#0080FF', level: 75, desc: 'Droplet deployment & cloud infrastructure' },
        { name: 'GitHub', icon: FaGithub, color: '#ffffff', level: 85, desc: 'CI/CD and project collaboration' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', level: 75, desc: 'Real-time database & auth' },
        { name: 'Git', icon: FaGitAlt, color: '#F05032', level: 88, desc: 'Version control workflows' },
      ]
    },
    'Tools': {
      label: 'Development',
      icon: Wrench,
      skills: [
        { name: 'Postman', icon: SiPostman, color: '#FF6C37', level: 80, desc: 'API testing & debugging' },
        { name: 'Vite', icon: SiVite, color: '#646CFF', level: 78, desc: 'Modern build orchestration' },
        { name: 'Bootstrap', icon: FaBootstrap, color: '#7952B3', level: 75, desc: 'Standard UI components' },
      ]
    }
  };

  return (
    <section className="relative w-full bg-zinc-950 py-32 px-6 md:px-12 border-t border-zinc-900 min-h-screen flex items-center overflow-hidden">

      {}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-indigo-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6"
            >
              <Terminal className="w-4 h-4" />
              <span>Process</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-zinc-50 leading-none">
              TECH<br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800" style={{ WebkitTextStroke: '1px #fafafa' }}>STACK</span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 font-mono text-sm max-w-xs"
          >
            SYSTEM ARCHITECTURE & DEVELOPMENT PROTOCOLS.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {}
          <aside className="lg:col-span-4 flex flex-col gap-4">
            {Object.keys(skillData).map((cat) => {
              const Icon = skillData[cat].icon;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative w-full flex items-center justify-between p-6 border transition-all duration-500 group overflow-hidden ${
                    isActive ? 'bg-zinc-50 border-zinc-50 text-zinc-950 shadow-[0_0_30px_rgba(250,250,250,0.1)]' : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {}
                  {!isActive && (
                    <span className="absolute inset-0 bg-zinc-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10" />
                  )}

                  <div className="flex items-center gap-4 relative z-10">
                    <Icon className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'text-zinc-950 scale-110' : 'text-indigo-500 group-hover:scale-110'}`} />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold">{cat}</span>
                  </div>
                  <span className={`relative z-10 text-xs font-bold transition-all duration-500 ${isActive ? 'translate-x-0' : '-translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`}>

                  </span>
                </button>
              );
            })}
          </aside>

          {}
          <div className="lg:col-span-8 min-h-[500px]" style={{ perspective: "1000px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {skillData[activeCategory].skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;