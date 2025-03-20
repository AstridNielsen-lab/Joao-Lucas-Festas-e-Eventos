import React from 'react';
import { GlassWater, Music2, Users, Sparkles, MapPin } from 'lucide-react';

const services = [
  {
    icon: <GlassWater className="h-8 w-8" />,
    title: 'Barman e Drinks',
    description: 'Drinks clássicos e exclusivos preparados por profissionais experientes.'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Equipe Completa',
    description: 'Garçons, segurança e equipe de limpeza para seu evento.'
  },
  {
    icon: <Music2 className="h-8 w-8" />,
    title: 'DJ e Som',
    description: 'Música de qualidade e iluminação profissional.'
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: 'Decoração',
    description: 'Ambientação personalizada para tornar seu evento único.'
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: 'Locação de Espaço',
    description: 'Parceria com os melhores espaços para eventos.'
  }
];

const Services = () => {
  return (
    <div id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Oferecemos tudo que você precisa para um evento inesquecível
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-purple-600">{service.icon}</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;