import React, { useState, useEffect } from 'react';
import { Search, Loader2, ChevronLeft, ChevronRight, AlertTriangle, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

// استيراد المكونات الفرعية
import ProductTable from './ProductsMangComs.jsx/ProductTable'
import ProductModal from './ProductsMangComs.jsx/ProductModal';

const API_URL = 'https://api.escuelajs.co/api/v1/products';
const ITEMS_PER_PAGE = 10;

const ProductManagement = ({ isExternalModalOpen, setIsExternalModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const response = await fetch(`${API_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`);
      const data = await response.json();
      setProducts(data);
      setIsLastPage(data.length < ITEMS_PER_PAGE);
      if (data.length === 0 && currentPage > 1) setCurrentPage(prev => prev - 1);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [currentPage]);

  useEffect(() => {
    if (isExternalModalOpen) {
      setEditingProduct(null);
      setIsModalOpen(true);
    }
  }, [isExternalModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsExternalModalOpen(false); 
  };

  const handleSaveProduct = async (formData) => {
    const isEdit = !!editingProduct;
    const url = isEdit ? `${API_URL}/${editingProduct.id}` : API_URL;
    try {
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title, price: Number(formData.price),
          description: formData.description, categoryId: 1, images: [formData.image]
        })
      });
      if (response.ok) {
        toast.success(isEdit ? 'Updated Successfully!' : 'Added Successfully!');
        fetchProducts();
        handleCloseModal();
      }
    } catch (error) { toast.error("Action failed"); }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${deleteId}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts(products.filter(p => p.id !== deleteId));
        toast.success('Product Deleted Successfully');
        if (products.length <= 1 && currentPage > 1) setCurrentPage(p => p - 1);
      }
    } catch (error) { 
      toast.error("Delete failed"); 
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  return (
    // أضفنا select-none لمنع النسخ في كامل واجهة إدارة المنتجات
    <div className="animate-in fade-in duration-500 select-none">
      <Toaster position="top-right" />
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="cursor-default">
          <h3 className="text-2xl sm:text-3xl font-[1000] text-gray-900 tracking-tight italic">Product <span className="text-blue-600">Inventory</span></h3>
          <div className="flex items-center gap-2 mt-1">
             <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
             <p className="text-xs sm:text-sm text-gray-500 font-black uppercase tracking-widest">Live Syncing - Page {currentPage}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" placeholder="Search by name..." 
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all shadow-sm font-bold text-sm"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6 cursor-default">
          <div className="relative">
             <Loader2 className="animate-spin text-blue-600" size={50} strokeWidth={3} />
             <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse rounded-full"></div>
          </div>
          <p className="text-gray-400 font-black tracking-widest text-sm animate-pulse">OPTIMIZING DATABASE...</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-[2rem] border border-gray-50">
            <ProductTable 
              products={products.filter(p => p.title?.toLowerCase().includes(searchTerm.toLowerCase()))} 
              onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true); }} 
              onDelete={confirmDelete}
            />
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 px-4 py-6 border-t border-gray-100 gap-6">
            <div className="text-sm text-gray-400 font-black uppercase tracking-tighter cursor-default order-2 sm:order-1">
                Showing <span className="text-blue-600 underline decoration-2">{products.length}</span> Master Entries
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center order-1 sm:order-2">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(p => p - 1)} 
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 rounded-2xl font-black text-gray-700 hover:bg-gray-50 hover:border-blue-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-90"
              >
                <ChevronLeft size={20} strokeWidth={3} /> Prev
              </button>
              
              <div className="bg-gray-900 text-white w-12 h-12 flex items-center justify-center rounded-2xl font-black shadow-xl shadow-gray-200 cursor-default">
                {currentPage}
              </div>
              
              <button 
                disabled={isLastPage} 
                onClick={() => setCurrentPage(p => p + 1)} 
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 rounded-2xl font-black text-gray-700 hover:bg-gray-50 hover:border-blue-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-90"
              >
                Next <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* مودال التعديل والإضافة */}
      <AnimatePresence>
        {isModalOpen && (
          <ProductModal onClose={handleCloseModal} product={editingProduct} onSave={handleSaveProduct} />
        )}
      </AnimatePresence>

      {/* مودال التأكيد على المسح المخصص */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl overflow-hidden border border-gray-50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                  <AlertTriangle className="text-red-500" size={40} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-[1000] text-gray-900 mb-2 italic">ERASE PRODUCT?</h3>
                <p className="text-gray-500 font-bold text-sm px-2 leading-relaxed">
                  This action is permanent. All associated inventory records will be purged from the server.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-10">
                <button 
                  onClick={handleDelete}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-100 cursor-pointer"
                >
                  <Trash2 size={20} strokeWidth={2.5} />
                  PURGE DATA
                </button>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-500 font-black py-4 rounded-2xl transition-all active:scale-95 cursor-pointer"
                >
                  ABORT MISSION
                </button>
              </div>
              
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={24} strokeWidth={3} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManagement;