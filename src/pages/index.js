// pages/index.js
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/About.module.css';
import userData from '../data/user-data.json';

export default function Home() {
  const bitmojiRef = useRef(null);
  
  useEffect(() => {
    // 3D hover effect for bitmoji
    const bitmojiElement = bitmojiRef.current;
    
    if (bitmojiElement) {
      const handleMouseMove = (e) => {
        const rect = bitmojiElement.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        bitmojiElement.style.transform = `
          
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          
        `;
      };
      
      const handleMouseLeave = () => {
        bitmojiElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      };
      
      bitmojiElement.addEventListener('mousemove', handleMouseMove);
      bitmojiElement.addEventListener('mouseleave', handleMouseLeave);
      
      // Entrance animation
      setTimeout(() => {
        bitmojiElement.classList.add(styles.bitmojiEnter);
      }, 300);
      
      return () => {
        bitmojiElement.removeEventListener('mousemove', handleMouseMove);
        bitmojiElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="container">
      <div className="aurora-bg">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>
      
      <div className={styles.aboutSection}>
        <div className={styles.bitmoji}>
          <div className={styles.bitmojiWrapper} ref={bitmojiRef}>
            <div className={styles.bitmojiGlow}></div>
            <Image
              src="/bitmoji.jpeg"
              alt="Aswitha Basam Bitmoji"
              width={400}
              height={400}
              layout="responsive"
              className={styles.bitmojiImage}
              priority
            />
            <div className={styles.bitmojiOverlay}></div>
          </div>
          <div className={styles.floatingParticles}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${styles.particle} ${styles['particle' + i]}`}></div>
            ))}
          </div>
        </div>
        
        <div className={styles.aboutContent}>
          <h1 className={`${styles.name} glow-text ${styles.animatedText}`}>
            <span className={` ${styles.textGlitch} ${styles.textReveal}`}>Hi There,</span> 
            <p><span className={`${styles.highlight}`}>I'm {userData.name}</span></p>
          </h1>
          
          <h2 className={`${styles.role} ${styles.textFadeIn}`}>
            <span className={styles.roleText}>Full Stack Developer</span>
            <span className={styles.roleLine}></span>
          </h2>
          
          <p className={`${styles.summary} ${styles.textFadeUp}`}>
          I specialize in creating scalable,responsive and interactive web applications with
          a focus on both functionality and stunning visual design. I leverage the latest
          technologies like Angular, React, .NET, AWS and Azure with expertise using 
          modern architectures and best practices.
          </p>
          
          <div className={`${styles.cta} ${styles.ctaFadeIn}`}>
            <a href="/contact" className={styles.ctaButton}>
              Let's Connect <i className="fas fa-arrow-right"></i>
              <span className={styles.ctaGlow}></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}