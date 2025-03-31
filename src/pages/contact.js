import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Contact.module.css';
import userData from '../data/user-data.json';

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ email: '', subject: '', message: '' });

      // Reset submission status after some time
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      
    <div className={styles.container}>
    <div className="aurora-bg">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>
      <h1 className={`${styles.pageTitle} glow-text`}>Get In Touch</h1>
      
      <div className={styles.contactSection}>
        <div className={styles.contactInfo}>
          <div className={styles.contactText}>
            <h2 className={styles.subTitle}>Let's Connect</h2>
            <p className={styles.contactParagraph}>
              I'm currently open to new opportunities and collaborations. Feel free to reach out if you'd like to discuss a project, have questions, or just want to say hello.
            </p>

            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${userData.contact.email}`} className={styles.infoLink}>
                  {userData.contact.email}
                </a>
              </div>

              <div className={styles.infoItem}>
                <i className="fas fa-phone-alt"></i>
                <a href={`tel:${userData.contact.phone}`} className={styles.infoLink}>
                  {userData.contact.phone}
                </a>
              </div>

              <div className={styles.socialLinks}>
                <a href={userData.contact.github || "https://github.com"} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href={userData.contact.linkedin || "https://linkedin.com"} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contactForm}>
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Drop Mail</h2>

            {submitted ? (
              <motion.div 
                className={styles.successMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-check-circle"></i>
                <p>Thank you! Your message has been sent.</p>
              </motion.div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">Your Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="subject">Subject</label>
                  <input
                    className={styles.input}
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="message">Message</label>
                  <textarea
                    className={styles.textarea}
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button 
                  className={styles.submitButton} 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
     
    </div>
    </>
  );
}
