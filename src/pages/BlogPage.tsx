import React, { useState, useRef, useEffect } from 'react';
import { Calendar, User, ArrowRight, ArrowDown, ArrowUp, MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import axios from 'axios';

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyBAUeMGmXN5Cfyo4Rp-83pBZCV4suJRBvQ";

const posts: BlogPost[] = [
  {
    title: "Como Escolher o Menu de Drinks Perfeito para seu Evento",
    excerpt: "Dicas essenciais para selecionar as bebidas ideais que agradarão a todos os seus convidados.",
    content: `A escolha do menu de drinks é fundamental para o sucesso do seu evento. Aqui estão algumas dicas importantes:

1. Conheça seu público
- Considere a faixa etária dos convidados
- Leve em conta preferências regionais
- Pense em opções sem álcool

2. Variedade é importante
- Inclua opções clássicas e criativas
- Ofereça drinks para diferentes paladares
- Tenha opções refrescantes e mais fortes

3. Quantidade ideal
- Calcule em média 4-5 drinks por pessoa
- Preveja duração do evento
- Considere a época do ano

4. Harmonização
- Combine com o cardápio do evento
- Pense nas temperaturas das bebidas
- Considere o clima e horário`,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "10 Mar 2024",
    author: "João Lucas",
    category: "Drinks"
  },
  {
    title: "Tendências em Decoração para Casamentos em 2024",
    excerpt: "Descubra as últimas tendências em decoração que estão fazendo sucesso nos casamentos.",
    content: `As tendências de decoração para casamentos em 2024 estão mais emocionantes do que nunca:

1. Sustentabilidade
- Materiais reciclados e reutilizáveis
- Flores da estação
- Decoração consciente

2. Paletas de cores
- Tons terrosos e naturais
- Combinações ousadas
- Monocromático elegante

3. Iluminação
- LED sustentável
- Velas e luminárias
- Projeções personalizadas

4. Elementos naturais
- Jardins verticais
- Flores secas
- Materiais orgânicos`,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "05 Mar 2024",
    author: "Maria Silva",
    category: "Decoração"
  },
  {
    title: "Como Organizar uma Festa Corporativa de Sucesso",
    excerpt: "Guia completo para planejar um evento corporativo memorável e profissional.",
    content: `Organize um evento corporativo de sucesso seguindo estas diretrizes:

1. Planejamento inicial
- Defina objetivos claros
- Estabeleça orçamento
- Escolha data e local adequados

2. Logística
- Contrate fornecedores confiáveis
- Planeje o cardápio
- Organize a programação

3. Entretenimento
- Música ambiente apropriada
- Atividades de integração
- Apresentações profissionais

4. Detalhes importantes
- Recepção dos convidados
- Identificação e credenciamento
- Registro fotográfico`,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "28 Fev 2024",
    author: "Carlos Santos",
    category: "Corporativo"
  },
  {
    title: "Os Melhores Drinks para Festas de Verão",
    excerpt: "Receitas refrescantes e dicas de apresentação para drinks perfeitos para o calor.",
    content: `Drinks refrescantes são essenciais para festas de verão. Confira nossas sugestões:

1. Drinks cítricos
- Mojito tropical
- Gin tônica com frutas
- Caipirinha de frutas vermelhas

2. Apresentação
- Taças decoradas
- Gelos especiais
- Guarnições criativas

3. Dicas de preparo
- Frutas da estação
- Xaropes naturais
- Técnicas de mixologia

4. Harmonização
- Petiscos leves
- Opções sem álcool
- Drinks em grupo`,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: "20 Fev 2024",
    author: "João Lucas",
    category: "Drinks"
  }
];

const BlogPage = () => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
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

  const generateAIResponse = async (userMessage: string, postIndex: number) => {
    try {
      const post = posts[postIndex];
      const prompt = `Você é João Lucas, especialista em eventos, respondendo a uma pergunta sobre o artigo "${post.title}". 
      
Contexto do artigo:
${post.content}

IMPORTANTE:
- Mantenha respostas CURTAS e OBJETIVAS (máximo 3 linhas)
- Responda com base no conteúdo do artigo
- Seja DIRETO e PROFISSIONAL
- Se a pergunta não estiver relacionada ao artigo, sugira entrar em contato pelo WhatsApp: (44) 98802-4931

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

  const handleSubmit = (postIndex: number) => async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input[postIndex]?.trim();
    if (!currentInput) return;

    const userMessage = { text: currentInput, isUser: true, timestamp: Date.now() };
    setMessages(prev => ({
      ...prev,
      [postIndex]: [...(prev[postIndex] || []), userMessage]
    }));
    setInput(prev => ({ ...prev, [postIndex]: '' }));
    setIsLoading(prev => ({ ...prev, [postIndex]: true }));

    const aiResponse = await generateAIResponse(currentInput, postIndex);
    const aiMessage = { text: aiResponse, isUser: false, timestamp: Date.now() };
    setMessages(prev => ({
      ...prev,
      [postIndex]: [...(prev[postIndex] || []), aiMessage]
    }));
    setIsLoading(prev => ({ ...prev, [postIndex]: false }));

    const utterance = new SpeechSynthesisUtterance(aiResponse);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceInput = (postIndex: number) => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de voz.');
      return;
    }

    const isCurrentlyListening = isListening[postIndex];
    if (isCurrentlyListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

    setIsListening(prev => ({
      ...prev,
      [postIndex]: !isCurrentlyListening
    }));
  };

  const togglePost = (index: number) => {
    setExpandedPost(expandedPost === index ? null : index);
    setShowAiChat(null);
  };

  const toggleAiChat = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAiChat(showAiChat === index ? null : index);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className={`bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors ${
                expandedPost === index ? 'lg:col-span-2' : ''
              }`}
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
                  {expandedPost === index ? post.content : post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => togglePost(index)}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {expandedPost === index ? (
                      <>
                        Ler menos
                        <ArrowUp className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Ler mais
                        <ArrowDown className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </button>
                  {expandedPost === index && (
                    <button
                      onClick={(e) => toggleAiChat(index, e)}
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Perguntar ao João
                    </button>
                  )}
                </div>
                
                {showAiChat === index && (
                  <div className="mt-6 bg-black/50 p-4 rounded-lg">
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
