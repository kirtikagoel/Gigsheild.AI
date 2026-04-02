import { useEffect, useState } from 'react';
import { ShieldAlert, Zap, CloudRain, CheckCircle, Wallet, CalendarDays, MapPin, Bike } from 'lucide-react';

export default function Dashboard({ workerId }) {
  const [data, setData] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/api/workers/${workerId}/dashboard`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, [workerId]);

  const getQuote = async () => {
    const res = await fetch('http://localhost:5000/api/insurance/calculate-premium', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zone: data.worker.zone })
    });
    const json = await res.json();
    setQuote(json);
  };

  const buyPolicy = async () => {
    await fetch('http://localhost:5000/api/insurance/buy-policy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workerId,
        finalPremium: quote.finalPremium,
        coverageAmount: quote.coverageAmount
      })
    });
    setQuote(null);
    fetchDashboard();
  };

  const triggerClaim = async () => {
    await fetch('http://localhost:5000/api/claims/trigger-parametric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workerId, disruptionType: 'Heavy Rain', severity: 'High' })
    });
    fetchDashboard();
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 animate-fade-in">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-medium">Loading your GigShield...</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      
      {/* Left Column: Profile & Policy Management */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        
        {/* Worker Profile Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 border-2 border-white shadow-md">
              {data.worker.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{data.worker.name}</h3>
              <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">ID: {data.worker._id.slice(-6).toUpperCase()}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-600">
              <Bike className="w-5 h-5 text-slate-400" />
              <span className="font-medium">{data.worker.platform} Partner</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="w-5 h-5 text-slate-400" />
              <span className="font-medium">{data.worker.zone}</span>
            </div>
          </div>
        </div>

        {/* Policy Section */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            Weekly Protection
          </h3>
          
          {data.policy ? (
            <div className="relative overflow-hidden bg-linear-to-br from-emerald-500 to-emerald-700 p-5 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
              <div className="absolute -right-4 -top-4 opacity-10">
                <ShieldCheck className="w-32 h-32" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="font-bold text-sm tracking-wider uppercase">Active Coverage</span>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-emerald-100 text-sm">
                  <span>Premium Paid:</span>
                  <span className="font-bold text-white">₹{data.policy.weeklyPremium} / wk</span>
                </p>
                <p className="flex justify-between text-emerald-100 text-sm">
                  <span>Max Payout:</span>
                  <span className="font-bold text-white">₹{data.policy.coverageAmount}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-sm font-medium flex items-start gap-2">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <p>You are currently unprotected against income loss.</p>
              </div>

              {!quote ? (
                <button 
                  onClick={getQuote}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Generate AI Quote
                </button>
              ) : (
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3" /> AI Analysis
                    </p>
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 mb-1">₹{quote.finalPremium}<span className="text-sm font-medium text-slate-500"> / week</span></p>
                  
                  <div className="my-4 space-y-2 text-sm">
                    <p className="flex justify-between text-slate-600"><span>Base Rate:</span> <span>₹{quote.basePremium}</span></p>
                    <p className="flex justify-between text-slate-600 items-center">
                      <span>Risk Profile:</span> 
                      <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${quote.finalPremium > quote.basePremium ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {quote.riskFactor}
                      </span>
                    </p>
                  </div>
                  
                  <button 
                    onClick={buyPolicy}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    Activate Policy Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Claims & Simulation */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Parametric Webhook Simulator */}
        <div className="bg-slate-900 p-6 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <CloudRain className="w-40 h-40 text-white" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-1 rounded-md text-xs font-mono font-bold tracking-wider">DEV MODE</span>
              <h3 className="text-xl font-bold text-white">Parametric API Simulator</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-md">
              Simulate an external disruption (e.g., IMD Weather Alert) in <span className="text-white font-semibold">{data.worker.zone}</span>. If covered, our AI instantly triggers a zero-touch payout.
            </p>
            <button 
              onClick={triggerClaim}
              disabled={!data.policy}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all cursor-pointer ${
                data.policy 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CloudRain className="w-5 h-5" />
              Trigger "Severe Rain" Webhook
            </button>
            {!data.policy && <p className="text-xs text-amber-400 mt-3 font-medium flex items-center gap-1"><ShieldAlert className="w-4 h-4"/> Activate your weekly policy first.</p>}
          </div>
        </div>

        {/* Claims History */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex-grow">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-600" />
            Payout History
          </h3>
          
          {data.claims.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <CalendarDays className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No claims or disruptions recorded.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.claims.map((claim, index) => (
                <div key={claim._id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-slate-100/50 transition">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{claim.disruptionType} Alert</p>
                      <p className="text-xs font-medium text-slate-500">{new Date(claim.date).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-emerald-600">+₹{claim.payoutAmount}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-200/50 text-emerald-800 rounded-md uppercase tracking-wider">
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}