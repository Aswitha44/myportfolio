// components/PageTransition.js
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import StarBackground from './StarBackground'; // Removed

const PageTransition = ({ children }) => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false); // Removed
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
      className="content-wrapper" // Keep this wrapper for motion
      key={router.route} // Add key here for AnimatePresence in _app.js
      initial={{ opacity: 0, y: 20 }} // Use existing page transition animation
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ position: 'relative', zIndex: 1, width: '100%' }} // Ensure wrapper takes width
    >
      {children}
      {/* Style block should remain, but cleaned up */}
      <style jsx>{`
        .content-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          /* min-height: calc(100vh - 84px); */ /* Remove min-height */
          flex-grow: 1; /* Allow wrapper to grow */
          display: flex;
          flex-direction: column;
          overflow-y: auto; /* Allow content inside to scroll if needed */
          padding-top: 84px; /* Add padding to account for fixed Navbar */
        }
      `}</style>
    </motion.div>
  );
};

export default PageTransition;