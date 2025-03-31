import { motion } from 'framer-motion';
import styles from '../styles/LoadingScreen.module.css';
import { Stars } from './IntroAnimation';

export default function LoadingScreen() {
  return (
    <div className={styles.loadingContainer}>
      <Stars />
      <div className={styles.loadingContent}>
        <div className={styles.loadingWrapper}>
          <motion.div
            className={styles.hexagon}
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className={styles.hexagonInner} />
          </motion.div>
          <motion.div
            className={styles.particles}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                animate={{
                  x: [0, 50, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  transform: `rotate(${i * 60}deg) translateY(30px)`
                }}
              />
            ))}
          </motion.div>
        </div>
        <motion.div
          className={styles.loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.loadingDots}>
            Loading
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ...
            </motion.span>
          </span>
        </motion.div>
      </div>
    </div>
  );
} 