import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

const navLinks = ['/', '/experience', '/projects', '/skills', '/contact'];

export default function Layout({ children }) {
  const router = useRouter();
  const currentIndex = navLinks.findIndex(path => path === router.pathname);
  const scrollCooldown = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollCooldown.current) return;

      scrollCooldown.current = true;
      setTimeout(() => (scrollCooldown.current = false), 1000);

      if (e.deltaY > 50 && currentIndex < navLinks.length - 1) {
        router.push(navLinks[currentIndex + 1]);
      } else if (e.deltaY < -50 && currentIndex > 0) {
        router.push(navLinks[currentIndex - 1]);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, router.pathname]);

  return (
    <div className="layout">
      <Navbar />
      <div className="scroll-content">{children}</div>
    </div>
  );
}
