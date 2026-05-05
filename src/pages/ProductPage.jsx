import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, CheckCircle, ChevronUp, ChevronDown, Store } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        if (response.data) {
          setProduct(response.data);
          const imgUrl = response.data.images[0]?.replace(/[\[\]"]/g, "");
          setMainImage(imgUrl || "https://placehold.co/600x600?text=Product+Image");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold italic text-blue-600 animate-pulse">جاري تحميل المنتج...</div>;
  
  if (!product) return (
    <div className="h-screen flex flex-col items-center justify-center font-bold text-red-500 text-center px-4">
      <p className="text-2xl mb-2">عذراً، هذا المنتج غير موجود حالياً</p>
      <p className="text-gray-400 font-medium bg-gray-100 px-4 py-1 rounded-full text-sm">ID: {id}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        
        {/* الكارت الأساسي - تحويل من row لـ col في الموبايل */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-5 md:p-10 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* المعرض (Gallery) */}
          <div className="w-full lg:flex-1 space-y-4">
            <div className="aspect-square rounded-2xl md:rounded-[2.5rem] bg-gray-50 p-4 md:p-10 border border-gray-100 flex items-center justify-center overflow-hidden group">
              <img 
                src={mainImage} 
                alt={product.title} 
                className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
            
            {/* صور المعرض الصغيرة - تعديل الـ Scrollbar */}
            <div className="flex gap-3 overflow-x-auto pb-4 pt-1 no-scrollbar lg:grid lg:grid-cols-4 lg:overflow-visible">
              {product.images.map((img, index) => {
                const cleanImg = img.replace(/[\[\]"]/g, "");
                return (
                  <button 
                    key={index} 
                    onClick={() => setMainImage(cleanImg)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 p-1.5 bg-white flex-shrink-0 transition-all ${mainImage === cleanImg ? 'border-blue-600 shadow-lg scale-95' : 'border-gray-100 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={cleanImg} className="w-full h-full object-contain rounded-md" alt="" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* معلومات المنتج */}
          <div className="w-full lg:flex-1 flex flex-col justify-center space-y-6">
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3">
                New Arrival
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-2">
                {product.title}
              </h1>
              <p className="text-gray-500 font-bold flex items-center gap-2 text-sm md:text-base">
                Category: <span className="text-blue-600 font-black px-2 py-0.5 bg-blue-50 rounded-md">{product.category?.name}</span>
              </p>
            </div>
            
            <div className="py-2 md:py-4 border-y border-gray-50">
              <p className="text-gray-400 font-bold italic text-lg mb-1">Best price :</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-6xl font-black text-blue-600 tracking-tighter italic">
                  {product.price?.toLocaleString()}
                </span>
                <span className="text-xl md:text-2xl font-black text-gray-700">EGP</span>
              </div>
            </div>

            <div className="space-y-4">
               <h3 className="font-black text-gray-800 uppercase text-xs tracking-[0.2em]">Key Features</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-blue-600 shadow-sm shadow-blue-300" />
                    <span className="text-gray-600 text-sm font-bold uppercase tracking-wider">Premium Build</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-300" />
                    <span className="text-gray-600 text-sm font-bold uppercase tracking-wider">Express Delivery</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* جدول المتاجر - تحويله لكروت في الموبايل */}
        <div className="mt-10 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3 font-black text-gray-700 italic text-xl">
              <ShoppingCart size={24} className="text-blue-600"/> Best Deals
            </div>
            <span className="hidden md:block text-xs font-bold text-gray-400 uppercase tracking-widest">Prices updated daily</span>
          </div>
          
          <div className="overflow-x-auto">
            {/* Desktop Table View */}
            <table className="w-full hidden md:table">
              <thead className="bg-gray-900 text-white text-[10px] uppercase font-bold tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-5 text-left">Store Name</th>
                  <th className="px-8 py-5 text-left">Availability</th>
                  <th className="px-8 py-5 text-left">Price</th>
                  <th className="px-8 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Store size={20}/></div>
                      <span className="font-black text-gray-800 text-lg uppercase">Official Store</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2 w-fit border border-emerald-100">
                      <CheckCircle size={14}/> IN STOCK
                    </span>
                  </td>
                  <td className="px-8 py-8">
                    <span className="font-black text-gray-900 text-2xl italic tracking-tighter">{product.price?.toLocaleString()} <small className="text-xs">EGP</small></span>
                  </td>
                  <td className="px-8 py-8 text-center">
                    <button className="bg-blue-600 text-white px-10 py-3.5 rounded-2xl font-black shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest">Go to Store</button>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Mobile View (Cards) - تظهر فقط في الشاشات الصغيرة */}
            <div className="md:hidden divide-y divide-gray-100">
               <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Store size={16}/></div>
                      <span className="font-black text-gray-800 uppercase text-sm">Official Store</span>
                    </div>
                    <span className="text-emerald-600 font-black text-[10px] flex items-center gap-1">
                      <CheckCircle size={12}/> IN STOCK
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                    <span className="font-black text-gray-900 text-xl">{product.price?.toLocaleString()} EGP</span>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase">Visit</button>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* الوصف (Accordion) */} 
        <div className='px-2 md:px-0 '>
          <button 
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)} 
            className='w-full bg-blue-100 p-5 rounded-[1.5rem] mt-10 md:mt-16 mb-4 flex items-center justify-between cursor-pointer text-gray-700 group transition-all hover:bg-blue-200'
          >
            <div className="flex items-center gap-4">
              <h1 className='text-xl md:text-3xl font-black italic uppercase tracking-tighter'>Description</h1>
              <div className="h-px w-8 md:w-20 bg-blue-300 hidden sm:block"></div>
            </div>
            <div className={`transition-transform duration-300 ${isDescriptionOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={28} className="text-blue-600"/>
            </div>
          </button>
          
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isDescriptionOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 md:p-8 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm">
              <p className='text-gray-600 leading-loose font-medium text-sm md:text-lg'>
                {product.description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;