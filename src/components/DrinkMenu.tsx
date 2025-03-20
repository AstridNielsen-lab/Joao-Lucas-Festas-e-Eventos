import React from 'react';

const drinks = [
  {
    name: 'Caipirinha',
    description: 'Limão, açúcar, cachaça, gelo - O drink brasileiro mais famoso do mundo',
    image: 'https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Mojito',
    description: 'Hortelã, limão, rum branco, açúcar, água com gás - Clássico cubano refrescante',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Gin Tônica',
    description: 'Gin, água tônica, limão, especiarias - Drink elegante e aromático',
    image: 'https://images.unsplash.com/photo-1527761939622-9119094630cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Margarita',
    description: 'Tequila, triple sec, suco de limão - O coquetel mexicano mais popular',
    image: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Cosmopolitan',
    description: 'Vodka, licor de laranja, suco de cranberry, limão - Sofisticação em forma de drink',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Moscow Mule',
    description: 'Vodka, cerveja de gengibre, limão - Servido no tradicional copo de cobre',
    image: 'https://images.unsplash.com/photo-1530991808291-7e157454758c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Negroni',
    description: 'Gin, Campari, vermute tinto - O aperitivo italiano perfeito',
    image: 'https://images.unsplash.com/photo-1592858167090-2473780d894d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Piña Colada',
    description: 'Rum, leite de coco, suco de abacaxi - O sabor tropical das Caraíbas',
    image: 'https://images.unsplash.com/photo-1549746423-e5fe9cafded8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Aperol Spritz',
    description: 'Aperol, prosecco, água com gás - O aperitivo italiano mais refrescante',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Old Fashioned',
    description: 'Bourbon, angostura, açúcar - Um clássico atemporal',
    image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Espresso Martini',
    description: 'Vodka, licor de café, café expresso - O drink perfeito para os amantes de café',
    image: 'https://images.unsplash.com/photo-1545418950-8d3d76219dec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Manhattan',
    description: 'Whiskey, vermute tinto, angostura - Elegância em estado líquido',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Daiquiri',
    description: 'Rum branco, suco de limão, açúcar - Simplicidade e refrescância',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Mai Tai',
    description: 'Rum escuro, licor de laranja, orgeat, limão - O clássico tiki drink',
    image: 'https://images.unsplash.com/photo-1549746439-e6e9d8156074?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Whiskey Sour',
    description: 'Whiskey, limão, açúcar, clara de ovo - Suavidade e equilíbrio perfeito',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Bloody Mary',
    description: 'Vodka, suco de tomate, especiarias - O drink do brunch por excelência',
    image: 'https://images.unsplash.com/photo-1578664182354-e3878571bcd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'French 75',
    description: 'Gin, champagne, limão, açúcar - Elegância e frescor em uma taça',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Dark n Stormy',
    description: 'Rum escuro, cerveja de gengibre, limão - A tempestade perfeita de sabores',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Paloma',
    description: 'Tequila, refrigerante de toranja, limão - O drink mexicano refrescante',
    image: 'https://images.unsplash.com/photo-1613461920867-9ea91b209848?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Aviation',
    description: 'Gin, licor de violeta, marasquino, limão - Um coquetel com cor única',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const DrinkMenu = () => {
  return (
    <div id="drinks" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Cardápio de Drinks
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Drinks clássicos mundiais preparados com expertise
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {drinks.map((drink, index) => (
            <div
              key={index}
              className="relative bg-black rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-white/10 hover:border-white/20"
            >
              <div className="h-48 w-full">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-white">{drink.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{drink.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkMenu;