// pages/skills.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Skills.module.css';
import userData from '../data/user-data.json';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('languages');
  
  const skillCategories = [
    { id: 'languages', name: 'Programming Languages', icon: 'fas fa-code' },
    { id: 'webDevelopment', name: 'Web Development', icon: 'fas fa-globe' },
    { id: 'database', name: 'Database', icon: 'fas fa-database' },
    { id: 'cloudAndDevOps', name: 'Cloud & DevOps', icon: 'fas fa-cloud' },
    { id: 'certifications', name: 'Certifications', icon: 'fas fa-certificate' },
  ];

  const getSkillDescription = (skill, category) => {
    const descriptions = {
      languages: {
        'Java': 'Proficient in Java development for building scalable applications.',
        'Python': 'Experienced with Python for data processing and backend development.',
        'C': 'Knowledge of C for systems programming and performance-critical applications.',
        'C++': 'Skilled in C++ for developing efficient applications and algorithms.',
        'C#': 'Expert in C# for building enterprise-grade .NET applications.'
      },
      webDevelopment: {
        'ASP.NET': 'Expert in building robust web applications using ASP.NET Core MVC and Razor Pages.',
        'React': 'Proficient in React for creating dynamic, responsive user interfaces.',
        'Angular': 'Experience with Angular for building structured, component-based web applications.',
        'JavaScript': 'Strong foundation in vanilla JavaScript for client-side development.',
        'TypeScript': 'Skilled in TypeScript for type-safe JavaScript development.',
        'NodeJS': 'Knowledge of Node.js for server-side JavaScript applications.',
        'Tailwind': 'Proficient with Tailwind CSS for rapid, utility-first styling.'
      },
      database: {
        'SQL Server': 'Expert in SQL Server for enterprise database solutions and optimizations.',
        'MySQL': 'Experience with MySQL for relational database management.',
        'MongoDB': 'Knowledge of MongoDB for document-based NoSQL databases.'
      },
      cloudAndDevOps: {
        'Docker': 'Skilled in Docker for containerization of applications.',
        'Azure': 'Experience with Azure cloud services for hosting and managing applications.',
        'AWS': 'AWS Certified Developer with hands-on experience in various AWS services.',
        'YAML': 'Proficient in YAML for configuration files in CI/CD pipelines.',
        'Bash Scripting': 'Knowledge of Bash scripting for automation tasks.'
      },
      certifications: {
        'AWS Certified Developer – Associate': 'Validated expertise in developing AWS cloud applications.',
        'Microsoft Certified: Azure Fundamentals': 'Foundation in Microsoft Azure cloud services and concepts.'
      }
    };
    
    return descriptions[category]?.[skill] || `Skilled in ${skill} development.`;
  };

  return (
    <div className="container">
      <h1 className={`${styles.pageTitle} glow-text`}>Skills & Expertise</h1>
      
      <div className={styles.skillsSection}>
        <div className={styles.skillsIcons}>
          {skillCategories.map((category) => (
            <div 
              key={category.id} 
              className={`${styles.skillIcon} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <i className={category.icon}></i>
              <p>{category.name}</p>
              {activeCategory === category.id && (
                <motion.div className={styles.activeIndicator} layoutId="activeIndicator" />
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.skillsContent}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.skillsList}
            >
              <h2 className={styles.categoryTitle}>
                {skillCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>
              
              <div className={styles.skillCards}>
                {userData.skills[activeCategory]?.map((skill, index) => (
                  <motion.div 
                    key={skill}
                    className={styles.skillCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <h3 className={styles.skillName}>{skill}</h3>
                    <p className={styles.skillDescription}>
                      {getSkillDescription(skill, activeCategory)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}