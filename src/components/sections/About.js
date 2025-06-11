import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/About.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Parallax video background */}
      <motion.div className={styles.videoWrapper} style={{ y }}>
        <video
          ref={videoRef}
          className={styles.videoBg}
          src="/background.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          preload="auto"
        />
      </motion.div>

      {/* Intro content */}
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
          <span className={styles.hey}>Hello!!</span><br />
          I'm Aswitha
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
          <span className={styles.roleText}>Software Developer</span>
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
  I build scalable, responsive, and interactive web and mobile applications with a focus on performance and user experience.
  Proficient in React, React Native, Angular, Node.js, Spring, AWS, Azure, and 
  modern architectures including microservices, REST, GraphQL, and CI/CD pipelines.
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
          Let&apos;s Connect
          <span className={styles.ctaGlow}></span>
        </motion.a>
      </motion.div>
    </section>
  );
}
