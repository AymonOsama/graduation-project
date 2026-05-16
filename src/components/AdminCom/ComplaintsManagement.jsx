import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, ArrowRight, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useComplaints } from '../../context/ComplaintsContext';

const ComplaintsManagement = () => {
  // استدعاء البيانات والأكشنز من الـ Context المخصص
  const { complaints, deleteComplaint, replyToComplaint } = useComplaints();
  
  // التحكم في الـ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // حساب مؤشرات الشكاوى المعروضة بناءً على الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComplaints = complaints.slice(indexOfFirstItem, indexOfLastItem);
  
  // إجمالي عدد الصفحات
  const totalPages = Math.ceil(complaints.length / itemsPerPage);

  // إعادة التوجيه التلقائي للصفحة السابقة إذا تم مسح كل العناصر في الصفحة الحالية
  useEffect(() => {
    if (currentComplaints.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [complaints, currentComplaints, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // عمل Scroll ناعم لأعلى الحاوية عند الانتقال بين الصفحات
    document.getElementById('complaints-container')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col h-[calc(100vh-12rem)] min-h-[650px]">
      
      {/* ==================== HEADER ==================== */}
      <div className="mb-6 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
            <MessageSquare size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">User Complaints</h3>
            <p className="text-slate-500 text-sm font-medium mt-0.5">Manage and respond to user feedback</p>
          </div>
        </div>
        {/*عداد الشكاوى الكلي*/}
        <div className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full font-black text-xs">
          Total: {complaints.length}
        </div>
      </div>

      {/* ==================== COMPLAINTS LIST AREA WITH SCROLL ==================== */}
      <div 
        id="complaints-container"
        className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar mb-4 min-h-0"
      >
        <AnimatePresence mode="popLayout">
          {complaints.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-24 text-center"
            >
              <div className="text-5xl mb-4">✨</div>
              <p className="text-slate-500 font-bold text-lg">No complaints yet!</p>
              <p className="text-slate-400 text-sm mt-2">All feedback is being addressed</p>
            </motion.div>
          ) : (
            currentComplaints.map((complaint) => (
              <motion.div
                layout
                key={complaint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -50 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
              >
                {/* COMPLAINT HEADER */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-xs flex-shrink-0 tracking-wider">
                      {complaint.userName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 text-base truncate">
                        {complaint.userName}
                      </p>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mt-0.5 truncate">
                        <Mail size={13} className="flex-shrink-0" />
                        <span className="truncate">{complaint.userEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COMPLAINT TITLE */}
                <h4 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-blue-600 transition-colors">
                  {complaint.title}
                </h4>

                {/* COMPLAINT MESSAGE */}
                <p className="text-slate-600 text-sm leading-relaxed font-medium mb-4">
                  {complaint.message}
                </p>

                {/* ACTIONS CONTROLS */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteComplaint(complaint.id)}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition-all cursor-pointer"
                    title="Delete complaint"
                  >
                    <Trash2 size={16} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => replyToComplaint(complaint.userEmail, complaint.title)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Reply
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ==================== PAGINATION CONTROLS ==================== */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 flex-shrink-0 bg-white">
          <p className="text-slate-500 text-xs font-bold">
            Showing <span className="text-slate-800">{indexOfFirstItem + 1}</span> to{' '}
            <span className="text-slate-800">{Math.min(indexOfLastItem, complaints.length)}</span> of{' '}
            <span className="text-slate-800">{complaints.length}</span> complaints
          </p>

          <div className="flex items-center gap-1">
            {/* زر الصفحة السابقة */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            {/* أرقام الصفحات الذكية */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-lg font-black text-xs transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            {/* زر الصفحة التالية */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsManagement;