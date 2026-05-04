import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const shutterVariants = {
  hidden: { y: '-100%' },
  visible: (i) => ({
    y: '0%',
    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i) => ({
    y: '100%',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.03 * i },
  }),
}

export default function PageShutter({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-shutter"
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <div className="absolute inset-0 flex w-full h-full z-50">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={shutterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-1/4 h-full bg-zinc-950 dark:bg-zinc-50 border-r border-white/5 dark:border-black/5"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
