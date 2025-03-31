import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/About.module.css';
import userData from '../data/user-data.json';

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={styles.container}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h1 
        className={`${styles.pageTitle} glow-text`}
        variants={itemVariants}
      >
        About Me
      </motion.h1>

      <motion.div 
        className={styles.content}
        variants={itemVariants}
      >
        <div className={styles.profileSection}>
          <motion.div 
            className={styles.profileImage}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={userData.profileImage} alt="Profile" />
          </motion.div>
          
          <motion.div 
            className={styles.profileText}
            variants={itemVariants}
          >
            <h2>{userData.name}</h2>
            <p className={styles.title}>{userData.title}</p>
            <p className={styles.bio}>{userData.bio}</p>
          </motion.div>
        </div>

        <motion.div 
          className={styles.skillsSection}
          variants={itemVariants}
        >
          <h2>Skills & Expertise</h2>
          <div className={styles.skillsGrid}>
            {userData.skills.map((skill, index) => (
              <motion.div
                key={index}
                className={styles.skillItem}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <span className={styles.skillIcon}>{skill.icon}</span>
                <span className={styles.skillName}>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.interestsSection}
          variants={itemVariants}
        >
          <h2>Interests & Hobbies</h2>
          <div className={styles.interestsGrid}>
            {userData.interests.map((interest, index) => (
              <motion.div
                key={index}
                className={styles.interestItem}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className={styles.interestIcon}>{interest.icon}</span>
                <span className={styles.interestName}>{interest.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 