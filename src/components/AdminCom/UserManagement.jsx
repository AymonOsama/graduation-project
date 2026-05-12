import React, { useState } from 'react';
import { UserMinus, Trash2, Search, Crown, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const UserManagement = ({ allUsers, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionConfig, setActionConfig] = useState({ user: null, type: '' });

  const regularUsers = allUsers.filter(u => {
    if (u.role !== 'user') return false;
    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
    const email = u.email?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || email.includes(search);
  });

  const handleConfirmAction = () => {
    const { user, type } = actionConfig;
    if (user) {
      onDeleteUser(user.id);
      if (type === 'ban') {
        toast.error(`User ${user.firstName} has been banned!`, {
          icon: '🚫',
          style: { borderRadius: '12px', background: '#333', color: '#fff' }
        });
      } else {
        toast.success(`User ${user.firstName} deleted successfully!`, {
          icon: '🗑️',
          style: { borderRadius: '12px', background: '#333', color: '#fff' }
        });
      }
      setActionConfig({ user: null, type: '' });
    }
  };

  return (
    // select-none تمنع تحديد النصوص والنسخ في الصفحة بالكامل
    <div className="animate-in fade-in duration-500 relative select-none">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight cursor-default">
            Client Accounts
          </h3>
          <p className="text-sm text-gray-500 font-medium">Manage access and account status</p>
        </div>
        
        {/* تحسين عرض شريط البحث في الموبايل */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3">
        {regularUsers.length > 0 ? (
          regularUsers.map(user => (
            <div 
              key={user.id} 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50/50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300 group gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
                <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black uppercase text-lg shadow-inner ${user.isPremium ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-white text-gray-400 border border-gray-100'}`}>
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                <div className="overflow-hidden cursor-default">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                    {user.isPremium && <Crown size={14} className="text-amber-500 fill-amber-500" />}
                  </div>
                  <p className="text-xs text-gray-400 font-bold truncate tracking-wide">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                <button 
                  onClick={() => setActionConfig({ user, type: 'ban' })}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 p-3 sm:p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all cursor-pointer font-bold sm:font-normal"
                  title="Ban User"
                >
                  <UserMinus size={18} />
                  <span className="sm:hidden text-xs">Ban User</span>
                </button>
                <button 
                  onClick={() => setActionConfig({ user, type: 'delete' })}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 p-3 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer font-bold sm:font-normal"
                  title="Permanent Delete"
                >
                  <Trash2 size={18} />
                  <span className="sm:hidden text-xs">Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">No users found matching your search</p>
          </div>
        )}
      </div>

      {/* Popup التأكيد الموحد */}
      <AnimatePresence>
        {actionConfig.user && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 text-center">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setActionConfig({ user: null, type: '' })} 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="bg-white w-full max-w-sm rounded-[3rem] p-8 sm:p-10 relative z-10 shadow-2xl border border-gray-50"
            >
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg ${actionConfig.type === 'ban' ? 'bg-orange-50 text-orange-500 shadow-orange-100' : 'bg-red-50 text-red-500 shadow-red-100'}`}>
                <AlertTriangle size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 cursor-default italic">
                {actionConfig.type === 'ban' ? 'Ban User?' : 'Delete Account?'}
              </h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                Are you sure you want to {actionConfig.type} <span className="font-black text-slate-800 underline decoration-blue-500/30">{actionConfig.user.firstName}</span>? This action is irreversible.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleConfirmAction}
                  className={`w-full py-4.5 text-white rounded-2xl font-black transition-all active:scale-95 cursor-pointer shadow-lg ${actionConfig.type === 'ban' ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-200' : 'bg-red-600 hover:bg-red-700 shadow-red-200'}`}
                >
                  Yes, Confirm {actionConfig.type}
                </button>
                <button 
                  onClick={() => setActionConfig({ user: null, type: '' })} 
                  className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-black hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;