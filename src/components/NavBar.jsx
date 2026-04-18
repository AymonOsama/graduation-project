import React, { useEffect, useState } from 'react';
// 1. تنظيف الـ Imports ومنع التكرار
import { Search, Menu, X, Heart, User, ChevronDown } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import toast from 'react-hot-toast';

// عمل Import للكومبوننت الجديد
import SearchBar from './NavBarCom/SearchBar'; 

const NavBar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    const handlelogout = () => {
        localStorage.removeItem('rememberedUser');
        sessionStorage.removeItem('rememberedUser');
        setUserData(null);
        setIsUserMenuOpen(false);
        navigate('/login'); 
        toast.success('Logged out successfully!');
    };

    useEffect(() => {
        const savedUSerData = localStorage.getItem('rememberedUser') || sessionStorage.getItem('rememberedUser');
        if (savedUSerData) {
            setUserData(JSON.parse(savedUSerData));
        } 
    }, []);

    return (
        <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 font-sans">
            <div className="max-w-[100%] mx-auto px-4 md:px-12">
                <div className="flex items-center justify-between h-20 gap-2 md:gap-4">
                    
                    {/* --- 1. Logo Section --- */}
                    <div className="flex-shrink-0 z-50">
                        <Link to="/home" className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter">
                            COMP<span className="text-black">ARO</span>
                        </Link>
                    </div>

                    {/* --- 2. Search Bar Component (Desktop) --- */}
                    <SearchBar />

                    {/* --- 3. Right Section --- */}
                    <div className="flex items-center space-x-2 md:space-x-8">
                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center space-x-6 text-sm font-bold text-gray-700">
                            <Link to="/home" className="hover:text-blue-600 transition-colors">Home</Link>
                            <Link to="/components" className="hover:text-blue-600 transition-colors">Components</Link>
                            <Link to="/about" className="hover:text-blue-600 transition-colors text-nowrap">About Us</Link>
                            <Link to="/contact" className="hover:text-blue-600 transition-colors text-nowrap">Contact Us</Link>
                        </div>

                        <div className="flex items-center space-x-1 md:space-x-4 border-l pl-2 md:pl-8 border-gray-200 relative">
                            {/* Heart Icon */}
                            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all group cursor-pointer">
                                <Heart size={20} className="md:w-[22px] group-hover:text-red-500 transition-colors" />
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full font-bold">3</span>
                            </button>

                            {/* User Button */}
                            <button 
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
                                className="flex items-center gap-1.5 p-1.5 md:p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 cursor-pointer group"
                            >
                                <div className="p-1 rounded-lg text-black group-hover:text-blue-600 transition-colors">
                                    <User size={18} />
                                </div>
                                <motion.div
                                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={14} className="text-gray-400" />
                                </motion.div>
                            </button>

                            {/* User Dropdown Menu */}
                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-16 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 w-52 z-50 overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 mb-1">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account</p>
                                            <p className="text-sm font-black text-gray-900 truncate">
                                                {userData ? `${userData.firstName} ${userData.lastName}` : 'Guest User'}
                                            </p>
                                        </div>
                                        <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">Profile</Link>
                                        <Link to="/settings" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">Settings</Link>
                                        <button onClick={handlelogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 font-bold hover:bg-red-50 mt-1 transition-colors border-t border-gray-50 cursor-pointer">Logout</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Mobile Menu Toggle */}
                            <button 
                                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl absolute w-full left-0 z-40"
                    >
                        <div className="p-6 space-y-6">
                            {/* تم إصلاح سطر البحث هنا للتأكد من استدعاء Search بشكل صحيح */}
                            <div className="relative w-full">
                                <input 
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-4 outline-none"
                                />
                                <div className="absolute left-3 top-3.5 text-gray-400">
                                    <Search size={18} />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 font-bold text-gray-800 text-lg">
                                <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
                                <Link to="/components" onClick={() => setIsMenuOpen(false)}>Components</Link>
                                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;