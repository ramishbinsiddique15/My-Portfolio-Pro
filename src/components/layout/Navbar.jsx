import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';

const MagneticElement = ({ children, className, tiltMax = 15 }) => {
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
      style={{ rotateX: useMotionTemplate`${mouseYSpring}deg`, rotateY: useMotionTemplate`${mouseXSpring}deg`, transformStyle: "preserve-3d", willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const { isAppLoaded } = useUIStore();
  const { scrollY } = useScroll();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 150 && latest > previous && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Root', path: '/' },
    { name: 'Capabilities', path: '/capabilities' },
    { name: 'Archive', path: '/projects' },
    { name: 'Lab', path: '/lab' },
    { name: 'Logs', path: '/logs' },
    { name: 'Identity', path: '/identity' },
  ];

  return (
    <AnimatePresence>
      {isAppLoaded && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={hidden ? { y: -120, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed top-6 left-0 right-0 z-[100] flex justify-center w-full pointer-events-none px-4"
        >
          <div className="relative w-full max-w-6xl">
            {}
            <div className="flex items-center justify-between w-full px-6 py-4 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-full pointer-events-auto shadow-[0_0_30px_rgba(0,0,0,0.5)]">

              {}
              <MagneticElement tiltMax={20}>
                <Link to="/" className="flex items-center gap-2 text-base font-black tracking-widest uppercase text-zinc-50 group cursor-crosshair">
                  <Terminal className="w-4 h-4 text-indigo-500 group-hover:text-zinc-50 transition-colors" />
                  <span className="group-hover:text-indigo-400 transition-colors">RAMISH</span>
                </Link>
              </MagneticElement>

              {}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <MagneticElement key={item.name} tiltMax={15}>
                      <Link
                        to={item.path}
                        className="group flex items-center gap-2 py-2 cursor-crosshair relative"
                      >
                        {}
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-transparent group-hover:bg-indigo-500'}`} />

                        <span className={`text-[10px] font-mono uppercase tracking-[0.3em] transition-colors duration-300 ${isActive ? 'text-zinc-50 font-bold' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                          {item.name}
                        </span>
                      </Link>
                    </MagneticElement>
                  );
                })}
              </div>

              {}
              <div className="md:hidden pointer-events-auto">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-full text-zinc-50 hover:bg-zinc-800 transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 right-0 mt-4 p-6 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-3xl pointer-events-auto shadow-2xl md:hidden overflow-hidden"
                >
                  {}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                  <div className="flex flex-col gap-6 relative z-10">
                    <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest border-b border-zinc-800 pb-4">
                      Navigation
                    </span>

                    {navLinks.map((item, i) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link
                            to={item.path}
                            className="flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-4">
                              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-zinc-800 group-hover:bg-indigo-500'} transition-colors`} />
                              <span className={`text-xl font-black uppercase tracking-widest ${isActive ? 'text-zinc-50' : 'text-zinc-500 group-hover:text-zinc-300'} transition-colors`}>
                                {item.name}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">

                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;