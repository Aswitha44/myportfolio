// components/PageTransition.js
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import StarBackground from './StarBackground'; // Removed

const PageTransition = ({ children }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Removed the loading state useEffect

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="content-wrapper"
      key={router.route}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}
    >
      {children}
      {/* Style block should remain, but cleaned up */}
      <style jsx>{`
        .content-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow-y: auto; /* Allow content inside to scroll if needed */
          padding-top: 84px; /* Add padding to account for fixed Navbar */
          flex: 1;
        }
      `}</style>
    </motion.div>
  );
};

export default PageTransition;