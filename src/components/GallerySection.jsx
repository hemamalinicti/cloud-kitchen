import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Camera, X, Eye } from 'lucide-react';

export default function GallerySection() {
  const { isFestiveMode } = useApp();
  const [selectedImg, setSelectedImg] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="gallery" className="bg-slate-50/60 text-slate-900 pb-6 sm:pb-20 pt-0">
      
      {/* Gallery Top Hero Banner with Background Image (Full Bleed - No Top Gap) */}
      <div className="relative bg-slate-950 text-white pt-24 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-8 overflow-hidden shadow-2xl border-b-4 border-orange-500 mb-8 sm:mb-12">
        {/* Culinary Gallery Background Image */}
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80"
          alt="Kitchen Snapshots & Dish Gallery Background"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Soft Transparent Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/85 backdrop-blur-[1px]" />

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-yellow-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <span>Real Kitchen Snapshots</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black font-serif leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] tracking-tight">
            Kitchen Snapshots & Dish Gallery
          </h1>

          <p className="text-sm sm:text-lg font-black text-amber-100 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] bg-slate-950/60 p-3.5 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            Take a glance inside our kitchen prep, clay oven tandoor, fresh tiffin packaging, and daily cooked meals.
          </p>
        </div>
      </div>

      <div className="max-w-[96%] sm:max-w-[94%] mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {GALLERY_IMAGES.map((img, idx) => {
            const isHovered = hoveredIdx === idx;
            const containerEffect = isHovered
              ? 'ring-2 ring-amber-400/60 shadow-xl border-amber-300'
              : 'shadow-lg border-slate-200';

            return (
              <div
                key={idx}
                onClick={() => setSelectedImg(img)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative h-40 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 ease-out ${containerEffect}`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out scale-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white flex items-end justify-between gap-1">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                      {img.category}
                    </span>
                    <h3 className="text-xs sm:text-base font-extrabold line-clamp-2 leading-tight">{img.title}</h3>
                  </div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform flex-shrink-0">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Full-Screen Pop-Out Overlay on Hover */}
      {hoveredIdx !== null && !selectedImg && (
        <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center pt-24 sm:pt-28 pb-6 px-4 sm:px-8 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
          <div className="relative max-w-4xl w-[92vw] sm:w-[85vw] max-h-[calc(100vh-140px)] rounded-3xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_60px_rgba(251,191,36,0.35)] bg-slate-950 flex flex-col items-center justify-center transform scale-100 transition-transform duration-300">
            <img
              src={GALLERY_IMAGES[hoveredIdx].url}
              alt={GALLERY_IMAGES[hoveredIdx].title}
              className="w-full max-h-[60vh] object-contain bg-slate-950"
            />
            <div className="w-full p-4 bg-slate-900/95 text-white flex items-center justify-between border-t border-slate-800">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                  {GALLERY_IMAGES[hoveredIdx].category}
                </span>
                <h4 className="text-sm sm:text-xl font-black">{GALLERY_IMAGES[hoveredIdx].title}</h4>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider hidden sm:block">
                Full-Screen Pop Out Preview
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImg.url}
              alt={selectedImg.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase">{selectedImg.category}</span>
                <h4 className="text-lg font-extrabold">{selectedImg.title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
