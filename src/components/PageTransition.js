// components/PageTransition.js
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const PageTransition = ({ children }) => {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      ref={containerRef}
      key={router.route}
      initial={{ opacity: 0, rotate: 15 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: -15 }}
      transition={{ 
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100
      }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1200px",
        width: "100%",
        height: "100%",
        y,
        opacity
      }}
    >
      <div className="aurora-bg">
        <motion.div 
          className="aurora aurora-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="aurora aurora-2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="aurora aurora-3"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)"
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;