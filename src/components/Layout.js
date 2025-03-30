import React from 'react';
import Navbar from './Navbar';
import IntroAnimation from './IntroAnimation';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <IntroAnimation />
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout; 