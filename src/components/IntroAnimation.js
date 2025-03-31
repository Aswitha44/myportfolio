import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/IntroAnimation.module.css';

const Stars = () => {
  return (
    <div className={styles.starsContainer}>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.star}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`
          }}
        />
      ))}
    </div>
  );
};

export default function IntroAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.introContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stars />
          <div className={styles.content}>
            <motion.div
              className={styles.logoContainer}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className={styles.logo}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/bitmoji.jpeg"
                    alt="Aswitha Bitmoji"
                    width={200}
                    height={200}
                    className={styles.bitmojiImage}
                    priority
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className={styles.textContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className={styles.name}>Welcome</h1>
              <div className={styles.titleContainer}>
                <motion.span
                  className={styles.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  My Portfolio
                </motion.span>
                <motion.div
                  className={styles.loadingBar}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.5, duration: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 