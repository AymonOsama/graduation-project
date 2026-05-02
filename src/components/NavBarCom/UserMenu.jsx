import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown } from 'lucide-react';

const UserMenu = ({ isOpen, setIsOpen, userData, onLogout }) => {
    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-1.5 p-1.5 md:p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
            >
                <div className="p-1 rounded-lg text-black">
                    <User size={18} />
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
                        className="absolute right-0 top-16 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 w-52 z-50"
                    >
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 mb-1">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account</p>
                            <p className="text-sm font-black text-gray-900 truncate">
                                {userData ? `${userData.firstName} ${userData.lastName}` : 'Guest'}
                            </p>
                        </div>
                        
                        <Link 
                            to="/profile" 
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                            Profile
                        </Link>
                        
                        <button 
                            onClick={onLogout} 
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 font-bold hover:bg-red-50 mt-1 border-t border-gray-50 transition-colors"
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