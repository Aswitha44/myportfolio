// pages/_app.js
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StarBackground from '../components/StarBackground';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import PageTransition from '../components/PageTransition';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownIntro, setHasShownIntro] = useState(false);

  useEffect(() => {
    // Handle page loading
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      if (!hasShownIntro) {
        // On first visit, show intro animation for 4 seconds
        setTimeout(() => {
          setHasShownIntro(true);
          setIsLoading(false);
        }, 4000);
      } else {
        // On subsequent navigations, show loading for 1 second
        setTimeout(() => {
          setIsLoading(false);
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
  }, [router, hasShownIntro]);

  return (
    <>
      <Head>
        <title>Aswitha Basam - Portfolio</title>
        <meta name="description" content="Aswitha Basam's Professional Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>
      
      <div className="app-container">
        <StarBackground />
        
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              className="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="loading-content">
                {!hasShownIntro ? (
                  <motion.div
                    className="intro-animation"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="pencil-logo">
                      <div className="pencil-body"></div>
                      <div className="pencil-tip"></div>
                      <div className="pencil-eraser"></div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="loading-spinner"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="spinner"></div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <PageTransition key={router.route}>
          <Navbar />
          <Component {...pageProps} />
        </PageTransition>
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
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
        }

        .loading-content {
          text-align: center;
          color: #fff;
          background: rgba(0, 0, 0, 0.2);
          padding: 2rem;
          border-radius: 1rem;
          backdrop-filter: blur(3px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid #4ecdc4;
          border-top: 3px solid transparent;
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-content p {
          font-size: 1.2rem;
          color: #4ecdc4;
          text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
        }
      `}</style>
    </>
  );
}

export default MyApp;
