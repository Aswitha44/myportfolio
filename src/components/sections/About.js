import { useEffect } from 'react';
import styles from '../../styles/About.module.css';
import userData from '../../data/user-data.json';
import { motion } from 'framer-motion';

export default function About() {
  useEffect(() => {
    // scroll into view on mount
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Aurora overlays (behind the video) */}
    

      {/* Full-screen looping background video */}
      <video
        className={styles.videoBg}
        src="/background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Animated intro text on left */}
      <motion.div
        className={styles.aboutContent}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1 }}
      >
        <h1 className={`${styles.name} ${styles.animatedText}`}>
          <span
            className={`${styles.textGlitch} ${styles.textReveal}`}
            data-text="Hi There,"
          >
            Hey!!  
            <br/>                     
          </span>
          <h5>I'm Aswitha</h5>
        </h1>

        <h2 className={styles.role}>
          <span className={styles.roleText}>Full Stack Developer</span>
          <span className={styles.roleLine}></span>
        </h2>

        <p className={styles.summary}>
          I build scalable, responsive and interactive web applications
          blending functionality and design. Skilled in 
          Angular, React, .NET, AWS, Azure, and modern architectures.
        </p>

        {/* <div className={styles.cta}>
          <a href="#contact" className={styles.ctaButton}>
            Let&apos;s Connect <i className="fas fa-arrow-right" />
            <span className={styles.ctaGlow}></span>
          </a>
        </div> */}
      </motion.div>
    </section>
  );
}
