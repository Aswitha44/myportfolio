// components/PageTransition.js
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#0a0a2a',
        overflow: 'hidden'
      }}
    >
      <motion.div
        className="transition-overlay"
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ scale: 1, rotate: 360, opacity: 1 }}
        exit={{ scale: 0, rotate: 720, opacity: 0 }}
        transition={{
          duration: 2,
          ease: [0.4, 0, 0.2, 1],
          rotate: {
            duration: 2,
            ease: "easeInOut"
          }
        }}
      />
      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {children}
      </motion.div>
      <style jsx>{`
        .transition-overlay {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 200vw;
          height: 200vw;
          background: radial-gradient(circle at center, 
            rgba(38, 208, 124, 0.15) 0%,
            rgba(38, 208, 124, 0.1) 20%,
            rgba(38, 208, 124, 0.05) 40%,
            transparent 70%
          );
          transform-origin: center;
          z-index: 1000;
          filter: blur(30px);
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
        }

        :global(body) {
          overflow-x: hidden;
        }
      `}</style>
    </motion.div>
  );
};

export default PageTransition;