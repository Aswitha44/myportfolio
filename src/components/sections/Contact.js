import { useState } from 'react';
import styles from '../../styles/Contact.module.css';
import userData from '../../data/user-data.json';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className="aurora-bg">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>


      <div className={styles.contactSection}>
        <div className={styles.contactInfo}>
          <div className={styles.contactText}>
            
      <h1 className={`${styles.subTitle} glow-text`}>Let's Connect</h1>
            
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
                <a href={userData.contact.github} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href={userData.contact.linkedin} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                {userData.contact.twitter && (
                  <a href={userData.contact.twitter} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contactForm}>
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Message Box</h2>

            {submitted ? (
              <div className={styles.successMessage}>
                <i className="fas fa-check-circle"></i>
                <p>Thank you! Your message has been sent.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Your Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
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
    </section>
  );
}
