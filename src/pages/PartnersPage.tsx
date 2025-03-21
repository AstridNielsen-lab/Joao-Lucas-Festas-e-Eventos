import React, { useState } from 'react';
import { Building2, Music2, Sparkles, MapPin } from 'lucide-react';

interface Partner {
  name: string;
  address: string;
  neighborhood?: string;
  postalCode?: string;
  city: string;
  description?: string;
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

const venues: Partner[] = [
  {
    name: "Centro de Eventos",
    address: "Avenida Deputado Heitor Alencar Furtado",
    neighborhood: "Centro",
    city: "Paranavaí/PR",
    description: "Salão elegante consultar a capacidade"
  },
  {
    name: "Clube Idade Dourada",
    address: "Rua Hilda Camargo Botelho, 390",
    neighborhood: "Parque Morumbi",
    city: "Paranavaí/PR",
    description: "Salão elegante consultar a capacidade"
  },
  {
    name: "Recanto Conquista",
    address: "Rua:Vitor Lopes, n°118",
    neighborhood: "Jardim Ipê",
    city: "Paranavaí/PR",
    description: "Salão elegante consultar a capacidade"
  }
];

const djs: Partner[] = [
   {
    name: "Fabinho Acústico",
    address: "Rua Sinesio Torres, 184",
    city: "Paranavaí/PR",
    description: "- Música ao vivo"
  },
  {
    name: "Leizi & Rafael",
    address: "Rua Aristides Lobo, 350",
    city: "Paranavaí/PR",
    description: "Sertanejo Bom Demais"
  }
];

const decorators: Partner[] = [
  {
    name: "Ateliê das Festas",
    address: "Praça Brasil, 138",
    city: "Paranavaí/PR",
    description: "Decoração completa para casamentos e festas"
  },
  {
    name: "Mi Maria Festas Especiais Decor",
    address: "Rua Hilda Camargo Botelho , 390",
    city: "Paranavaí/PR",
    description: "Decoração completa para casamentos e festas"
  },
  {
    name: "Palácio das Festas",
    address: "Avenida José Felipe Tequinha, 42",
    city: "Paranavaí/PR",
    description: "Decoração completa para casamentos e festas"
  }
];

type Category = 'buffets' | 'venues' | 'dj' | 'decoration';

const PartnersPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('buffets');

  const categories = [
    { id: 'buffets', name: 'Buffets', icon: Building2 },
    { id: 'venues', name: 'Locação de Espaço', icon: MapPin },
    { id: 'dj', name: 'DJ e Som', icon: Music2 },
    { id: 'decoration', name: 'Decoração', icon: Sparkles }
  ];

  const renderPartnerCard = (partner: Partner) => (
    <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-4">{partner.name}</h3>
      <div className="text-gray-400 space-y-2">
        <p>{partner.address}</p>
        {partner.neighborhood && <p>{partner.neighborhood}</p>}
        {partner.postalCode && <p>{partner.postalCode}</p>}
        <p>{partner.city}</p>
        {partner.description && (
          <p className="mt-4 text-gray-300">{partner.description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="pt-16">
      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Parceiros"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Nossos Parceiros
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Conheça nossa rede de parceiros de confiança
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCategory === 'buffets' && buffets.map((partner, index) => renderPartnerCard(partner))}
          {activeCategory === 'venues' && venues.map((partner, index) => renderPartnerCard(partner))}
          {activeCategory === 'dj' && djs.map((partner, index) => renderPartnerCard(partner))}
          {activeCategory === 'decoration' && decorators.map((partner, index) => renderPartnerCard(partner))}
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
