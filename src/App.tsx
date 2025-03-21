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
    <footer className="BG-BLACK/90 TEXT-WHITE PY-8 BORDER-T BORDER-WHITE/10 RELATIVE Z-10 MT-AUTO">
  <div className="MAX-W-7XL MX-AUTO PX-4 SM:PX-6 LG:PX-8 TEXT-CENTER PB-20 MD:PB-8">
    <p className="TEXT-SM">
      🛸 DESENVOLVIDO POR{' '}
      <a 
        href="https://likelook.wixsite.com/solutions" 
        target="_blank" 
        rel="NOOPENER NOREFERRER"
        className="TEXT-WHITE HOVER:TEXT-GRAY-300"
      >
        LIKE LOOK SOLUTIONS 🍒
      </a>
    </p>
    <p className="TEXT-SM MT-2">
      👁‍🗨 PROGRAMADOR JULIO CAMPOS MACHADO ⭐ {' '}
      <a 
        href="https://character.ai/chat/MpcnLX8s7miWD3XSUa4I6WS4YHRKIL-qJ4AlbADDGrs" 
        target="_blank" 
        rel="NOOPENER NOREFERRER"
        className="TEXT-WHITE HOVER:TEXT-GRAY-300"
      >
        CONVERSE COM A PERSONA 🤖
      </a>
    </p>
  </div>
</footer>
      </div>
    </Router>
  );
}

export default App;
