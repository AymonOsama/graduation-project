import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ChevronRight, Loader2 } from 'lucide-react'; 
import toast from 'react-hot-toast';

// Assets
import loginWallpaper from '../../assets/loginPagesWallpaper.jpg';

const Signup = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- State Management ---
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // --- Signup Logic ---
    const handleSignup = async (e) => {
        e.preventDefault();
        toast.dismiss();

        // 1. التحقق من تطابق كلمة المرور
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match", {
                style: { borderRadius: '16px', fontWeight: '600' }
            });
            return;
        }

        setIsSubmitting(true);

        // محاكاة طلب API
        setTimeout(() => {
            console.log("Registered User:", formData);
            
            // توست النجاح بنفس الستايل الهادي
            toast.success("Account created successfully!", {
                duration: 4000,
                style: {
                    background: '#FFFFFF',
                    color: '#111827',
                    padding: '12px 24px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: '1px solid #F3F4F6',
                },
            });

            setIsSubmitting(false);
            navigate("/login");
        }, 1500);
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
                className="max-w-2xl w-full bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white p-8 md:p-14 z-10"
            >
                {/* Header */}
                <header className="text-center mb-10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-1.5 bg-blue-600 mx-auto rounded-full mb-6"
                    />
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
                        Join Us
                    </h2>
                    <p className="text-gray-500 font-semibold tracking-wide uppercase text-xs">
                        Create your account to get started
                    </p>
                </header>

                <form className="space-y-6" onSubmit={handleSignup}>
                    <div className="space-y-4">
                        {/* First & Last Name Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <input 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    type="text" 
                                    placeholder="First Name"
                                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none transition-all focus:border-blue-500 focus:bg-white text-gray-900 font-bold placeholder:text-gray-400"
                                    required
                                />
                                <User className="absolute right-5 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>
                            <div className="relative group">
                                <input 
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    type="text" 
                                    placeholder="Last Name"
                                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none transition-all focus:border-blue-500 focus:bg-white text-gray-900 font-bold placeholder:text-gray-400"
                                    required
                                />
                                <User className="absolute right-5 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>
                        </div>

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

                        {/* Passwords Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="relative group">
                                <input 
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    type="password" 
                                    placeholder="Confirm Password"
                                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none transition-all focus:border-blue-500 focus:bg-white text-gray-900 font-bold placeholder:text-gray-400"
                                    required
                                />
                                <Lock className="absolute right-5 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>
                        </div>
                    </div>

                    <motion.button 
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-black py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer text-lg uppercase tracking-widest mt-4"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            <>
                                Create Account
                                <ChevronRight size={22} />
                            </>
                        )}
                    </motion.button>
                </form>

                <footer className="text-center mt-10">
                    <p className="text-gray-500 font-bold text-sm">
                        Already have an account? {' '}
                        <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-8 decoration-2">
                            Sign In
                        </Link>
                    </p>
                </footer>
            </motion.div>
        </div>
    );
};

export default Signup;