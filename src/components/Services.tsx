import React, { useState, useRef, useEffect } from 'react';
import { GlassWater, Music2, Users, Sparkles, MapPin, MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import axios from 'axios';

interface Service {
  name: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyBAUeMGmXN5Cfyo4Rp-83pBZCV4suJRBvQ";

const services: Service[] = [
  {
    name: "Barman e Drinks",
    description: "Drinks clássicos e exclusivos preparados por profissionais experientes.",
    icon: <GlassWater className="h-8 w-8 text-white" />,
    features: [
      "Bartenders profissionais certificados",
      "Menu personalizado de drinks",
      "Drinks clássicos e autorais",
      "Insumos de alta qualidade",
      "Decoração do bar"
    ]
  },
  {
    name: "Equipe Completa",
    description: "Garçons, segurança e equipe de limpeza para seu evento.",
    icon: <Users className="h-8 w-8 text-white" />,
    features: [
      "Garçons treinados",
      "Equipe de segurança",
      "Staff de limpeza",
      "Coordenador de eventos",
      "Recepcionistas"
    ]
  },
  {
    name: "DJ e Som",
    description: "Música de qualidade e iluminação profissional.",
    icon: <Music2 className="h-8 w-8 text-white" />,
    features: [
      "DJs experientes",
      "Equipamento profissional",
      "Iluminação completa",
      "Repertório personalizado",
      "Técnico de som"
    ]
  },
  {
    name: "Decoração",
    description: "Ambientação personalizada para tornar seu evento único.",
    icon: <Sparkles className="h-8 w-8 text-white" />,
    features: [
      "Decoração temática",
      "Flores e arranjos",
      "Mobiliário",
      "Cenografia",
      "Projeto personalizado"
    ]
  },
  {
    name: "Locação de Espaço",
    description: "Parceria com os melhores espaços para eventos.",
    icon: <MapPin className="h-8 w-8 text-white" />,
    features: [
      "Espaços exclusivos",
      "Diferentes capacidades",
      "Infraestrutura completa",
      "Localização privilegiada",
      "Estacionamento"
    ]
  }
];

const Services = () => {
  const [showAiChat, setShowAiChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({});
  const [input, setInput] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
  const [isListening, setIsListening] = useState<{ [key: number]: boolean }>({});
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

  const generateAIResponse = async (userMessage: string, serviceIndex: number) => {
    try {
      const service = services[serviceIndex];
      const prompt = `Você é João Lucas, especialista em eventos, respondendo a uma pergunta sobre nosso serviço de ${service.name}.

Detalhes do serviço:
${service.description}

Características principais:
${service.features.map(f => `- ${f}`).join('\n')}

IMPORTANTE:
- Mantenha respostas CURTAS e OBJETIVAS (máximo 3 linhas)
- Responda com base nas informações do serviço
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

  const handleSubmit = (serviceIndex: number) => async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input[serviceIndex]?.trim();
    if (!currentInput) return;

    const userMessage = { text: currentInput, isUser: true, timestamp: Date.now() };
    setMessages(prev => ({
      ...prev,
      [serviceIndex]: [...(prev[serviceIndex] || []), userMessage]
    }));
    setInput(prev => ({ ...prev, [serviceIndex]: '' }));
    setIsLoading(prev => ({ ...prev, [serviceIndex]: true }));

    const aiResponse = await generateAIResponse(currentInput, serviceIndex);
    const aiMessage = { text: aiResponse, isUser: false, timestamp: Date.now() };
    setMessages(prev => ({
      ...prev,
      [serviceIndex]: [...(prev[serviceIndex] || []), aiMessage]
    }));
    setIsLoading(prev => ({ ...prev, [serviceIndex]: false }));

    const utterance = new SpeechSynthesisUtterance(aiResponse);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceInput = (serviceIndex: number) => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de voz.');
      return;
    }

    const isCurrentlyListening = isListening[serviceIndex];
    if (isCurrentlyListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

    setIsListening(prev => ({
      ...prev,
      [serviceIndex]: !isCurrentlyListening
    }));
  };

  const toggleAiChat = (index: number) => {
    setShowAiChat(showAiChat === index ? null : index);
  };

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
              <h3 className="mt-4 text-lg font-medium text-white">{service.name}</h3>
              <p className="mt-2 text-gray-400">{service.description}</p>
              <ul className="mt-4 space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-400 text-sm">
                    • {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => toggleAiChat(index)}
                className="mt-4 inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Perguntar ao João
              </button>

              {showAiChat === index && (
                <div className="mt-6 bg-black/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold">Chat com João Lucas</h3>
                    <button
                      onClick={() => toggleAiChat(index)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
