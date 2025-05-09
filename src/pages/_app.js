// pages/_app.js
import Head from 'next/head';
import Navbar from '../components/Navbar';
import IntroAnimation from '../components/IntroAnimation';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

// Section imports (now in components/sections/)
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';

const SECTIONS = [
  { id: 'about', component: <About /> },
  { id: 'experience', component: <Experience /> },
  { id: 'projects', component: <Projects /> },
  { id: 'skills', component: <Skills /> },
  { id: 'contact', component: <Contact /> }
];

export default function MyApp() {
  const [showIntro, setShowIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowIntro(true);
      sessionStorage.setItem('hasVisited', 'true');
      setTimeout(() => {
        setShowIntro(false);
        setShowContent(true);
      }, 4000);
    } else {
      setShowContent(true);
    }
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Aswitha's Portfolio</title>
        <meta name="description" content="Aswitha's Professional Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showIntro && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
          <IntroAnimation />
        </div>
      )}

      {showContent && (
        <>
          <Navbar onLinkClick={scrollToSection} />
          <div className="scroll-wrapper">
            {SECTIONS.map(({ id, component }, index) => (
              <section key={id} id={id} className="full-section">
                {component}
                {index === 0 && (
                     <div className="downArrowWrapper" onClick={() => scrollToSection(SECTIONS[1].id)}>
                     <i className="fas fa-chevron-down downArrow"></i>
                   </div>
                )}
              </section>
            ))}
          </div>
        </>
      )}

      <style jsx global>{`
        html, body {
          padding: 0;
          margin: 0;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .scroll-wrapper {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100vh;
        }

        .full-section {
          scroll-snap-align: start;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .scroll-down-arrow {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          animation: bounce 1.5s infinite;
          color: var(--aurora-green);
          cursor: pointer;
        }

        @keyframes bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 10px); }
        }
      `}</style>
    </>
  );
}
