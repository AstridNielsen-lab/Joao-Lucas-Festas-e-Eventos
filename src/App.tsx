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
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Hero />
        <Services />
        <DrinkMenu />
        <Contact />
        <AIChat />
        <RadioPlayer />
        <footer className="bg-black/90 text-white py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm">
              Desenvolvido por{' '}
              <a 
                href="https://likelook.wixsite.com/solutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                Like Look Solutions
              </a>
            </p>
            <p className="text-sm mt-2">
              Programador: Julio Campos Machado -{' '}
              <a 
                href="https://wa.me/5511992946628" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                WhatsApp: (11) 99294-6628
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;