import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import HeroHeader from '../Components/HeroHeader';

export default function Contact() {

    const contactInfo = [
        {
            icon: "✉️",
            title: "Email Us",
            detail: "peacockentertainmentlimited@gmail.com",
            sub: "Online support 24/7"
        },
        {
            icon: "📞",
            title: "Call Us",
            detail: "+880 1625-770071",
            sub: "Mon - Fri, 9am - 6pm"
        },
        {
            icon: "📍",
            title: "Visit Us",
            detail: "Flat 10L, House 10, Road 2/2, Banani, Dhaka-1213",
            sub: "Dhaka, Bangladesh"
        }
    ];

    return (
        <AppLayout>
            <HeroHeader
                title={<>Let's <span className="text-primary italic text-glow">Connect</span></>}
                subtitle="Ready to start your next cinematic journey?"
                bgImage="/about_header_bg.png"
            />

            <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {contactInfo.map((info, idx) => (
                        <div key={idx} className="bg-[#e6b000] border border-primary/20 p-10 rounded-3xl group hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                            <div className="text-4xl mb-6">{info.icon}</div>
                            <h3 className="text-primary font-bold uppercase tracking-widest mb-2 font-12">{info.title}</h3>
                            <p className="font-20 font-bold mb-1 break-all">{info.detail}</p>
                            <p className="font-14 text-primary/60 font-bold uppercase tracking-tighter">{info.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Map Section */}
                <section className="relative group">
                    {/* Decorative glow behind the map */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-3xl -z-10 rounded-[4rem] opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)] border border-primary/15 hover:border-primary/30 transition-colors duration-500" style={{ height: '500px' }}>
                        {/* Map iframe */}
                        <div className="absolute inset-0 z-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d35256.8616995254!2d90.36735401775468!3d23.776032657226956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sFlat%2010E%2C%20House%2010%2C%20Road%202%2F2%2C%20Banani%2C%20DHaka-1213!5e1!3m2!1sen!2sbd!4v1780830206718!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'saturate(0.8) contrast(1.1)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* Bottom gradient fade */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent z-10 h-48 pointer-events-none"></div>

                        {/* Left gradient fade */}
                        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-secondary/60 to-transparent z-10 w-32 pointer-events-none"></div>

                        {/* Location info card - glassmorphism overlay */}
                        <div className="absolute bottom-8 left-8 z-20 map-info-card">
                            <div className="bg-secondary/70 backdrop-blur-xl border border-primary/20 rounded-2xl p-7 space-y-4 min-w-[300px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                                {/* Animated accent bar */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full map-accent-bar"></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="font-24 font-black uppercase tracking-tighter text-gray-700">
                                        Based in <span className="text-primary italic">Dhaka</span>
                                    </h3>
                                    <p className="font-14 text-white/60 font-medium">
                                        Flat 10L, House 10, Road 2/2, Banani
                                    </p>
                                    <p className="font-12 text-primary/50 font-bold uppercase tracking-widest pt-1">
                                        Dhaka-1213, Bangladesh
                                    </p>
                                </div>

                                {/* Get Directions link */}
                                <a
                                    href="https://maps.google.com/?q=Flat+10E,+House+10,+Road+2/2,+Banani,+Dhaka-1213"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-primary font-bold font-12 uppercase tracking-widest hover:gap-3 transition-all duration-300 group/link pt-1"
                                >
                                    <span>Get Directions</span>
                                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Decorative corner accents */}
                        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 opacity-40">
                            <div className="w-8 h-[2px] bg-primary/60"></div>
                            <div className="w-[2px] h-8 bg-primary/60"></div>
                        </div>
                        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 opacity-40">
                            <div className="w-[2px] h-8 bg-primary/60"></div>
                            <div className="w-8 h-[2px] bg-primary/60"></div>
                        </div>
                    </div>
                </section>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .text-glow {
                    text-shadow: 0 0 30px rgba(255, 195, 0, 0.5);
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s infinite ease-in-out;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .map-info-card {
                    animation: slideUp 0.8s ease-out 0.3s both;
                }
                @keyframes accentPulse {
                    0%, 100% { width: 2.5rem; }
                    50% { width: 4rem; }
                }
                .map-accent-bar {
                    animation: accentPulse 3s ease-in-out infinite;
                }
            `}} />
        </AppLayout>
    );
}
