import React, { useState } from 'react';
import { Building2, Music2, Sparkles, MapPin } from 'lucide-react';

interface Partner {
  name: string;
  address: string;
  neighborhood?: string;
  postalCode?: string;
  city: string;
}

const buffets: Partner[] = [
  {
    name: "Buffet Catavento",
    address: "Avenida Distrito Federal, 1235",
    postalCode: "87.701-310",
    city: "Paranavaí/PR"
  },
  {
    name: "Buffet Chantilly",
    address: "Rua Sebastião Bem Bem de Oliveira, 685",
    neighborhood: "Jardim Ibirapuera",
    postalCode: "87706-120",
    city: "Paranavaí/PR"
  },
  {
    name: "Buffet Milenium Decorações",
    address: "Rua Hercílio Luz",
    city: "Paranavaí/PR"
  },
  {
    name: "Cereso Buffet",
    address: "Rua Dr Jose De Mattos Filho, 249",
    neighborhood: "Jardim Nossa Senhora",
    postalCode: "87.711-350",
    city: "Paranavaí/PR"
  },
  {
    name: "José Nilson Decorações",
    address: "Avenida Heitor Alencar Furtado, 2340",
    neighborhood: "São Jorge",
    postalCode: "87711-000",
    city: "Paranavaí/PR"
  },
  {
    name: "Laura Buffet",
    address: "Avenida Parigot de Souza",
    city: "Paranavaí/PR"
  },
  {
    name: "LJ Buffet",
    address: "Avenida Parigot de Souza, 3310",
    neighborhood: "Jardim Ibirapuera",
    city: "Paranavaí/PR"
  },
  {
    name: "Marcelo's Buffet",
    address: "Em frente ao clube SPDC, 961",
    neighborhood: "Jardim aeroporto",
    postalCode: "87.707-030",
    city: "Paranavaí/PR"
  },
  {
    name: "Melquiades Eventos",
    address: "Br 376, 105",
    neighborhood: "Jardim Morada Do Sol",
    postalCode: "87.720-140",
    city: "Paranavaí/PR"
  },
  {
    name: "Pontos de Fada",
    address: "Avenida Deputado Heitor Alencar Furtado, 2225",
    neighborhood: "Jardim Sao Jorge",
    city: "Paranavaí/PR"
  }
];

type Category = 'buffets' | 'venues' | 'dj' | 'decoration';

const Partners = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('buffets');

  const categories = [
    { id: 'buffets', name: 'Buffets', icon: Building2 },
    { id: 'venues', name: 'Locação de Espaço', icon: MapPin },
    { id: 'dj', name: 'DJ e Som', icon: Music2 },
    { id: 'decoration', name: 'Decoração', icon: Sparkles }
  ];

  return (
    <div id="partners" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Nossos Parceiros
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Conheça nossa rede de parceiros de confiança
          </p>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id as Category)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
                  activeCategory === id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </button>
            ))}
          </div>

          {activeCategory === 'buffets' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {buffets.map((buffet, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">{buffet.name}</h3>
                  <div className="text-gray-400 space-y-2">
                    <p>{buffet.address}</p>
                    {buffet.neighborhood && <p>{buffet.neighborhood}</p>}
                    {buffet.postalCode && <p>{buffet.postalCode}</p>}
                    <p>{buffet.city}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeCategory === 'venues' && (
            <div className="text-center text-gray-400">
              <p>Em breve, lista de espaços para eventos.</p>
            </div>
          )}

          {activeCategory === 'dj' && (
            <div className="text-center text-gray-400">
              <p>Em breve, lista de DJs e serviços de som.</p>
            </div>
          )}

          {activeCategory === 'decoration' && (
            <div className="text-center text-gray-400">
              <p>Em breve, lista de decoradores.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Partners;