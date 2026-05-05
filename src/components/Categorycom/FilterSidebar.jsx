import React, { useState } from 'react';
import { Filter, Lock, Plus, Minus, X } from 'lucide-react';

const FilterSidebar = ({ isPremium, isOpen, setIsOpen, onFilterChange, selectedFilters }) => {
  const [openSections, setOpenSections] = useState({ Price: true });

  // دالة ذكية تتعامل مع أي نوع فلتر (سعر، براند، رام، الخ)
  const handleFilterToggle = (category, value) => {
    if (!isPremium) return;

    // بنجيب القيم الحالية للقسم ده (لو مفيش بنبدأ بمصفوفة فاضية)
    const currentValues = selectedFilters[category] || [];
    
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    // بنبعت الكائن كامل للأب بالتعديل الجديد
    onFilterChange({
      ...selectedFilters,
      [category]: updatedValues
    });
  };

  const toggleSection = (section) => {
    if (!isPremium) return;
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filterSections = [
    { title: "Price", key: "price", options: ["Under $30", "$30 - $60", "$60 - $90", "Over $90"] },
    { title: "Internal Memory", key: "storage", options: ["64GB", "128GB", "256GB", "512GB"] },
    { title: "Memory RAM", key: "ram", options: ["4GB", "8GB", "12GB", "16GB"] },
    { title: "Brand", key: "brand", options: ["Samsung", "Apple", "Oppo", "Xiaomi", "Realme"] },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
           onClick={() => setIsOpen(false)} />

      <aside className={`fixed lg:sticky top-0 lg:top-24 left-0 h-full lg:h-auto w-[280px] lg:w-64 bg-white z-50 lg:z-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl lg:shadow-none overflow-y-auto lg:overflow-visible`}>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-black italic">
              <Filter size={20} />
              <span>FILTER BY</span>
            </div>
            <button className="lg:hidden" onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div className="relative">
            {!isPremium && (
              <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[3px] flex flex-col items-center justify-start pt-32 text-center rounded-xl">
                <div className="bg-blue-600 p-3 rounded-full text-white mb-4 animate-pulse"><Lock size={24} /></div>
                <p className="text-xs font-black text-gray-900 uppercase px-6">Upgrade to Premium</p>
              </div>
            )}

            <div className="space-y-2">
              {filterSections.map((section, index) => {
                const isSectionOpen = openSections[section.title];
                return (
                  <div key={index} className="border-b border-gray-50 pb-2">
                    <button 
                      onClick={() => toggleSection(section.title)}
                      className="flex items-center justify-between w-full py-3 text-sm font-bold text-gray-700"
                    >
                      {section.title}
                      {isSectionOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </button>
                    
                    <div className={`overflow-hidden transition-all ${isSectionOpen ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <div className="space-y-2 pl-2">
                        {section.options.map((option, i) => (
                          <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              // بيشيك هل القيمة دي موجودة جوه الـ category بتاعها؟
                              checked={selectedFilters[section.key]?.includes(option) || false}
                              onChange={() => handleFilterToggle(section.key, option)}
                              disabled={!isPremium}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600" 
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;