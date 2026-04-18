import React from 'react';
import loginWallpaper from '../../assets/loginPagesWallpaper.jpg';
import { motion } from 'framer-motion';
import { Mail, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  return (
    <div 
      style={{ backgroundImage: `url(${loginWallpaper})` }}
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative font-sans"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        // Using max-w-xl for a balanced, premium card width
        className="max-w-xl w-full bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 p-10 md:p-14 z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-4">
            Reset Password
          </motion.h2>
          <div className="h-2 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Informational Text */}
        <p className='text-black/70 text-center my-16 font-medium leading-relaxed'>
          Enter the email associated with your account and we'll send a magic link to reset your password.
        </p>

        {/* Reset Form */}
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="group space-y-2">
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full pl-2 pr-10 py-3 bg-transparent border-b-2 border-black/20 outline-none transition-all duration-300 focus:border-blue-500 text-black text-lg font-bold placeholder:text-black/30"
              />
              <Mail className="absolute right-2 top-3 text-black/60 group-focus-within:text-blue-500 transition-colors" size={22} />
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-5 rounded-[2rem] shadow-[0_15px_30px_rgba(59,130,246,0.3)] transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer text-xl tracking-widest active:scale-95">
            Send Reset Link
            <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        {/* Navigation Footer */}
        <div className="text-center mt-12">
            <Link to="/login" className="text-black/50 font-bold hover:text-black transition-colors flex items-center justify-center gap-2 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Login
            </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;