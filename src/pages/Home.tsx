import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import DrinkMenu from '../components/DrinkMenu';
import Contact from '../components/Contact';

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <DrinkMenu />
      <Contact />
    </>
  );
}

export default Home;