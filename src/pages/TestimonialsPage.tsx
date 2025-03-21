import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  event: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ana Silva",
    role: "Noiva",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    content: "O serviço foi impecável! Os drinks eram deliciosos e o atendimento superou todas as expectativas. Todos os convidados elogiaram muito!",
    rating: 5,
    event: "Casamento"
  },
  {
    name: "Carlos Santos",
    role: "Diretor Comercial",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    content: "Contratamos para nossa festa de fim de ano e foi um sucesso total. Profissionalismo e qualidade excepcionais.",
    rating: 5,
    event: "Evento Corporativo"
  },
  {
    name: "Mariana Costa",
    role: "Aniversariante",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    content: "Minha festa de 30 anos foi perfeita! A equipe é muito atenciosa e os drinks fizeram o maior sucesso!",
    rating: 5,
    event: "Aniversário"
  },
  {
    name: "Pedro Oliveira",
    role: "Formando",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    content: "A formatura foi incrível! O serviço de bar e a equipe foram fundamentais para o sucesso da festa.",
    rating: 5,
    event: "Formatura"
  },
  {
    name: "Julia Mendes",
    role: "Noiva",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    content: "Serviço excepcional! Os drinks eram uma verdadeira obra de arte e o atendimento foi impecável.",
    rating: 5,
    event: "Casamento"
  },
  {
    name: "Ricardo Almeida",
    role: "Gerente de Marketing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    content: "O evento corporativo foi um sucesso graças à equipe profissional e ao serviço de alta qualidade.",
    rating: 5,
    event: "Evento Corporativo"
  }
];

const TestimonialsPage = () => {
  return (
    <div className="pt-16">
      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Depoimentos"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Depoimentos
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              O que nossos clientes dizem sobre nós
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-6 relative">
              <Quote className="absolute top-4 right-4 text-white/10 h-12 w-12" />
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-white font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">{testimonial.content}</p>
              <div className="text-sm text-gray-400">
                Evento: {testimonial.event}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://g.page/r/CYFSGi_eUio4EBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 border-yellow-400 text-base font-medium rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
          >
            <Star className="h-5 w-5 mr-2" />
            Deixe sua Avaliação
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;