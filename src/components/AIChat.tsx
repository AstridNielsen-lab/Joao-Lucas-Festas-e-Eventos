import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, MessageCircle, Mic, MicOff, X } from 'lucide-react';
import axios from 'axios';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyBAUeMGmXN5Cfyo4Rp-83pBZCV4suJRBvQ";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface UserInfo {
  name: string;
  lastVisit: number;
  hasSeenIntro: boolean;
}

const AIChat = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(true);
  const [userName, setUserName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isSpeakingRef = useRef(false);
  const lastProcessedTimestampRef = useRef(0);

  useEffect(() => {
    const loadUserData = () => {
      const userInfo = localStorage.getItem('userInfo');
      const chatHistory = localStorage.getItem('chatHistory');
      
      if (userInfo) {
        const parsedInfo: UserInfo = JSON.parse(userInfo);
        setUserName(parsedInfo.name);
        setShowNamePrompt(false);
        
        if (chatHistory) {
          setMessages(JSON.parse(chatHistory));
        }
        
        if (!parsedInfo.hasSeenIntro || Date.now() - parsedInfo.lastVisit > 24 * 60 * 60 * 1000) {
          const introMessage = {
            text: `Olá ${parsedInfo.name}! Sou João Lucas, especialista em eventos. Como posso ajudar hoje?`,
            isUser: false,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, introMessage]);
        }
        
        localStorage.setItem('userInfo', JSON.stringify({
          ...parsedInfo,
          lastVisit: Date.now(),
          hasSeenIntro: true
        }));
      }
    };
    
    loadUserData();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const userInfo: UserInfo = {
      name: nameInput.trim(),
      lastVisit: Date.now(),
      hasSeenIntro: false
    };
    
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setUserName(nameInput.trim());
    setShowNamePrompt(false);
    
    const introMessage = {
      text: `Olá ${nameInput.trim()}! Sou João Lucas, especialista em eventos. Como posso ajudar hoje?`,
      isUser: false,
      timestamp: Date.now()
    };
    setMessages([introMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let interval: number;
    if (isMinimized && hasNewMessage) {
      interval = setInterval(() => {
        const icon = document.getElementById('chat-icon');
        if (icon) {
          icon.style.opacity = icon.style.opacity === '1' ? '0.5' : '1';
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMinimized, hasNewMessage]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = async (event) => {
        const now = Date.now();
        const transcript = event.results[event.results.length - 1][0].transcript;
        
        if (!isSpeakingRef.current && 
            transcript.trim() && 
            now - lastProcessedTimestampRef.current > 1000) {
          lastProcessedTimestampRef.current = now;
          setInput(transcript);
          await handleVoiceSubmit(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        if (isListening && !isSpeakingRef.current) {
          setTimeout(() => {
            if (isListening && recognitionRef.current && !isSpeakingRef.current) {
              recognitionRef.current.start();
            }
          }, 100);
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'no-speech') {
          setIsListening(false);
        }
      };
    }
  }, [isListening]);

  const handleVoiceSubmit = async (voiceInput: string) => {
    if (isSpeakingRef.current) return;

    const userMessage = { text: voiceInput, isUser: true, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const aiResponse = await generateAIResponse(voiceInput);
    const aiMessage = { text: aiResponse, isUser: false, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
    
    await speakMessage(aiResponse);
    
    if (isListening && recognitionRef.current) {
      setTimeout(() => {
        if (isListening && recognitionRef.current && !isSpeakingRef.current) {
          recognitionRef.current.start();
        }
      }, 500);
    }
    
    if (isMinimized) {
      setHasNewMessage(true);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de voz.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      isSpeakingRef.current = false;
      lastProcessedTimestampRef.current = 0;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakMessage = async (text: string) => {
    return new Promise<void>((resolve) => {
      const cleanText = text.replace(/[^a-zA-Z0-9áéíóúâêîôûãõàèìòùç.,!? ]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      
      isSpeakingRef.current = true;
      
      utterance.onend = () => {
        isSpeakingRef.current = false;
        resolve();
      };

      utterance.onerror = () => {
        isSpeakingRef.current = false;
        resolve();
      };
      
      window.speechSynthesis.speak(utterance);
    });
  };

  const generateAIResponse = async (userMessage: string) => {
    try {
      const prompt = `Você é João Lucas, especialista em eventos conversando com ${userName}. IMPORTANTE:

- Mantenha respostas CURTAS e OBJETIVAS (máximo 3 linhas)
- Foque em FECHAR NEGÓCIO
- Sempre sugira WhatsApp para orçamentos: (44) 98802-4931
- Seja DIRETO e PROFISSIONAL

SERVIÇOS:
- Bartenders e drinks
- Garçons e equipe
- Som e iluminação
- Decoração
- Locação de espaço

Para drinks específicos, liste apenas:
- Ingredientes principais
- Preço por pessoa
- Sugestão de quantidade

Mensagem: ${userMessage}`;

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

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      return aiResponse;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "Desculpe, estou com dificuldades técnicas. Entre em contato pelo WhatsApp (44) 98802-4931.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await generateAIResponse(input);
    const aiMessage = { text: aiResponse, isUser: false, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
    
    if (!isListening) {
      await speakMessage(aiResponse);
    }
    
    if (isMinimized) {
      setHasNewMessage(true);
    }
  };

  const toggleChat = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setHasNewMessage(false);
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('chatHistory');
    setMessages([]);
  };

  if (isMinimized) {
    return (
      <button
        id="chat-icon"
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:bg-white hover:text-black border-2 border-white transition-all duration-300"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  if (showNamePrompt) {
    return (
      <div className="fixed bottom-4 right-4 w-96 bg-black/90 rounded-lg shadow-xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Bem-vindo!</h3>
        <p className="text-gray-300 mb-4">Para melhor atendê-lo, por favor me diga seu nome:</p>
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Digite seu nome..."
            className="w-full p-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:border-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-black p-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Começar Conversa
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-black/90 rounded-lg shadow-xl flex flex-col border border-white/10" style={{ height: '500px' }}>
      <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center border-b border-white/10">
        <div>
          <h3 className="text-lg">Chat com João Lucas</h3>
          <p className="text-sm text-gray-400">Olá, {userName}!</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={clearHistory} 
            className="text-gray-400 hover:text-white transition-colors"
            title="Limpar histórico"
          >
            <X size={20} />
          </button>
          <button 
            onClick={toggleChat}
            className="text-white hover:text-gray-300"
          >
            <MessageCircle size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.isUser
                ? 'bg-white text-black ml-auto'
                : 'bg-white/10 text-white'
            } max-w-[80%] ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
          >
            <p>{message.text}</p>
            {!message.isUser && (
              <button
                onClick={() => speakMessage(message.text)}
                className="mt-2 text-gray-300 hover:text-white"
              >
                <Volume2 size={16} />
              </button>
            )}
            <span className="text-xs text-gray-500 block mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        
        {isLoading && (
          <div className="bg-white/10 p-3 rounded-lg max-w-[80%]">
            <p className="text-white">Digitando...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? 'Ouvindo...' : 'Pergunte sobre eventos, orçamentos ou drinks...'}
            className="flex-1 p-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:border-white placeholder-gray-400"
            disabled={isListening}
          />
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2 rounded-md transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
            title={isListening ? 'Parar gravação' : 'Gravar mensagem'}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button
            type="submit"
            disabled={isListening}
            className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        {isListening && (
          <p className="text-sm text-gray-400 mt-2">
            Fale sua mensagem. O envio será automático após cada pausa.
          </p>
        )}
      </form>
    </div>
  );
};

export default AIChat;