import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Link } from '@inertiajs/react';

function PostCard({ post }) {
    const Wrapper = post.url ? 'a' : 'div';
    const wrapperProps = post.url
        ? { href: post.url, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        <Wrapper {...wrapperProps} className="group cursor-pointer block">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-5 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2 border border-gray-200 group-hover:border-primary/30">
                {post.image ? (
                    <img
                        src={`/storage/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-900/40">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                {post.url && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300">
                            <svg className="w-7 h-7 text-white ml-1 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4.5 3.5v13l11-6.5-11-6.5z" />
                            </svg>
                        </div>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <span className="bg-primary text-secondary text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-lg">
                        ★ {post.rating}
                    </span>
                </div>
            </div>
            <div className="space-y-1.5 text-center lg:text-left">
                <h3 className="font-bold text-lg uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                </h3>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-xs font-bold uppercase tracking-widest text-gray-900/60">
                    <span>{post.rating}/10</span>
                </div>
            </div>
        </Wrapper>
    );
}

function Pagination({ links, lastPage }) {
    if (!links || lastPage <= 1) return null;
    return (
        <div className="mt-16 flex items-center justify-center gap-2 flex-wrap">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    preserveScroll
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${link.active
                            ? 'bg-primary text-secondary shadow-lg shadow-primary/25'
                            : link.url
                                ? 'bg-gray-100 text-gray-900/80 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'
                                : 'cursor-not-allowed text-gray-900/40 bg-white/[0.02]'
                        }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export default function Music({ category, posts }) {
    const hasPosts = posts?.data && posts.data.length > 0;
    return (
        <AppLayout>
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20 text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            Music <span className="text-primary italic">Videos</span>
                        </h1>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                        {posts?.total > 0 && (
                            <p className="text-gray-900/60 text-sm font-medium uppercase tracking-widest">
                                {posts.total} {posts.total === 1 ? 'title' : 'titles'}
                            </p>
                        )}
                    </div>
                    {hasPosts ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                                {posts.data.map((post) => <PostCard key={post.id} post={post} />)}
                            </div>
                            <Pagination links={posts.links} lastPage={posts.last_page} />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6 text-3xl">🎵</div>
                            <p className="text-gray-900/60 text-lg font-medium">No music videos available yet</p>
                            <p className="text-gray-900/40 text-sm mt-2">Check back soon for new content</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
