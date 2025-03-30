import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import styles from '../styles/IntroAnimation.module.css';

const IntroAnimation = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if animation has been shown before
    const hasShownAnimation = localStorage.getItem('hasShownAnimation');
    
    if (!hasShownAnimation) {
      setShow(true);
      
      // Set flag in localStorage after animation
      const timer = setTimeout(() => {
        setShow(false);
        localStorage.setItem('hasShownAnimation', 'true');
      }, 3000); // Match the animation duration

      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className={styles.pencilContainer}>
      <div className={styles.writingText}>Welcome to My Portfolio</div>
      <FaPencilAlt className={styles.pencil} />
    </div>
  );
};

export default IntroAnimation; 