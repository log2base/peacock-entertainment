import React from 'react';
import { Link } from '@inertiajs/react';

export default function WorkGrid({ title, subtitle, items }) {
    return (
        <div className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-20 text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                        {title} <span className="text-primary italic">{subtitle}</span>
                    </h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {items.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-6 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2 border border-white/5 group-hover:border-primary/30">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0c101b] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,195,0,0.5)]">
                                        <svg className="w-8 h-8 text-secondary ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <span className="bg-primary text-secondary text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-lg">
                                        ★ {item.rating || '8.5'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-2 text-center lg:text-left">
                                <h3 className="font-bold text-xl uppercase tracking-tight group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <div className="flex items-center justify-center lg:justify-start gap-3 text-xs font-bold uppercase tracking-widest text-white/40">
                                    <span>{item.year || '2024'}</span>
                                    <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                                    <span>{item.tag || 'Premium'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
