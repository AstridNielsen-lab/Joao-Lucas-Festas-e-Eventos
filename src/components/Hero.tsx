import React from 'react';
import { GlassWater } from 'lucide-react';

const Hero = () => {
  return (
    <div id="home" className="pt-16">
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.unsplash.com/photo-1574096079513-d8259312b785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Evento elegante"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <GlassWater className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              João Lucas Festas e Eventos
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Seu Evento, Nossa Paixão
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="https://wa.me/5544988024931"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Solicite um orçamento!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;