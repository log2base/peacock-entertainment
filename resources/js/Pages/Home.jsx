import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Home() {
    const movies = [
        { id: 1, title: 'The Silent Echo', genre: 'Thriller', duration: '2h 15m', rating: '8.4', image: '/movies/poster-1.png' },
        { id: 2, title: 'City Lights', genre: 'Drama', duration: '1h 45m', rating: '7.9', image: '/movies/poster-2.png' },
        { id: 3, title: 'Code Red', genre: 'Action', duration: '2h 05m', rating: '9.1', image: '/movies/poster-3.png' },
        { id: 4, title: 'Love in Dhaka', genre: 'Romance', duration: '1h 55m', rating: '8.2', image: '/movies/poster-4.png' },
    ];

    const [activeHero, setActiveHero] = useState(0);

    // Auto-advance hero
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveHero((prev) => (prev + 1) % movies.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [movies.length]);

    return (
        <AppLayout>
            {/* Hero Slider Section */}
            <section className="relative h-[600px] md:h-[800px] overflow-hidden">
                {/* Background Blur */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={movies[activeHero].image} 
                        alt="Background" 
                        className="w-full h-full object-cover blur-3xl opacity-30 scale-110 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c101b] via-[#0c101b]/80 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 h-full flex items-center relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
                        {/* Hero Poster */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative group perspective-1000">
                                <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/30 transition-all duration-700"></div>
                                <img 
                                    src={movies[activeHero].image} 
                                    alt={movies[activeHero].title}
                                    className="relative w-72 md:w-96 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                                />
                                <div className="absolute top-6 right-6">
                                    <span className="bg-primary text-secondary font-black px-4 py-2 rounded-lg font-18 shadow-xl">
                                        ★ {movies[activeHero].rating}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Info */}
                        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                            <div className="space-y-4">
                                <h1 className="font-96 font-black uppercase tracking-tighter leading-none animate-fade-in">
                                    {movies[activeHero].title}
                                </h1>
                                <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-400 font-bold uppercase tracking-widest font-16">
                                    <span className="text-primary">{movies[activeHero].genre}</span>
                                    <span>•</span>
                                    <span>{movies[activeHero].duration}</span>
                                    <span>•</span>
                                    <span className="border border-gray-700 px-2 py-0.5 rounded font-12">4K Ultra HD</span>
                                </div>
                            </div>
                            
                            <p className="text-gray-400 font-20 max-w-2xl mx-auto lg:mx-0 leading-relaxed italic">
                                "An unforgettable cinematic journey that redefines the boundaries of storytelling in modern cinema."
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                                <button className="group relative bg-primary text-secondary px-10 py-5 rounded-2xl font-black font-20 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,195,0,0.4)]">
                                    <span className="relative z-10 flex items-center gap-3">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                                        </svg>
                                        WATCH NOW
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>
                                <button className="border-2 border-white/20 hover:border-primary text-white px-10 py-5 rounded-2xl font-black font-20 transition-all hover:bg-white/5">
                                    DETAILS
                                </button>
                            </div>

                            {/* Thumbnail Nav */}
                            <div className="hidden lg:flex gap-4 pt-12">
                                {movies.map((movie, idx) => (
                                    <button 
                                        key={movie.id}
                                        onClick={() => setActiveHero(idx)}
                                        className={`relative w-20 h-28 rounded-lg overflow-hidden transition-all duration-300 ${
                                            activeHero === idx ? 'ring-2 ring-primary scale-110 translate-y-[-10px]' : 'opacity-40 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={movie.image} className="w-full h-full object-cover" alt="" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="py-24 space-y-32">
                <ContentSection title="Featured Tonight" movies={movies} />
                <ContentSection title="Trending Now" movies={[...movies].reverse()} />
                <ContentSection title="Action Hits" movies={movies.filter(m => m.genre === 'Action' || m.genre === 'Thriller')} />
            </div>


        </AppLayout>
    );
}

function ContentSection({ title, movies }) {
    return (
        <section className="max-w-7xl mx-auto px-6">
            {/* Section Header with Lines */}
            <div className="flex items-center gap-8 mb-16">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/20"></div>
                <h2 className="font-40 font-black uppercase tracking-tighter text-center whitespace-nowrap">
                    {title.split(' ')[0]} <span className="text-primary italic">{title.split(' ')[1]}</span>
                </h2>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/20"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {movies.map((movie) => (
                    <div key={movie.id} className="group cursor-pointer">
                        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-6 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2">
                            <img 
                                src={movie.image} 
                                alt={movie.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,195,0,0.5)]">
                                    <svg className="w-8 h-8 text-secondary ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="bg-black/60 backdrop-blur-md text-white font-10 font-black px-2 py-1 rounded-md uppercase tracking-widest border border-white/10">
                                    HD
                                </span>
                            </div>
                            <div className="absolute top-4 right-4">
                                <span className="bg-primary text-secondary font-10 font-black px-2 py-1 rounded-md uppercase tracking-widest">
                                    ★ {movie.rating}
                                </span>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-bold font-20 uppercase tracking-tight group-hover:text-primary transition-colors">
                                {movie.title}
                            </h3>
                            <div className="flex items-center gap-3 font-12 font-bold uppercase tracking-widest text-gray-500">
                                <span>{movie.genre}</span>
                                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                <span>{movie.duration}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
