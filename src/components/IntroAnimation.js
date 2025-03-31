import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/IntroAnimation.module.css';

const IntroAnimation = () => {
  useEffect(() => {
    // Prevent scrolling on body when intro animation is shown
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      const element = document.getElementById('intro-animation');
      if (element) {
        element.style.opacity = '0';
        setTimeout(() => {
          element.style.display = 'none';
          // Restore scrolling when intro animation is hidden
          document.body.style.overflow = 'auto';
        }, 1000);
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
      // Restore scrolling if component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      id="intro-animation"
      className={styles.introContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.starsContainer}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.star}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.05,
              repeat: Infinity,
              repeatDelay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>
      <div className={styles.auroraBackground}>
        <div className={styles.auroraLayer1} />
        <div className={styles.auroraLayer2} />
        <div className={styles.auroraLayer3} />
      </div>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src="/bitmoji.jpeg"
            alt="Aswitha Bitmoji"
            width={150}
            height={150}
            className={styles.bitmojiImage}
          />
          <div className={styles.imageGlow} />
        </div>
        <motion.div
          className={styles.textContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Welcome
          </motion.h1>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            To My Portfolio
          </motion.h2>
        </motion.div>
        <motion.div
          className={styles.loadingBar}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
      </div>
    </motion.div>
  );
};

export default IntroAnimation; 