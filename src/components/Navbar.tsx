import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Star } from 'lucide-react';

const MartiniIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    className="h-8 w-8 text-white mr-2"
  >
    <path 
      fill="currentColor" 
      d="M12 20v-7L20 4H4l8 9v7m-3 1h6" 
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle 
      cx="12" 
      cy="7" 
      r="2" 
      fill="#ef4444" 
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-sm shadow-lg fixed w-full z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <MartiniIcon />
              <span className="text-xl font-bold text-white">João Lucas</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">Sobre</Link>
            <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Galeria</Link>
            <Link to="/partners" className="text-gray-300 hover:text-white transition-colors">Parceiros</Link>
            <Link to="/testimonials" className="text-gray-300 hover:text-white transition-colors">Depoimentos</Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Preços</Link>
            <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
            <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
            <a href="/#drinks" className="text-gray-300 hover:text-white transition-colors">Drinks</a>
            <a href="/#contact" className="text-gray-300 hover:text-white transition-colors">Contato</a>
            <a 
              href="https://g.page/r/CYFSGi_eUio4EBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <Star className="h-5 w-5" />
              <span>Avaliar</span>
            </a>
            <a 
              href="https://chat.whatsapp.com/KlvIVmy75o4IW0sFbCq4UG"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors"
            >
              Seja Parceiro
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Sobre</Link>
              <Link to="/gallery" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Galeria</Link>
              <Link to="/partners" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Parceiros</Link>
              <Link to="/testimonials" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Depoimentos</Link>
              <Link to="/pricing" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Preços</Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Blog</Link>
              <Link to="/faq" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">FAQ</Link>
              <a href="/#drinks" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Drinks</a>
              <a href="/#contact" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Contato</a>
              <a 
                href="https://g.page/r/CYFSGi_eUio4EBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Star className="h-5 w-5" />
                <span>Avaliar no Google</span>
              </a>
              <a 
                href="https://chat.whatsapp.com/KlvIVmy75o4IW0sFbCq4UG"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-white font-medium hover:text-gray-300 transition-colors"
              >
                Seja Parceiro
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;