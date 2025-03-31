// components/PageTransition.js
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';  

const PageTransition = ({ children }) => {
  const router = useRouter();
   return (
    <motion.div
    key={router.route}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
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