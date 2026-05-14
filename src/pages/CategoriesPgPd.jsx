import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';

// Imported Child Components
import FilterSidebar from '../components/CategoryCom/FilterSidebar'
import PageHeader from '../components/CategoryCom/PageHeader';
import ProductGrid from '../components/CategoryCom/ProductGrid';
import Pagination from '../components/CategoryCom/Pagination';

const CategoriesPgPd = () => {
  // States
  const [isPremium, setIsPremium] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({ price: [], brand: [], ram: [], storage: [] });

  const { urlSlug } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categoryId = location.state?.categoryId;
  const searchQuery = searchParams.get('query') || "";
  const itemsPerPage = 9;

  // Helpers
  const formatTitle = (slug) => {
    if (!slug) return "All Products";
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getSortLabel = () => {
    const labels = { 'low-to-high': 'Price: Low to High', 'high-to-low': 'Price: High to Low', 'relevant': 'Relevance' };
    return labels[sortBy];
  };

  // Fetch Logic
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = categoryId 
          ? `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
          : 'https://api.escuelajs.co/api/v1/products';
        const response = await axios.get(url);
        setProducts(response.data.filter(p => p.id && p.images?.length > 0));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, urlSlug]);

  // Filters & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        (product.title || "").toLowerCase().includes(query) || 
        (product.description || "").toLowerCase().includes(query);
      const priceMatch = selectedFilters.price.length === 0 || selectedFilters.price.some(range => {
        if (range === "Under $30") return product.price < 30;
        if (range === "$30 - $60") return product.price <= 60;
        return false; // تكملة الشروط...
      });
      return matchesSearch && priceMatch;
    });
    if (sortBy === 'low-to-high') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'high-to-low') result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, searchQuery, selectedFilters, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setSelectedFilters({ price: [], brand: [], ram: [], storage: [] });
    setSortBy('relevant');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 selection:bg-blue-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-10">
        
        <PageHeader 
          urlSlug={urlSlug} 
          formatTitle={formatTitle}
          totalProducts={filteredProducts.length}
          setIsSidebarOpen={setIsSidebarOpen}
          isSortOpen={isSortOpen}
          setIsSortOpen={setIsSortOpen}
          sortBy={sortBy}
          setSortBy={setSortBy}
          getSortLabel={getSortLabel}
        />

        <div className="flex flex-col lg:flex-row gap-10">
          <FilterSidebar 
            isPremium={isPremium} 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen} 
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />

          <main className="flex-1">
            <ProductGrid 
              loading={loading} 
              products={currentItems} 
              resetFilters={resetFilters} 
            />

            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              handlePageChange={(p) => { setCurrentPage(p); window.scrollTo(0,0); }} 
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPgPd;