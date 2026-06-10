import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function NotFound() {
    return (
        <AppLayout>
            <Head title="404 - Page Not Found" />

            <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
                {/* Background glowing effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 text-center px-6">
                    <div className="animate-fade-in-down">
                        <h1 className="text-[8rem] md:text-[15rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 leading-none tracking-tighter drop-shadow-2xl">
                            404
                        </h1>
                    </div>

                    <div className="mt-4 md:mt-8 animate-fade-in-down" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                        <h2 className="font-36 md:font-48 font-bold text-gray-900 mb-4 uppercase tracking-widest">
                            Page Not Found
                        </h2>
                        <p className="text-gray-400 font-18 max-w-lg mx-auto mb-10 font-light leading-relaxed">
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[#0c101b] uppercase tracking-widest bg-primary hover:bg-primary/90 transition-all duration-300 rounded-full hover:shadow-[0_0_20px_rgba(255,195,0,0.4)] hover:-translate-y-1"
                        >
                            Back to Homepage
                        </Link>
                    </div>
                </div>

                {/* Abstract Floating Elements */}
                <div className="absolute top-1/4 left-10 md:left-20 w-16 h-16 md:w-32 md:h-32 border border-primary/30 rounded-full pointer-events-none opacity-50 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-10 md:right-20 w-32 h-32 md:w-64 md:h-64 border border-white/10 rounded-full pointer-events-none opacity-50"></div>
            </div>
        </AppLayout>
    );
}
