import React from 'react';
import { GlassWater, Music2, Users, Sparkles, MapPin } from 'lucide-react';

const services = [
  {
    icon: <GlassWater className="h-8 w-8 text-white" />,
    title: 'Barman e Drinks',
    description: 'Drinks clássicos e exclusivos preparados por profissionais experientes.'
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: 'Equipe Completa',
    description: 'Garçons, segurança e equipe de limpeza para seu evento.'
  },
  {
    icon: <Music2 className="h-8 w-8 text-white" />,
    title: 'DJ e Som',
    description: 'Música de qualidade e iluminação profissional.'
  },
  {
    icon: <Sparkles className="h-8 w-8 text-white" />,
    title: 'Decoração',
    description: 'Ambientação personalizada para tornar seu evento único.'
  },
  {
    icon: <MapPin className="h-8 w-8 text-white" />,
    title: 'Locação de Espaço',
    description: 'Parceria com os melhores espaços para eventos.'
  }
];

const Services = () => {
  return (
    <div id="services" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Oferecemos tudo que você precisa para um evento inesquecível
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white/5 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <div>{service.icon}</div>
              <h3 className="mt-4 text-lg font-medium text-white">{service.title}</h3>
              <p className="mt-2 text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;