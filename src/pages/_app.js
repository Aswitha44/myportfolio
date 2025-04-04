// pages/_app.js
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StarBackground from '../components/StarBackground';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import PageTransition from '../components/PageTransition';
import IntroAnimation from '../components/IntroAnimation';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if this is the first visit or a refresh
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowIntro(true);
      sessionStorage.setItem('hasVisited', 'true');
    }

    // Handle page loading
    const handleStart = () => {
      setIsLoading(true);
      setShowContent(false);
    };

    const handleComplete = () => {
      if (showIntro) {
        // On first visit, show intro animation for 4 seconds
        setTimeout(() => {
          setShowIntro(false);
          setIsLoading(false);
          setShowContent(true);
        }, 4000);
      } else {
        // On subsequent navigations, show loading for 1 second
        setTimeout(() => {
          setIsLoading(false);
          setShowContent(true);
        }, 1000);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);

    // Initial load
    handleComplete();

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router, showIntro]);

  return (
    <>
      <Head>
        <title>Aswitha - Portfolio</title>
        <meta name="description" content="Aswitha's Professional Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>
      
      <div className="app-container">
        <StarBackground />
        <AnimatePresence mode="wait">
          {showIntro && <IntroAnimation />}
          {isLoading && !showIntro && (
            <motion.div
              className="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="loading-aurora">
                <div className="aurora-layer1" />
                <div className="aurora-layer2" />
                <div className="aurora-layer3" />
              </div>
              <div className="loading-stars">
              {[...Array(90)].map((_, i) => {
  // Use seeded random based on index for consistent values
  const leftPos = ((i * 13) % 100);
  const topPos = ((i * 17) % 100);
  const starSize = (i % 5) + 2;
  
  return (
    <motion.div
      key={i}
      className="loading-star"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0],
      }}
      transition={{
        duration: 2,
        delay: i * 0.05,
        repeat: Infinity,
        repeatDelay: (i % 20) * 0.1, // Deterministic delay
        ease: "easeInOut"
      }}
      style={{
        left: `${leftPos}%`,
        top: `${topPos}%`,
        width: `${starSize}px`,
        height: `${starSize}px`,
      }}
    />
  );
})}
              </div>
              <div className="loading-content">
                <motion.div
                  className="loading-spinner"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="spinner"></div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {showContent && (
            <PageTransition key={router.route}>
              <Navbar />
      
              <Component {...pageProps} />
              
            </PageTransition>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx global>{`
        .app-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          background: #0a0a2a;
          overflow: hidden;
        }

        .loading-aurora {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .aurora-layer1,
        .aurora-layer2,
        .aurora-layer3 {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          opacity: 0.15;
          filter: blur(60px);
          animation: auroraMove 20s infinite linear;
        }

        .aurora-layer1 {
          background: radial-gradient(circle at center, 
            rgba(38, 208, 124, 0.3) 0%,
            rgba(38, 208, 124, 0.2) 20%,
            rgba(38, 208, 124, 0.1) 40%,
            transparent 70%
          );
          animation-delay: 0s;
        }

        .aurora-layer2 {
          background: radial-gradient(circle at center, 
            rgba(38, 208, 124, 0.2) 0%,
            rgba(38, 208, 124, 0.15) 20%,
            rgba(38, 208, 124, 0.1) 40%,
            transparent 70%
          );
          animation-delay: -7s;
        }

        .aurora-layer3 {
          background: radial-gradient(circle at center, 
            rgba(38, 208, 124, 0.1) 0%,
            rgba(38, 208, 124, 0.08) 20%,
            rgba(38, 208, 124, 0.05) 40%,
            transparent 70%
          );
          animation-delay: -14s;
        }

        .loading-stars {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .loading-star {
          position: absolute;
          background: white;
          border-radius: 50%;
          filter: blur(1px);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        }

        .loading-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .loading-spinner {
          width: 100px;
          height: 100px;
          border: 4px solid rgba(38, 208, 124, 0.3);
          border-top: 4px solid transparent;
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 30px rgba(38, 208, 124, 0.4);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes auroraMove {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-content p {
          font-size: 1.2rem;
          color: var(--aurora-green);
          text-shadow: 0 0 15px rgba(38, 208, 124, 0.6);
        }

        /* Prevent horizontal scroll during transitions */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}

export default MyApp;
