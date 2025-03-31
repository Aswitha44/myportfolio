// pages/experience.js
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap } from 'react-icons/fa';
import styles from '../styles/Experience.module.css';
import userData from '../data/user-data.json';

export default function Experience() {
  const [activeSection, setActiveSection] = useState('education');
  const [educationRef, educationInView] = useInView({ threshold: 0.3 });
  const [workRef, workInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (educationInView) setActiveSection('education');
    if (workInView) setActiveSection('work');
  }, [educationInView, workInView]);

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.container}>
      <motion.h1 
        className={`${styles.pageTitle} glow-text`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Education & Experience
      </motion.h1>
      
      <div className={styles.experienceSection}>
        {/* Education Section */}
        <motion.div
          className={styles.educationSection}
          ref={educationRef}
          initial="hidden"
          animate={educationInView ? "visible" : "hidden"}
        >
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.educationList}>
            {userData.education.map((edu, index) => (
              <motion.div
                className={styles.educationItem}
                key={index}
                variants={cardVariants}
                custom={index}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  translateZ: 50,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={styles.iconWrapper}>
                  <FaGraduationCap className={styles.graduationIcon} />
                </div>
                <div className={styles.educationCard}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.institution}>{edu.institution}</h3>
                    <p className={styles.degree}>{edu.degree}</p>
                    <p className={styles.duration}>{edu.duration}</p>
                    {edu.gpa && <p className={styles.gpa}>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Work Experience Section */}
        <motion.div 
          className={styles.workSection} 
          ref={workRef}
          initial="hidden"
          animate={workInView ? "visible" : "hidden"}
        >
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <div className={styles.timeline}>
            {userData.experience.map((exp, index) => (
              <motion.div
                className={styles.timelineItem}
                key={index}
                variants={cardVariants}
                custom={index}
                transition={{ delay: index * 0.2 }}
              >
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineCard}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.company}>{exp.company}</h3>
                    <p className={styles.role}>{exp.role}</p>
                    <p className={styles.duration}>{exp.duration}</p>
                    <ul className={styles.responsibilities}>
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex}>{resp}</li>
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