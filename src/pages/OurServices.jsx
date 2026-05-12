import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Crown, CheckCircle2, CreditCard, ShieldCheck, 
  ArrowLeft, Loader2, Info, Star, Zap, TrendingUp, 
  Search, Bell, FileText 
} from 'lucide-react';

// --- بيانات الخدمات ---
const mainServices = [
  {
    id: 0,
    title: 'Price Comparison',
    description: 'We scan multiple online retailers to find you the best price for any product. Save time and money.',
    benefits: ['Compare 500+ retailers', 'Real-time updates', 'Historical tracking'],
    icon: <Search size={40} />
  },
  {
    id: 1,
    title: 'Specs Comparison',
    description: 'Detailed specifications comparison for electronics. See performance metrics and technical details.',
    benefits: ['Side-by-side features', 'Benchmarks', 'User reviews'],
    icon: <Zap size={40} />
  },
  {
    id: 2,
    title: 'Smart Deals',
    description: 'Get notified about the best deals and discounts from your favorite stores instantly.',
    benefits: ['Daily notifications', 'Sale alerts', 'Discount codes'],
    icon: <Bell size={40} />
  }
];

// --- مكون الـ UpgradeModal ---
const UpgradeModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState('Monthly');

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Success! Your 7-day free trial has started.");
      onClose();
      setStep(1);
    }, 2000);
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => setStep(1), 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAndReset}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-8 text-center text-white relative">
              {step === 2 && (
                <button onClick={() => setStep(1)} className="absolute top-6 left-6 hover:text-blue-200 cursor-pointer transition-colors">
                  <ArrowLeft size={20} />
                </button>
              )}
              <button onClick={closeAndReset} className="absolute top-6 right-6 hover:rotate-90 transition-transform cursor-pointer">
                <X size={24} />
              </button>

              <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-md">
                <Crown size={32} className="text-yellow-300" />
              </div>
              <h2 className="text-2xl font-black tracking-tight uppercase italic">
                {step === 1 ? "Go Premium" : "Secure Checkout"}
              </h2>
            </div>

            <div className="p-8">
              {step === 1 ? (
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                  <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                    <button 
                      onClick={() => setBillingCycle('Monthly')}
                      className={`flex-1 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${billingCycle === 'Monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                    > MONTHLY </button>
                    <button 
                      onClick={() => setBillingCycle('Yearly')}
                      className={`flex-1 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${billingCycle === 'Yearly' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                    > YEARLY <span className="text-[9px] text-green-500 ml-1">SAVE 20%</span> </button>
                  </div>

                  <div className="bg-blue-50 rounded-3xl p-6 mb-8 border-2 border-blue-100 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-black text-slate-900">{billingCycle === 'Monthly' ? '$5' : '$48'}</span>
                      <span className="text-slate-500 font-bold text-sm">{billingCycle === 'Monthly' ? '/ mo' : '/ yr'}</span>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 gap-4 mb-8">
                    {["Unlimited Price Trackers", "AI Specs Comparison", "Export Data (CSV)", "24/7 Priority Support"].map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                        <CheckCircle2 className="text-blue-500 shrink-0" size={18} /> {feat}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl transition-all cursor-pointer">
                    CONTINUE TO FREE TRIAL
                  </button>
                </motion.div>
              ) : (
                <motion.form initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onSubmit={handlePaymentSubmit} className="space-y-4">
                   <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3 mb-2">
                    <Info className="text-amber-600 shrink-0" size={20} />
                    <p className="text-[10px] text-amber-800 font-medium">Your 7-day trial is free. Then <b>{billingCycle === 'Monthly' ? '$5/mo' : '$48/yr'}</b> automatically.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="text" placeholder="Card Number" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-bold text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none font-bold text-sm" />
                      <input required type="text" placeholder="CVV" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none font-bold text-sm" />
                    </div>
                  </div>

                  <button disabled={loading} type="submit" className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 mt-4 transition-all hover:bg-black cursor-pointer disabled:cursor-not-allowed">
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "ACTIVATE TRIAL"}
                  </button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- المكون الرئيسي ---
const OurServices = () => {
  const [activeService, setActiveService] = useState(0);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100">
      <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
          <Star size={14} fill="currentColor" /> Premium Shopping Assistant
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
          Smart Tools for <br/><span className="text-blue-600 italic">Serious Shoppers</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Everything you need to find the best deals, compare high-end hardware, and save hundreds of dollars.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-24 pb-32">
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mainServices.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -15 }}
              onClick={() => setActiveService(idx)}
              className={`p-10 rounded-[3.5rem] cursor-pointer transition-all border-2 flex flex-col justify-between min-h-[450px] relative overflow-hidden ${
                activeService === idx 
                ? 'bg-blue-600 text-white border-blue-600 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.3)]' 
                : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-colors ${activeService === idx ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
                  {service.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 leading-tight">{service.title}</h3>
                <p className={`text-lg font-medium leading-relaxed opacity-80 ${activeService === idx ? 'text-blue-50' : 'text-slate-500'}`}>
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-8 relative z-10">
                {service.benefits.map((b, i) => (
                  <span key={i} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight ${activeService === idx ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                    {b}
                  </span>
                ))}
              </div>
              
              <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${activeService === idx ? 'bg-white' : 'bg-blue-400'}`} />
            </motion.div>
          ))}
        </div>

        {/* Premium Banner */}
        <section className="bg-slate-900 rounded-[4rem] p-8 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
          <div className="flex-1 space-y-10 relative z-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black leading-none">Upgrade to <span className="text-blue-400 underline decoration-blue-500/30">Premium</span></h2>
              <p className="text-slate-400 text-lg font-medium max-w-lg">
                Gain access to advanced AI-powered comparison tools, unlimited trackers, and real-time GPU stock alerts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <TrendingUp className="text-blue-400" />, text: "Real-time Price History" },
                { icon: <ShieldCheck className="text-blue-400" />, text: "Verified Store Scans" },
                { icon: <Zap className="text-blue-400" />, text: "Instant Flash Deals" },
                { icon: <FileText className="text-blue-400" />, text: "Detailed PDF Reports" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  {item.icon}
                  <span className="font-bold text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsUpgradeOpen(true)}
              className="px-12 py-6 bg-blue-600 hover:bg-blue-500 rounded-3xl font-black text-xl flex items-center gap-4 shadow-2xl shadow-blue-900/40 transition-all cursor-pointer"
            >
              Unlock Everything <Crown className="text-yellow-300" fill="currentColor" />
            </motion.button>
          </div>

          <div className="flex-1 relative w-full lg:w-auto">
             <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-8 rounded-[3rem] shadow-2xl relative z-10 border border-white/10">
                <div className="h-4 w-1/3 bg-white/20 rounded-full mb-6" />
                <div className="space-y-4">
                   <div className="h-32 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                      <Zap size={48} className="text-blue-300 animate-pulse" />
                   </div>
                   <div className="grid grid-cols-3 gap-3">
                      {[1,2,3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl" />)}
                   </div>
                </div>
             </div>
             <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20" />
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center py-20">
            <h3 className="text-3xl font-black text-slate-900 mb-8">Ready to shop smarter?</h3>
            <button 
              onClick={() => setIsUpgradeOpen(true)}
              className="text-blue-600 font-black text-lg hover:underline underline-offset-8 cursor-pointer"
            >
              View all premium benefits &rarr;
            </button>
        </div>
      </div>
    </div>
  );
};

export default OurServices;