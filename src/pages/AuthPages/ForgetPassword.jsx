import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Assets
import loginWallpaper from '../../assets/loginPagesWallpaper.jpg';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.dismiss();
        setIsSubmitting(true);

        // محاكاة إرسال ايميل الاستعادة
        setTimeout(() => {
            toast.success("Reset link sent to your email!", {
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
            // اختياري: توجيه المستخدم للوجين بعد الإرسال
            // navigate("/login");
        }, 1500);
    };

    return (
        <div 
            style={{ backgroundImage: `url(${loginWallpaper})` }}
            className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative font-sans"
        >
            {/* Overlay ناعم */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white p-10 md:p-14 z-10"
            >
                {/* Header Section */}
                <header className="text-center mb-10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-1.5 bg-blue-600 mx-auto rounded-full mb-6"
                    />
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
                        Recovery
                    </h2>
                    <p className="text-gray-500 font-semibold tracking-wide uppercase text-xs">
                        Reset your account password
                    </p>
                </header>

                {/* Informational Text */}
                <p className='text-gray-500 text-center mb-10 font-bold text-sm leading-relaxed'>
                    Enter the email associated with your account and we'll send a magic link to reset your password.
                </p>

                {/* Reset Form */}
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <input 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            placeholder="Email Address"
                            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none transition-all focus:border-blue-500 focus:bg-white text-gray-900 font-bold placeholder:text-gray-400"
                            required
                        />
                        <Mail className="absolute right-5 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    </div>

                    {/* Action Button */}
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
                                Send Reset Link
                                <ChevronRight size={22} />
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Navigation Footer */}
                <footer className="text-center mt-12">
                    <Link to="/login" className="text-gray-500 font-bold hover:text-blue-600 transition-colors flex items-center justify-center gap-2 group text-sm">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>
                </footer>
            </motion.div>
        </div>
    );
};

export default ForgetPassword;