import { useState } from 'react';
import { ShieldCheck, UserCircle } from 'lucide-react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

function App() {
  const [currentWorkerId, setCurrentWorkerId] = useState(null);

  return (
    <div className="min-h-screen font-sans text-slate-900 pb-12">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl shadow-blue-500/30 shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              GigShield.AI
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full ring-1 ring-emerald-200/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live: Phase 2
            </span>
            {currentWorkerId && (
              <button 
                onClick={() => setCurrentWorkerId(null)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <UserCircle className="w-5 h-5" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container max-w-6xl mx-auto pt-8 px-4 md:px-8">
        {!currentWorkerId ? (
          <Onboarding onComplete={(id) => setCurrentWorkerId(id)} />
        ) : (
          <Dashboard workerId={currentWorkerId} />
        )}
      </main>
    </div>
  );
}

export default App;