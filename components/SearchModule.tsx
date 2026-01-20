
import React, { useState, useMemo } from 'react';
import { Correspondence } from '../types';

interface SearchModuleProps {
  data: Correspondence[];
  loading?: boolean;
}

const SearchModule: React.FC<SearchModuleProps> = ({ data, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const title = item.subject || item.title || '';
      const code = item.referenceNumber || item.code || '';
      const engineer = item.responsibleEngineer || item.assignee || item.engineer || '';
      return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        engineer.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm]);

  const handleViewPdf = (item: Correspondence) => {
    // Check for attachment URL
    const url = item.attachmentUrl || item.pdfUrl;

    if (url) {
      // If it's a relative URL, prepend the API base
      const fullUrl = url.startsWith('http')
        ? url
        : `https://dcmschat.runasp.net${url.startsWith('/') ? '' : '/'}${url}`;
      window.open(fullUrl, '_blank');
    } else {
      alert('الملف غير متوفر حالياً');
    }
  };

  // Get the responsible engineer name
  const getEngineerName = (item: Correspondence): string => {
    return item.responsibleEngineer ||
      item.assignee ||
      item.engineer ||
      'غير محدد';
  };

  return (
    <div className="flex flex-col">
      <div className="px-5 py-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="البحث برقم المراسلة أو الموضوع..."
            className="w-full h-12 pr-11 pl-4 bg-white border border-gray-200 rounded-2xl text-sm focus:border-emerald shadow-sm outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="h-32 skeleton rounded-2xl"></div>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[11px] font-black text-emerald bg-emerald/5 px-2.5 py-1 rounded-lg border border-emerald/10 uppercase tracking-wider">{item.referenceNumber || item.code}</span>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${item.status === 'New' ? 'text-yellow-700 bg-yellow-50 border-yellow-100' : 'text-gray-500 bg-gray-50 border-gray-100'
                    }`}>{item.status === 'New' ? 'جديد' : 'معالج'}</span>
                </div>
                <h4 className="text-[14px] font-bold text-gray-900 leading-relaxed mb-4">{item.subject || item.title}</h4>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">المسؤول</span>
                    <span className="text-[12px] font-bold text-gray-700">{getEngineerName(item)}</span>
                    <span className="text-[10px] text-gray-400 mt-1">{item.date}</span>
                  </div>
                  <button
                    onClick={() => handleViewPdf(item)}
                    className={`h-10 px-6 rounded-xl text-xs font-black shadow-lg active:scale-95 transition-all flex items-center gap-2 ${item.attachmentUrl || item.pdfUrl
                        ? 'bg-emerald text-white shadow-emerald/20'
                        : 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed'
                      }`}
                    disabled={!item.attachmentUrl && !item.pdfUrl}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    عرض PDF
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-400 font-bold">لا توجد مراسلات</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModule;
