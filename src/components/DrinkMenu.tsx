import React from 'react';

const drinks = [
  {
    name: 'Caipirinha',
    description: 'Limão, açúcar, cachaça, gelo',
    image: 'https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Mojito',
    description: 'Hortelã, limão, rum, açúcar, água com gás',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Gin Tônica',
    description: 'Gin, água tônica, limão',
    image: 'https://images.unsplash.com/photo-1527761939622-9119094630cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Margarita',
    description: 'Tequila, licor de laranja, suco de limão',
    image: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const DrinkMenu = () => {
  return (
    <div id="drinks" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Cardápio de Drinks
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Drinks clássicos preparados com expertise
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {drinks.map((drink, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 w-full">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{drink.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{drink.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkMenu;