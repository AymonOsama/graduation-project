import React, { useState, useEffect } from 'react';
import { Save, LayoutGrid, PlayCircle, Award } from 'lucide-react'; // ضفنا أيقونة Award للشركاء
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import HomeAdvert1 from './AdvertsMangment/HomeAdvert1';
import HomeAdvert2 from './AdvertsMangment/HomeAdvert2'; // المكون موجود بالفعل
import AdvertTabs from './AdvertsMangment/AdvertTabs';

const AdvertsManagement = () => {
  const [activeTab, setActiveTab] = useState('advert1');

  const initialState = {
    slot_1: { storeName: "", title: "", desc: "", cta: "", mainIcon: "💻", stats: "" },
    slot_2: { storeName: "", title: "", desc: "", cta: "", mainIcon: "🎮", stats: "" },
    slot_3: { storeName: "", title: "", desc: "", cta: "", mainIcon: "📱", stats: "" },
    // هنا ممكن تضيف حالة ابتدائية لبيانات HomeAdvert2 لو حابب تخزنها في الـ LocalStorage برضه
  };

  const [ads, setAds] = useState(initialState);

  useEffect(() => {
    const saved = localStorage.getItem('site_adverts');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setAds(prev => ({ ...prev, ...parsedData }));
      } catch (e) { console.error("Parse error", e); }
    }
  }, []);

  const handleUpdate = (section, field, value) => {
    setAds(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const onSave = () => {
    localStorage.setItem('site_adverts', JSON.stringify(ads));
    toast.success('All Sections Updated!', {
      style: { borderRadius: '15px', background: '#1e293b', color: '#fff' }
    });
  };

  // --- تحديث قائمة الـ Tabs لإضافة القسم الجديد ---
  const tabs = [
    { id: 'advert1', label: 'Main Hero', icon: LayoutGrid },
    { id: 'advert2', label: 'Partners Ads', icon: Award }, // التبويب الجديد لـ HomeAdvert2
    { id: 'video_ad', label: 'Video Hub', icon: PlayCircle },
  ];

  return (
    <div className="p-4 sm:p-8 lg:p-12 min-h-screen bg-[#f8fafc] text-slate-900 select-none">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16">
          <h1 className="text-4xl font-[1000] italic tracking-tight">
            Experience <span className="text-blue-600">Editor</span>
          </h1>
          <button 
            onClick={onSave} 
            className="cursor-pointer flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl hover:bg-blue-600 transition-all active:scale-95"
          >
            <Save size={20} /> PUBLISH CHANGES
          </button>
        </header>

        <div className="mb-12">
          <AdvertTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <main className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="p-6 md:p-10"
            >
              
              {activeTab === 'advert1' && (
                <HomeAdvert1 ads={ads} onUpdate={handleUpdate} />
              )}

              {/* --- إضافة شرط عرض HomeAdvert2 --- */}
              {activeTab === 'advert2' && (
                <div className="space-y-8">
                  <div className="pb-6 border-b border-slate-100">
                    <h2 className="text-2xl font-black text-slate-800">Partnerships Management</h2>
                    <p className="text-slate-500">Manage premium hardware partners and featured spotlight deals.</p>
                  </div>
                  
                  {/* استدعاء المكون */}
                  <HomeAdvert2 /> 
                </div>
              )}

              {activeTab === 'video_ad' && (
                <div className="p-20 text-center border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400 font-bold uppercase italic tracking-widest">
                  Video Hub Content Management
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdvertsManagement;