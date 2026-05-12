import React from 'react';
import { Edit3, Trash2, Box } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    // أضفنا select-none لمنع نسخ بيانات الجدول
    <div className="overflow-x-auto select-none">
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead>
          <tr className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-black cursor-default">
            <th className="px-6 py-2">Entry Detail</th>
            <th className="px-6 py-2">Valuation</th>
            <th className="px-6 py-2 text-center">Control</th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          {products.map((product) => (
            <tr 
              key={product.id} 
              className="group bg-gray-50/40 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 border border-transparent hover:border-blue-100/50"
            >
              {/* Product Info */}
              <td className="px-6 py-4 rounded-l-[2rem]">
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={product.images?.[0]?.replace(/[\[\]"]/g, "") || 'https://placehold.co/60'} 
                      alt="" 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-500" 
                      onError={(e) => e.target.src = 'https://placehold.co/60'}
                    />
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Box size={10} />
                    </div>
                  </div>
                  <div className="flex flex-col max-w-[200px] sm:max-w-[350px] cursor-default">
                    <span className="font-black text-gray-900 text-sm sm:text-base truncate tracking-tight uppercase">
                      {product.title}
                    </span>
                    <span className="text-[11px] text-gray-400 font-bold truncate line-clamp-1 italic">
                      {product.description || "No description provided."}
                    </span>
                  </div>
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-4">
                <div className="flex flex-col cursor-default">
                   <span className="text-xs text-blue-500 font-black tracking-widest uppercase opacity-60">USD</span>
                   <span className="font-[1000] text-gray-900 text-xl tracking-tighter">${product.price}</span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 rounded-r-[2rem] text-center">
                <div className="flex justify-center gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform lg:group-hover:translate-x-0 lg:translate-x-4">
                  <button 
                    onClick={() => onEdit(product)} 
                    className="p-3 text-blue-600 bg-white hover:bg-blue-600 hover:text-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 cursor-pointer active:scale-90"
                    title="Edit Product"
                  >
                    <Edit3 size={18} strokeWidth={2.5} />
                  </button>
                  <button 
                    onClick={() => onDelete(product.id)} 
                    className="p-3 text-red-600 bg-white hover:bg-red-600 hover:text-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 cursor-pointer active:scale-90"
                    title="Delete Product"
                  >
                    <Trash2 size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {products.length === 0 && (
        <div className="text-center py-20 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
          <p className="text-gray-400 font-black italic tracking-widest">NO PRODUCTS FOUND IN THIS SECTOR</p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;