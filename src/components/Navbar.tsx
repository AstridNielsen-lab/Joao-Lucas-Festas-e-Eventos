import React, { useState } from 'react';
import { Menu, X, GlassWater } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-sm shadow-lg fixed w-full z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <GlassWater className="h-8 w-8 text-white mr-2" />
            <span className="text-xl font-bold text-white">João Lucas</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#services" className="text-gray-300 hover:text-white transition-colors">Serviços</a>
            <a href="#drinks" className="text-gray-300 hover:text-white transition-colors">Drinks</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contato</a>
            <a 
              href="https://wa.me/5544988024931"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors"
            >
              Solicitar Orçamento
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
              <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#services" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Serviços</a>
              <a href="#drinks" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Drinks</a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Contato</a>
              <a 
                href="https://wa.me/5544988024931"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-white font-medium hover:text-gray-300 transition-colors"
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;