// components/Navbar.js
//updated
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import { FaPencilAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'About Me' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const index = navLinks.findIndex(link => link.href === router.pathname);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [router.pathname]);

  const handleNavigation = (direction) => {
    if (direction === 'prev' && currentIndex > 0) {
      router.push(navLinks[currentIndex - 1].href);
    } else if (direction === 'next' && currentIndex < navLinks.length - 1) {
      router.push(navLinks[currentIndex + 1].href);
    }
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <span className={styles.glowText}>Portfolio</span>
            <FaPencilAlt className={styles.pencil} />
          </Link>
          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${router.pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className={styles.pageNavigation}>
        <button 
          className={`${styles.navArrow} ${currentIndex === 0 ? styles.hidden : ''}`}
          onClick={() => handleNavigation('prev')}
          aria-label="Previous page"
        >
          <FaArrowLeft />
        </button>
        <button 
          className={`${styles.navArrow} ${currentIndex === navLinks.length - 1 ? styles.hidden : ''}`}
          onClick={() => handleNavigation('next')}
          aria-label="Next page"
        >
          <FaArrowRight />
        </button>
      </div>
    </>
  );
}
