
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MUPPETS, SHOWS } from './constants';
import { Muppet, ChatMessage } from './types';
import { MuppetCard } from './components/MuppetCard';
import { askMuppetLore } from './services/geminiService';

// --- Components ---

const Navbar = () => (
  <nav className="theatre-curtain text-white p-4 sticky top-0 z-50 overflow-hidden">
    <div className="absolute inset-0 curtain-texture pointer-events-none opacity-30"></div>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
      <Link to="/" className="flex items-center gap-4 group">
        <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-red-700 muppet-title text-3xl border-4 border-white group-hover:rotate-12 group-hover:scale-110 transition-all shadow-xl">M</div>
        <h1 className="muppet-title text-3xl tracking-wider drop-shadow-md">THE MUPPET VAULT</h1>
      </Link>
      <div className="flex gap-8 text-sm md:text-lg font-bold">
        <Link to="/" className="muppet-sub hover:text-yellow-300 transition-all uppercase tracking-widest hover:scale-105">Archives</Link>
        <Link to="/shows" className="muppet-sub hover:text-yellow-300 transition-all uppercase tracking-widest hover:scale-105">The Shows</Link>
        <Link to="/ask" className="muppet-sub hover:text-yellow-300 transition-all uppercase tracking-widest hover:scale-105">Ask Gonzo</Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 px-4 mt-20 text-center border-t-8 border-red-900">
    <div className="max-w-7xl mx-auto">
      <p className="muppet-title text-2xl text-yellow-400 mb-3 tracking-widest">It's time to play the music...</p>
      <p className="text-sm font-medium">Created for Muppet fans everywhere. All Muppet characters © Disney / The Muppets Studio.</p>
      <p className="text-xs mt-4 opacity-50">"Wocka Wocka!" - Fozzie Bear</p>
    </div>
  </footer>
);

// --- Views ---

const EncyclopediaView = () => {
  const [selectedMuppet, setSelectedMuppet] = useState<Muppet | null>(null);
  const [search, setSearch] = useState('');

  const filteredMuppets = MUPPETS.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.performer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="muppet-title text-5xl text-emerald-700 mb-6 drop-shadow-sm">Character Archives</h2>
        <div className="relative max-w-lg mx-auto transform hover:scale-105 transition-transform">
          <input 
            type="text" 
            placeholder="Search characters (e.g. Kermit, Piggy)..." 
            className="w-full px-8 py-4 rounded-full border-4 border-emerald-500 focus:outline-none focus:ring-8 focus:ring-emerald-100 text-xl font-bold muppet-sub"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500 text-2xl">🔍</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredMuppets.map(m => (
          <MuppetCard key={m.id} muppet={m} onClick={setSelectedMuppet} />
        ))}
      </div>

      {selectedMuppet && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in duration-300 border-8 border-emerald-500">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-5/12 h-64 md:h-auto">
                <img src={selectedMuppet.imageUrl} className="w-full h-full object-cover" alt={selectedMuppet.name} />
              </div>
              <div className="md:w-7/12 p-10 relative">
                <button 
                  onClick={() => setSelectedMuppet(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-red-500 text-3xl font-bold"
                >✕</button>
                <h2 className="muppet-title text-5xl text-emerald-600 mb-4">{selectedMuppet.name}</h2>
                <div className="space-y-5 text-lg leading-relaxed">
                  <p><strong className="muppet-sub text-emerald-700">Performer:</strong> {selectedMuppet.performer}</p>
                  <p><strong className="muppet-sub text-emerald-700">Era:</strong> {selectedMuppet.era}</p>
                  <p><strong className="muppet-sub text-emerald-700">First Seen:</strong> {selectedMuppet.firstAppearance}</p>
                  <p className="text-gray-700">{selectedMuppet.description}</p>
                  <div className="bg-yellow-50 p-6 rounded-3xl italic border-l-8 border-yellow-400 shadow-inner">
                    <strong className="muppet-sub text-yellow-700 block not-italic mb-1">Trivia:</strong> 
                    <span className="text-gray-800">"{selectedMuppet.bestKnownFor}"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ShowComparisonView = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="muppet-title text-5xl text-center text-red-800 mb-16 underline decoration-yellow-400 decoration-8 underline-offset-8">Then vs. Now</h2>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Classic */}
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-b-[16px] border-yellow-500 transform hover:-rotate-1 transition-transform">
          <div className="h-56 bg-red-800 flex flex-col items-center justify-center text-white p-8 relative">
             <div className="absolute inset-0 curtain-texture opacity-20 pointer-events-none"></div>
            <span className="text-7xl mb-4 block relative z-10">🎭</span>
            <h3 className="muppet-title text-3xl relative z-10 text-center">{SHOWS.classic.title}</h3>
          </div>
          <div className="p-10">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">{SHOWS.classic.description}</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="muppet-sub text-yellow-600 text-lg w-28 shrink-0">Years:</span>
                <span className="text-gray-800 font-bold">{SHOWS.classic.years}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="muppet-sub text-yellow-600 text-lg w-28 shrink-0">Format:</span>
                <span className="text-gray-800 font-bold">{SHOWS.classic.format}</span>
              </div>
              <div>
                <span className="muppet-sub text-yellow-600 text-lg block mb-4">Legacy Staples:</span>
                <div className="flex flex-wrap gap-3">
                  {SHOWS.classic.keyFeatures.map(f => (
                    <span key={f} className="bg-yellow-100 px-4 py-2 rounded-full text-sm font-bold text-yellow-800 border-2 border-yellow-200">✨ {f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern */}
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-b-[16px] border-blue-500 transform hover:rotate-1 transition-transform">
          <div className="h-56 bg-blue-900 flex flex-col items-center justify-center text-white p-8">
            <span className="text-7xl mb-4 block">📱</span>
            <h3 className="muppet-title text-3xl text-center">{SHOWS.reboot.title}</h3>
          </div>
          <div className="p-10">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">{SHOWS.reboot.description}</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="muppet-sub text-blue-600 text-lg w-28 shrink-0">Years:</span>
                <span className="text-gray-800 font-bold">{SHOWS.reboot.years}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="muppet-sub text-blue-600 text-lg w-28 shrink-0">Format:</span>
                <span className="text-gray-800 font-bold">{SHOWS.reboot.format}</span>
              </div>
              <div>
                <span className="muppet-sub text-blue-600 text-lg block mb-4">Modern Flavors:</span>
                <div className="flex flex-wrap gap-3">
                  {SHOWS.reboot.keyFeatures.map(f => (
                    <span key={f} className="bg-blue-100 px-4 py-2 rounded-full text-sm font-bold text-blue-800 border-2 border-blue-200">🚀 {f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AskGonzoView = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await askMuppetLore(messages, input);
    const modelMsg: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-250px)] flex flex-col">
      <div className="text-center mb-8">
        <h2 className="muppet-title text-5xl text-purple-700 mb-2">Ask the Lore Expert</h2>
        <p className="muppet-sub text-purple-400 italic text-xl">"Gonzo says: Deep questions for deep people!"</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6 mb-6 border-4 border-purple-100 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-20 text-purple-200">
            <p className="text-9xl mb-6 opacity-50">🎺</p>
            <p className="muppet-title text-2xl">Ask me about guest stars, performers, or the history of the show!</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-6 rounded-3xl shadow-sm text-lg ${
              m.role === 'user' 
                ? 'bg-purple-600 text-white rounded-tr-none muppet-sub' 
                : 'bg-gray-50 text-gray-800 rounded-tl-none border-2 border-gray-100 italic leading-relaxed'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-purple-50 p-5 rounded-3xl animate-bounce text-purple-600 font-bold muppet-sub border-2 border-purple-200">
              Gonzo is checking his trumpet archives...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <input 
          type="text" 
          placeholder="Who was the first guest star? How does Animal drum so fast?"
          className="flex-1 px-8 py-5 rounded-3xl border-4 border-purple-200 focus:outline-none focus:border-purple-600 shadow-xl text-xl font-medium muppet-sub"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-purple-600 text-white px-10 py-5 rounded-3xl muppet-title text-2xl hover:bg-purple-700 transition-all shadow-xl disabled:opacity-50 active:scale-95"
        >
          Ask!
        </button>
      </div>
    </div>
  );
};

// --- App Root ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#fdfcf0]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<EncyclopediaView />} />
            <Route path="/shows" element={<ShowComparisonView />} />
            <Route path="/ask" element={<AskGonzoView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
