import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Projects.module.css";
import userData from "../data/user-data.json";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const reelRef = useRef(null);
  const progressRef = useRef(null);

  const cardWidth = 400; // Width of a single card
  const gap = 120; // Increased gap for film reel effect

  const scrollToProject = (index) => {
    const scrollPosition = index * (cardWidth + gap);

    reelRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    setActiveProject(index);
  };

  const handlePrev = () => {
    if (activeProject > 0) {
      scrollToProject(activeProject - 1);
    }
  };

  const handleNext = () => {
    if (activeProject < userData.projects.length - 1) {
      scrollToProject(activeProject + 1);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = reelRef.current;
      if (!container) return;

      const scrollPosition = container.scrollLeft;
      const newActiveIndex = Math.round(scrollPosition / (cardWidth + gap));

      if (newActiveIndex !== activeProject) {
        setActiveProject(newActiveIndex);
      }
    };

    const container = reelRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [activeProject]);

  return (
    <div className="container">
      <h1 className={`${styles.pageTitle} glow-text`}>Projects</h1>

      <div className={styles.projectsContainer}>
        <div className={styles.reelContainer}>
          <div className={styles.reelWrapper} ref={reelRef}>
            {userData.projects.map((project, index) => (
              <motion.div
                key={index}
                className={`${styles.projectCard} ${
                  activeProject === index ? styles.active : ""
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: activeProject === index ? -20 : 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                onClick={() => scrollToProject(index)}
              >
                <a
                  href={project.link || project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                  onClick={(e) => e.stopPropagation()} // Prevents interference with scrolling
                >
                  <FaExternalLinkAlt />
                </a>
                <div className={styles.cardContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>

                  <ul className={styles.projectDescription}>
                    {project.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dynamic Progress Bar */}
          <div className={styles.progressBar}>
            {userData.projects.map((_, index) => (
              <div
                key={index}
                className={`${styles.progressSegment} ${
                  activeProject === index ? styles.activeSegment : ""
                }`}
               
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className={styles.projectNavigation}>
            <button
              className={`${styles.projectNavArrow} ${
                activeProject === 0 ? styles.disabled : ""
              }`}
              onClick={handlePrev}
              aria-label="Previous project"
              disabled={activeProject === 0}
            >
              <FaArrowLeft />
            </button>
            <button
              className={`${styles.projectNavArrow} ${
                activeProject === userData.projects.length - 1
                  ? styles.disabled
                  : ""
              }`}
              onClick={handleNext}
              aria-label="Next project"
              disabled={activeProject === userData.projects.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
