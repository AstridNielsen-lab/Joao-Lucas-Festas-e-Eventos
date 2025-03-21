import React, { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    question: "Qual é a antecedência necessária para fazer uma reserva?",
    answer: "Recomendamos fazer a reserva com pelo menos 30 dias de antecedência para garantir a disponibilidade da data. Para eventos maiores ou em alta temporada, sugerimos um prazo ainda maior.",
    category: "Reservas"
  },
  {
    question: "Como funciona o orçamento personalizado?",
    answer: "Fazemos orçamentos personalizados baseados no tipo de evento, número de convidados, duração, serviços desejados e cardápio de drinks. Entre em contato conosco para receber uma proposta detalhada.",
    category: "Preços"
  },
  {
    question: "Vocês fornecem todos os materiais necessários?",
    answer: "Sim, fornecemos todos os materiais necessários, incluindo copos, utensílios, gelo, insumos para drinks, decoração do bar e equipe completa.",
    category: "Serviços"
  },
  {
    question: "É possível personalizar o menu de drinks?",
    answer: "Sim! Trabalhamos com menus personalizados de acordo com suas preferências e o tema do evento. Podemos criar drinks exclusivos para sua ocasião.",
    category: "Drinks"
  },
  {
    question: "Qual é o número mínimo de convidados?",
    answer: "Atendemos eventos a partir de 50 convidados. Para grupos menores, temos pacotes especiais - entre em contato para mais informações.",
    category: "Eventos"
  },
  {
    question: "Vocês atendem em outras cidades?",
    answer: "Sim, atendemos em Paranavaí e região. Para eventos em outras localidades, entre em contato para verificar a disponibilidade.",
    category: "Logística"
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Trabalhamos com um sinal de 50% para reserva da data e o restante pode ser pago até 5 dias antes do evento. Aceitamos diversas formas de pagamento.",
    category: "Pagamento"
  },
  {
    question: "Vocês têm seguro de responsabilidade?",
    answer: "Sim, temos seguro completo que cobre todos os nossos serviços e equipe, garantindo total segurança para seu evento.",
    category: "Segurança"
  },
  {
    question: "É possível fazer uma degustação prévia?",
    answer: "Sim, oferecemos degustação prévia para eventos selecionados. O valor da degustação é descontado no fechamento do contrato.",
    category: "Serviços"
  },
  {
    question: "O que acontece em caso de cancelamento?",
    answer: "Nossa política de cancelamento está detalhada no contrato. Em geral, cancelamentos com mais de 30 dias de antecedência têm reembolso parcial.",
    category: "Políticas"
  }
];

const categories = [...new Set(faqs.map(faq => faq.category))];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = activeCategory === 'Todos'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="pt-16">
      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="FAQ"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Perguntas Frequentes
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Tire suas dúvidas sobre nossos serviços
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('Todos')}
            className={`px-6 py-3 rounded-full transition-colors ${
              activeCategory === 'Todos'
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {activeIndex === index ? (
                  <Minus className="h-5 w-5 text-white" />
                ) : (
                  <Plus className="h-5 w-5 text-white" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 bg-white/5">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-8">
            Não encontrou sua pergunta? Entre em contato conosco!
          </p>
          <a
            href="https://wa.me/5544988024931"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Fale Conosco
          </a>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;