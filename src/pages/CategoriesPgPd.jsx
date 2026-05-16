import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';

// Imported Child Components
import FilterSidebar from '../components/CategoryCom/FilterSidebar';
import PageHeader from '../components/CategoryCom/PageHeader';
import ProductGrid from '../components/CategoryCom/ProductGrid';
import Pagination from '../components/CategoryCom/Pagination';

// Context
import { useProducts } from "../context/ProductsContext";

const CategoriesPgPd = () => {

  // =========================
  // States
  // =========================
  const [isPremium, setIsPremium] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    brand: [],
    ram: [],
    storage: []
  });

  // =========================
  // Context
  // =========================
  const { products, loading, error } = useProducts();

  // =========================
  // Router
  // =========================
  const { urlSlug } = useParams();
  const { state } = useLocation();

  const categoryId = state?.categoryId;

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || "";

  const itemsPerPage = 9;

  // =========================
  // Helpers
  // =========================
  const formatTitle = (slug) => {
    if (!slug) return "All Products";

    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getSortLabel = () => {
    const labels = {
      'low-to-high': 'Price: Low to High',
      'high-to-low': 'Price: High to Low',
      'relevant': 'Relevance'
    };

    return labels[sortBy];
  };

  // =========================
  // Filtering + Sorting
  // =========================
  const filteredProducts = useMemo(() => {

    let result = [...products];

    // Category Filter
    // category filter
if (categoryId) {

  // filter by id
  result = result.filter(
    (product) =>
      String(product.category?.id) === String(categoryId)
  );

} else if (urlSlug) {

  // fallback filter by slug
  result = result.filter((product) => {

    const categorySlug = product.category?.name
      ?.toLowerCase()
      .replace(/\s+/g, "-");

    return categorySlug === urlSlug.toLowerCase();
  });
}
    // Search + Price Filters
    result = result.filter((product) => {

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        (product.title || "").toLowerCase().includes(query) ||
        (product.description || "").toLowerCase().includes(query);

      const priceMatch =
        selectedFilters.price.length === 0 ||
        selectedFilters.price.some((range) => {

          if (range === "Under $30") {
            return product.price < 30;
          }

          if (range === "$30 - $60") {
            return product.price >= 30 && product.price <= 60;
          }

          if (range === "$60 - $100") {
            return product.price > 60 && product.price <= 100;
          }

          if (range === "Over $100") {
            return product.price > 100;
          }

          return false;
        });

      return matchesSearch && priceMatch;
    });

    // Sorting
    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;

  }, [products, categoryId, searchQuery, selectedFilters, sortBy]);

  // =========================
  // Reset Page On Filters Change
  // =========================
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilters, sortBy, categoryId]);

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage)
  );

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // =========================
  // Reset Filters
  // =========================
  const resetFilters = () => {
    setSelectedFilters({
      price: [],
      brand: [],
      ram: [],
      storage: []
    });

    setSortBy('relevant');
  };

  // =========================
  // Error State
  // =========================
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold text-lg">
          Failed to load products
        </p>
      </div>
    );
  }

  // =========================
  // Render
  // =========================
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
              handlePageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }}
            />

          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPgPd;