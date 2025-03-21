import React from 'react';
import { Check, GlassWater, Users, Music2, Sparkles } from 'lucide-react';

interface Package {
  name: string;
  description: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const packages: Package[] = [
  {
    name: "Pacote Essencial",
    description: "Perfeito para eventos pequenos",
    price: "A partir de R$ 1.500",
    icon: <GlassWater className="h-8 w-8 text-blue-400" />,
    features: [
      "Bartender profissional",
      "Menu de drinks clássicos",
      "4 horas de serviço",
      "Copos e utensílios",
      "Gelo e insumos básicos"
    ]
  },
  {
    name: "Pacote Premium",
    description: "Ideal para eventos médios",
    price: "A partir de R$ 3.000",
    icon: <Users className="h-8 w-8 text-purple-400" />,
    popular: true,
    features: [
      "2 Bartenders profissionais",
      "Menu personalizado de drinks",
      "6 horas de serviço",
      "Copos e utensílios premium",
      "Gelo e insumos especiais",
      "Garçons para serviço",
      "Decoração do bar"
    ]
  },
  {
    name: "Pacote Luxo",
    description: "Para eventos exclusivos",
    price: "A partir de R$ 5.000",
    icon: <Sparkles className="h-8 w-8 text-yellow-400" />,
    features: [
      "3 Bartenders profissionais",
      "Menu exclusivo de drinks",
      "8 horas de serviço",
      "Copos e utensílios de luxo",
      "Insumos premium",
      "Equipe completa de garçons",
      "Decoração personalizada",
      "Coordenador de eventos",
      "DJ e som ambiente"
    ]
  }
];

const PricingPage = () => {
  return (
    <div className="pt-16">
      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Preços"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Nossos Pacotes
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Escolha o pacote ideal para seu evento
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white/5 rounded-lg p-8 border ${
                pkg.popular
                  ? 'border-purple-400'
                  : 'border-white/10'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 -mt-4 mr-4">
                  <span className="bg-purple-400 text-black px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}
              <div className="flex items-center mb-4">
                {pkg.icon}
                <h3 className="text-xl font-semibold text-white ml-3">{pkg.name}</h3>
              </div>
              <p className="text-gray-400 mb-4">{pkg.description}</p>
              <p className="text-2xl font-bold text-white mb-6">{pkg.price}</p>
              <ul className="space-y-4">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/5544988024931"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block text-center px-6 py-3 border-2 rounded-md transition-colors ${
                  pkg.popular
                    ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black'
                    : 'border-white text-white hover:bg-white hover:text-black'
                }`}
              >
                Solicitar Orçamento
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Serviços Adicionais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <GlassWater className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Drinks Especiais</h3>
              <p className="text-gray-400">Menu personalizado de drinks exclusivos</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Equipe Extra</h3>
              <p className="text-gray-400">Garçons e staff adicional</p>
            </div>
            <div className="text-center">
              <Music2 className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">DJ e Som</h3>
              <p className="text-gray-400">Música ambiente e iluminação</p>
            </div>
            <div className="text-center">
              <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Decoração</h3>
              <p className="text-gray-400">Decoração personalizada do espaço</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-8">
            Todos os pacotes podem ser personalizados de acordo com suas necessidades.
            Entre em contato para um orçamento detalhado.
          </p>
          <a
            href="https://wa.me/5544988024931"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;