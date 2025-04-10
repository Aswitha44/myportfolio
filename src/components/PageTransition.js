import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const PageTransition = ({ children }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
      
      <style jsx>{`
        .content-wrapper {
          position: relative;
          z-index: 1;
          background: #0a0a2a;
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