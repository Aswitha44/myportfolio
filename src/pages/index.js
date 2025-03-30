// pages/index.js
import Image from 'next/image';
import styles from '../styles/About.module.css';
import userData from '../data/user-data.json';

export default function Home() {
  return (
    <div className="container">
      <div className={styles.aboutSection}>
        <div className={styles.bitmoji}>
          <div className={styles.bitmojiWrapper}>
            <Image 
              src="/bitmoji.png"
              alt="Aswitha Basam Bitmoji"
              width={400}
              height={400}
              layout="responsive"
              className={styles.bitmojiImage}
            />
          </div>
        </div>
        
        <div className={styles.aboutContent}>
          <h1 className={`${styles.name} glow-text`}>
            Hi There,  <span className={styles.highlight}>I'm {userData.name}</span>
          </h1>
          <h2 className={styles.role}>Full Stack Developer</h2>
          <p className={styles.summary}>
            Passionate software developer with expertise in full-stack development using .NET, React, 
            and cloud technologies. Currently pursuing a Master's in Computer Science 
            at the University of Central Florida, I specialize in creating scalable, 
            efficient web applications with a focus on modern architectures and best practices.
          </p>
          
          <div className={styles.cta}>
            <a href="/contact" className={styles.ctaButton}>
              Let's Connect <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}