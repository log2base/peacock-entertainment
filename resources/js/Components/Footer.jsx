import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Logo from './Logo';

export default function Footer() {
    const { props } = usePage();
    const categories = props.globalCategories || [];

    return (
        <footer className="bg-secondary pt-32 pb-12 border-t border-primary/20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 pb-24 text-center sm:text-left">
                <div className="space-y-8 col-span-1 lg:col-span-1">
                    <Logo variant="footer" className="origin-left" />
                    <p className="text-primary/80 font-14 leading-relaxed max-w-xs font-medium">
                        PEACOCK ENTERTAINMENT is a visionary motion picture production house. We craft immersive stories that resonate globally, blending art with cutting-edge technology.
                    </p>
                    {/* <div className="flex gap-4">
                        {['FB', 'YT', 'IG', 'X'].map((social) => (
                            <div key={social} className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center font-10 font-black hover:bg-primary hover:text-secondary hover:border-primary transition-all cursor-pointer">
                                {social}
                            </div>
                        ))}
                    </div> */}
                </div>


                <div className="space-y-8">
                    <h4 className="font-12 font-black uppercase tracking-[0.3em] text-primary">Categories</h4>
                    <ul className="space-y-4">
                        {(categories.length > 0 ? categories.map(cat => ({
                            name: cat.name,
                            href: `/${cat.slug}`
                        })) : [
                            { name: 'Drama', href: '/drama' },
                            { name: 'TV Series', href: '/tv-series' },
                            { name: 'Music', href: '/music' },
                        ]).map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-primary/70 hover:text-primary transition-colors font-12 font-bold uppercase tracking-widest">{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="font-12 font-black uppercase tracking-[0.3em] text-primary">Quick Links</h4>
                    <ul className="space-y-4">
                        {[
                            { name: 'About Us', href: '/about' },
                            { name: 'Contact', href: '/contact' }
                        ].map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-primary/70 hover:text-primary transition-colors font-12 font-bold uppercase tracking-widest">{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-8">
                    <h4 className="font-12 font-black uppercase tracking-[0.3em] text-primary">Reach Us</h4>
                    <div className="space-y-6 text-primary/70 font-12 font-bold uppercase tracking-widest leading-loose">
                        <p className="flex items-start gap-4">
                            <span className="text-primary font-18">📍</span>
                            Flat 10E, House 10, Road 2/2, Banani, Dhaka-1213
                        </p>
                        <a href="mailto:peacockentertainmentlimited@gmail.com" className="flex items-center gap-4 hover:text-primary transition-colors cursor-pointer">
                            <span className="text-primary font-18 break-words">✉️</span>
                            peacockentertainmentlimited@gmail.com
                        </a>
                        <a href="tel:+8801625770071" className="flex items-center gap-4 hover:text-primary transition-colors cursor-pointer">
                            <span className="text-primary font-18">📞</span>
                            +880 1625-770071
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-8 font-10 font-black uppercase tracking-[0.3em] text-primary/60 text-center md:text-left">
                <p>© {new Date().getFullYear()} PEACOCK ENTERTAINMENT. BEYOND IMAGINATION.</p>
                {/* <div className="flex gap-10">
                    <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Support</Link>
                </div> */}
            </div>
        </footer>
    );
}
