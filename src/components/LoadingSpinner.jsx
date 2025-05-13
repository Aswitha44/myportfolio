import React, { useEffect, useState } from 'react';
import styles from '../styles/LoadingSpinner.module.css';

const LoadingSpinner = () => {
  const [loadingText, setLoadingText] = useState('Loading...');
  const loadingMessages = [
    'Loading...',
    'Preparing your experience...',
    'Almost there...',
    'Getting everything ready...'
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.stars}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      <div className={styles.auroraBackground}>
        <div className={styles.auroraLayer1} />
        <div className={styles.auroraLayer2} />
        <div className={styles.auroraLayer3} />
      </div>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <div className={styles.spinnerInner} />
        </div>
        <div className={styles.loadingText}>{loadingText}</div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 