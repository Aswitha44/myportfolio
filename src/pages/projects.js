import React from 'react';
import { motion } from 'framer-motion';
import { FaShareAlt, FaExternalLinkAlt } from 'react-icons/fa';
import styles from '@/styles/Projects.module.css';
import userData from '../data/user-data.json';

// Default project images - you can replace these with actual project images
const projectImages = {
  "Ski Surf E-commerce Web Application": "/projects/ski-surf.jpg",
  "Smart Blog Platform": "/projects/blog.jpg",
  "Serverless Automated File Processing System": "/projects/serverless.jpg",
  "Next-Gen Yoga App": "/projects/yoga.jpg",
  "Portfolio Website": "/projects/portfolio.jpg"
};

// Extract tech stacks from project descriptions
const extractTechStack = (description) => {
  const techKeywords = [
    "Angular", "Bootstrap", "Stripe", "Redis", ".NET Core", "Azure",
    "ASP.NET Core", "Razor Pages", "SQL Server", "JavaScript", "AJAX",
    "AWS", "S3", "React", "Firestore", "Vector Search", "Vertex AI",
    "Google Cloud", "Flask", "Gemini 2.0"
  ];
  
  return description
    .join(" ")
    .split(" ")
    .filter(word => techKeywords.some(tech => 
      word.toLowerCase().includes(tech.toLowerCase())
    ));
};

export default function Projects() {
  return (
    <>  
      <div className={styles.container}>
      <div className="aurora-bg">
    <div className="aurora aurora-1"></div>
    <div className="aurora aurora-2"></div>
    <div className="aurora aurora-3"></div>
  </div>
      <motion.h1 
        className={`${styles.pageTitle} glow-text`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Projects
      </motion.h1>

      <div className={styles.galleryWrapper}>
        <motion.div 
          className={styles.gallery}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {userData.projects.map((project, index) => (
            <motion.div 
              key={index}
              className={styles.projectCard}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className={styles.imageWrapper}>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.shareIcon}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
                <img 
                  src={projectImages[project.title] || `/projects/default.jpg`} 
                  alt={project.title} 
                />
                <div className={styles.overlay}>
                  <h3>{project.title}</h3>
                  <p>{project.description[0]}</p>
                  <div className={styles.techStack}>
                    {extractTechStack(project.description).map((tech, i) => (
                      <span key={i} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
       
      </div>
      <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll to explore</span>
          <div className={styles.scrollArrow} />
        </div>
    </div>
    </>
  
  );
}
