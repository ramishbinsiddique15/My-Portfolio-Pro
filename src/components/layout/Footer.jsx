import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { Terminal, ArrowUpRight, ArrowUp } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react'; 

// --- Optimized 3D Wrapper for Interactive Elements ---
const MagneticElement = ({ children, className, tiltMax = 15 }) => {
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
    x.set(xPct * tiltMax);
    y.set(yPct * tiltMax);
  }, [x, y, tiltMax]);

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
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Footer = () => {
  // Global spotlight & engine setup
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const lenis = useLenis();
  const navigate = useNavigate();

  const handleGlobalMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  const scrollToTop = () => {
    // Trigger the app-level shutter immediately
    window.dispatchEvent(new CustomEvent('app:trigger-shutter', { detail: {} }));

    // After the shutter covers the screen, scroll to top
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }, 520);
  };

  // Separated links for clean dual-column layout
  const pageLinks = [
    { name: "Root", path: "/" },
    { name: "Capabilities", path: "/capabilities" },
    { name: "Archive", path: "/projects" },
    { name: "Lab", path: "/lab" },
    { name: "Logs", path: "/logs" },
    { name: "Identity", path: "/identity" },
  ];

  const sectionLinks = [
    { name: "About", path: "/#about" },
    { name: "Experience", path: "/#experience" },
    { name: "Contact", path: "/#contact" },
  ];

  const socials = [
    { icon: FaGithub, link: "https://github.com/ramishbinsiddique15", label: "GitHub" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/ramish15", label: "LinkedIn" },
    { icon: FaEnvelope, link: "mailto:ramishbinsiddique24@gmail.com", label: "Email" }
  ];

  // --- Fixed Anchor Handler ---
  const renderLinkItem = (link, i) => {
    const isAnchor = link.path.startsWith('/#');

    const handleClick = (e) => {
      if (isAnchor) {
        e.preventDefault();
        const targetId = link.path.replace('/#', '#');

        // Trigger the app-level shutter immediately
        window.dispatchEvent(new CustomEvent('app:trigger-shutter', { detail: { hash: targetId } }));

        // After the shutter covers the screen, perform a Lenis jump to the section
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(targetId, { immediate: true, offset: 0 });
          } else {
            document.querySelector(targetId)?.scrollIntoView({ behavior: 'auto' });
          }
        }, 650);

        // Update the URL hash once the shutter animation is finishing
        setTimeout(() => {
          try {
            window.history.pushState(null, '', targetId);
          } catch (err) {
            window.location.hash = targetId;
          }
        }, 980);
      }
    };

    return (
      <li key={i}>
        <Link 
          to={link.path}
          onClick={handleClick}
          className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-50 transition-colors duration-300 w-fit cursor-crosshair"
        >
          <ArrowUpRight className="w-3 h-3 text-indigo-500 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
          <span className="font-bold text-sm uppercase tracking-wider">{link.name}</span>
        </Link>
      </li>
    );
  };

  return (
    <footer 
      ref={sectionRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative w-full bg-zinc-950 pt-32 pb-8 overflow-hidden group border-t border-zinc-900"
    >
      {/* Animated Geometric Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)', 
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
        }} />
      </div>

      {/* Interactive Global Spotlight */}
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

      {/* Massive Background Typography */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none z-0 select-none opacity-[0.02] mix-blend-screen">
        <h1 className="text-[15vw] font-black uppercase leading-[0.7] tracking-tighter text-zinc-50 whitespace-nowrap translate-y-1/4">
          END_OF_DIR
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Adjusted Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 border-b border-zinc-900 pb-20">
          
          {/* Col 1: Identity & Core Info */}
          <div className="md:col-span-4 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-full text-indigo-500 font-mono text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.05)]">
              <Terminal className="w-3 h-3" />
              <span>System // Terminated</span>
            </div>
            
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-50 mb-2">
                Ramish Bin Siddique
              </h3>
              <p className="text-zinc-500 font-medium leading-relaxed max-w-sm text-sm">
                Full-Stack MERN Architect engineering high-performance web platforms and AI-integrated systems.
              </p>
            </div>

            <div className="space-y-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              <p><span className="text-zinc-400">Location:</span> Rawalpindi, PK</p>
              <p><span className="text-zinc-400">Status:</span> 7th Sem CS Architect</p>
              <p className="flex items-center gap-2 mt-4">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-500"></span>
                Uplink Active
              </p>
            </div>
          </div>

          {/* Col 2: Directory Links */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <h4 className="text-zinc-100 font-mono text-xs uppercase tracking-[0.3em] font-bold">Pages</h4>
              <ul className="space-y-4">
                {pageLinks.map((link, i) => renderLinkItem(link, i))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-zinc-100 font-mono text-xs uppercase tracking-[0.3em] font-bold">Sections</h4>
              <ul className="space-y-4">
                {sectionLinks.map((link, i) => renderLinkItem(link, i))}
              </ul>
            </div>
          </div>

          {/* Col 3: Social Nodes & Actions */}
          <div className="md:col-span-3 space-y-8 flex flex-col items-start md:items-end">
            <h4 className="text-zinc-100 font-mono text-xs uppercase tracking-[0.3em] font-bold">Social_Uplinks</h4>
            
            <div className="flex gap-4 perspective-1000">
              {socials.map((item, i) => (
                <MagneticElement key={i} tiltMax={20} className="w-12 h-12">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center text-lg transition-colors duration-500 rounded-full group/social hover:border-indigo-500 hover:text-indigo-400 shadow-xl cursor-crosshair overflow-hidden relative"
                  >
                    <span className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <item.icon style={{ transform: "translateZ(20px)" }} className="relative z-10 pointer-events-none drop-shadow-lg" title={item.label} />
                  </a>
                </MagneticElement>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <MagneticElement tiltMax={10}>
                <a 
                  href="/Resume.pdf" 
                  download="Ramish_Siddique_Resume.pdf"
                  className="group/btn relative inline-flex items-center gap-4 px-6 py-3 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm text-zinc-50 font-black uppercase tracking-[0.3em] text-[10px] overflow-hidden transition-colors duration-500 hover:border-indigo-500 cursor-crosshair"
                >
                  <span className="absolute inset-0 bg-indigo-500/10 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out -z-10 pointer-events-none" />
                  <span className="relative z-10 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
                    Pull_Credentials.pdf
                  </span>
                </a>
              </MagneticElement>
            </div>

          </div>
        </div>

        {/* Absolute Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 text-center md:text-left">
            © {new Date().getFullYear()} RAMISH BIN SIDDIQUE. ALL RIGHTS RESERVED. <br className="md:hidden"/>
            <span className="text-zinc-700 hidden md:inline"> // </span>
            BUILT WITH REACT, TAILWIND & FRAMER MOTION.
          </p>

          <MagneticElement tiltMax={25} className="w-12 h-12">
            <button 
              onClick={scrollToTop}
              className="w-full h-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center text-zinc-500 transition-colors duration-500 rounded-full group/top hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950 shadow-xl cursor-crosshair overflow-hidden relative"
            >
              <ArrowUp style={{ transform: "translateZ(20px)" }} className="relative z-10 pointer-events-none w-5 h-5 group-hover/top:-translate-y-1 transition-transform duration-300" />
            </button>
          </MagneticElement>
        </div>

      </div>
    </footer>
  );
};

export default Footer;