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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c101b] via-[#0c101b]/80 to-transparent" />
                <div className="relative z-10 text-center space-y-4">
                    <div className="text-6xl mb-4">🎬</div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                        Welcome to <span className="text-primary italic">Peacock</span>
                    </h1>
                    <p className="text-white/40 text-lg">Feature your posts to see them here</p>
                </div>
            </section>
        );
    }

    const current = posts[active];
    const imageUrl = getImageUrl(current);

    return (
        <section className="relative h-[600px] md:h-[800px] overflow-hidden">
            {/* Background blur */}
            <div className="absolute inset-0 z-0">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Background"
                        className="w-full h-full object-cover blur-3xl opacity-30 scale-110 transition-all duration-1000"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c101b] via-[#0c101b]/80 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 h-full flex items-center relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
                    {/* Poster */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative group perspective-1000">
                            <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/30 transition-all duration-700" />
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={current.title}
                                    className="relative w-72 md:w-96 aspect-[2/3] object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                                />
                            ) : (
                                <div className="relative w-72 md:w-80 aspect-[2/3] rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                    <svg className="w-20 h-20 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            {current.category && (
                                <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm border border-primary/30 px-3 py-1 rounded-full">
                                    {current.category.name}
                                </span>
                            )}
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                {current.title}
                            </h1>
                            <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-400 font-bold uppercase tracking-widest text-sm">
                                <span className="text-primary">★ {current.rating}/10</span>
                                <span>•</span>
                                <span>{new Date(current.created_at).getFullYear()}</span>
                                <span>•</span>
                                <span className="border border-gray-700 px-2 py-0.5 rounded text-xs">HD</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            {current.url ? (
                                <a
                                    href={current.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-primary text-secondary px-10 py-5 rounded-2xl font-black text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,195,0,0.4)]"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                                        </svg>
                                        WATCH NOW
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </a>
                            ) : (
                                <button className="group relative bg-primary text-secondary px-10 py-5 rounded-2xl font-black text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,195,0,0.4)]">
                                    <span className="relative z-10 flex items-center gap-3">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                                        </svg>
                                        WATCH NOW
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                            )}
                        </div>

                        {/* Thumbnail nav */}
                        <div className="hidden lg:flex gap-4 pt-8">
                            {posts.map((post, idx) => {
                                const thumb = getImageUrl(post);
                                return (
                                    <button
                                        key={post.id}
                                        onClick={() => setActive(idx)}
                                        className={`relative w-20 h-28 rounded-lg overflow-hidden transition-all duration-300 ${
                                            active === idx
                                                ? 'ring-2 ring-primary scale-110 -translate-y-2.5'
                                                : 'opacity-40 hover:opacity-100'
                                        }`}
                                    >
                                        {thumb ? (
                                            <img src={thumb} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/30 text-xs font-bold">
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
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            active === idx ? 'w-8 bg-primary' : 'w-1.5 bg-white/30 hover:bg-white/50'
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
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-5 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2 border border-white/5">
                {imageUrl ? (
                    <img src={imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/20">
                        <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,195,0,0.5)]">
                        <svg className="w-7 h-7 text-secondary ml-1" fill="currentColor" viewBox="0 0 20 20">
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
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                    {post.category && <span className="text-primary/70">{post.category.name}</span>}
                    {post.category && <span className="w-1 h-1 bg-gray-700 rounded-full" />}
                    <span>{new Date(post.created_at).getFullYear()}</span>
                </div>
            </div>
        </Wrapper>
    );
}

export default function Home({ featuredPosts }) {
    const posts = featuredPosts ?? [];

    return (
        <AppLayout>
            {/* Hero Slider */}
            <HeroSlider posts={posts} />

            {/* Featured Posts Grid */}
            {posts.length > 0 && (
                <div className="py-24">
                    <section className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center gap-8 mb-16">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/20" />
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-center whitespace-nowrap">
                                Featured <span className="text-primary italic">Tonight</span>
                            </h2>
                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/20" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>
                </div>
            )}

            {/* Empty state for no featured posts */}
            {posts.length === 0 && (
                <div className="py-24 max-w-7xl mx-auto px-6 text-center">
                    <p className="text-white/20 text-sm uppercase tracking-widest">
                        No featured content yet — mark posts as featured in the admin panel
                    </p>
                </div>
            )}
        </AppLayout>
    );
}
