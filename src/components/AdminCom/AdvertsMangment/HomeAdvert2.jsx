import React, { useState } from 'react';
import Section5 from '../../HomeCom/Section5'; // تأكد من المسار
// السطر رقم 3 مفروض يكون كدة:
import { Edit3, Layout, Smartphone, Tag, Link as LinkIcon, Info } from 'lucide-react';

const HomeAdvert2 = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('site_partners_data');
    return saved ? JSON.parse(saved) : {
      partners: [
        { id: 1, name: 'NVIDIA', category: 'Ray-Tracing Pioneers', icon: '🎮', tier: 'Strategic Partner', offer: 'Founders Edition Stock Only Here' },
        { id: 2, name: 'ASUS ROG', category: 'Extreme Performance', icon: '⚡', tier: 'Elite Partner', offer: 'Exclusive ROG Member Pricing' },
        { id: 3, name: 'INTEL', category: 'Architecture Innovation', icon: '💻', tier: 'Global Partner', offer: 'Priority Gen-14 Access' },
      ],
      spotlight: {
        name: 'Samsung Odyssey G9',
        role: 'Official Display Partner',
        headline: 'Redefine Your Visual',
        lastWordofHeadline: 'Horizon.',
        desc: "Experience the world's first dual UHD gaming monitor. Get a $200 Instant Rebate.",
        initials: 'S',
        badgeText: 'Limited Stock',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
        link: '#'
      }
    };
  });

  const saveToLocal = (newData) => {
    setData(newData);
    localStorage.setItem('site_partners_data', JSON.stringify(newData));
  };

  const updateSpotlight = (field, value) => {
    const newData = { ...data, spotlight: { ...data.spotlight, [field]: value } };
    saveToLocal(newData);
  };

  const updatePartner = (id, field, value) => {
    const newPartners = data.partners.map(p => p.id === id ? { ...p, [field]: value } : p);
    saveToLocal({ ...data, partners: newPartners });
  };

  return (
    <div className="space-y-10 select-none"> {/* منع النسخ عن اللوحة بالكامل */}
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* --- 1. Full Spotlight Control --- */}
        <div className="bg-slate-50 p-4 sm:p-8 rounded-[2.5rem] border border-slate-200 shadow-inner">
          <div className="flex items-center gap-3 mb-8 text-blue-600">
            <Edit3 size={24} />
            <h3 className="font-[1000] uppercase italic tracking-tighter text-xl">Spotlight Master Control</h3>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Brand Name" value={data.spotlight.name} onChange={(v) => updateSpotlight('name', v)} />
              <InputField label="Role / Partner Type" value={data.spotlight.role} onChange={(v) => updateSpotlight('role', v)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Main Headline" value={data.spotlight.headline} onChange={(v) => updateSpotlight('headline', v)} />
              <InputField label="Headline Highlight (Blue)" value={data.spotlight.lastWordofHeadline} onChange={(v) => updateSpotlight('lastWordofHeadline', v)} />
            </div>

            <InputField label="Full Description" value={data.spotlight.desc} onChange={(v) => updateSpotlight('desc', v)} isTextArea />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputField label="Initials" value={data.spotlight.initials} onChange={(v) => updateSpotlight('initials', v)} />
              <InputField label="Badge Text" value={data.spotlight.badgeText} onChange={(v) => updateSpotlight('badgeText', v)} />
              <div className="col-span-2">
                <InputField label="Call to Action Link" value={data.spotlight.link} onChange={(v) => updateSpotlight('link', v)} />
              </div>
            </div>

            <InputField label="Image URL" value={data.spotlight.image} onChange={(v) => updateSpotlight('image', v)} />
          </div>
        </div>

        {/* --- 2. Full Partner Cards Control --- */}
        <div className="bg-slate-50 p-4 sm:p-8 rounded-[2.5rem] border border-slate-200 shadow-inner">
          <div className="flex items-center gap-3 mb-8 text-blue-600">
            <Layout size={24} />
            <h3 className="font-[1000] uppercase italic tracking-tighter text-xl">Partners Grid Configuration</h3>
          </div>
          
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {data.partners.map((partner) => (
              <div key={partner.id} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                  <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase">Card #{partner.id}</span>
                  <input 
                    value={partner.icon} 
                    onChange={(e) => updatePartner(partner.id, 'icon', e.target.value)}
                    className="w-10 text-center bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Brand Name" value={partner.name} onChange={(v) => updatePartner(partner.id, 'name', v)} />
                  <InputField label="Category" value={partner.category} onChange={(v) => updatePartner(partner.id, 'category', v)} />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Tier Level" value={partner.tier} onChange={(v) => updatePartner(partner.id, 'tier', v)} />
                  <InputField label="Exclusive Offer" value={partner.offer} onChange={(v) => updatePartner(partner.id, 'offer', v)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Live Preview Section --- */}
      <div className="pt-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-slate-200" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Live Production Preview</h4>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        
        <div className="rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-2xl transition-all duration-700 hover:shadow-blue-200/50">
          <Section5 
            premiumPartners={data.partners} 
            SponserAdvert={[data.spotlight]} 
          />
        </div>
      </div>
    </div>
  );
};

// مكون فرعي للحقول لتقليل تكرار الكود
const InputField = ({ label, value, onChange, isTextArea = false }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-black uppercase text-slate-400 ml-3 tracking-widest">{label}</label>
    {isTextArea ? (
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium min-h-[100px] cursor-pointer"
      />
    ) : (
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-bold cursor-pointer"
      />
    )}
  </div>
);

export default HomeAdvert2;