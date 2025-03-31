import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import styles from '../styles/Skills.module.css';
import userData from '../data/user-data.json';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('languages');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const controls = useAnimationControls();
  
  useEffect(() => {
    // Initial animation sequence
    if (isFirstLoad) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      });
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, controls]);

  // Stagger children animation helper
  const staggerChildren = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
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

  // Get progress value (for visual representation of skill level)
  const getSkillProgress = (skill, category) => {
    const progressValues = {
      languages: {
        'Java': 90,
        'Python': 85,
        'C': 75,
        'C++': 80,
        'C#': 95
      },
      webDevelopment: {
        'ASP.NET': 95,
        'React': 90,
        'Angular': 80,
        'JavaScript': 95,
        'TypeScript': 85,
        'NodeJS': 80,
        'Tailwind': 90
      },
      database: {
        'SQL Server': 95,
        'MySQL': 85,
        'MongoDB': 75
      },
      cloudAndDevOps: {
        'Docker': 85,
        'Azure': 90,
        'AWS': 85,
        'YAML': 80,
        'Bash Scripting': 75
      },
      certifications: {
        'AWS Certified Developer – Associate': 100,
        'Microsoft Certified: Azure Fundamentals': 100
      }
    };
    
    return progressValues[category]?.[skill] || 80;
  };

  return (
    <> 
  <motion.div 
    className={styles.container}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      <div className="aurora-bg">
    <div className="aurora aurora-1"></div>
    <div className="aurora aurora-2"></div>
    <div className="aurora aurora-3"></div>
  </div>
      <motion.h1 
        className={`${styles.pageTitle} glow-text`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          textShadow: [
            "0 0 5px rgba(38, 208, 124, 0.5)", 
            "0 0 20px rgba(38, 208, 124, 0.8)", 
            "0 0 5px rgba(38, 208, 124, 0.5)"
          ]
        }}
        transition={{ 
          duration: 1.5, 
          textShadow: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
      >
        Skills & Expertise
      </motion.h1>
      
      <div className={styles.skillsSection}>
        <motion.div 
          className={styles.skillsIcons}
          variants={staggerChildren}
          initial="hidden"
          animate="show"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.id} 
              className={`${styles.skillIcon} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.id)}
              variants={itemVariant}
              whileHover={{ 
                x: 10, 
                transition: { type: "spring", stiffness: 400 } 
              }}
              // Pop animation for active category
              animate={activeCategory === category.id ? {
                scale: [1, 1.1, 1.08],
                transition: { duration: 0.3 }
              } : {
                scale: 1,
                transition: { duration: 0.3 }
              }}
              custom={index}
            >
              <motion.i 
                className={category.icon}
                animate={activeCategory === category.id ? 
                  { 
                    scale: [1, 1.3, 1.2], 
                    color: ["#00C6FF", "#00C6FF", "#26D07C"],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                transition={{ 
                  duration: 2, 
                  repeat: activeCategory === category.id ? Infinity : 0,
                  repeatType: "reverse"
                }}
              ></motion.i>
              <p>{category.name}</p>
              {activeCategory === category.id && (
                <motion.div 
                  className={styles.activeIndicator} 
                  layoutId="activeIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <div className={styles.skillsContent}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
              className={styles.skillsList}
            >
                     
              <motion.div 
                className={styles.skillCards}
                variants={staggerChildren}
                initial="hidden"
                animate="show"
              >
                {userData.skills[activeCategory]?.map((skill, index) => (
                  <motion.div 
                    key={skill}
                    className={styles.skillCard}
                    variants={itemVariant}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: "0 10px 25px rgba(38, 208, 124, 0.3)",
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    custom={index}
                  >
                    <motion.h3 
                      className={styles.skillName}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + (index * 0.05) }}
                    >
                      {skill}
                    </motion.h3>
                    <motion.p 
                      className={styles.skillDescription}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + (index * 0.05) }}
                    >
                      {getSkillDescription(skill, activeCategory)}
                    </motion.p>
                    
                    <div className={styles.skillProgressWrapper}>
                      <motion.div 
                        className={styles.skillProgressBg}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3, delay: 0.4 + (index * 0.05) }}
                      >
                        <motion.div 
                          className={styles.skillProgressBar}
                          initial={{ width: 0 }}
                          animate={{ width: `${getSkillProgress(skill, activeCategory)}%` }}
                          transition={{ 
                            duration: 1, 
                            delay: 0.5 + (index * 0.05),
                            ease: "easeOut" 
                          }}
                        />
                      </motion.div>
                      <motion.span 
                        className={styles.skillProgressText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + (index * 0.05) }}
                      >
                        {getSkillProgress(skill, activeCategory)}%
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  </>

  );
}