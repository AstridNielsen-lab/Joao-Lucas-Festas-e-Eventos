import React, { useState } from 'react';
import { Menu, X, GlassWater } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <GlassWater className="h-8 w-8 text-purple-600 mr-2" />
            <span className="text-xl font-bold text-purple-600">João Lucas</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-purple-600">Home</a>
            <a href="#services" className="text-gray-700 hover:text-purple-600">Serviços</a>
            <a href="#drinks" className="text-gray-700 hover:text-purple-600">Drinks</a>
            <a href="#contact" className="text-gray-700 hover:text-purple-600">Contato</a>
            <a 
              href="https://wa.me/5544988024931"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Solicitar Orçamento
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Home</a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Serviços</a>
              <a href="#drinks" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Drinks</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Contato</a>
              <a 
                href="https://wa.me/5544988024931"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-purple-600 font-medium"
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