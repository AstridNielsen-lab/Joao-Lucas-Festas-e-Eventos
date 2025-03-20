import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, MessageCircle, Mic, MicOff } from 'lucide-react';
import axios from 'axios';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyBAUeMGmXN5Cfyo4Rp-83pBZCV4suJRBvQ";

interface Message {
  text: string;
  isUser: boolean;
}

const AIChat = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isSpeakingRef = useRef(false);

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
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = async (event) => {
        // Only process speech if we're not currently speaking a response
        if (!isSpeakingRef.current) {
          const transcript = event.results[event.results.length - 1][0].transcript;
          if (transcript.trim()) {
            setInput(transcript);
            await handleVoiceSubmit(transcript);
          }
        }
      };

      recognitionRef.current.onend = () => {
        // Only restart if we're still in listening mode and not speaking
        if (isListening && !isSpeakingRef.current && recognitionRef.current) {
          recognitionRef.current.start();
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
    const userMessage = { text: voiceInput, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await generateAIResponse(voiceInput);
    const aiMessage = { text: aiResponse, isUser: false };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
    
    // Temporarily pause recognition while speaking
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    
    await speakMessage(aiResponse);
    
    // Resume recognition after speaking if still in listening mode
    if (isListening && recognitionRef.current) {
      recognitionRef.current.start();
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
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakMessage = async (text: string) => {
    return new Promise<void>((resolve) => {
      const cleanText = text.replace(/[^a-zA-Z0-9áéíóúâêîôûãõàèìòùç.,!? ]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      
      // Mark that we're speaking to prevent recognition
      isSpeakingRef.current = true;
      
      utterance.onend = () => {
        // Mark that we're done speaking
        isSpeakingRef.current = false;
        resolve();
      };
      
      window.speechSynthesis.speak(utterance);
    });
  };

  const generateAIResponse = async (userMessage: string) => {
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `Você é João Lucas, especialista em festas e eventos. Responda de forma curta e direta, sem usar caracteres especiais ou formatação. Limite a resposta a 2-3 frases curtas. Mensagem: ${userMessage}`
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

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await generateAIResponse(input);
    const aiMessage = { text: aiResponse, isUser: false };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
    
    // Only speak if we're not in listening mode
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
      // Stop listening when minimizing
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
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

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-black/90 rounded-lg shadow-xl flex flex-col border border-white/10" style={{ height: '500px' }}>
      <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer border-b border-white/10" onClick={toggleChat}>
        <div>
          <h3 className="text-lg">Chat com João Lucas</h3>
          <p className="text-sm text-gray-400">Especialista em Festas</p>
        </div>
        <button className="text-white hover:text-gray-300">
          <MessageCircle size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white/10 p-3 rounded-lg">
          <p className="text-white">Olá! Como posso ajudar com seu evento?</p>
        </div>
        
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
            placeholder={isListening ? 'Ouvindo...' : 'Digite sua mensagem...'}
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