import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactUs = () => {
  // --- 1. State Management ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. Static Data (Contact Info & FAQs) ---
  const contactInfo = [
    { icon: Mail, title: 'Email', content: 'support@comparo.com', desc: "We'll respond within 24 hours" },
    { icon: Phone, title: 'Phone', content: '+966 50 123 4567', desc: 'Available 24/7 for support' },
    { icon: MapPin, title: 'Location', content: 'Riyadh, Saudi Arabia', desc: 'Visit our office for a meeting' }
  ];

  const faqs = [
    { q: 'What is the response time?', a: 'We typically respond to inquiries within 24 hours.' },
    { q: 'Can I schedule a call?', a: 'Yes! You can schedule a call by providing your preferred time.' },
    { q: 'Do you offer support in Arabic?', a: 'Yes, we provide full support in both English and Arabic.' },
    { q: 'What are your business hours?', a: 'We operate 24/7 and are always ready to help.' },
  ];

  // --- 3. Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // محاكاة إرسال البيانات للسيرفر
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsLoading(false);

    // إعادة تعيين الفورم بعد نجاح الإرسال بـ 3 ثواني
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  // --- 4. Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' } 
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 md:py-20 px-4 sm:px-6 md:px-12 select-none">

      {/* --- Background Decorative Elements --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-blue-200/20 rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- Section Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-12 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="h-[2px] w-8 md:w-12 bg-blue-600" />
            <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">Get in Touch</span>
            <div className="h-[2px] w-8 md:w-12 bg-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 text-slate-900 leading-tight">
            We'd Love to Hear <br className="sm:hidden" /> 
            <span className="text-blue-600"> From You</span>
          </h1>
          <p className="text-slate-600 text-base md:text-xl max-w-2xl mx-auto font-medium">
            Have questions or feedback? Reach out to us.
          </p>
        </motion.div>

        {/* --- Main Content: Info & Form --- */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 mb-16">

          {/* Left Side: Contact Information Cards */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="lg:col-span-1 space-y-4 md:space-y-6"
          >
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.div 
                  key={idx} 
                  variants={itemVariants} 
                  whileHover={{ y: -5 }} 
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-start gap-4 transition-all hover:shadow-xl group overflow-hidden"
                >
                  <motion.div 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                    className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:bg-blue-700 transition-colors"
                  >
                    <Icon size={24} />
                  </motion.div>
                  <div className="min-w-0 w-full">
                    <h3 className="text-lg font-black text-slate-900">{info.title}</h3>
                    <p className="text-blue-600 font-bold text-sm md:text-base break-words">{info.content}</p>
                    <p className="text-slate-500 text-xs md:text-sm">{info.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Side: Contact Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-12 shadow-2xl border border-slate-100 overflow-hidden"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Full Name</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange} required 
                      placeholder="Ayman Osama" 
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-100 focus:border-blue-600 focus:outline-none transition-all bg-slate-50 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Email Address</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange} required 
                      placeholder="ayman@example.com" 
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-100 focus:border-blue-600 focus:outline-none transition-all bg-slate-50 font-medium" 
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700">Subject</label>
                  <input 
                    type="text" name="subject" value={formData.subject} onChange={handleChange} required 
                    placeholder="How can we help?" 
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-100 focus:border-blue-600 focus:outline-none transition-all bg-slate-50 font-medium" 
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700">Message</label>
                  <textarea 
                    name="message" value={formData.message} onChange={handleChange} required 
                    placeholder="Tell us more..." rows="4" 
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-100 focus:border-blue-600 focus:outline-none transition-all bg-slate-50 font-medium resize-none" 
                  />
                </div>

                {/* Submit Button */}
                <motion.button 
                  type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Sending...' : <><Send size={20} /> Send Message</>}
                </motion.button>
              </form>
            ) : (
              /* Success State */
              <div className="py-12 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
                  <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-900">Sent Successfully!</h2>
              </div>
            )}
          </motion.div>
        </div>

        {/* --- FAQ Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="mt-16 md:mt-20"
        >
          <div className="text-center mb-10 md:mb-12 px-4">
            <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Frequently Asked <span className="text-blue-600"> Questions</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg">Quick answers to common questions</p>
          </div>

          <motion.div 
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} 
            className="grid sm:grid-cols-2 gap-4 md:gap-6"
          >
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} variants={itemVariants} whileHover={{ y: -5 }} 
                className="bg-white rounded-2xl p-5 md:p-6 border-2 border-slate-200 hover:border-blue-600 transition-all group overflow-hidden"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-black">Q</div>
                  <h3 className="font-black text-slate-900 text-sm md:text-base group-hover:text-blue-600 transition-colors">{faq.q}</h3>
                </div>
                <p className="text-slate-600 text-xs md:text-sm ml-10 md:ml-11 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactUs;