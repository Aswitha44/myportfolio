// components/PageTransition.js
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StarBackground from './StarBackground';

const PageTransition = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <StarBackground />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      
      <style jsx>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(10, 10, 42, 0.8);
          z-index: 1000;
        }

        .loading-spinner {
          width: 80px;
          height: 80px;
          position: relative;
        }

        .spinner {
          width: 100%;
          height: 100%;
          border: 4px solid transparent;
          border-top: 4px solid var(--aurora-green);
          border-right: 4px solid var(--aurora-green);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 20px rgba(38, 208, 124, 0.4);
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        :global(body) {
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          background: #0a0a2a;
        }
      `}</style>
    </div>
  );
};

export default PageTransition;