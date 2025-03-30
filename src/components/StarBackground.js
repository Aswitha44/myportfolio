// components/StarBackground.js
import { useEffect, useRef } from 'react';

export default function StarBackground() {
  const starsRef = useRef(null);
  
  useEffect(() => {
    if (!starsRef.current) return;
    
    const starsContainer = starsRef.current;
    const starCount = 150;
    
    // Remove any existing stars
    starsContainer.innerHTML = '';
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random star properties
      const size = Math.random() * 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = 3 + Math.random() * 7;
      const delay = Math.random() * 5;
      const opacity = 0.1 + Math.random() * 0.7;
      
      // Apply properties
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.setProperty('--duration', `${duration}s`);
      star.style.setProperty('--delay', `${delay}s`);
      star.style.setProperty('--opacity', opacity);
      
      starsContainer.appendChild(star);
    }
  }, []);
  
  return <div className="stars" ref={starsRef}></div>;
}