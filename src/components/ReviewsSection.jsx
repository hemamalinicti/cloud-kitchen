import React from 'react';
import { REVIEWS_DATA } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Star, MessageSquare, Quote, CheckCircle2 } from 'lucide-react';

export default function ReviewsSection() {
  const { isFestiveMode } = useApp();

  // Double array for seamless loop marquee
  const doubleReviews = [...REVIEWS_DATA, ...REVIEWS_DATA];

  return (
    <section id="reviews" className="py-12 overflow-hidden bg-white text-slate-900">
      <div className="max-w-[94%] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-100 via-orange-100 via-yellow-100 to-green-100 border border-orange-300 text-slate-900 text-xs font-black uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-red-600" />
            <span>Customer Reviews & Feedback</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-serif">
            What Our Regular Diners Say
          </h2>

          <p className="text-base font-bold text-slate-800 leading-relaxed">
            Over 1,500 daily subscribers trust CloudKitchen for their home meals. Hover over any review to pause scrolling!
          </p>
        </div>

        {/* Auto-moving Marquee Slider (Right to Left) - Compact Size */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Gradient Blur Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {doubleReviews.map((rev, idx) => {
              const borderColors = [
                'border-2 border-red-300 bg-red-50/20',
                'border-2 border-yellow-300 bg-yellow-50/20',
                'border-2 border-orange-300 bg-orange-50/20',
                'border-2 border-green-400 bg-green-50/20',
              ];
              const cardBorder = borderColors[idx % borderColors.length];

              return (
                <div
                  key={`${rev.id}-${idx}`}
                  className={`w-[280px] sm:w-[320px] bg-white rounded-2xl p-5 shadow-lg flex flex-col justify-between relative flex-shrink-0 transition-transform hover:scale-[1.02] ${cardBorder}`}
                >
                  <Quote className="w-8 h-8 text-yellow-200 absolute top-4 right-4 pointer-events-none" />

                  <div className="space-y-3">
                    {/* 5 Stars */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic line-clamp-3">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-500 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-sm font-extrabold text-slate-900">{rev.name}</h3>
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-xs text-slate-500 font-bold block">{rev.role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
