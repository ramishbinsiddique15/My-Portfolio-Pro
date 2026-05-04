import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import HorizontalWork from '../components/sections/HorizontalWork';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <main className="w-full flex flex-col">
      <Hero />
      <About /> {}
      <Skills/>
      <HorizontalWork />
      <Experience />
      <Contact/>
      {}
    </main>
  );
};

export default Home;