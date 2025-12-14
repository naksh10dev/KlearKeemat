"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot'|'user', text: string}[]>([
    { role: 'bot', text: "Namaste! I am KisanMitra. Ask me about crop prices, weather, or fertilizers." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");

    // 2. Simulate AI Thinking
    setTimeout(() => {
      let botResponse = "I am not sure about that. Try asking about 'wheat prices' or 'fertilizer'.";
      
      const lowerInput = userMsg.toLowerCase();
      
      // Simple Rules for the Bot
      if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("namaste")) {
        botResponse = "Ram Ram! How can I help you with your farming today?";
      } else if (lowerInput.includes("price") || lowerInput.includes("rate")) {
        botResponse = "Mandi rates are updated daily. Wheat is currently ₹2200/qt and Onion is ₹1800/qt.";
      } else if (lowerInput.includes("weather") || lowerInput.includes("rain")) {
        botResponse = "It looks sunny in Punjab today. Good time for harvesting!";
      } else if (lowerInput.includes("fertilizer") || lowerInput.includes("urea")) {
        botResponse = "For Wheat, use NPK 4:2:1 ratio. Ensure soil moisture before applying Urea.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 1. Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all flex items-center gap-2"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="font-bold hidden md:inline">Agri AI</span>
        </button>
      )}

      {/* 2. Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-green-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-bold">KisanMitra AI</h3>
                <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-green-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about crops..."
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 text-slate-900"
            />
            <button 
              onClick={handleSend}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}