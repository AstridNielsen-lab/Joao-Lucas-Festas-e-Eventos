import React from 'react';
import { PartyPopper, Phone, Clock, MapPin, GlassWater, Music2, Users, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import DrinkMenu from './components/DrinkMenu';
import Contact from './components/Contact';
import AIChat from './components/AIChat';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <DrinkMenu />
      <Contact />
      <AIChat />
    </div>
  );
}

export default App;