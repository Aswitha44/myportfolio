// components/PageTransition.js
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const pageVariants = {
    initial: {
      rotateY: 90,
      opacity: 0,
      x: -100,
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      rotateY: -90,
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.6,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      style={{ 
        transformStyle: "preserve-3d", 
        perspective: "1200px",
        width: "100%",
        height: "100%"
      }}
    >
      <div className="aurora-bg">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>
      {children}
    </motion.div>
  );
};

export default PageTransition;