import React from 'react';
import { Link } from '@inertiajs/react';

export default function HeroHeader({ title, subtitle, bgImage }) {
    return (
        <header className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                {bgImage && (
                    <img 
                        src={bgImage} 
                        alt={title} 
                        className="w-full h-full object-cover opacity-40 scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c2833] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 text-center space-y-4 px-6">
                <h1 className="font-72 font-black uppercase tracking-tighter">
                    {title}
                </h1>
                {subtitle && (
                    <div className="flex items-center justify-center gap-2 font-14 font-bold uppercase tracking-[0.2em] text-gray-400">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="text-primary">»</span>
                        <span>{subtitle}</span>
                    </div>
                )}
            </div>
        </header>
    );
}
