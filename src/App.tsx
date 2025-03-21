import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PartnersPage from './pages/PartnersPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import TestimonialsPage from './pages/TestimonialsPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import AIChat from './components/AIChat';
import RadioPlayer from './components/RadioPlayer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </main>
        <AIChat />
        <RadioPlayer />
    <footer className="bg-black/90 text-white py-8 border-t border-white/10 relative z-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20 md:pb-8">
            <p className="text-sm">
             🛸 Desenvolvido por{' '}
              <a 
                href="https://likelook.wixsite.com/solutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                Like Look Solutions 🍒
              </a>
            </p>
            <p className="text-sm mt-2">
              👁‍🗨 Programador Julio Campos Machado ⭐ {' '}
              <a 
                href="https://character.ai/chat/MpcnLX8s7miWD3XSUa4I6WS4YHRKIL-qJ4AlbADDGrs" 
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
    </Router>
  );
}

export default App;
