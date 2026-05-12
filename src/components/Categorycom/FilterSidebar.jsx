import React, { useState, useEffect } from 'react';
import { Filter, Lock, Plus, Minus, X, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import usersData from '../../data/users.json';
import UpgradeModal from '../UpgradeModal';

const FilterSidebar = ({ isOpen, setIsOpen, onFilterChange, selectedFilters }) => {
  const [openSections, setOpenSections] = useState({ Price: true });
  const [isPremium, setIsPremium] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const rawData = localStorage.getItem("rememberedUser") || sessionStorage.getItem("rememberedUser");
    if (!rawData) return;

    try {
      const parsed = JSON.parse(rawData);
      const userId = parsed?.id ? String(parsed.id) : String(rawData);

      const user = usersData.users.find(u => String(u.id) === userId);

      if (user && (user.role === 'admin' || user.role === 'super_admin' || user.isPremium)) {
        setIsPremium(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleFilterToggle = (category, value) => {
    if (!isPremium) {
      setShowUpgradeModal(true);
      return;
    }

    const currentValues = selectedFilters?.[category] || [];

    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    onFilterChange({
      ...selectedFilters,
      [category]: updatedValues
    });
  };

  const filterSections = [
    {
      title: "Price",
      key: "price",
      options: ["Under $30", "$30 - $60", "$60 - $90", "Over $90"]
    },
    {
      title: "Internal Memory",
      key: "storage",
      options: ["64GB", "128GB", "256GB", "512GB"]
    },
    {
      title: "Memory RAM",
      key: "ram",
      options: ["4GB", "8GB", "12GB", "16GB"]
    },
    {
      title: "Brand",
      key: "brand",
      options: ["Samsung", "Apple", "Oppo", "Xiaomi", "Realme"]
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`fixed lg:sticky top-0 lg:top-24 left-0 h-full lg:h-auto w-[280px] lg:w-64 bg-white z-50 lg:z-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl lg:shadow-none overflow-y-auto lg:overflow-visible`}>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-blue-600 font-black italic">
              <Filter size={20} />
              <span>FILTER BY</span>
            </div>
            <button className="lg:hidden" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="relative">

            {/* Premium overlay */}
            {!isPremium && (
              <div className="absolute -inset-2 z-20 bg-white/40 backdrop-blur-[4px] flex flex-col items-center justify-center text-center rounded-2xl border border-white/50 shadow-inner">
                <motion.div
                  animate={{ scale: [0.9, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="bg-blue-600 p-4 rounded-full text-white mb-4 shadow-xl"
                >
                  <Lock size={28} />
                </motion.div>

                <h3 className="text-gray-900 font-black text-sm uppercase mb-2">
                  Premium Feature
                </h3>

                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-2 px-6 rounded-full flex items-center gap-2"
                >
                  <Crown size={14} className="text-yellow-400" />
                  UPGRADE NOW
                </button>
              </div>
            )}

            {/* Filters */}
            <div className={`space-y-2 ${!isPremium ? 'opacity-30' : ''}`}>

              {filterSections.map((section, index) => (
                <div key={index} className="border-b border-gray-50 pb-2">

                  {/* Section title */}
                  <button
                    onClick={() =>
                      setOpenSections(p => ({
                        ...p,
                        [section.title]: !p[section.title]
                      }))
                    }
                    className="flex items-center justify-between w-full py-3 text-sm font-bold text-gray-700"
                  >
                    {section.title}
                    {openSections[section.title] ? <Minus size={16} /> : <Plus size={16} />}
                  </button>

                  {/* Options */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[section.title] ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-2 pl-2 pb-2">

                      {section.options.map((option, i) => {
                        const isChecked =
                          selectedFilters?.[section.key]?.includes(option) || false;

                        return (
                          <label
                            key={i}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                handleFilterToggle(section.key, option)
                              }
                              className="w-4 h-4 rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-blue-600">
                              {option}
                            </span>
                          </label>
                        );
                      })}

                    </div>
                  </div>

                </div>
              ))}

            </div>
          </div>
        </div>
      </aside>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
};

export default FilterSidebar;