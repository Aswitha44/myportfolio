import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import IntroAnimation from './IntroAnimation';

const Layout = ({ children }) => {
  return (
    <motion.div 
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="app-content"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Layout; 