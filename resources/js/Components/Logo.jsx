import React from 'react';
import { Link } from '@inertiajs/react';

export default function Logo({ className = "" }) {
    return (
        <Link href="/" className={`flex items-center gap-3 group ${className}`}>
            <img 
                src="/logo.png" 
                alt="Peacock Entertainment Logo" 
                className="h-10 md:h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
            />
        </Link>
    );
}
