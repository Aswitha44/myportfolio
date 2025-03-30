// pages/experience.js
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Experience.module.css';
import userData from '../data/user-data.json';

export default function Experience() {
  const [activeSection, setActiveSection] = useState('education');
  const educationRef = useRef(null);
  const workRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === educationRef.current) {
            setActiveSection('education');
          } else if (entry.target === workRef.current) {
            setActiveSection('work');
          }
        }
      });
    }, { threshold: 0.5 });

    if (educationRef.current) observer.observe(educationRef.current);
    if (workRef.current) observer.observe(workRef.current);

    return () => {
      if (educationRef.current) observer.unobserve(educationRef.current);
      if (workRef.current) observer.unobserve(workRef.current);
    };
  }, []);

  return (
    <div className="container">
      <h1 className={`${styles.pageTitle} glow-text`}>Education & Experience</h1>
      
      <div className={styles.experienceSection}>
        <div className={styles.educationSection} ref={educationRef}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.timeline}>
            {userData.education.map((edu, index) => (
              <div className={styles.timelineCard} key={index}>
                <div className={styles.cardContent}>
                  <h3 className={styles.institution}>{edu.institution}</h3>
                  <p className={styles.degree}>{edu.degree}</p>
                  <p className={styles.duration}>{edu.duration}</p>
                  {edu.gpa && <p className={styles.gpa}>GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.workSection} ref={workRef}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <div className={styles.timeline}>
            {userData.experience.map((exp, index) => (
              <div className={styles.timelineCard} key={index}>
                <div className={styles.cardContent}>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.role}>{exp.role}</p>
                  <p className={styles.location}>{exp.location}</p>
                  <p className={styles.duration}>{exp.duration}</p>
                  <ul className={styles.responsibilities}>
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}