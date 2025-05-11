import { useEffect, useRef } from 'react';
import styles from '../../styles/About.module.css';
import userData from '../../data/user-data.json';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    // scroll into view on mount
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Parallax background video */}
      <motion.div 
        className={styles.videoWrapper}
        style={{ y }}
      >
        <video
          ref={videoRef}
          className={styles.videoBg}
          src="/background.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>

      {/* Animated intro text on left */}
      <motion.div
        className={styles.aboutContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className={styles.name}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}
        >
          <span className={styles.textGlitch} data-text="Hi There,">
            Hey!!  
            <br/>                     
          </span>
          <motion.h5
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.4
            }}
          >
            I'm Aswitha
          </motion.h5>
        </motion.h1>

        <motion.h2 
          className={styles.role}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.6
          }}
        >
          <span className={styles.roleText}>Full Stack Developer</span>
          <span className={styles.roleLine}></span>
        </motion.h2>

        <motion.p 
          className={styles.summary}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.8
          }}
        >
          I build scalable, responsive and interactive web applications
          blending functionality and design. Skilled in 
          Angular, React, .NET, AWS, Azure, and modern architectures.
        </motion.p>

        <motion.a 
          href="#contact" 
          className={styles.ctaButton}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 1
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let&apos;s Connect <i className="fas fa-arrow-right" />
          <span className={styles.ctaGlow}></span>
        </motion.a>
      </motion.div>

     
    </section>
  );
}
