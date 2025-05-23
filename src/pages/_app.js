// pages/_app.js
import Head from 'next/head';
import Navbar from '../components/Navbar';
import IntroAnimation from '../components/IntroAnimation';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Section imports (now in components/sections/)
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';

const SECTIONS = [
  { id: 'about', component: <About /> },
  { id: 'experience', component: <Experience /> },
  { id: 'projects', component: <Projects /> },
  { id: 'skills', component: <Skills /> },
  { id: 'contact', component: <Contact /> }
];

export default function MyApp() {
  const [appState, setAppState] = useState('intro'); // 'intro' | 'loading' | 'content'

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // First visit: Show intro animation
      sessionStorage.setItem('hasVisited', 'true');
      
      // After intro, show loading spinner
      const introTimer = setTimeout(() => {
        setAppState('loading');
        
        // After loading spinner, show content
        const loadingTimer = setTimeout(() => {
          setAppState('content');
        }, 1500);
        
        return () => clearTimeout(loadingTimer);
      }, 4000);
      
      return () => clearTimeout(introTimer);
    } else {
      // Return visit: Show loading spinner briefly
      const loadingTimer = setTimeout(() => {
        setAppState('content');
      }, 1500);
      
      return () => clearTimeout(loadingTimer);
    }
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Aswitha's Portfolio</title>
        <meta name="description" content="Aswitha's Professional Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence mode="wait">
        {appState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}
          >
            <IntroAnimation />
          </motion.div>
        )}

        {appState === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}
          >
            <LoadingSpinner />
          </motion.div>
        )}

        {appState === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar onLinkClick={scrollToSection} />
            <div className="scroll-wrapper">
              {SECTIONS.map(({ id, component }, index) => (
                <section key={id} id={id} className="full-section">
                  {component}
                  {index === 0 && (
                    <div className="downArrowWrapper" onClick={() => scrollToSection(SECTIONS[1].id)}>
                      <i className="fas fa-chevron-down downArrow"></i>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        html, body {
          padding: 0;
          margin: 0;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .scroll-wrapper {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100vh;
        }

        .full-section {
          scroll-snap-align: start;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .downArrowWrapper {
          position: absolute;
          bottom: 40px;
          left: 25%;
          transform: translateX(-50%);
          width: 45px;
          height: 45px;
          background: rgba(38, 208, 124, 0.1);
          border: 2px solid var(--aurora-green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(38, 208, 124, 0.4);
          animation: glowPulse 2s infinite;
          backdrop-filter: blur(8px);
          cursor: pointer;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .downArrowWrapper {
            bottom: 140px;
            left:50%;
          }
        }

        @media (max-width: 480px) {
          .downArrowWrapper {
            bottom: 140px;
            left:50%;
          }
        }

        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 10px rgba(38, 208, 124, 0.6);
          }
          50% {
            box-shadow: 0 0 20px rgba(38, 208, 124, 0.8);
          }
          100% {
            box-shadow: 0 0 10px rgba(38, 208, 124, 0.6);
          }
        }
      `}</style>
    </>
  );
}
