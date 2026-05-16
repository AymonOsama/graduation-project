import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown, ShieldAlert, Loader2 } from 'lucide-react'; 

// 1. استيراد الـ Hook السحري
import { useAuth } from '../../context/AuthContext'; 

const UserMenu = ({ isOpen, setIsOpen, onLogout }) => {
    // 2. سحب الداتا من الـ Context مباشرة
    const { currentUser, loading } = useAuth();
    
    const menuRef = useRef(null);

    // Effect مراقبة النقرات الخارجية (زي ما هو)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, setIsOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="cursor-pointer flex items-center gap-1.5 p-1.5 md:p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
            >
                <div className="p-1 rounded-lg text-black">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <User size={18} />}
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={14} className="text-gray-400" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-14 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 w-52 z-50 overflow-hidden"
                    >
                        {/* معلومات الحساب */}
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 mb-1">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account</p>
                            <p className="text-sm font-black text-gray-900 truncate">
                                {/* استخدام firstName و lastName اللي في الـ Context */}
                                {loading ? 'Loading...' : currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Guest User'}
                            </p>
                            
                            {/* إظهار الرتبة بناءً على الداتا الحقيقية */}
                            {(currentUser?.role === 'super_admin') && (
                                <span className="text-[9px] text-purple-600 font-bold uppercase tracking-tighter">Super Admin</span>
                            )}
                        </div>
                        
                        {/* الروابط */}
                        <Link 
                            to="/profile" 
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                            Profile
                        </Link>

                        {/* صلاحيات الأدمن والـ Super Admin */}
                        {(currentUser?.role === 'admin' || currentUser?.role === 'super_admin') && (
                            <Link 
                                to="/admin" 
                                onClick={() => setIsOpen(false)}
                                className="cursor-pointer flex items-center justify-between px-4 py-2.5 text-sm text-blue-600 font-bold hover:bg-blue-50 transition-colors border-t border-gray-50"
                            >
                                Admin Panel
                                {currentUser.role === 'super_admin' && <ShieldAlert size={14} className="text-purple-500" />}
                            </Link>
                        )}
                        
                        <button 
                            onClick={onLogout} 
                            className="cursor-pointer w-full text-left px-4 py-2.5 text-sm text-red-600 font-bold hover:bg-red-50 mt-1 border-t border-gray-50 transition-colors"
                        >
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserMenu;