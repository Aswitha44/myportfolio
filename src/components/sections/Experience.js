import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from '../../styles/Experience.module.css';
import userData from '../../data/user-data.json';

export default function Experience() {
  const timeline = [
    ...userData.education.map(i => ({ ...i, type: 'education' })),
    ...userData.experience.map(i => ({ ...i, type: 'experience' }))
  ].sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));

  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const [positions, setPositions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const ufoControls = useAnimation();

  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current) return;
      const mids = cardRefs.current.map((ref, idx) => {
        if (!ref) return null;
        return { idx, top: ref.offsetTop + ref.offsetHeight / 2 };
      }).filter(Boolean);
      setPositions(mids);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [timeline.length]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onScroll = () => {
      const centerY = el.scrollTop + el.clientHeight / 2;
      let closest = positions[0] || { idx: 0, top: 0 };
      positions.forEach(p => {
        if (Math.abs(p.top - centerY) < Math.abs(closest.top - centerY)) {
          closest = p;
        }
      });
      if (closest.idx !== activeIndex) {
        setActiveIndex(closest.idx);
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [positions, activeIndex]);

  useEffect(() => {
    const pos = positions[activeIndex];
    if (pos != null) {
      ufoControls.start({
        top: pos.top,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
      });
    }
  }, [activeIndex, positions, ufoControls]);

  return (
    <div className={styles.container}>
    <div className="aurora-bg">
      <div className="aurora aurora-1"></div>
      <div className="aurora aurora-2"></div>
      <div className="aurora aurora-3"></div>
    </div>
    <section id="experience" className={styles.experienceSection}>
        <h2 className={styles.pageTitle}>Education & Work Experience </h2>

        <div ref={wrapperRef} className={styles.timelineWrapper}>
          <div className={styles.verticalLine} />
          <motion.div
            className={styles.ufo}
            initial={{ top: positions[0]?.top || 0 }}
            animate={ufoControls}
          >
            <span className={styles.ufoIcon}>🛸</span>
            <div className={styles.ufoGlow} />
          </motion.div>

          {timeline.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                ref={el => (cardRefs.current[idx] = el)}
                className={`${styles.cardWrapper} ${
                  isLeft ? styles.left : styles.right
                }`}
              >
                <motion.div
                  className={styles.card}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>
                      {item.type === 'education' ? '🎓' : '💼'}
                    </span>
                    <h3>
                      {item.type === 'education'
                        ? item.institution
                        : item.company}
                    </h3>
                  </div>
                  <p className={styles.role}>
                    {item.type === 'education' ? item.degree : item.role}
                  </p>
                  <p className={styles.duration}>{item.duration}</p>
                  {item.gpa && <p className={styles.gpa}>GPA: {item.gpa}</p>}
                  {item.responsibilities?.length > 0 && (
                    <ul className={styles.responsibilities}>
                      {item.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </div>

     
    
  );
}
