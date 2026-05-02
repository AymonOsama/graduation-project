import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
    Menu, X, Heart, ChevronDown, 
    Cpu, MemoryStick as Gpu, HardDrive, 
    Monitor, MousePointer2, Zap 
} from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import toast from 'react-hot-toast';

// Imports لـ الـ Child Components
import SearchBar from './NavBarCom/SearchBar'; 
import MegaMenu from './NavBarCom/MegaMenu';
import UserMenu from './NavBarCom/UserMenu'; // المكون الجديد

const NavBar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const activeLinkStyles = ({ isActive }) => 
        isActive 
            ? "text-blue-600 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 transition-all" 
            : "text-gray-700 hover:text-blue-600 transition-colors";

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

    const categories = [
        {
            title: "Core Components",
            items: [
                { name: "Graphic Cards", icon: <Gpu size={18} />, desc: "NVIDIA & AMD GPUs", path: "/category/gpu" },
                { name: "Processors", icon: <Cpu size={18} />, desc: "Intel & Ryzen CPUs", path: "/category/cpu" },
                { name: "Storage", icon: <HardDrive size={18} />, desc: "SSD & HDD Drives", path: "/category/storage" },
            ]
        },
        {
            title: "Peripherals",
            items: [
                { name: "Monitors", icon: <Monitor size={18} />, desc: "4K & Gaming Screens", path: "/category/monitors" },
                { name: "Accessories", icon: <MousePointer2 size={18} />, desc: "Mice & Keyboards", path: "/category/accessories" },
                { name: "Networking", icon: <Zap size={18} />, desc: "Routers & Adapters", path: "/category/network" },
            ]
        }
    ];

    return (
        <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 font-sans">
            <div className="max-w-[100%] mx-auto px-4 md:px-12">
                <div className="flex items-center justify-between h-20 gap-2 md:gap-4">
                    
                    {/* --- Logo --- */}
                    <div className="flex-shrink-0 z-50">
                        <Link to="/home" className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter">
                            COMP<span className="text-black">ARO</span>
                        </Link>
                    </div>

                    <SearchBar />

                    <div className="flex items-center space-x-2 md:space-x-8">
                        <div className="hidden lg:flex items-center space-x-6 text-sm font-bold">
                            <NavLink to="/home" className={activeLinkStyles}>Home</NavLink>
                            
                            {/* Mega Menu Child */}
                            <div className="static group" onMouseLeave={() => setIsCategoryOpen(false)}>
                                <button 
                                    onMouseEnter={() => setIsCategoryOpen(true)}
                                    className={`${isCategoryOpen ? "text-blue-600" : "text-gray-700"} flex items-center gap-1 hover:text-blue-600 transition-colors  cursor-pointer font-bold`}
                                >
                                    Explore Categories
                                    <motion.div animate={{ rotate: isCategoryOpen ? 180 : 0 }}>
                                        <ChevronDown size={14} />
                                    </motion.div>
                                </button>
                                <MegaMenu isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen} categories={categories} />
                            </div>

                            <NavLink to="/about-us" className={activeLinkStyles}>About Us</NavLink>
                            <NavLink to="/contact" className={activeLinkStyles}>Contact</NavLink>
                        </div>

                        {/* --- Actions --- */}
                        <div className="flex items-center space-x-1 md:space-x-4 border-l pl-2 md:pl-8 border-gray-200">
                            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full group transition-all">
                                <Heart size={20} className="group-hover:text-red-500" />
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full font-bold">3</span>
                            </button>

                            {/* User Menu Child */}
                            <UserMenu 
                                isOpen={isUserMenuOpen} 
                                setIsOpen={setIsUserMenuOpen} 
                                userData={userData} 
                                onLogout={handlelogout} 
                            />

                            <button className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Mobile Sidebar --- */}
<AnimatePresence>
    {isMenuOpen && (
        <>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsMenuOpen(false)} 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden" 
            />
            <motion.div 
                initial={{ x: '100%' }} 
                animate={{ x: 0 }} 
                exit={{ x: '100%' }} 
                transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
                className="fixed inset-y-0 right-0 w-full md:w-80 bg-white z-[60] lg:hidden shadow-2xl overflow-y-auto" 
            >
                {/* Header الـ Sidebar */}
                <div className="flex items-center justify-between p-6 border-b border-gray-50">
                    <span className="font-black text-blue-600 uppercase tracking-tighter">Menu</span>
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 flex flex-col">
                    {/* --- الـ SearchBar كـ Child --- */}
                    <div className="mb-8 w-full">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 px-1">Search Products</p>
                        <div className="transform scale-95 origin-left"> 
                            {/* استدعينا المكون هنا وهنصغره بنسبة بسيطة عشان يليق عالموبايل */}
                            <SearchBar />
                        </div>
                    </div>

                    {/* الروابط القائمة */}
                    <nav className="flex flex-col space-y-5">
                        <NavLink to="/home" className={({ isActive }) => `text-xl font-black transition-colors ${isActive ? 'text-blue-600' : 'text-gray-800'}`} onClick={() => setIsMenuOpen(false)}>
                            Home
                        </NavLink>

                        <NavLink to="/components" className={({ isActive }) => `text-xl font-black transition-colors flex items-center justify-between ${isActive ? 'text-blue-600' : 'text-gray-800'}`} onClick={() => setIsMenuOpen(false)}>
                            {({ isActive }) => (
                                <>
                                    Explore categories 
                                    <Zap size={20} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                                </>
                            )}
                        </NavLink>

                        <hr className="border-gray-50 my-2" />

                        <NavLink to="/about-us" className={({ isActive }) => `text-xl font-black transition-colors ${isActive ? 'text-blue-600' : 'text-gray-800'}`} onClick={() => setIsMenuOpen(false)}>
                            About Us
                        </NavLink>

                        <NavLink to="/contact" className={({ isActive }) => `text-xl font-black transition-colors ${isActive ? 'text-blue-600' : 'text-gray-800'}`} onClick={() => setIsMenuOpen(false)}>
                            Contact Us
                        </NavLink>
                    </nav>
                </div>
            </motion.div>
        </>
    )}
</AnimatePresence>
        </nav>
    );
};

export default NavBar;