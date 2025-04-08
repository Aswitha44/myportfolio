// pages/index.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/About.module.css';
import userData from '../data/user-data.json';
import StarBackground from '../components/StarBackground';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      {/* Wallpaper Section */}
      <div className="wallpaper-container">
        <Image
          src="/wallpaper.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="0% center"
          quality={100}
          priority
          className="wallpaper-image"
        />
        <div className="wallpaper-overlay" />
        <StarBackground />
      </div>
      
      {/* Content Section */}
      <div className="content-layout">
        <div className="content-left"></div>
        <div className="content-center"></div>
        <div className="content-right">
          <div className={styles.aboutSection}>
            <div className={styles.aboutContent}>
              <h1 className={`${styles.name} glow-text ${styles.animatedText}`}>
                <span className={`${styles.textGlitch} ${styles.textReveal}`}>Hi There,</span> 
                <p><span className={`${styles.highlight}`}>I'm {userData.name}</span></p>
              </h1>
              
              <h2 className={`${styles.role} ${styles.textFadeIn}`}>
                <span className={styles.roleText}>Full Stack Developer</span>
                <span className={styles.roleLine}></span>
              </h2>
              
              <p className={`${styles.summary} ${styles.textFadeUp}`}>
                I specialize in creating scalable, responsive and interactive web applications with
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
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #0a0a2a;
        }
      `}</style>

      <style jsx>{`
        :root {
          --aurora-green: #64ffda;
          --aurora-blue: #00c6ff;
          --text-light: #ccd6f6;
          --navy-blue: #0a192f;
          --light-navy: #112240;
          --lightest-navy: #233554;
          --navy-shadow: rgba(2,12,27,0.7);
          --dark-slate: #495670;
          --slate: #8892b0;
          --light-slate: #a8b2d1;
          --lightest-slate: #ccd6f6;
          --white: #e6f1ff;
        }

        .home-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
        }

        .wallpaper-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .wallpaper-image {
          position: fixed !important;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 0% center;
        }

        .wallpaper-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 42, 0.3);
          z-index: 1;
        }

        .content-layout {
          position: relative;
          z-index: 2;
          width: 100%;
          min-height: 100vh;
          display: flex;
        }

        .content-left {
          flex: 1;
          min-width: 30%;
        }

        .content-center {
          flex: 1;
          min-width: 20%;
        }

        .content-right {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-right: 5%;
        }

        .aboutSection {
          width: 100%;
          max-width: 800px;
          padding-right: 2rem;
        }

        @media (max-width: 768px) {
          .content-layout {
            flex-direction: column;
          }

          .content-left, .content-center {
            display: none;
          }

          .content-right {
            width: 100%;
            padding: 1rem;
            justify-content: center;
          }

          .aboutSection {
            width: 100%;
            max-width: 100%;
            padding: 1rem;
          }
          
          .aboutContent {
            text-align: center;
          }
          
          .name {
            font-size: 2rem;
          }
          
          .role {
            font-size: 1.2rem;
          }
          
          .summary {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .wallpaper-image {
            object-position: 30% center;
          }
        }
      `}</style>
    </div>
  );
}