import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0c101b] text-white font-sans selection:bg-primary selection:text-secondary">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
