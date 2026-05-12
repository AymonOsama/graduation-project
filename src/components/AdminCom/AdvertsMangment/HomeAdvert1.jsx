import React, { memo } from 'react';
import { Store, Type, AlignLeft, BarChart3, MousePointer2, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

// مكون الحقل الصغير (FormInput) داخلي لهذا الملف
const FormInput = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-1.5 w-full">
    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
      <Icon size={12} className="text-slate-400" />
      {label}
    </label>
    <input 
      {...props}
      className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-bold text-slate-700 cursor-text"
    />
  </div>
);

const AdSlotCard = memo(({ title, slotKey, data, onUpdate }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
  >
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl flex items-center justify-center rounded-[1.5rem] border border-blue-100 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          {data.mainIcon}
        </div>
        <div>
          <h4 className="font-black text-slate-900 text-lg tracking-tight italic">{title}</h4>
          <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-lg font-black uppercase">
            SLOT: {slotKey.split('_')[1]}
          </span>
        </div>
      </div>
      <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
    </div>

    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Store Name" icon={Store} value={data.storeName} onChange={(e) => onUpdate(slotKey, 'storeName', e.target.value)} />
        <FormInput label="Icon (Emoji)" icon={Smile} value={data.mainIcon} onChange={(e) => onUpdate(slotKey, 'mainIcon', e.target.value)} />
      </div>
      <FormInput label="Main Title" icon={Type} value={data.title} onChange={(e) => onUpdate(slotKey, 'title', e.target.value)} />
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
          <AlignLeft size={12} className="text-slate-400" /> Description
        </label>
        <textarea rows="2" className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-bold text-slate-600 cursor-text" 
          value={data.desc} onChange={(e) => onUpdate(slotKey, 'desc', e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Stats" icon={BarChart3} value={data.stats} onChange={(e) => onUpdate(slotKey, 'stats', e.target.value)} />
        <FormInput label="Button Text" icon={MousePointer2} value={data.cta} onChange={(e) => onUpdate(slotKey, 'cta', e.target.value)} />
      </div>
    </div>
  </motion.div>
));

const HomeAdvert1 = ({ ads, onUpdate }) => {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4 px-4">
         <div className="h-px flex-1 bg-slate-200" />
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Primary Carousel Set</span>
         <div className="h-px flex-1 bg-slate-200" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
        <AdSlotCard title="Primary Hero" slotKey="slot_1" data={ads.slot_1} onUpdate={onUpdate} />
        <AdSlotCard title="Secondary Promo" slotKey="slot_2" data={ads.slot_2} onUpdate={onUpdate} />
        <AdSlotCard title="Special Offer" slotKey="slot_3" data={ads.slot_3} onUpdate={onUpdate} />
      </div>
    </div>
  );
};

export default HomeAdvert1;