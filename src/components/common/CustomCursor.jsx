import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    const handleMouseOver = (e) => {

      if (e.target.closest('a, button, input, textarea, [data-cursor="hover"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouse.x, mouse.y]);

  return (
    <>
      {}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: mouse.x,
          y: mouse.y,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovered || isClicked ? 0 : 1,
          opacity: isHovered || isClicked ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />

      {}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block flex items-center justify-center"
        style={{
          x: smoothMouse.x,
          y: smoothMouse.y,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid white',
        }}
        animate={{
          width: isHovered ? 80 : isClicked ? 30 : 40,
          height: isHovered ? 80 : isClicked ? 30 : 40,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          scale: isClicked ? 0.8 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {}
        <motion.span
          className="text-[10px] font-bold text-black uppercase tracking-widest pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      </motion.div>
    </>
  );
};

export default CustomCursor;