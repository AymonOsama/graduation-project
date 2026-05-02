import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsLoading(false);
    
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@comparo.com',
      desc: 'We\'ll respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+966 50 123 4567',
      desc: 'Available 24/7 for support'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Riyadh, Saudi Arabia',
      desc: 'Visit our office for a personal meeting'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 px-6 md:px-12 overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div 
              className="h-[2px] w-12 bg-blue-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
            <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm">
              Get in Touch
            </span>
            <motion.div 
              className="h-[2px] w-12 bg-blue-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6 text-slate-900"
          >
            We'd Love to Hear <span className="text-blue-600">From You</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-600 text-xl max-w-2xl mx-auto font-medium"
          >
            Have questions or feedback? Reach out to us and let's have a conversation.
          </motion.p>
        </motion.div>

        {/* MAIN CONTENT GRID */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          
          {/* CONTACT INFO CARDS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.3 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-blue-600 font-bold mb-1">
                        {info.content}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {info.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Email Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-slate-50 font-medium"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-slate-50 font-medium"
                    />
                  </motion.div>
                </div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-slate-50 font-medium"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-slate-50 font-medium resize-none"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg font-black text-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-12 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center mb-6"
                >
                  <CheckCircle size={80} className="text-green-500" />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  Message Sent Successfully! 🎉
                </h2>
                <p className="text-slate-600 text-lg">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* FAQ SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Quick answers to common questions
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              { q: 'What is the response time?', a: 'We typically respond to inquiries within 24 hours.' },
              { q: 'Can I schedule a call?', a: 'Yes! You can schedule a call by providing your preferred time.' },
              { q: 'Do you offer support in Arabic?', a: 'Yes, we provide full support in both English and Arabic.' },
              { q: 'What are your business hours?', a: 'We operate 24/7 and are always ready to help.' },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-600 transition-all cursor-default group"
              >
                <div className="flex items-start gap-3 mb-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-black group-hover:shadow-lg transition-shadow"
                  >
                    Q
                  </motion.div>
                  <h3 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-slate-600 ml-11">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;