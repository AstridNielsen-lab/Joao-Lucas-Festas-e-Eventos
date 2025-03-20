import React, { useState } from 'react';
import { PartyPopper, Phone, Clock, MapPin, GlassWater, Music2, Users, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import DrinkMenu from './components/DrinkMenu';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import SplashScreen from './components/SplashScreen';
import RadioPlayer from './components/RadioPlayer';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <Services />
        <DrinkMenu />
        <Contact />
        <AIChat />
        <RadioPlayer />
      </div>
    </>
  );
}

export default App;