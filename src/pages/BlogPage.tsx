import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

const posts: BlogPost[] = [
  {
    title: "Como Escolher o Menu de Drinks Perfeito para seu Evento",
    excerpt: "Dicas essenciais para selecionar as bebidas ideais que agradarão a todos os seus convidados.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "10 Mar 2024",
    author: "João Lucas",
    category: "Drinks"
  },
  {
    title: "Tendências em Decoração para Casamentos em 2024",
    excerpt: "Descubra as últimas tendências em decoração que estão fazendo sucesso nos casamentos.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "05 Mar 2024",
    author: "Maria Silva",
    category: "Decoração"
  },
  {
    title: "Como Organizar uma Festa Corporativa de Sucesso",
    excerpt: "Guia completo para planejar um evento corporativo memorável e profissional.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "28 Fev 2024",
    author: "Carlos Santos",
    category: "Corporativo"
  },
  {
    title: "Os Melhores Drinks para Festas de Verão",
    excerpt: "Receitas refrescantes e dicas de apresentação para drinks perfeitos para o calor.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "20 Fev 2024",
    author: "João Lucas",
    category: "Drinks"
  },
  {
    title: "Música para Eventos: Como Criar a Playlist Perfeita",
    excerpt: "Dicas profissionais para selecionar as músicas ideais para cada momento do seu evento.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "15 Fev 2024",
    author: "Pedro Oliveira",
    category: "Música"
  },
  {
    title: "Dicas para Escolher o Local Ideal para seu Evento",
    excerpt: "Fatores importantes a considerar na hora de escolher o espaço para sua celebração.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "10 Fev 2024",
    author: "Ana Costa",
    category: "Planejamento"
  }
];

const BlogPage = () => {
  return (
    <div className="pt-16">
      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Blog"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Blog
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Dicas, tendências e novidades do mundo dos eventos
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {post.date}
                  <User className="h-4 w-4 ml-4 mr-2" />
                  {post.author}
                </div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-6">
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Ler mais
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition-colors">
            Carregar Mais Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;