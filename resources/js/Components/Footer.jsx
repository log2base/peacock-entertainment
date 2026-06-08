import React from 'react';
import { Link } from '@inertiajs/react';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-[#0c101b] pt-32 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 pb-24 text-center sm:text-left">
                <div className="space-y-8 col-span-1 lg:col-span-1">
                    <Logo className="scale-125 origin-left" />
                    <p className="text-white/40 font-14 leading-relaxed max-w-xs font-medium">
                        PEACOCK ENTERTAINMENT is a visionary motion picture production house. We craft immersive stories that resonate globally, blending art with cutting-edge technology.
                    </p>
                    {/* <div className="flex gap-4">
                        {['FB', 'YT', 'IG', 'X'].map((social) => (
                            <div key={social} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-10 font-black hover:bg-primary hover:text-secondary hover:border-primary transition-all cursor-pointer">
                                {social}
                            </div>
                        ))}
                    </div> */}
                </div>


                <div className="space-y-8">
                    <h4 className="font-12 font-black uppercase tracking-[0.3em] text-primary">Categories</h4>
                    <ul className="space-y-4">
                        {[
                            { name: 'Single Drama', href: '/single-drama' },
                            { name: 'TV Series', href: '/television-series' },
                            { name: 'Music Videos', href: '/music' },
                            { name: 'Cinema', href: '/cinema' },
                        ].map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-white/50 hover:text-white transition-colors font-12 font-bold uppercase tracking-widest">{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="font-12 font-black uppercase tracking-[0.3em] text-primary">Quick Links</h4>
                    <ul className="space-y-4">
                        {['About Us',  'Contact'].map((item) => (
                            <li key={item}>
                                <Link href="#" className="text-white/50 hover:text-white transition-colors font-12 font-bold uppercase tracking-widest">{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-8">
                    <h4 className="font-12 font-black uppercase tracking-[0.3em] text-primary">Reach Us</h4>
                    <div className="space-y-6 text-white/50 font-12 font-bold uppercase tracking-widest leading-loose">
                        <p className="flex items-start gap-4">
                            <span className="text-primary font-18">📍</span>
                            Flat 10E, House 10, Road 2/2, Banani, Dhaka-1213
                        </p>
                        <a href="mailto:peacockentertainmentlimited@gmail.com" className="flex items-center gap-4 hover:text-primary transition-colors cursor-pointer">
                            <span className="text-primary font-18">✉️</span>
                            peacockentertainmentlimited@gmail.com
                        </a>
                        <a href="tel:+8801625770071" className="flex items-center gap-4 hover:text-primary transition-colors cursor-pointer">
                            <span className="text-primary font-18">📞</span>
                            +880 1625-770071
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 font-10 font-black uppercase tracking-[0.3em] text-white/20 text-center md:text-left">
                <p>© {new Date().getFullYear()} PEACOCK ENTERTAINMENT. BEYOND IMAGINATION.</p>
                {/* <div className="flex gap-10">
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-white transition-colors">Support</Link>
                </div> */}
            </div>
        </footer>
    );
}
