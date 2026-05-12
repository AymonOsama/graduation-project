import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Upload, Loader2, X, DollarSign, AlignLeft, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductModal = ({ onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: ''
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        image: product.images?.[0]?.replace(/[\[\]"]/g, "") || ''
      });
    }
  }, [product]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image too large (Max 2MB)");
    }

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      setUploading(true);
      const response = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.location }));
      toast.success("Image synchronized");
    } catch (error) {
      toast.error("Cloud storage error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 select-none">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer" 
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 30 }} 
        className="bg-white w-full max-w-lg rounded-[3rem] p-8 sm:p-10 relative z-10 shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-[1000] text-slate-900 tracking-tight italic">
              {product ? 'Refine' : 'Register'} <span className="text-blue-600 font-black">Entry</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Product Management System</p>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner group transition-all duration-300">
             <Package className="text-blue-600 group-hover:scale-110 transition-transform" size={30} strokeWidth={2.5} />
          </div>
        </div>
        
        <div className="space-y-6 max-h-[65vh] overflow-y-auto px-1 pr-2 custom-scrollbar">
          
          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
               <Upload size={12} strokeWidth={3} /> Media Asset
            </label>
            <div 
              onClick={() => fileInputRef.current.click()}
              className="group relative h-48 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-500 shadow-inner"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="animate-spin text-blue-600" size={32} strokeWidth={3} />
                  <span className="text-xs font-black text-blue-600 animate-pulse">UPLOADING...</span>
                </div>
              ) : formData.image ? (
                <>
                  <img src={formData.image} alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[2px]">
                    <span className="text-white font-black text-xs uppercase tracking-widest border-2 border-white px-4 py-2 rounded-xl">Replace Asset</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-slate-300 group-hover:text-blue-400 transition-colors">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-slate-100 group-hover:shadow-md transition-all">
                    <Upload size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-center">Cloud Dropzone</span>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>

          {/* Form Content */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Tag size={12} strokeWidth={3} /> Identity
              </label>
              <input 
                className="w-full p-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800 placeholder:text-slate-300 cursor-text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Item designation"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <DollarSign size={12} strokeWidth={3} /> Market Price
              </label>
              <div className="relative">
                <input 
                  type="number"
                  className="w-full p-4.5 pl-10 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-black text-slate-900 placeholder:text-slate-300 cursor-text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <AlignLeft size={12} strokeWidth={3} /> Specifications
              </label>
              <textarea 
                rows="3"
                className="w-full p-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all resize-none text-sm font-bold text-slate-600 leading-relaxed cursor-text"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Primary features and technical specs..."
              />
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="pt-8 flex flex-col gap-3">
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(formData)} 
            disabled={uploading}
            className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg tracking-tight hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {product ? 'Commit Changes' : 'Initialize Entry'}
          </motion.button>
          
          <button 
            onClick={onClose} 
            className="w-full py-2 text-slate-400 font-black hover:text-red-500 text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <X size={12} strokeWidth={3} /> Terminate Process
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;