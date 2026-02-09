
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MUPPETS, SHOWS } from './constants';
import { Muppet, ChatMessage } from './types';
import { MuppetCard } from './components/MuppetCard';
import { askMuppetLore } from './services/geminiService';

// --- Components ---

const Navbar = () => (
  <nav className="theatre-curtain text-white p-4 sticky top-0 z-50 shadow-lg">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-red-700 muppet-font text-2xl border-2 border-white group-hover:rotate-12 transition-transform">M</div>
        <h1 className="muppet-font text-2xl tracking-widest">THE MUPPET VAULT</h1>
      </Link>
      <div className="flex gap-6 text-sm md:text-base font-bold">
        <Link to="/" className="hover:text-yellow-300 transition-colors uppercase tracking-wider">Encyclopedia</Link>
        <Link to="/shows" className="hover:text-yellow-300 transition-colors uppercase tracking-wider">The Shows</Link>
        <Link to="/ask" className="hover:text-yellow-300 transition-colors uppercase tracking-wider">Ask Gonzo</Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-12 text-center">
    <div className="max-w-7xl mx-auto">
      <p className="muppet-font text-lg text-white mb-2">It's time to play the music...</p>
      <p className="text-sm">Created for Muppet fans everywhere. All Muppet characters © Disney / The Muppets Studio.</p>
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="muppet-font text-4xl text-emerald-700 mb-4">Character Archives</h2>
        <div className="relative max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Search characters (e.g. Kermit, Piggy)..." 
            className="w-full px-6 py-3 rounded-full border-2 border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMuppets.map(m => (
          <MuppetCard key={m.id} muppet={m} onClick={setSelectedMuppet} />
        ))}
      </div>

      {selectedMuppet && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img src={selectedMuppet.imageUrl} className="w-full h-full object-cover" alt={selectedMuppet.name} />
              </div>
              <div className="md:w-1/2 p-8 relative">
                <button 
                  onClick={() => setSelectedMuppet(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
                >✕</button>
                <h2 className="muppet-font text-3xl text-emerald-600 mb-2">{selectedMuppet.name}</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Performer:</strong> {selectedMuppet.performer}</p>
                  <p><strong>Era:</strong> {selectedMuppet.era}</p>
                  <p><strong>First Seen:</strong> {selectedMuppet.firstAppearance}</p>
                  <p><strong>Description:</strong> {selectedMuppet.description}</p>
                  <div className="bg-emerald-50 p-4 rounded-lg italic border-l-4 border-emerald-500">
                    <strong>Trivia:</strong> {selectedMuppet.bestKnownFor}
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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="muppet-font text-4xl text-center text-red-800 mb-12">Then vs. Now</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Classic */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-yellow-500">
          <div className="h-48 bg-gray-800 flex items-center justify-center text-white p-8">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🎭</span>
              <h3 className="muppet-font text-2xl">{SHOWS.classic.title}</h3>
            </div>
          </div>
          <div className="p-8">
            <p className="text-gray-600 mb-6">{SHOWS.classic.description}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-yellow-600 w-24">Years:</span>
                <span>{SHOWS.classic.years}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-yellow-600 w-24">Format:</span>
                <span>{SHOWS.classic.format}</span>
              </div>
              <div>
                <span className="font-bold text-yellow-600 block mb-2">Legacy Staples:</span>
                <ul className="grid grid-cols-1 gap-2">
                  {SHOWS.classic.keyFeatures.map(f => (
                    <li key={f} className="bg-yellow-50 px-3 py-1 rounded-full text-sm border border-yellow-200">✨ {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modern */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-blue-500">
          <div className="h-48 bg-blue-900 flex items-center justify-center text-white p-8">
            <div className="text-center">
              <span className="text-6xl mb-4 block">📱</span>
              <h3 className="muppet-font text-2xl">{SHOWS.reboot.title}</h3>
            </div>
          </div>
          <div className="p-8">
            <p className="text-gray-600 mb-6">{SHOWS.reboot.description}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-blue-600 w-24">Years:</span>
                <span>{SHOWS.reboot.years}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-blue-600 w-24">Format:</span>
                <span>{SHOWS.reboot.format}</span>
              </div>
              <div>
                <span className="font-bold text-blue-600 block mb-2">Modern Flavors:</span>
                <ul className="grid grid-cols-1 gap-2">
                  {SHOWS.reboot.keyFeatures.map(f => (
                    <li key={f} className="bg-blue-50 px-3 py-1 rounded-full text-sm border border-blue-200">🚀 {f}</li>
                  ))}
                </ul>
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
    <div className="p-6 max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      <div className="text-center mb-6">
        <h2 className="muppet-font text-3xl text-purple-700">Ask the Muppet Lore Expert</h2>
        <p className="text-gray-600 italic">"Gonzo says: Deep questions for deep people!"</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-inner p-6 space-y-4 mb-4 border border-purple-100">
        {messages.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🎺</p>
            <p>Ask me about guest stars, performers, or the history of the show!</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-purple-600 text-white rounded-tr-none' 
                : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-2xl animate-pulse">
              Gonzo is checking his trumpet archives...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Who was the first guest star? How does Animal drum so fast?"
          className="flex-1 px-6 py-4 rounded-xl border-2 border-purple-300 focus:outline-none focus:border-purple-600 shadow-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg disabled:opacity-50"
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
