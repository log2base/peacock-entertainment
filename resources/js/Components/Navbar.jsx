import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Logo from './Logo';

export default function Navbar() {
    const { url, props } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const categories = props.globalCategories || [];

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Who We Are', href: '#' },
        {
            name: 'Our Works',
            href: '#',
            dropdown: categories.length > 0 ? categories.map(cat => ({
                name: cat.name,
                href: `/${cat.slug}`
            })) : [
                { name: 'Single Drama', href: '/single-drama' },
                { name: 'Television Series', href: '/television-series' },
                { name: 'Music', href: '/music' },
                { name: 'Cinema', href: '/cinema' },
            ]
        },
        { name: 'News', href: '#' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (href) => url === href;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-[#0c101b]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 transition-all duration-500">
            <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
                <Logo className="scale-110" />

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-6 xl:space-x-10 font-11 font-black uppercase tracking-[0.2em]">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative" ref={link.dropdown ? dropdownRef : null}>
                            {link.dropdown ? (
                                <button
                                    onMouseEnter={() => setOpenDropdown(link.name)}
                                    className={`flex items-center gap-2 transition-all duration-300 hover:text-primary group ${isActive(link.href) || openDropdown === link.name
                                            ? 'text-primary'
                                            : 'text-white/70'
                                        }`}
                                >
                                    {link.name}
                                    <svg className={`w-3 h-3 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`relative transition-all duration-300 hover:text-white group ${isActive(link.href)
                                            ? 'text-primary'
                                            : 'text-white/70'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {link.dropdown && openDropdown === link.name && (
                                <div
                                    onMouseLeave={() => setOpenDropdown(null)}
                                    className="absolute top-full -left-4 mt-0 w-64 bg-[#0f171e] shadow-2xl border-t-2 border-primary overflow-hidden animate-fade-in-down py-2"
                                >
                                    {link.dropdown.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="block px-8 py-4 text-white/60 hover:bg-white/5 hover:text-primary transition-all font-bold font-10 uppercase tracking-widest"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>



                {/* Mobile Menu Toggle */}
                <button 
                    className="lg:hidden text-white focus:outline-none p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span className={`h-0.5 w-full bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-[#0c101b] border-t border-white/5 px-8 py-10 pb-32 space-y-8 animate-fade-in h-[calc(100vh-6rem)] overflow-y-auto shadow-2xl">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            {link.dropdown ? (
                                <div className="space-y-6">
                                    <div className="font-12 font-black uppercase tracking-[0.2em] text-primary flex items-center justify-between">
                                        {link.name}
                                    </div>
                                    <div className="pl-6 space-y-6 border-l-2 border-white/5">
                                        {link.dropdown.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block font-10 font-bold uppercase tracking-widest text-white/50 hover:text-white"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`block font-12 font-black uppercase tracking-[0.2em] ${isActive(link.href) ? 'text-primary' : 'text-white'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}

                </div>
            )}
        </nav>
    );
}
