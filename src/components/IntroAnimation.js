import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/IntroAnimation.module.css';

const IntroAnimation = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if animation has been shown before
    const hasShownAnimation = localStorage.getItem('hasShownAnimation');
    
    if (!hasShownAnimation) {
      setShow(true);
      
      // Set flag in localStorage after animation
      const timer = setTimeout(() => {
        setShow(false);
        localStorage.setItem('hasShownAnimation', 'true');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.pencilContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <motion.div 
            className={styles.writingText}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div
            initial={{ rotate: -45, x: -100 }}
            animate={{ rotate: 0, x: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.2
            }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaPencilAlt className={styles.pencil} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation; 