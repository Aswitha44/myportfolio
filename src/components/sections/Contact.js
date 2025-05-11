import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styles from '../../styles/Contact.module.css';
import userData from '../../data/user-data.json';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: false, margin: "-100px" });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/c5623de0de525743ca56b4ad4391ff3b", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success === "true" || result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <section className={styles.container}>
      <div className="aurora-bg">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>

      <motion.div 
        className={styles.contactSection}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className={styles.contactInfo}>
          <div className={styles.contactText}>
            <motion.h1 
              className={`${styles.subTitle} glow-text`}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Let's Connect
            </motion.h1>
            
            <p className={styles.contactParagraph}>
              I'm currently open to new opportunities and collaborations. Feel free to reach out if you'd like to discuss a project, have questions, or just want to say hello.
            </p>
            <div className={styles.infoItems}>
              {/* <div className={styles.infoItem}>
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${userData.contact.email}`} className={styles.infoLink}>
                  {userData.contact.email}
                </a>
              </div> */}
              <div className={styles.infoItem}>
                <i className="fas fa-phone-alt"></i>
                <a href={`tel:${userData.contact.phone}`} className={styles.infoLink}>
                  {userData.contact.phone}
                </a>
              </div>
              <div className={styles.socialLinks}>
                {userData.contact.github && (
                  <motion.a 
                    href={userData.contact.github} 
                    className={styles.socialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                  <i className="fab fa-github"></i>
                  </motion.a>
                )}
                {userData.contact.linkedin && (
                  <motion.a 
                    href={userData.contact.linkedin} 
                    className={styles.socialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                  <i className="fab fa-linkedin-in"></i>
                  </motion.a>
                )}
                {userData.contact.twitter && (
                  <motion.a 
                    href={userData.contact.twitter} 
                    className={styles.socialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-twitter"></i>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          className={styles.contactForm}
          ref={formRef}
          variants={formVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className={styles.formWrapper}>
            <motion.h2 
              className={styles.formTitle}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Message Box
            </motion.h2>

            <AnimatePresence mode="wait">
            {submitted ? (
                <motion.div 
                  className={styles.successMessage}
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.i 
                    className="fas fa-check-circle"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  ></motion.i>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Thank you! Your message has been sent.
                  </motion.p>
                </motion.div>
            ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className={styles.form}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                >
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                    <motion.input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                      whileFocus={{ scale: 1.03 }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Your Email</label>
                    <motion.input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                      whileFocus={{ scale: 1.03 }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                    <motion.textarea
                    name="message"
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    required
                      whileFocus={{ scale: 1.03 }}
                    ></motion.textarea>
                </div>

                  <motion.button 
                    type="submit" 
                    className={styles.submitButton} 
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(38, 208, 124, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending...
                    </>
                  ) : 'Send Message'}
                  </motion.button>
                </motion.form>
            )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
