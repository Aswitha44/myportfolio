import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { FaShareAlt, FaExternalLinkAlt } from 'react-icons/fa';
import styles from '@/styles/Projects.module.css';
import userData from '../../data/user-data.json';

// Default project images - you can replace these with actual project images
const projectImages = {
  "Ski Surf E-commerce Web Application": "/projects/ski-surf.jpg",
  "Smart Blog Platform": "/projects/blog.jpg",
  "Serverless Automated File Processing System": "/projects/serverless.jpg",
  "Next-Gen Yoga App": "/projects/yoga.jpg",
  "Cyber Guardian": "/projects/cyberg.jpg",
  "Handwritten Digit Recognition": "/projects/digit.png",
  "Portfolio Website": "/projects/portfolio.png"
};

// Extract tech stacks from project descriptions
const extractTechStack = (description) => {
  const techKeywords = [
    "Angular", "Bootstrap", "Stripe", "Redis", ".NET Core", "Azure","JWT",
    "ASP.NET Core", "Razor Pages", "SQL Server", "JavaScript", "AJAX",
    "AWS", "S3", "React", "Firestore", "Vector Search", "Vertex AI",
    "Google Cloud", "Flask", "Gemini 2.0","Next.js","FastAPI","OpenCV","TensorFlow","YOLO","SVM"
  ];
  
  return description
    .join(" ")
    .split(" ")
    .filter(word => techKeywords.some(tech => 
      word.toLowerCase().includes(tech.toLowerCase())
    ));
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const cardVariants = (index) => ({
  hidden: { 
    opacity: 0,
    y: 100,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: index * 0.1
    }
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
});

export default function Projects() {
  const galleryRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollXProgress } = useScroll({
    container: galleryRef
  });
  
  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={styles.container} ref={sectionRef}>
      <div className="aurora-bg">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>

      <div className={styles.galleryWrapper} ref={galleryRef}>
        <motion.div 
          className={styles.gallery}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          exit="exit"
        >
          {userData.projects.map((project, index) => (
            <motion.div 
              key={index}
              className={styles.projectCard}
              variants={cardVariants(index)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(38, 208, 124, 0.3)",
                borderColor: "var(--aurora-green)"
              }}
            >
              <motion.div 
                className={styles.imageWrapper}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {project.link && (
                  <motion.a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.shareIcon}
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt />
                  </motion.a>
                )}
                <img 
                  src={projectImages[project.title] || `/projects/default.jpg`} 
                  alt={project.title} 
                />
                <motion.div 
                  className={styles.overlay}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3>{project.title}</h3>
                  <div className={styles.overlayContent}>
                    <p>{project.description[0]}</p>
                    <div className={styles.techStack}>
                      {extractTechStack(project.description).map((tech, i) => (
                        <motion.span 
                          key={i} 
                          className={styles.techTag}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className={styles.scrollProgress}
        style={{ scaleX: smoothProgress }}
      />

      {/* Scroll to Explore Indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to Explore PROJECTS</span>
        <div className={styles.scrollArrow}></div>
      </div>
    </div>
  );
}
