import React, { useState, useEffect, useRef } from 'react'; // 1. أضفنا useRef
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown, ShieldAlert, Loader2 } from 'lucide-react'; 
import users from '../../data/users.json';

const UserMenu = ({ isOpen, setIsOpen, onLogout }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // 2. مرجع لتحديد عنصر القائمة بالكامل
    const menuRef = useRef(null);

    // 3. Effect لمراقبة النقرات الخارجية
    useEffect(() => {
        const handleClickOutside = (event) => {
            // إذا كانت القائمة مفتوحة والنقرة حدثت خارج نطاق الـ menuRef
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // إضافة المستمع عند فتح القائمة
        document.addEventListener('mousedown', handleClickOutside);
        
        // تنظيف المستمع عند إغلاق المكون أو تغيير الحالة لمنع تسرب الذاكرة
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    useEffect(() => {
        const fetchUserData = () => {
            setLoading(true);
            const rawData = localStorage.getItem('rememberedUser') || sessionStorage.getItem('rememberedUser');

            if (!rawData) {
                setUserData(null);
                setLoading(false);
                return;
            }

            try {
                const parsedData = JSON.parse(rawData);
                const userId = parsedData.id ? parsedData.id : parsedData;

                if (users && users.users) {
                    const currentUser = users.users.find(u => 
                        String(u.id).trim() === String(userId).trim()
                    );
                    setUserData(currentUser || null);
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                const currentUser = users.users.find(u => String(u.id).trim() === String(rawData).trim());
                setUserData(currentUser || null);
            }
            setLoading(false);
        };

        fetchUserData();
    }, [isOpen]);

    return (
        // 4. نربط الـ ref بالحاوية الرئيسية
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
                                {loading ? 'Loading...' : userData ? `${userData.firstName} ${userData.lastName}` : 'Guest User'}
                            </p>
                            
                            {userData?.role === 'super_admin' && (
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

                        {(userData?.role === 'admin' || userData?.role === 'super_admin') && (
                            <Link 
                                to="/admin" 
                                onClick={() => setIsOpen(false)}
                                className="cursor-pointer flex items-center justify-between px-4 py-2.5 text-sm text-blue-600 font-bold hover:bg-blue-50 transition-colors border-t border-gray-50"
                            >
                                Admin Panel
                                {userData.role === 'super_admin' && <ShieldAlert size={14} className="text-purple-500" />}
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