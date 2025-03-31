import { motion } from 'framer-motion';
import styles from '../styles/LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.stars}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
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
        <motion.div
          className={styles.spinner}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 20px rgba(38, 208, 124, 0.3)",
              "0 0 40px rgba(38, 208, 124, 0.5)",
              "0 0 20px rgba(38, 208, 124, 0.3)"
            ]
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            boxShadow: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <div className={styles.spinnerInner} />
        </motion.div>
      </div>
    </div>
  );
} 