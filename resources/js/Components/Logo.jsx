import React from 'react';
import { Link } from '@inertiajs/react';

export default function Logo({ className = "", variant = "default" }) {
    const isFooter = variant === "footer";

    return (
        <Link href="/" className={`flex items-center gap-3 group ${className}`}>
            <img
                src={isFooter ? "/images/peacock-logo-footer.png" : "/logo.png"}
                alt="Peacock Entertainment Logo"
                className={
                    isFooter
                        ? "h-14 md:h-16 w-auto max-w-[220px] object-contain group-hover:scale-105 transition-transform duration-300"
                        : "h-10 md:h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                }
            />
        </Link>
    );
}
