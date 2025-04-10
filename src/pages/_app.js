// pages/_app.js
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import PageTransition from '../components/PageTransition';
import IntroAnimation from '../components/IntroAnimation';
import '../styles/globals.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if this is the first visit or a refresh
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowIntro(true);
      sessionStorage.setItem('hasVisited', 'true');
    }

    // Handle page loading
    const handleStart = () => {
      setIsRouteChanging(true);
      setIsLoading(true);
      setShowContent(false);
    };

    const handleComplete = () => {
      // Wait for the page to be fully loaded
      if (document.readyState === 'complete') {
        if (showIntro) {
          // Show intro for 4 seconds on first visit
          setTimeout(() => {
            setShowIntro(false);
            setIsLoading(false);
            setShowContent(true);
            setIsRouteChanging(false);
          }, 4000);
        } else {
          // Add a small delay to ensure smooth transition
          setTimeout(() => {
            setIsLoading(false);
            setShowContent(true);
            setIsRouteChanging(false);
          }, 300);
        }
      } else {
        // If page isn't fully loaded, wait for it
        window.addEventListener('load', () => {
          if (showIntro) {
            setTimeout(() => {
              setShowIntro(false);
              setIsLoading(false);
              setShowContent(true);
              setIsRouteChanging(false);
            }, 4000);
          } else {
            setTimeout(() => {
              setIsLoading(false);
              setShowContent(true);
              setIsRouteChanging(false);
            }, 300);
          }
        });
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Initial load
    handleComplete();

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, showIntro]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Aswitha's Portfolio</title>
        <meta name="description" content="Aswitha's Professional Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <style>{`
          body {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          body.loaded {
            opacity: 1;
          }
          * {
            transform-style: preserve-3d;
            backface-visibility: hidden;
          }
        `}</style>
      </Head>
      
      <div className="app-container">
        <AnimatePresence mode="wait">
          {showIntro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}
            >
              <IntroAnimation />
            </motion.div>
          )}
          
          {(isLoading || isRouteChanging) && !showIntro && (
            <motion.div
              className="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="loading-aurora">
                <div className="aurora-layer1" />
                <div className="aurora-layer2" />
                <div className="aurora-layer3" />
              </div>
              <div className="loading-stars">
                {[...Array(50)].map((_, i) => {
                  const leftPos = Math.random() * 100;
                  const topPos = Math.random() * 100;
                  const starSize = Math.random() * 2 + 1;
                  const delay = Math.random() * 2;
                  const duration = Math.random() * 1 + 0.5;
                  const brightness = Math.random() * 0.5 + 0.5;
                  
                  return (
                    <motion.div
                      key={i}
                      className="loading-star"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, brightness, 0],
                        scale: [0, 1.2, 0],
                      }}
                      transition={{
                        duration: duration,
                        delay: delay,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 1,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${leftPos}%`,
                        top: `${topPos}%`,
                        width: `${starSize}px`,
                        height: `${starSize}px`,
                        boxShadow: `0 0 ${starSize * 2}px rgba(255, 255, 255, ${brightness})`
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
        
        {showContent && !showIntro && <Navbar />}
        
        <AnimatePresence mode="wait">
          {showContent && (
            <PageTransition key={router.route}>
              <Component {...pageProps} />
            </PageTransition>
          )}
        </AnimatePresence>
      </div>
      
      <div className="blurred-bg" />
      
      <style jsx global>{`
        .app-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
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
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .loading-aurora {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          transform-style: preserve-3d;
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
          transform-style: preserve-3d;
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
          animation-delay: -6.66667s;
        }

        .aurora-layer3 {
          background: radial-gradient(circle at center, 
            rgba(38, 208, 124, 0.1) 0%,
            rgba(38, 208, 124, 0.05) 20%,
            rgba(38, 208, 124, 0.02) 40%,
            transparent 70%
          );
          animation-delay: -13.33333s;
        }

        @keyframes auroraMove {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loading-stars {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .loading-star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 2s infinite;
          transform-style: preserve-3d;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .loading-content {
          position: relative;
          z-index: 2;
          transform-style: preserve-3d;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          transform-style: preserve-3d;
        }

        .spinner {
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top-color: #26d07c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          transform-style: preserve-3d;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .blurred-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0a0a2a;
          z-index: -1;
          transform-style: preserve-3d;
        }
      `}</style>
    </>
  );
}

export default MyApp;
