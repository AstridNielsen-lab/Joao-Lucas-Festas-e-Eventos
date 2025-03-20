import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Wine } from 'lucide-react';
import axios from 'axios';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyBAUeMGmXN5Cfyo4Rp-83pBZCV4suJRBvQ";

interface Message {
  text: string;
  isUser: boolean;
}

const AIChat: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const speakMessage = (text: string) => {
    const cleanText = text.replace(/[^a-zA-Z0-9áéíóúâêîôûãõàèìòùç.,!? ]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  };

  const generateAIResponse = async (userMessage: string) => {
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `Você é um bartender profissional e especialista em coquetelaria, com vasto conhecimento em bebidas, drinks e harmonização. Responda de forma curta e direta, sem usar caracteres especiais ou formatação. Limite a resposta a 2-3 frases curtas. Se perguntarem sobre comida, sugira que o foco é em bebidas e drinks, mas pode dar dicas gerais de harmonização. Mensagem: ${userMessage}`
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
    speakMessage(aiResponse);
    
    if (isMinimized) {
      setHasNewMessage(true);
    }
  };

  const toggleChat = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setHasNewMessage(false);
    }
  };

  if (isMinimized) {
    return (
      <button
        id="chat-icon"
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-opacity duration-300"
      >
        <Wine size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl flex flex-col" style={{ height: '500px' }}>
      <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer" onClick={toggleChat}>
        <div>
          <h3 className="text-lg">Bartender Virtual</h3>
          <p className="text-sm">Especialista em Drinks</p>
        </div>
        <button className="text-white hover:text-gray-200">
          <Wine size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p>Olá! Sou especialista em drinks e coquetelaria. Como posso ajudar?</p>
        </div>
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.isUser
                ? 'bg-gray-800 text-white ml-auto'
                : 'bg-gray-100 text-gray-800'
            } max-w-[80%] ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
          >
            <p>{message.text}</p>
            {!message.isUser && (
              <button
                onClick={() => speakMessage(message.text)}
                className="mt-2 text-gray-600 hover:text-gray-800"
              >
                <Volume2 size={16} />
              </button>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
            <p>Digitando...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte sobre drinks..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;