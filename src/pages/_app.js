// pages/_app.js
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StarBackground from '../components/StarBackground';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import PageTransition from '../components/PageTransition';
  
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    // Add cursor trail effect
    const cursorTrail = () => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      document.body.appendChild(trail);
      
      const trailDot = () => {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        const size = 5 + Math.random() * 15;
        
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.3})`;
        
        return dot;
      };
      
      document.addEventListener('mousemove', (e) => {
        const dot = trailDot();
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        
        trail.appendChild(dot);
        
        setTimeout(() => {
          dot.style.transform = 'scale(0)';
          dot.style.opacity = '0';
          
          setTimeout(() => {
            trail.removeChild(dot);
          }, 300);
        }, 100);
      });
    };
    
    cursorTrail();
  }, []);
  
  return (
    <>
        <Head>
        <title>Aswitha Basam - Portfolio</title>
        <meta name="description" content="Aswitha Basam's Professional Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>
      <IntroAnimation />   
      <StarBackground />
      {<Navbar />}
      
      <AnimatePresence mode="wait">
        <PageTransition key={router.route}>
          <Component {...pageProps} />
        </PageTransition>
      </AnimatePresence>
      
      <style jsx global>{`
        .cursor-trail {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }
        
        .trail-dot {
          position: absolute;
          border-radius: 50%;
          transform-origin: center;
          mix-blend-mode: screen;
          filter: blur(2px);
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default MyApp;
