// pages/experience.js
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import userData from '../data/user-data.json';
import styles from '../styles/Experience.module.css';

export default function Experience() {
  return (
    <div className={styles.container}>
      <motion.h1 
        className={styles.pageTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h1>

      <div className={styles.experienceSection}>
        <motion.div 
          className={styles.educationSection}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.sectionHeader}>
            <FaGraduationCap className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Education</h2>
          </div>
          
          <div className={styles.educationList}>
            {userData.education.map((edu, index) => (
              <motion.div
                key={`${edu.institution}-${edu.degree}-${index}`}
                className={styles.educationItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className={styles.educationCard}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.institution}>{edu.institution}</h3>
                    <p className={styles.degree}>{edu.degree}</p>
                    <p className={styles.duration}>{edu.duration}</p>
                    {edu.gpa && <span className={styles.gpa}>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.workSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.sectionHeader}>
            <FaBriefcase className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Work Experience</h2>
          </div>
          
          <div className={styles.timeline}>
            {userData.experience.map((work, index) => (
              <motion.div
                key={`${work.company}-${work.role}-${index}`}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className={styles.timelineDot} />
                <div className={styles.timelineCard}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.company}>{work.company}</h3>
                    <p className={styles.role}>{work.role}</p>
                    <p className={styles.duration}>{work.duration}</p>
                    <ul className={styles.responsibilities}>
                      {work.responsibilities.map((resp, i) => (
                        <li key={`${work.company}-${i}`}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}