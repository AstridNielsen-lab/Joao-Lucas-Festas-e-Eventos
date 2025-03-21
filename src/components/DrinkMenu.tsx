import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, ArrowUp, MessageCircle, X, Send, Mic, MicOff, Phone, User } from 'lucide-react';
import axios from 'axios';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface OrderFormData {
  name: string;
  phone: string;
}

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyBAUeMGmXN5Cfyo4Rp-83pBZCV4suJRBvQ";

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
    image: 'https://ecrie70.com.br/sistema/conteudos/imagem/g_66_0_1_15082022161712.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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
    image: 'https://raw.githubusercontent.com/AstridNielsen-lab/Joao-Lucas-Festas-e-Eventos/refs/heads/index/src/negroni.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Piña Colada',
    description: 'Rum, leite de coco, suco de abacaxi - O sabor tropical das Caraíbas',
    image: 'https://raw.githubusercontent.com/AstridNielsen-lab/Joao-Lucas-Festas-e-Eventos/refs/heads/index/src/pina%20colada.jpeg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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
    image: 'https://comumaxicaradecafe.com.br/wp-content/uploads/2021/04/espresso-martini-768x489.png?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Manhattan',
    description: 'Whiskey, vermute tinto, angostura - Elegância em estado líquido',
    image: 'https://devilsriverwhiskey.com/wp-content/uploads/2021/08/doom_drw_coffee_old_manhattan_01-copy-scaled-1.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Daiquiri',
    description: 'Rum branco, suco de limão, açúcar - Simplicidade e refrescância',
    image: 'https://www.comidaereceitas.com.br/wp-content/uploads/2021/08/bacardi_diaquiri.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Mai Tai',
    description: 'Rum escuro, licor de laranja, orgeat, limão - O clássico tiki drink',
    image: 'https://raw.githubusercontent.com/AstridNielsen-lab/Joao-Lucas-Festas-e-Eventos/refs/heads/index/src/maitay.jpeg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Whiskey Sour',
    description: 'Whiskey, limão, açúcar, clara de ovo - Suavidade e equilíbrio perfeito',
    image: 'https://cdn-60a97fdbc1ac1d1d10c6b0b6.closte.com/wp-content/uploads/2021/05/Whiskey-Sour-Nosta-restaurant-Cork.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Bloody Mary',
    description: 'Vodka, suco de tomate, especiarias - O drink do brunch por excelência',
    image: 'https://classic.exame.com/wp-content/uploads/2024/01/Image-4.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'French 75',
    description: 'Gin, champagne, limão, açúcar - Elegância e frescor em uma taça',
    image: 'https://raw.githubusercontent.com/AstridNielsen-lab/Joao-Lucas-Festas-e-Eventos/refs/heads/index/src/French-75.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Dark n Stormy',
    description: 'Rum escuro, cerveja de gengibre, limão - A tempestade perfeita de sabores',
    image: 'https://raw.githubusercontent.com/AstridNielsen-lab/Joao-Lucas-Festas-e-Eventos/refs/heads/index/src/dark-n-stormy.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Paloma',
    description: 'Tequila, refrigerante de toranja, limão - O drink mexicano refrescante',
    image: 'https://raw.githubusercontent.com/AstridNielsen-lab/Joao-Lucas-Festas-e-Eventos/refs/heads/index/src/paloma.jpeg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Aviation',
    description: 'Gin, licor de violeta, marasquino, limão - Um coquetel com cor única',
    image: 'https://thumbs.dreamstime.com/b/aviation-drink-gin-lemon-juice-maraschino-liqueur-violet-cream-standing-bar-counter-247745658.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const DrinkMenu = () => {
  const [expandedDrink, setExpandedDrink] = useState<number | null>(null);
  const [showAiChat, setShowAiChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({});
  const [input, setInput] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
  const [isListening, setIsListening] = useState<{ [key: number]: boolean }>({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState<number | null>(null);
  const [orderForm, setOrderForm] = useState<OrderFormData>({
    name: '',
    phone: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (showAiChat !== null) {
          setInput(prev => ({ ...prev, [showAiChat]: transcript }));
          handleSubmit(showAiChat)(new Event('submit') as any);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(prev => Object.keys(prev).reduce((acc, key) => ({
          ...acc,
          [key]: false
        }), {}));
      };
    }
  }, [showAiChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string, drinkIndex: number) => {
    try {
      const drink = drinks[drinkIndex];
      const prompt = `Você é João Lucas, especialista em drinks e eventos, respondendo a uma pergunta sobre o drink "${drink.name}".

Detalhes do drink:
${drink.description}

IMPORTANTE:
- Mantenha respostas CURTAS e OBJETIVAS (máximo 3 linhas)
- Responda com base nas informações do drink
- Seja DIRETO e PROFISSIONAL
- Para orçamentos, sugira entrar em contato pelo WhatsApp: (44) 98802-4931

Pergunta do usuário: ${userMessage}`;

      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "Desculpe, estou com dificuldades técnicas. Entre em contato pelo WhatsApp (44) 98802-4931.";
    }
  };

  const handleSubmit = (drinkIndex: number) => async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input[drinkIndex]?.trim();
    if (!currentInput) return;

    const userMessage = { text: currentInput, isUser: true, timestamp: Date.now() };
    setMessages(prev => ({
      ...prev,
      [drinkIndex]: [...(prev[drinkIndex] || []), userMessage]
    }));
    setInput(prev => ({ ...prev, [drinkIndex]: '' }));
    setIsLoading(prev => ({ ...prev, [drinkIndex]: true }));

    const aiResponse = await generateAIResponse(currentInput, drinkIndex);
    const aiMessage = { text: aiResponse, isUser: false, timestamp: Date.now() };
    setMessages(prev => ({
      ...prev,
      [drinkIndex]: [...(prev[drinkIndex] || []), aiMessage]
    }));
    setIsLoading(prev => ({ ...prev, [drinkIndex]: false }));

    const utterance = new SpeechSynthesisUtterance(aiResponse);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceInput = (drinkIndex: number) => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de voz.');
      return;
    }

    const isCurrentlyListening = isListening[drinkIndex];
    if (isCurrentlyListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

    setIsListening(prev => ({
      ...prev,
      [drinkIndex]: !isCurrentlyListening
    }));
  };

  const toggleDrink = (index: number) => {
    setExpandedDrink(expandedDrink === index ? null : index);
  };

  const toggleAiChat = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAiChat(showAiChat === index ? null : index);
  };

  const handleOrderClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDrinkIndex(index);
    setShowOrderModal(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDrinkIndex === null) return;

    const selectedDrink = drinks[selectedDrinkIndex];
    const phoneNumber = orderForm.phone.replace(/\D/g, '');
    const message = `Olá! Me chamo ${orderForm.name} e gostaria de fazer um pedido:\n\n*${selectedDrink.name}*\n${selectedDrink.description}`;
    
    const whatsappUrl = `https://wa.me/5544988024931?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setShowOrderModal(false);
    setOrderForm({ name: '', phone: '' });
  };

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

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {drinks.map((drink, index) => (
            <div
              key={index}
              className={`bg-white/5 rounded-lg overflow-hidden transition-all duration-300 ${
                expandedDrink === index ? 'lg:col-span-2 transform hover:scale-100' : 'transform hover:scale-105'
              }`}
              onClick={() => toggleDrink(index)}
            >
              <div className="relative">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className={`w-full ${expandedDrink === index ? 'h-96' : 'h-48'} object-cover transition-all duration-300`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-semibold text-white mb-2">{drink.name}</h3>
                <p className="text-gray-300">{drink.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <button
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {expandedDrink === index ? (
                      <>
                        Mostrar menos
                        <ArrowUp className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Mostrar mais
                        <ArrowDown className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </button>
                  {expandedDrink === index && (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => toggleAiChat(index, e)}
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Perguntar ao João
                      </button>
                      <button
                        onClick={(e) => handleOrderClick(index, e)}
                        className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Pedir agora
                      </button>
                    </div>
                  )}
                </div>

                {expandedDrink === index && (
                  <div className="mt-6 p-4 bg-white/5 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Detalhes do Drink</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Preparado com ingredientes premium</li>
                      <li>• Servido na temperatura ideal</li>
                      <li>• Decoração artesanal</li>
                      <li>• Disponível em eventos</li>
                    </ul>
                  </div>
                )}

                {showAiChat === index && (
                  <div className="mt-6 bg-black/50 p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-semibold">Chat com João Lucas</h3>
                      <button
                        onClick={(e) => toggleAiChat(index, e)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                      {messages[index]?.map((message, msgIndex) => (
                        <div
                          key={msgIndex}
                          className={`p-3 rounded-lg ${
                            message.isUser
                              ? 'bg-purple-500/20 ml-auto'
                              : 'bg-white/10'
                          } max-w-[80%] ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
                        >
                          <p className="text-white">{message.text}</p>
                          <span className="text-xs text-gray-400 block mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                      {isLoading[index] && (
                        <div className="bg-white/10 p-3 rounded-lg max-w-[80%]">
                          <p className="text-white">Digitando...</p>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit(index)} className="flex gap-2">
                      <input
                        type="text"
                        value={input[index] || ''}
                        onChange={(e) => setInput(prev => ({ ...prev, [index]: e.target.value }))}
                        placeholder={isListening[index] ? 'Ouvindo...' : 'Digite sua pergunta...'}
                        className="flex-1 bg-white/10 text-white border border-white/20 rounded-md p-2 focus:outline-none focus:border-white"
                        disabled={isListening[index]}
                      />
                      <button
                        type="button"
                        onClick={() => toggleVoiceInput(index)}
                        className={`p-2 rounded-md transition-colors ${
                          isListening[index]
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                        title={isListening[index] ? 'Parar gravação' : 'Gravar mensagem'}
                      >
                        {isListening[index] ? <MicOff size={20} /> : <Mic size={20} />}
                      </button>
                      <button
                        type="submit"
                        className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition-colors"
                        disabled={isListening[index]}
                      >
                        <Send size={20} />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://wa.me/5544988024931"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Solicitar Orçamento
          </a>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-black/90 rounded-lg p-6 max-w-md w-full border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Fazer Pedido</h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                    placeholder="Seu nome"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    id="phone"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Enviar Pedido via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinkMenu;
