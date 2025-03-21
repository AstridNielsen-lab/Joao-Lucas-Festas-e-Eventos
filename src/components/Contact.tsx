import React from 'react';
import { Phone, Instagram, Facebook, Star, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div id="contact" className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Entre em Contato
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Transforme seu evento em uma experiência única!
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center space-y-8">
          <a
            href="https://wa.me/5544988024931"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
          >
            <Phone className="h-6 w-6" />
            <span>+55 44 98802-4931</span>
          </a>

          <a
            href="https://www.instagram.com/httpig_pig/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
          >
            <Instagram className="h-6 w-6" />
            <span>@httpig_pig</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=100080286429067"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
          >
            <Facebook className="h-6 w-6" />
            <span>Facebook</span>
          </a>

          <a
            href="https://g.co/kgs/McCRJfz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
          >
            <MapPin className="h-6 w-6" />
            <span>Google Business</span>
          </a>

          <a
            href="https://g.page/r/CYFSGi_eUio4EBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <Star className="h-6 w-6" />
            <span>Avaliar no Google</span>
          </a>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://chat.whatsapp.com/KlvIVmy75o4IW0sFbCq4UG"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors"
          >
            Seja Parceiro
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;