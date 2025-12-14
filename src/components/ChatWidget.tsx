// src/components/ChatWidget.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([
    { role: 'bot', text: "Namaste! I am KisanMitra. Ask me about crop diseases, fertilizers, or prices." }
  ]);
  
  // Auto-scroll to bottom
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput(""); // Clear input immediately
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // CALL OUR REAL BACKEND API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      } else {
        throw new Error("No reply");
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I am having trouble connecting to the satellite. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center gap-2"
        >
          <MessageCircle size={28} />
          <span className="font-bold pr-2">Agri AI</span>
        </button>
      )}

      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-bold">KisanMitra AI</h3>
                <p className="text-xs text-green-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded"><X size={20} /></button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-green-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 text-slate-800 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ask about crops..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend} 
              disabled={loading || !input.trim()}
              className="bg-green-600 disabled:bg-slate-300 text-white p-2 rounded-full transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}