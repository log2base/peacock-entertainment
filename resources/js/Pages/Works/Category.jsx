import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

function PostCard({ post }) {
    const Card = post.url ? 'a' : 'div';
    const cardProps = post.url
        ? { href: post.url, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        <Card
            {...cardProps}
            className="group cursor-pointer block"
        >
            {/* Poster */}
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-5 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2 border border-white/5 group-hover:border-primary/30">
                {post.image ? (
                    <img
                        src={`/storage/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/20">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c101b] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Play button */}
                {post.url && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,195,0,0.5)]">
                            <svg className="w-7 h-7 text-secondary ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <span className="bg-primary text-secondary text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-lg">
                        ★ {post.rating}
                    </span>
                    {post.is_featured && (
                        <span className="bg-amber-400/90 text-slate-900 text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-lg">
                            Featured
                        </span>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="space-y-1.5 text-center lg:text-left">
                <h3 className="font-bold text-lg uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                </h3>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-xs font-bold uppercase tracking-widest text-white/40">
                    <span>{new Date(post.created_at).getFullYear()}</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span>{post.rating}/10</span>
                </div>
            </div>
        </Card>
    );
}

function Pagination({ links, lastPage }) {
    if (!links || lastPage <= 1) return null;
    return (
        <div className="mt-16 flex items-center justify-center gap-2 flex-wrap">
            {links.map((link, index) => {
                if (!link.url && link.label === '...') {
                    return <span key={index} className="px-3 py-2 text-white/30 text-sm">…</span>;
                }
                return (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        preserveScroll
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            link.active
                                ? 'bg-primary text-secondary shadow-lg shadow-primary/25'
                                : link.url
                                    ? 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                                    : 'cursor-not-allowed text-white/20 bg-white/[0.02]'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}

export default function Category({ category, posts }) {
    const hasPosts = posts?.data && posts.data.length > 0;

    return (
        <AppLayout>
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="mb-20 text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            Our <span className="text-primary italic">{category?.name || 'Works'}</span>
                        </h1>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                        {posts?.total > 0 && (
                            <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
                                {posts.total} {posts.total === 1 ? 'title' : 'titles'}
                            </p>
                        )}
                    </div>

                    {/* Grid */}
                    {hasPosts ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                                {posts.data.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                            <Pagination links={posts.links} lastPage={posts.last_page} />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-3xl">
                                🎬
                            </div>
                            <p className="text-white/40 text-lg font-medium">No titles available yet</p>
                            <p className="text-white/20 text-sm mt-2">Check back soon for new content</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
