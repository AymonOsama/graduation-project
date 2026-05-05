import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, Filter, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/Categorycom/FilterSidebar';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const CategoriesPgPd = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { urlSlug } = useParams();
  
  // --- Search & Filters State ---
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || ""; 

  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    brand: [],
    ram: [],
    storage: []
  });

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const formatTitle = (slug) => {
    if (!slug) return "Products";
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        // تصفية البيانات للتأكد من صلاحيتها
        const validData = response.data.filter(p => p.id && Number(p.id) > 0);
        setProducts(validData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // تصفير الصفحة عند تغيير الفلاتر أو كلمة البحث
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters, searchQuery]);

  // التحقق من حالة Premium
  useEffect(() => {
    const checkUserStatus = () => {
      try {
        const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
        const rememberedUser2 = JSON.parse(sessionStorage.getItem("rememberedUser"));
        const localPremium = rememberedUser?.isPremium === true || rememberedUser2?.isPremium === true;
        if (localPremium) setIsPremium(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };
    checkUserStatus();
  }, []);

  // --- Logic الموحد للفلترة والبحث ---
  // استخدمنا useMemo لتحسين الأداء وتجنب إعادة الحساب عند كل ريندر غير ضروري
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. فلترة البحث (Title Search)
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. فلترة السعر
      const priceMatch = selectedFilters.price.length === 0 || selectedFilters.price.some((range) => {
        if (range === "Under $30") return product.price < 30;
        if (range === "$30 - $60") return product.price >= 30 && product.price <= 60;
        if (range === "$60 - $90") return product.price >= 60 && product.price <= 90;
        if (range === "Over $90") return product.price > 90;
        return false;
      });

      // 3. فلترة العلامة التجارية
      const brandMatch = selectedFilters.brand.length === 0 || 
                         (product.brand && selectedFilters.brand.includes(product.brand));

      // يجب أن تتحقق كل الشروط معاً
      return matchesSearch && priceMatch && brandMatch;
    });
  }, [products, searchQuery, selectedFilters]);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-800">{formatTitle(urlSlug)}</h1>
            {searchQuery && (
              <p className="text-gray-500 mt-1 font-medium">
                Showing results for: <span className="text-blue-600">"{searchQuery}"</span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-all"
            >
              <Filter size={18} /> Filters
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-500">
              Sort By: <span className="text-blue-600 flex items-center gap-1 cursor-pointer hover:underline">Relevance <ChevronDown size={16}/></span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar 
            isPremium={isPremium} 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen} 
            selectedFilters={selectedFilters}
            onFilterChange={(updatedFilters) => setSelectedFilters(updatedFilters)}
          />

          <main className="flex-1">
            {/* Grid المنتجات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full flex flex-col items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="mt-4 font-bold text-gray-400 italic">Finding the best deals for you...</p>
                </div>
              ) : currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <ProductCard key={product.id} product={product} /> 
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
                   <div className="bg-gray-50 p-4 rounded-full mb-4">
                     <SearchX size={48} className="text-gray-300" />
                   </div>
                   <p className="text-xl font-bold text-gray-600">No products match your criteria.</p>
                   <p className="text-gray-400 mt-1">Try adjusting your filters or search term.</p>
                   <button 
                    onClick={() => setSelectedFilters({ price: [], brand: [], ram: [], storage: [] })}
                    className="mt-6 text-white font-bold px-8 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                   >
                     Clear all filters
                   </button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-30 hover:bg-blue-50 transition-colors shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  // منطق لإظهار عدد محدود من الصفحات
                  if (totalPages > 7 && Math.abs(pageNum - currentPage) > 2 && pageNum !== 1 && pageNum !== totalPages) {
                    if (pageNum === 2 || pageNum === totalPages - 1) return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                    return null;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        currentPage === pageNum 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-2 rounded-lg bg-white border border-gray-200 disabled:opacity-30 hover:bg-blue-50 transition-colors shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPgPd;