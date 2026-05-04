import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { Terminal, Send, MapPin, ShieldCheck, Activity } from "lucide-react";
import emailjs from "@emailjs/browser";

const MagneticElement = ({ children, className, tiltMax = 12 }) => {
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

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [statusProtocol, setStatusProtocol] = useState(null);

const sectionRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleGlobalMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const triggerProtocolAlert = (type, message) => {
    setStatusProtocol({ type, message });
    setTimeout(() => setStatusProtocol(null), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      from_name: form.name,
      to_name: "Ramish",
      from_email: form.email,
      to_email: "ramishbinsiddique24@gmail.com",
      message: form.message,
    };

    emailjs
      .send("service_c58lgfo", "template_wev6vmr", templateParams, "YYJQi5ny3if9_eHwl")
      .then(() => {
        triggerProtocolAlert('SUCCESS', 'TRANSMISSION_ACKNOWLEDGED');
        setLoading(false);
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        triggerProtocolAlert('ERROR', 'UPLINK_INTERRUPTED');
        setLoading(false);
      });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative w-full bg-zinc-950 py-32 px-6 md:px-12 border-t border-zinc-900 overflow-hidden text-zinc-50 font-sans group"
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

      {}
      <AnimatePresence>
        {statusProtocol && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className={`fixed bottom-10 right-10 z-[100] border p-6 font-mono backdrop-blur-xl shadow-2xl ${
              statusProtocol.type === 'SUCCESS' ? 'border-indigo-500 bg-zinc-950/90 text-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'border-red-500 bg-zinc-950/90 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
            }`}
          >
            <div className="flex items-center gap-4">
              <Activity className={`w-5 h-5 ${statusProtocol.type === 'SUCCESS' ? 'animate-pulse' : 'animate-bounce'}`} />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-1">System_Response</p>
                <p className="text-xs font-black uppercase tracking-widest">{statusProtocol.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">

        {}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-full text-indigo-500 font-mono text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.05)]"
            >
              <Terminal className="w-4 h-4" />
              <span>Protocol</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-zinc-50 leading-none">
              CONT<br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800" style={{ WebkitTextStroke: '1px #fafafa' }}>ACT</span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-500 font-mono text-sm max-w-xs"
          >
            OPEN A DIRECT LINE FOR COLLABORATION, FREELANCE WORK, OR PRODUCTION SUPPORT.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start perspective-1000">

          {}
          <div className="lg:col-span-5 space-y-8">
            <MagneticElement tiltMax={6} className="group/status relative p-10 border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl overflow-hidden shadow-2xl cursor-crosshair">
              {}
              <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover/status:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  <span className="font-mono text-[10px] text-zinc-400 group-hover/status:text-indigo-400 transition-colors uppercase tracking-widest">Status: Filer Verified</span>
                </div>

                <p className="text-zinc-400 group-hover/status:text-zinc-200 transition-colors font-medium leading-relaxed mb-10 text-lg">
                  Ready for <span className="text-zinc-100 italic font-bold">production-grade</span> full-stack collaboration.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-zinc-500 group-hover/status:text-zinc-400 transition-colors font-mono text-[10px] uppercase tracking-[0.2em]">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span>Rawalpindi, PK</span>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-500 group-hover/status:text-zinc-400 transition-colors font-mono text-[10px] uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-4 h-4 text-indigo-500" />
                    <span>7th Sem CS Architect</span>
                  </div>
                </div>
              </div>
            </MagneticElement>

            {}
            <div className="flex gap-4 perspective-1000">
              {[
                { icon: FaGithub, link: "https://github.com/ramishbinsiddique15", label: "GitHub" },
                { icon: FaLinkedin, link: "https://www.linkedin.com/in/ramish15", label: "LinkedIn" },
                { icon: FaEnvelope, link: "mailto:ramishbinsiddique24@gmail.com", label: "Email" }
              ].map((item, i) => (
                <MagneticElement key={i} tiltMax={15} className="w-16 h-16">
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center text-xl transition-colors duration-500 rounded-full group/social hover:border-indigo-500 hover:text-indigo-400 shadow-xl cursor-crosshair overflow-hidden relative"
                  >
                    <span className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <item.icon style={{ transform: "translateZ(20px)" }} className="relative z-10 pointer-events-none drop-shadow-lg" title={item.label} />
                  </motion.a>
                </MagneticElement>
              ))}
            </div>
          </div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-6 md:p-12 border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl shadow-2xl relative"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Identity_Name</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    className="w-full bg-zinc-900/50 border border-zinc-800 py-4 px-6 text-zinc-100 focus:border-indigo-500 focus:bg-zinc-900 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all outline-none font-mono text-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Source_Email</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    className="w-full bg-zinc-900/50 border border-zinc-800 py-4 px-6 text-zinc-100 focus:border-indigo-500 focus:bg-zinc-900 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all outline-none font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Transmission_Data</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} rows="5" required
                  className="w-full bg-zinc-900/50 border border-zinc-800 py-4 px-6 text-zinc-100 focus:border-indigo-500 focus:bg-zinc-900 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all outline-none font-mono text-sm resize-none"
                ></textarea>
              </div>

              {}
              <div className="perspective-1000">
                <MagneticElement tiltMax={10}>
                  <button
                    type="submit" disabled={loading}
                    className="group/btn relative w-full py-6 bg-transparent border border-zinc-800 text-zinc-50 font-black uppercase tracking-[0.4em] text-[10px] overflow-hidden transition-colors duration-500 hover:border-indigo-500 cursor-crosshair disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-indigo-500/10 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out -z-10 pointer-events-none" />

                    <span className="relative z-10 flex items-center justify-center gap-4 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
                      {loading ? 'UPLOADING...' : 'INITIATE TRANSMISSION'}
                      <Send className="w-4 h-4 text-indigo-500 group-hover/btn:text-indigo-400 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-all duration-300" />
                    </span>
                  </button>
                </MagneticElement>
              </div>
            </form>
          </motion.div>
        </div>

        {}
        <footer className="mt-40 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500 relative z-10">
          <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 space-y-1 text-center md:text-left">
            <p className="text-zinc-300">© {new Date().getFullYear()} RAMISH BIN SIDDIQUE</p>
            <p>7TH_SEM_CS</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a href="/Resume.pdf" download="Ramish_Siddique_Resume.pdf" className="font-mono text-[9px] uppercase tracking-widest text-indigo-500 hover:text-indigo-400 transition-colors">Resume.log</a>
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">Location: Rawalpindi, PK</span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;