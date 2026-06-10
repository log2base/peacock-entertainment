import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

function getImageUrl(post) {
    if (!post?.image) return null;
    return `/storage/${post.image}`;
}

function HeroSlider({ posts }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (!posts || posts.length === 0) return;
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % posts.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [posts?.length]);

    if (!posts || posts.length === 0) {
        return (
            <section className="relative h-[500px] md:h-[700px] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
                <div className="relative z-10 text-center space-y-4">
                    <div className="text-6xl mb-4">🎬</div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary">
                        Welcome to <span className="text-primary italic">Peacock</span>
                    </h1>
                    <p className="text-primary/60 text-lg">Feature your posts to see them here</p>
                </div>
            </section>
        );
    }

    const current = posts[active];
    const imageUrl = getImageUrl(current);

    return (
        <section className="relative h-auto min-h-[600px] lg:h-[800px] pt-24 pb-20 lg:py-0 overflow-hidden flex items-center">
            {/* Background blur */}
            <div className="absolute inset-0 z-0">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Background"
                        className="w-full h-full object-cover blur-3xl opacity-30 scale-110 transition-all duration-1000"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#f0b500] to-[#e6a000]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col justify-center h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center w-full">
                    {/* Poster */}
                    <div className="flex lg:col-span-5 justify-center mt-4 lg:mt-0 mb-8 lg:mb-0">
                        <div className="relative group perspective-1000">
                            <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/30 transition-all duration-700" />
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={current.title}
                                    className="relative w-48 sm:w-64 md:w-80 lg:w-96 aspect-[2/3] object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                                />
                            ) : (
                                <div className="relative w-48 sm:w-64 md:w-80 lg:w-80 aspect-[2/3] rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                    <svg className="w-20 h-20 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                    </svg>
                                </div>
                            )}
                            <div className="absolute top-6 right-6">
                                <span className="bg-primary text-secondary font-black px-4 py-2 rounded-lg text-lg shadow-xl">
                                    ★ {current.rating}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="lg:col-span-7 space-y-5 lg:space-y-8 text-center lg:text-left">
                        <div className="space-y-3 lg:space-y-4">
                            {current.category && (
                                <span className="inline-block text-primary font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm border border-primary/30 px-3 py-1 rounded-full">
                                    {current.category.name}
                                </span>
                            )}
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black uppercase tracking-tighter leading-[1.1] break-words hyphens-auto w-full">
                                {current.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-4 text-primary/70 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm">
                                <span className="text-primary">★ {current.rating}/10</span>
                            </div>
                        </div>

                        <div className="flex flex-row gap-3 sm:gap-6 justify-center lg:justify-start">
                            {current.url ? (
                                <a
                                    href={current.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-red-600 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-2xl font-black text-sm sm:text-base md:text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                                        </svg>
                                        WATCH NOW
                                    </span>
                                    <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </a>
                            ) : (
                                <button className="group relative bg-red-600 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-2xl font-black text-sm sm:text-base md:text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]">
                                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                                        </svg>
                                        WATCH NOW
                                    </span>
                                    <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                            )}
                        </div>

                        {/* Thumbnail nav */}
                        <div className="flex gap-3 sm:gap-4 pt-6 sm:pt-8 overflow-x-auto pb-6 sm:pb-4 scrollbar-hide justify-center lg:justify-start w-full px-2">
                            {posts.map((post, idx) => {
                                const thumb = getImageUrl(post);
                                return (
                                    <button
                                        key={post.id}
                                        onClick={() => setActive(idx)}
                                        className={`relative w-16 sm:w-20 h-24 sm:h-28 rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 ${active === idx
                                            ? 'ring-2 ring-primary scale-110 -translate-y-2.5'
                                            : 'opacity-40 hover:opacity-100'
                                            }`}
                                    >
                                        {thumb ? (
                                            <img src={thumb} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary/50 text-xs font-bold">
                                                {idx + 1}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {posts.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActive(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${active === idx ? 'w-8 bg-primary' : 'w-1.5 bg-primary/30 hover:bg-primary/50'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}

function PostCard({ post }) {
    const imageUrl = getImageUrl(post);
    const Wrapper = post.url ? 'a' : 'div';
    const wrapperProps = post.url
        ? { href: post.url, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        <Wrapper {...wrapperProps} className="group cursor-pointer block">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-5 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2 border border-primary/10">
                {imageUrl ? (
                    <img src={imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/40">
                        <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300">
                        <svg className="w-7 h-7 text-white ml-1 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                        </svg>
                    </div>
                </div>
                <div className="absolute top-3 right-3">
                    <span className="bg-primary text-secondary text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-lg">
                        ★ {post.rating}
                    </span>
                </div>
            </div>
            <div className="space-y-1.5">
                <h3 className="font-bold text-base uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                </h3>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary/60">
                    {post.category && <span className="text-primary/70">{post.category.name}</span>}
                </div>
            </div>
        </Wrapper>
    );
}

const categoryIcons = {
    cinema: '🎬',
    drama: '🎭',
    'tv-series': '📺',
    music: '🎵',
};

const categoryAccent = {
    cinema: 'from-amber-500/20 to-orange-600/20',
    drama: 'from-rose-500/20 to-pink-600/20',
    'tv-series': 'from-blue-500/20 to-indigo-600/20',
    music: 'from-emerald-500/20 to-teal-600/20',
};

function CategorySection({ category, posts }) {
    if (!posts || posts.length === 0) return null;

    const icon = categoryIcons[category.slug] || '🎥';
    const accentGradient = categoryAccent[category.slug] || 'from-primary/20 to-primary/10';

    return (
        <section className="mb-20">
            {/* Section header */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center text-2xl shadow-lg`}>
                        {icon}
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                            {category.name}
                        </h2>
                        <div className="w-12 h-0.5 bg-primary rounded-full mt-1" />
                    </div>
                </div>
                <Link
                    href={`/${category.slug}`}
                    className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary/60 hover:text-primary transition-colors duration-300"
                >
                    View All
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Grid for posts */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

export default function Home({ featuredPosts, categorySections }) {
    const posts = featuredPosts ?? [];
    const sections = categorySections ?? [];

    return (
        <AppLayout>
            {/* Hero Slider */}
            <HeroSlider posts={posts} />

            {/* Category-wise Content Sections */}
            {sections.length > 0 && (
                <div className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        {sections.map((section) => (
                            <CategorySection
                                key={section.category.id}
                                category={section.category}
                                posts={section.posts}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty state when no content at all */}
            {posts.length === 0 && sections.length === 0 && (
                <div className="py-24 max-w-7xl mx-auto px-6 text-center">
                    <p className="text-primary/40 text-sm uppercase tracking-widest">
                        No content yet — add posts in the admin panel
                    </p>
                </div>
            )}
        </AppLayout>
    );
}
