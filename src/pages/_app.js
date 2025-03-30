// pages/_app.js
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Aswitha Basam - Portfolio</title>
        <meta name="description" content="Aswitha Basam's Professional Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>

      {!loading && <Navbar />}
      
      <AnimatePresence mode="wait">
        <PageTransition key={router.route}>
          <Component {...pageProps} />
        </PageTransition>
      </AnimatePresence>
    </>
  );
}

export default MyApp;