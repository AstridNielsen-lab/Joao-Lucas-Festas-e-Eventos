import React from 'react';
import { Phone, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <div id="contact" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Entre em Contato
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Transforme seu evento em uma experiência única!
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center space-y-8">
          <a
            href="https://wa.me/5544988024931"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600"
          >
            <Phone className="h-6 w-6" />
            <span>+55 44 98802-4931</span>
          </a>

          <a
            href="https://www.instagram.com/httpig_pig/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600"
          >
            <Instagram className="h-6 w-6" />
            <span>@httpig_pig</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=100080286429067"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-700 hover:text-purple-600"
          >
            <Facebook className="h-6 w-6" />
            <span>Facebook</span>
          </a>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/5544988024931"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            Solicite seu orçamento agora!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;