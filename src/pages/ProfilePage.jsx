import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Edit2, Check, Camera, Calendar, Crown, Zap } from 'lucide-react';

const ProfilePage = () => {
  // --- 1. State Management ---
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Ayman', 
    lastName: 'Osama', 
    email: 'ayman@example.com',
    age: '22', 
    isAdmin: true, 
    isPlus: true, 
    avatar: '👨‍💻'
  });

  // --- 2. Configuration for Dynamic Fields ---
  const fields = [
    { id: 'firstName', label: 'First Name', icon: User },
    { id: 'lastName', label: 'Last Name', icon: User },
    { id: 'email', label: 'Email Address', icon: Mail, full: true },
    { id: 'age', label: 'Age', icon: Calendar, type: 'number' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20 font-sans relative overflow-hidden">
      
      {/* --- 3. Background Dynamics (Ambient Effects) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-blue-600/10 to-transparent" 
        />
      </div>

      <div className="relative z-10">
        {/* Header Logo Watermark */}
        <div className="h-40 flex items-center justify-center overflow-hidden">
            <motion.span 
              initial={{ y: 100 }} animate={{ y: 0 }}
              className="text-blue-600/5 text-[12rem] font-black tracking-tighter select-none"
            >
                COMPARO
            </motion.span>
        </div>

        <div className="max-w-2xl mx-auto px-6 -mt-12">
          {/* Main Profile Card with Layout Transitions */}
          <motion.div 
            layout 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(37,99,235,0.15)] border border-white p-8 md:p-12 relative"
          >
            {/* --- 4. Identity Section (Avatar & Plus Badge) --- */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative">
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="w-36 h-36 rounded-[2.5rem] bg-white flex items-center justify-center text-7xl shadow-2xl border-4 border-white"
                >
                  {profile.avatar}
                </motion.div>

                {/* Animated Plus Badge with Floating & Swaying Effect */}
                {profile.isPlus && (
                  <motion.div 
                    animate={{ 
                      y: [0, -8, 0],         
                      rotate: [0, -15, 15, 0], 
                      scale: [1, 1.1, 1]      
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute -top-3 -right-3 bg-blue-600 text-white p-2.5 rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.4)] border-4 border-white cursor-pointer"
                  >
                    <Crown size={22} fill="currentColor" />
                  </motion.div>
                )}

                <motion.button 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-1 -right-1 p-3 bg-slate-900 text-white rounded-2xl shadow-lg border-4 border-white"
                >
                  <Camera size={18} />
                </motion.button>
              </div>

              <motion.h2 layout="position" className="text-3xl font-black text-slate-800 mt-6 tracking-tight">
                {profile.firstName} {profile.lastName}
              </motion.h2>
              
              <div className="flex gap-2 mt-4">
                <span className="px-5 py-2 rounded-xl bg-slate-900 text-[10px] font-black text-white uppercase tracking-widest">Admin</span>
                <motion.div 
                  animate={{ background: ["rgba(37,99,235,0.1)", "rgba(37,99,235,0.2)", "rgba(37,99,235,0.1)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-4 py-2 rounded-xl text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-2"
                >
                  <Zap size={12} fill="currentColor" className="animate-pulse" /> Comparo Plus
                </motion.div>
              </div>
            </div>

            {/* --- 5. Action Control Section --- */}
            <div className="flex items-center gap-6 mb-12">
              <div className="h-px flex-1 bg-slate-100" />
              <motion.button 
                layout
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-xs transition-all shadow-xl ${
                  isEditing ? 'bg-green-500 text-white shadow-green-200' : 'bg-blue-600 text-white shadow-blue-200'
                }`}
              >
                {isEditing ? <><Check size={18}/> Save Changes</> : <><Edit2 size={18}/> Edit Profile</>}
              </motion.button>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            {/* --- 6. Data Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {fields.map((field) => (
                <div key={field.id} className={field.full ? "md:col-span-2" : ""}>
                  <DataInput 
                    {...field}
                    value={profile[field.id]} 
                    isEditing={isEditing} 
                    onChange={(v) => setProfile({...profile, [field.id]: v})} 
                  />
                </div>
              ))}

              <div className="md:col-span-1 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Member Status</label>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-100/50"
                >
                  <Crown size={18} className="text-blue-600" />
                  <span className="font-bold text-slate-700 text-sm">Active Member</span>
                </motion.div>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="mt-16 text-center">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">System Encrypted • 2026</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable Input Component
 * Features micro-interactions for focus and editing states
 */
const DataInput = ({ label, icon: Icon, value, isEditing, onChange, type = "text" }) => (
  <div className="group space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-hover:text-blue-500 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className={`flex items-center gap-3 px-1 transition-all border-b-2 ${
        isEditing ? 'border-blue-600' : 'border-slate-100'
      }`}>
        {/* Icon Animation on Edit State */}
        <motion.div animate={isEditing ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}>
          <Icon size={18} className={isEditing ? "text-blue-600" : "text-slate-300"} />
        </motion.div>
        
        <input 
          type={type}
          disabled={!isEditing}
          className="bg-transparent outline-none w-full py-3 font-bold text-slate-700 disabled:text-slate-500 text-sm transition-colors"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {/* Visual Indicator: Animated Underline for Edit Mode */}
      {isEditing && (
        <motion.div 
          layoutId="underline"
          className="absolute bottom-0 left-0 h-[2px] bg-blue-400 w-full origin-left"
          initial={{ scaleX: 0 }} 
          animate={{ scaleX: 1 }}
        />
      )}
    </div>
  </div>
);

export default ProfilePage;