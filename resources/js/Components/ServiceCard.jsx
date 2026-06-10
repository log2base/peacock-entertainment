import React from 'react';

export default function ServiceCard({ title, description, image }) {
    return (
        <div className="space-y-8 group text-center md:text-left">
            <div className="aspect-video bg-[#e6b000] rounded-3xl overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-colors shadow-2xl">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>
            <div className="space-y-4">
                <h3 className="font-24 font-bold text-primary uppercase tracking-wider">
                    {title}
                </h3>
                <p className="text-primary/70 leading-relaxed font-16">
                    {description}
                </p>
            </div>
        </div>
    );
}
