import React, { useState } from 'react';
import { UserMinus, Trash2, Search, ShieldCheck, AlertTriangle, X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const AdminManagement = ({ allUsers, onUpdateRole, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionConfig, setActionConfig] = useState({ user: null, type: '' });

  // فلترة الأدمنز فقط
  const admins = allUsers.filter(u => {
    if (u.role !== 'admin') return false;
    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
    const email = u.email?.toLowerCase() || '';
    return fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
  });

  const handleConfirmAction = () => {
    const { user, type } = actionConfig;
    if (user) {
      if (type === 'demote') {
        onUpdateRole(user.id, 'user');
        toast.success(`${user.firstName} demoted to User`, {
          icon: '👤',
          style: { borderRadius: '15px', background: '#1e293b', color: '#fff', fontWeight: 'bold' }
        });
      } else if (type === 'delete') {
        onDeleteUser(user.id);
        toast.error(`${user.firstName} removed permanently`, {
          icon: '🗑️',
          style: { borderRadius: '15px', background: '#1e293b', color: '#fff', fontWeight: 'bold' }
        });
      }
      setActionConfig({ user: null, type: '' });
    }
  };

  return (
    // تطبيق select-none لمنع نسخ بيانات المسؤولين
    <div className="animate-in fade-in duration-500 relative select-none">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="cursor-default">
          <h3 className="text-2xl sm:text-3xl font-[1000] text-slate-900 tracking-tight italic">
            Admin <span className="text-blue-600">Authority</span>
          </h3>
          <div className="flex items-center gap-2 mt-1">
             <ShieldCheck size={14} className="text-blue-500 shadow-sm" />
             <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Privileged Access Control</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search by identity or email..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none text-sm font-bold transition-all shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Admins Grid */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {admins.length > 0 ? (
          admins.map(admin => (
            <motion.div 
              layout
              key={admin.id} 
              className="flex items-center justify-between p-5 bg-white border border-slate-50 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-100 transition-all group"
            >
              <div className="flex items-center gap-4 overflow-hidden cursor-default">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-[1.25rem] flex items-center justify-center font-black text-lg shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform duration-500">
                    {admin.firstName?.charAt(0)}{admin.lastName?.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-50">
                    <ShieldCheck size={12} className="text-blue-600" strokeWidth={3} />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <p className="font-[1000] text-slate-900 truncate tracking-tight">{admin.firstName} {admin.lastName}</p>
                  <p className="text-[11px] text-slate-400 font-bold truncate tracking-wide">{admin.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActionConfig({ user: admin, type: 'demote' })}
                  className="p-3 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-2xl transition-all cursor-pointer active:scale-90"
                  title="Revoke Admin Access"
                >
                  <UserMinus size={20} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => setActionConfig({ user: admin, type: 'delete' })}
                  className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all cursor-pointer active:scale-90"
                  title="Permanent Erasure"
                >
                  <Trash2 size={20} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-100 rounded-[3rem] cursor-default">
            <ShieldAlert className="mx-auto text-slate-200 mb-4" size={48} strokeWidth={1} />
            <p className="text-slate-400 font-black italic tracking-widest uppercase text-xs">No administrative entities detected</p>
          </div>
        )}
      </div>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {actionConfig.user && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setActionConfig({ user: null, type: '' })} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 40 }} 
              className="bg-white w-full max-w-sm rounded-[3rem] p-10 relative z-10 shadow-2xl text-center border border-slate-50"
            >
              <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner ${actionConfig.type === 'demote' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'}`}>
                <AlertTriangle size={48} strokeWidth={2.5} />
              </div>
              
              <h3 className="text-2xl font-[1000] text-slate-900 mb-3 italic tracking-tight uppercase">
                {actionConfig.type === 'demote' ? 'Revoke Rights?' : 'Erase Record?'}
              </h3>
              
              <p className="text-slate-500 font-bold text-sm mb-10 leading-relaxed px-2">
                Are you absolutely sure you want to {actionConfig.type === 'demote' ? 'strip privileges from' : 'permanently terminate'} <span className="text-slate-900 underline decoration-2">{actionConfig.user.firstName}</span>?
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleConfirmAction}
                  className={`w-full py-5 text-white rounded-2xl font-[1000] text-lg tracking-tighter transition-all active:scale-95 shadow-xl cursor-pointer ${actionConfig.type === 'demote' ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-100' : 'bg-red-600 hover:bg-red-700 shadow-red-100'}`}
                >
                  EXECUTE {actionConfig.type === 'demote' ? 'DEMOTION' : 'REMOVAL'}
                </button>
                <button 
                  onClick={() => setActionConfig({ user: null, type: '' })} 
                  className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Abort Action
                </button>
              </div>

              <button 
                onClick={() => setActionConfig({ user: null, type: '' })} 
                className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={24} strokeWidth={3} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminManagement;