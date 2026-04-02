import { useState } from 'react';
import { MapPin, Phone, User, Bike, ArrowRight } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', platform: 'Zomato', zone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/workers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        onComplete(data.worker._id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">Secure Your Earnings</h2>
          <p className="text-slate-500 text-sm mt-2">Create your GigShield profile to get AI-powered weekly income protection against extreme weather.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                required type="text"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Rahul Kumar"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                required type="tel"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="9876543210"
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          {/* Platform & Zone Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Platform</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Bike className="h-5 w-5 text-slate-400" />
                </div>
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                  onChange={e => setFormData({...formData, platform: e.target.value})}
                >
                  <option value="Zomato">Zomato</option>
                  <option value="Swiggy">Swiggy</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Operating Zone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  required type="text"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="e.g. Mumbai"
                  onChange={e => setFormData({...formData, zone: e.target.value})}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center">Tip: Try zones like <span className="font-semibold text-slate-600">"Mumbai"</span> or <span className="font-semibold text-slate-600">"Safe Area"</span> to see AI pricing.</p>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all cursor-pointer disabled:opacity-70"
          >
            {loading ? 'Creating Profile...' : 'Create Profile'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}