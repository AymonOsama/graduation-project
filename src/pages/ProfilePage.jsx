import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Edit2, Check, Crown, Zap, ShieldCheck, Users, Settings, ArrowUpCircle, Fingerprint, Star } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import users from '../data/users.json';

// --- المكونات الفرعية ---

// 1. مكون الـ Initials Avatar (بدل الإيموجي)
const UserAvatar = ({ firstName, lastName, isPremium }) => {
  const initials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  
  return (
    <div className="relative group">
      <motion.div 
        whileHover={{ scale: 1.02, rotate: 2 }}
        className="w-40 h-40 rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-4 border-white relative overflow-hidden"
      >
        {/* تأثير ضوئي داخلي */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]" />
        
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-t from-slate-300 to-white tracking-tighter">
          {initials || '??'}
        </span>
      </motion.div>

      {/* شارة البريميوم المطورة */}
      <AnimatePresence>
        {isPremium && (
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 p-3 rounded-2xl shadow-xl border-[6px] border-[#f8fafc] z-20"
          >
            <Star size={20} fill="currentColor" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileIdentity = ({ profile }) => (
  <div className="flex flex-col items-center mb-12">
    <UserAvatar firstName={profile.firstName} lastName={profile.lastName} isPremium={profile.isPremium} />
    
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mt-8"
    >
      <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
        {profile.firstName} <span className="text-blue-600">{profile.lastName}</span>
      </h2>
      <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Member Identity System</p>
    </motion.div>
    
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {profile.role === 'super_admin' && (
        <div className="px-6 py-2.5 rounded-2xl bg-slate-900 text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2 border border-slate-700 shadow-2xl">
          <ShieldCheck size={14} className="text-purple-400" /> Security Core
        </div>
      )}
      {profile.isPremium && (
        <div className="px-6 py-2.5 rounded-2xl bg-blue-600/10 text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 border border-blue-100">
          <Zap size={14} fill="currentColor" /> Verified Plus
        </div>
      )}
    </div>
  </div>
);

// --- المكون الرئيسي ---
const ProfilePage = () => {
  const { openUpgradeModal } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '', lastName: '', email: '', role: '', isPremium: false
  });

  useEffect(() => {
    const rawData = localStorage.getItem('rememberedUser') || sessionStorage.getItem('rememberedUser');
    if (rawData) {
      try {
        const parsedData = JSON.parse(rawData);
        const userId = parsedData.id || parsedData;
        const currentUser = users.users.find(u => String(u.id).trim() === String(userId).trim());
        if (currentUser) setProfile(currentUser);
      } catch (e) { console.error(e); }
    }
  }, []);

  const fields = [
    { id: 'firstName', label: 'Identity Given Name', icon: Fingerprint },
    { id: 'lastName', label: 'Identity Family Name', icon: User },
    { id: 'email', label: 'Communication Gateway', icon: Mail, full: true },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent z-0" />
      <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-400/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-purple-400/10 blur-[150px] rounded-full" />

      <div className="relative z-10 pt-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            layout
            className="bg-white/70 backdrop-blur-3xl rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-white p-10 md:p-16"
          >
            <ProfileIdentity profile={profile} />

            {/* Admin Access Panel */}
            {profile.role === 'super_admin' && (
              <motion.div whileHover={{ y: -5 }} className="mb-12 p-8 rounded-[3rem] bg-slate-900 text-white flex items-center justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="p-4 bg-white/10 rounded-[2rem] backdrop-blur-xl border border-white/10"><Settings size={28} /></div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest">Administrative Terminal</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold">Full system override capabilities enabled.</p>
                  </div>
                </div>
                <Link to="/admin" className="relative z-10">
                  <motion.button whileHover={{ x: 5 }} className="p-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-tighter px-8 shadow-xl">
                    Access
                  </motion.button>
                </Link>
              </motion.div>
            )}

            {/* Main Content Sections */}
            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Personal Information</h3>
                  <div className="h-px flex-1 bg-slate-100" />
                  <motion.button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      isEditing ? 'bg-green-500 text-white shadow-green-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    } shadow-lg`}
                  >
                    {isEditing ? <><Check size={14}/> Synchronize</> : <><Edit2 size={14}/> Modify</>}
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                  {fields.map((f) => (
                    <div key={f.id} className={f.full ? "md:col-span-2" : ""}>
                      <DataInput {...f} value={profile[f.id]} isEditing={isEditing} 
                        onChange={(v) => setProfile({...profile, [f.id]: v})} />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Account Ecosystem</h3>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                
                <div className={`p-8 rounded-[2.5rem] border-2 transition-all ${profile.isPremium ? 'border-blue-100 bg-blue-50/30' : 'border-slate-100 bg-slate-50/50'}`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-2xl ${profile.isPremium ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg' : 'bg-white text-slate-400'}`}>
                        <Crown size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm uppercase">Subscription Tier</h4>
                        <p className="text-xs text-slate-500 font-bold mt-1">
                          {profile.isPremium ? 'Unlock all premium features and analytics' : 'Standard limited access protocol'}
                        </p>
                      </div>
                    </div>
                    
                    {!profile.isPremium && (
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        onClick={openUpgradeModal}
                        className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-200"
                      >
                        <Zap size={16} fill="currentColor" /> Upgrade to Plus
                      </motion.button>
                    )}
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-20 flex flex-col items-center gap-4">
               <div className="flex gap-2">
                  {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200" />)}
               </div>
               <div className="text-[8px] font-black uppercase tracking-[1em] text-slate-300 ml-4">
                 SECURE ACCESS NODE • 2026
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const DataInput = ({ label, icon: Icon, value, isEditing, onChange, type = "text" }) => (
  <div className="group space-y-3">
    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 group-hover:text-blue-600 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border-2 ${
        isEditing ? 'border-blue-600 bg-white shadow-xl shadow-blue-50' : 'border-transparent bg-slate-100/50'
      }`}>
        <Icon size={20} className={isEditing ? "text-blue-600" : "text-slate-400"} />
        <input 
          type={type} 
          disabled={!isEditing} 
          className="bg-transparent outline-none w-full font-bold text-slate-800 text-sm placeholder:text-slate-300"
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
        />
      </div>
    </div>
  </div>
);

export default ProfilePage;