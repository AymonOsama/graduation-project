import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ChevronRight, Loader2 } from 'lucide-react'; 
import toast from 'react-hot-toast';

// استيراد الـ Hook الخاص بالـ Auth
import { useAuth } from '../../context/AuthContext'; 

// Assets & Data
import loginWallpaper from '../../assets/loginPagesWallpaper.jpg';
import Users from '../../data/users.json';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // --- State Management ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); 
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isReturningUser, setIsReturningUser] = useState(false);

    // --- Lifecycle: Check if user visited before ---
    useEffect(() => {
        const visited = localStorage.getItem("hasVisited");
        if (visited) {
            setIsReturningUser(true);
        }
    }, []);

    // --- Input Change Handler ---
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // --- Main Login Logic ---
    const handleLogin = async (e) => {
        e.preventDefault();
        toast.dismiss(); // تصفية أي توست قديم
        setIsSubmitting(true);

        setTimeout(() => {
            const foundUser = Users.users.find(
                user => user.email === formData.email && user.password === formData.password
            );

            if (foundUser) {
                login(foundUser.id, rememberMe);
                localStorage.setItem("hasVisited", "true");

                // --- الـ Toast الجديد: بسيط، شيك، وخفيف جداً ---
                toast.success(`Welcome back, ${foundUser.firstName}!`, {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#FFFFFF',
                        color: '#111827', // Gray-900
                        padding: '12px 24px',
                        borderRadius: '16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: '1px solid #F3F4F6',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                    },
                    iconTheme: {
                        primary: '#10B981', // Emerald-500
                        secondary: '#FFFFFF',
                    },
                });

                navigate("/home");
            } else {
                toast.error("Invalid email or password", {
                    style: {
                        borderRadius: '16px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }
                });
            }
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div 
            style={{ backgroundImage: `url(${loginWallpaper})` }}
            className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative font-sans"
        >
            {/* Overlay ناعم للـ Light Mode */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white p-10 md:p-14 z-10"
            >
                {/* Header المطور */}
                <header className="text-center mb-12">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-1.5 bg-blue-600 mx-auto rounded-full mb-6"
                    />
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
                        {isReturningUser ? "Welcome Back" : "Nice to Meet You"}
                    </h2>
                    <p className="text-gray-500 font-semibold tracking-wide uppercase text-xs">
                        {isReturningUser ? "We've missed you! Please log in" : "Create an account or login to start"}
                    </p>
                </header>

                <form className="space-y-8" onSubmit={handleLogin}>
                    <div className="space-y-5">
                        {/* Email */}
                        <div className="relative group">
                            <input 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email" 
                                placeholder="Email Address"
                                className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none transition-all focus:border-blue-500 focus:bg-white text-gray-900 font-bold placeholder:text-gray-400"
                                required
                            />
                            <Mail className="absolute right-5 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <input 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password" 
                                placeholder="Password"
                                className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none transition-all focus:border-blue-500 focus:bg-white text-gray-900 font-bold placeholder:text-gray-400"
                                required
                            />
                            <Lock className="absolute right-5 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between font-bold">
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            <input 
                                type="checkbox" 
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 accent-blue-600 cursor-pointer" 
                            />
                            Remember me
                        </label>
                        <Link to="/forget-password" size={24} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                            Recovery Password?
                        </Link>
                    </div>

                    <motion.button 
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-black py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer text-lg uppercase tracking-widest"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            <>
                                Sign In Now
                                <ChevronRight size={22} />
                            </>
                        )}
                    </motion.button>
                </form>

                <footer className="text-center mt-12">
                    <p className="text-gray-500 font-bold text-sm">
                        Don't have an account? {' '}
                        <Link to="/signup" className="text-blue-600 font-black hover:underline underline-offset-8 decoration-2">
                            Create Account
                        </Link>
                    </p>
                </footer>
            </motion.div>
        </div>
    );
};

export default Login;