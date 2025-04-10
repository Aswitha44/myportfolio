import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PageTransition = ({ children }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [direction, setDirection] = useState('forward');

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    // Add loaded class to body when component mounts
    document.body.classList.add('loaded');
  }, []);

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = (url) => {
      setIsExiting(true);
      // Determine direction based on route change
      const currentPath = router.asPath;
      const newPath = url;
      setDirection(newPath > currentPath ? 'forward' : 'backward');
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '100vh',
      perspective: '1000px',
      transformStyle: 'preserve-3d'
    }}>
      <motion.div
        className="content-wrapper"
        initial={{ 
          opacity: 0, 
          rotateZ: direction === 'forward' ? 30 : -30,
          scale: 0.95,
          transformOrigin: 'center center'
        }}
        animate={{ 
          opacity: 1, 
          rotateZ: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
        exit={{ 
          opacity: 0, 
          rotateZ: direction === 'forward' ? -30 : 30,
          scale: 0.95,
          transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
        onAnimationComplete={() => {
          if (isExiting) {
            setIsExiting(false);
          }
        }}
      >
        {children}
      </motion.div>
      
      <style jsx>{`
        .content-wrapper {
          position: relative;
          z-index: 1;
          background: #0a0a2a;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          min-height: 100vh;
          width: 100%;
        }

        :global(body) {
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          background: #0a0a2a;
        }

        :global(.content-wrapper *) {
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        :global(.content-wrapper > *) {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default PageTransition;