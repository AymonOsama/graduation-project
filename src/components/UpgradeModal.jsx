import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, CheckCircle2, CreditCard, ShieldCheck, ArrowLeft, Loader2, Info, Star } from 'lucide-react';

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
    setTimeout(() => setStep(1), 500); // إعادة تعيين الخطوات بعد انغلاق الـ Modal
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Background Overlay */}
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
            className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header المطور */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-8 text-center text-white relative">
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="absolute top-6 left-6 hover:text-blue-200 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <button
                onClick={closeAndReset}
                className="absolute top-6 right-6 hover:rotate-90 transition-transform cursor-pointer"
              >
                <X size={24} />
              </button>

              <motion.div 
                initial={{ rotate: -10 }} 
                animate={{ rotate: 0 }}
                className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-md"
              >
                <Crown size={32} className="text-yellow-300" />
              </motion.div>
              <h2 className="text-2xl font-black tracking-tight uppercase italic">
                {step === 1 ? "Elevate Your Experience" : "Finalize Upgrade"}
              </h2>
              <p className="text-blue-100 text-xs font-medium mt-1 opacity-80">
                {step === 1 ? "Join 10,000+ power users worldwide" : "Start your 7-day free journey"}
              </p>
            </div>

            <div className="p-8">
              {step === 1 ? (
                /* Step 1: الخطة والمميزات */
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                  
                  {/* Toggle السنوي/الشهري */}
                  <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                    <button 
                      onClick={() => setBillingCycle('Monthly')}
                      className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${billingCycle === 'Monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                    >
                      MONTHLY
                    </button>
                    <button 
                      onClick={() => setBillingCycle('Yearly')}
                      className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${billingCycle === 'Yearly' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                    >
                      YEARLY <span className="text-[9px] text-green-500 ml-1">SAVE 20%</span>
                    </button>
                  </div>

                  <div className="bg-blue-50 rounded-3xl p-6 mb-8 border-2 border-blue-100 text-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 opacity-10"><Star size={60}/></div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-black text-slate-900">
                        {billingCycle === 'Monthly' ? '$5' : '$48'}
                      </span>
                      <span className="text-slate-500 font-bold text-sm">
                        {billingCycle === 'Monthly' ? '/ month' : '/ year'}
                      </span>
                    </div>
                    <p className="text-blue-600 text-[10px] mt-2 font-black uppercase tracking-tighter">7 DAYS FREE • CANCEL ANYTIME</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {[
                      "Unlock Advanced Hardware Filters",
                      "Full Access to All Device Analytics",
                      "Priority Support for Technical Inquiries",
                      "Early Access to New Features"
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                        <CheckCircle2 className="text-blue-500 shrink-0" size={18} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    CONTINUE TO FREE TRIAL
                  </button>
                </motion.div>
              ) : (
                /* Step 2: فورم الدفع */
                <motion.form initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                    <Info className="text-amber-600 shrink-0" size={20} />
                    <p className="text-[10px] text-amber-800 leading-snug font-medium">
                      You won't be charged today. After 7 days, you'll pay <strong>{billingCycle === 'Monthly' ? '$5.00/mo' : '$48.00/yr'}</strong>.
                    </p>
                  </div>

                  <div className="space-y-4 py-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input required type="text" placeholder="0000 0000 0000 0000" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none text-sm font-bold transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Expiry</label>
                        <input required type="text" placeholder="MM / YY" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">CVV</label>
                        <input required type="text" placeholder="123" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm font-bold" />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "START MY FREE WEEK"}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <ShieldCheck size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Encrypted & Secure</span>
                  </div>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;