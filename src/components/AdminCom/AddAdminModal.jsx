import React, { useState } from 'react';
import { X, Search, UserPlus, ChevronRight, ShieldCheck, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddAdminModal = ({ isOpen, onClose, users, onUpdateRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(u => {
    // استثناء المستخدمين الذين لديهم رتبة أدمن بالفعل لتسهيل البحث
    if (u.role === 'admin') return false;
    
    const fname = u?.firstName?.toLowerCase() || "";
    const lname = u?.lastName?.toLowerCase() || "";
    const email = u?.email?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return fname.includes(search) || lname.includes(search) || email.includes(search);
  });

  const handleMakeAdmin = () => {
    if (selectedUser) {
      onUpdateRole(selectedUser.id, 'admin');
      setSelectedUser(null); // إعادة تعيين الاختيار بعد النجاح
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      {/* Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer" 
      />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ y: "100%", opacity: 0, scale: 0.95 }} 
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: "100%", opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        className="bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[3.5rem] p-8 sm:p-10 relative z-10 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-slate-100"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-[1000] text-slate-900 tracking-tighter italic">
              Elevate <span className="text-blue-600">Access</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Authority Delegation Hub</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all text-slate-400 cursor-pointer group"
          >
            <X size={20} strokeWidth={3} className="group-active:scale-90 transition-transform" />
          </button>
        </div>

        {/* Search Input Container */}
        <div className="relative mb-8 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <Search className="text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} strokeWidth={3} />
          </div>
          <input 
            type="text" 
            placeholder="Search via name or email..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-50 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white font-bold text-sm tracking-tight transition-all placeholder:text-slate-300 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* User List Area */}
        <div className="overflow-y-auto mb-8 pr-2 custom-scrollbar flex-1 min-h-0 space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <motion.button 
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center justify-between p-4.5 rounded-[1.5rem] transition-all border cursor-pointer ${
                  selectedUser?.id === user.id 
                  ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-200' 
                  : 'bg-white hover:bg-slate-50 border-slate-50'
                }`}
              >
                <div className="text-left overflow-hidden flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${
                    selectedUser?.id === user.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className={`font-black truncate text-sm tracking-tight ${selectedUser?.id === user.id ? 'text-white' : 'text-slate-900'}`}>
                      {user.firstName || "Unknown"} {user.lastName || ""}
                    </p>
                    <p className={`text-[10px] font-bold truncate tracking-widest uppercase opacity-60 ${selectedUser?.id === user.id ? 'text-white' : 'text-slate-400'}`}>
                      {user.email || "NO IDENTITY"}
                    </p>
                  </div>
                </div>
                <div className={`flex-shrink-0 transition-transform duration-300 ${selectedUser?.id === user.id ? 'rotate-90 translate-x-1' : ''}`}>
                   <ChevronRight size={18} className={selectedUser?.id === user.id ? 'text-white' : 'text-slate-300'} strokeWidth={3} />
                </div>
              </motion.button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-200">
               <Fingerprint size={48} strokeWidth={1} className="mb-2" />
               <p className="font-black italic text-[10px] uppercase tracking-widest">No candidates available</p>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-auto pt-4 relative">
          <AnimatePresence>
            {selectedUser && (
              <motion.div
                initial={{ y: 50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: 50, opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100 mb-4 animate-pulse">
                   <ShieldCheck size={14} className="text-blue-600" strokeWidth={3} />
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Granting Level 1 Admin Credentials</p>
                </div>
                
                <button
                  onClick={handleMakeAdmin}
                  className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-lg tracking-tighter flex items-center justify-center gap-3 hover:bg-blue-600 shadow-2xl shadow-slate-200 cursor-pointer active:scale-[0.98] transition-all group"
                >
                  <UserPlus size={20} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
                  INITIATE PROMOTION
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!selectedUser && (
            <p className="text-center text-slate-300 text-[10px] font-black tracking-widest uppercase">Select a profile to proceed</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AddAdminModal;