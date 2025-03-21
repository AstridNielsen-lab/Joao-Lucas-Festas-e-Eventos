import React, { useState, useRef, useEffect } from 'react';
import { Award, Users, Calendar, Heart, MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import axios from 'axios';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface MissionCard {
  title: string;
  content: string;
}

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyBAUeMGmXN5Cfyo4Rp-83pBZCV4suJRBvQ";

const missionCards: MissionCard[] = [
  {
    title: "Visão",
    content: "Ser referência em qualidade e inovação no mercado de eventos, criando experiências únicas e memoráveis."
  },
  {
    title: "Missão",
    content: "Proporcionar momentos inesquecíveis através de serviços de excelência e atendimento personalizado."
  },
  {
    title: "Valores",
    content: "Comprometimento, qualidade, inovação, ética e paixão pelo que fazemos."
  }
];

const AboutPage = () => {
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

  const generateAIResponse = async (userMessage: string, cardIndex: number) => {
    try {
      const card = missionCards[cardIndex];
      const prompt = `Você é João Lucas, especialista em eventos, respondendo a uma pergunta sobre nossa ${card.title}.

Contexto:
${card.content}

IMPORTANTE:
- Mantenha respostas CURTAS e OBJETIVAS (máximo 3 linhas)
- Responda com base em nossa ${card.title}
- Seja DIRETO e PROFISSIONAL
- Se a pergunta não estiver relacionada, sugira entrar em contato pelo WhatsApp: (44) 98802-4931

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

  const handleSubmit = (cardIndex: number) => async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input[cardIndex]?.trim();
    if (!currentInput) return;

    const userMessage = { text: currentInput, isUser: true, timestamp: Date.now() };
    setMessages(prev => ({
      ...prev,
      [cardIndex]: [...(prev[cardIndex] || []), userMessage]
    }));
    setInput(prev => ({ ...prev, [cardIndex]: '' }));
    setIsLoading(prev => ({ ...prev, [cardIndex]: true }));

    const aiResponse = await generateAIResponse(currentInput, cardIndex);
    const aiMessage = { text: aiResponse, isUser: false, timestamp: Date.now() };
    setMessages(prev => ({
      ...prev,
      [cardIndex]: [...(prev[cardIndex] || []), aiMessage]
    }));
    setIsLoading(prev => ({ ...prev, [cardIndex]: false }));

    const utterance = new SpeechSynthesisUtterance(aiResponse);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceInput = (cardIndex: number) => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de voz.');
      return;
    }

    const isCurrentlyListening = isListening[cardIndex];
    if (isCurrentlyListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

    setIsListening(prev => ({
      ...prev,
      [cardIndex]: !isCurrentlyListening
    }));
  };

  const toggleAiChat = (index: number) => {
    setShowAiChat(showAiChat === index ? null : index);
  };

  return (
    <div className="pt-16">
      <div className="relative h-[300px]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Nossa História"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Nossa História
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Transformando momentos em memórias desde 2015
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Uma Jornada de Excelência
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Desde nossa fundação em 2015, a João Lucas Festas e Eventos tem se dedicado a criar experiências únicas e memoráveis para nossos clientes. Nossa jornada começou com um sonho de transformar eventos comuns em momentos extraordinários.
              </p>
              <p>
                Com anos de experiência no mercado de eventos, desenvolvemos um profundo conhecimento das necessidades e desejos dos nossos clientes, sempre buscando superar expectativas e criar momentos inesquecíveis.
              </p>
              <p>
                Nossa equipe altamente qualificada trabalha com paixão e dedicação para garantir que cada detalhe seja perfeito, desde a escolha dos drinks até a coordenação completa do evento.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg text-center">
              <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Qualidade</h3>
              <p className="text-gray-400">Excelência em cada detalhe</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg text-center">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Equipe</h3>
              <p className="text-gray-400">Profissionais dedicados</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg text-center">
              <Calendar className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Experiência</h3>
              <p className="text-gray-400">Anos no mercado</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg text-center">
              <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Paixão</h3>
              <p className="text-gray-400">Amor pelo que fazemos</p>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Nossa Missão
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionCards.map((card, index) => (
              <div key={index} className="bg-white/5 p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
                <p className="text-gray-300 mb-4">{card.content}</p>
                <button
                  onClick={() => toggleAiChat(index)}
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
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
    </div>
  );
};

export default AboutPage;
