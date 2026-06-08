import { Link, router } from '@inertiajs/react'
import { useState, useEffect, useRef } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'

const StarRating = ({ rating }) => {
    const pct = (rating / 10) * 100
    return (
        <span className="flex items-center gap-1.5">
            <span className="relative inline-block text-slate-700" style={{ fontSize: '14px', letterSpacing: '1px' }}>
                ★★★★★
                <span
                    className="absolute inset-0 overflow-hidden text-amber-400"
                    style={{ width: `${pct}%` }}
                >
                    ★★★★★
                </span>
            </span>
            <span className="text-xs text-slate-400">{rating}</span>
        </span>
    )
}

const FeaturedToggle = ({ post, featuredCount, onToggle, loading }) => {
    const canEnable = post.is_featured || featuredCount < 4
    return (
        <button
            onClick={() => onToggle(post)}
            disabled={loading || (!post.is_featured && !canEnable)}
            title={
                !post.is_featured && !canEnable
                    ? 'Max 4 featured posts reached'
                    : post.is_featured
                    ? 'Click to un-feature'
                    : 'Click to feature'
            }
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all focus:outline-none ${
                loading ? 'opacity-50 cursor-wait' :
                !post.is_featured && !canEnable ? 'opacity-40 cursor-not-allowed' :
                'cursor-pointer'
            } ${post.is_featured ? 'bg-amber-500' : 'bg-slate-600'}`}
        >
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                post.is_featured ? 'translate-x-[18px]' : 'translate-x-[3px]'
            }`} />
        </button>
    )
}

export default function PostsIndex({ posts, featuredCount, filters }) {
    const [deletingId, setDeletingId] = useState(null)
    const [togglingId, setTogglingId] = useState(null)
    const [currentFeaturedCount, setCurrentFeaturedCount] = useState(featuredCount)
    const [searchQuery, setSearchQuery] = useState(filters?.search || '')
    const searchTimeout = useRef(null)

    useEffect(() => {
        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current)
        }
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        if (searchTimeout.current) clearTimeout(searchTimeout.current)

        searchTimeout.current = setTimeout(() => {
            router.get('/admin/posts', { search: value }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            })
        }, 300)
    }

    function handleDelete(id, title) {
        if (confirm(`Delete "${title}"? This cannot be undone.`)) {
            setDeletingId(id)
            router.delete(`/admin/posts/${id}`, {
                onFinish: () => setDeletingId(null),
            })
        }
    }

    function handleToggleFeatured(post) {
        setTogglingId(post.id)
        router.post(`/admin/posts/${post.id}/toggle-featured`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setCurrentFeaturedCount(prev =>
                    post.is_featured ? prev - 1 : prev + 1
                )
            },
            onFinish: () => setTogglingId(null),
        })
    }

    return (
        <AdminLayout title="Posts">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">All Posts</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        {posts.total} post{posts.total !== 1 ? 's' : ''} &nbsp;·&nbsp;
                        <span className={`font-medium ${currentFeaturedCount >= 4 ? 'text-amber-400' : 'text-slate-400'}`}>
                            {currentFeaturedCount}/4 featured
                        </span>
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="block w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-3 text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                        />
                    </div>
                    <Link
                        href="/admin/posts/create"
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.98]"
                    >
                        <span className="text-lg leading-none">+</span>
                        Create Post
                    </Link>
                </div>
            </div>

            {/* Featured quota bar */}
            <div className="mb-6 flex items-center gap-3">
                <span className="text-xs text-slate-500">Featured slots</span>
                <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map(i => (
                        <div
                            key={i}
                            className={`h-2 w-12 rounded-full transition-colors ${
                                i < currentFeaturedCount ? 'bg-amber-400' : 'bg-white/10'
                            }`}
                        />
                    ))}
                </div>
                <span className="text-xs text-slate-500">{currentFeaturedCount}/4 used</span>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-white/[0.04] text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-4 py-4 font-medium">#</th>
                                <th className="px-4 py-4 font-medium">Image</th>
                                <th className="px-4 py-4 font-medium">Title</th>
                                <th className="px-4 py-4 font-medium">Category</th>
                                <th className="px-4 py-4 font-medium">Rating</th>
                                <th className="px-4 py-4 font-medium">Featured</th>
                                <th className="px-4 py-4 font-medium">Status</th>
                                <th className="px-4 py-4 font-medium">Date</th>
                                <th className="px-4 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {posts.data?.map((post) => (
                                <tr key={post.id} className="transition-colors hover:bg-white/[0.03]">
                                    <td className="px-4 py-3 text-xs text-slate-500">{post.id}</td>
                                    <td className="px-4 py-3">
                                        {post.image ? (
                                            <img
                                                src={`/storage/${post.image}`}
                                                alt={post.title}
                                                className="h-12 w-20 rounded-lg object-cover ring-1 ring-white/10"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-white/5 text-slate-600">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-white">{post.title}</div>
                                        {post.url && (
                                            <a href={post.url} target="_blank" rel="noopener noreferrer"
                                                className="mt-0.5 block max-w-[180px] truncate text-xs text-indigo-400 hover:text-indigo-300">
                                                {post.url}
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {post.category ? (
                                            <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
                                                {post.category.name}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-600">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StarRating rating={post.rating} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <FeaturedToggle
                                                post={post}
                                                featuredCount={currentFeaturedCount}
                                                onToggle={handleToggleFeatured}
                                                loading={togglingId === post.id}
                                            />
                                            {post.is_featured && (
                                                <span className="text-xs text-amber-400">★</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            post.status
                                                ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                                : 'border border-rose-500/20 bg-rose-500/10 text-rose-400'
                                        }`}>
                                            {post.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500">
                                        {new Date(post.created_at).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={`/admin/posts/${post.id}/edit`}
                                                className="text-indigo-400 transition-colors hover:text-indigo-300"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id, post.title)}
                                                disabled={deletingId === post.id}
                                                className="text-rose-400 transition-colors hover:text-rose-300 disabled:opacity-50"
                                            >
                                                {deletingId === post.id ? '…' : 'Delete'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty state */}
            {(!posts.data || posts.data.length === 0) && (
                <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-16">
                    <div className="mb-4 text-4xl">🎬</div>
                    <h3 className="text-lg font-semibold text-white">No posts yet</h3>
                    <p className="mt-1 text-sm text-slate-500">Create your first post to get started</p>
                </div>
            )}

            {/* Pagination */}
            {posts.last_page > 1 && (
                <div className="mt-8 flex items-center justify-center gap-1">
                    {posts.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                                link.active
                                    ? 'bg-indigo-500/20 text-indigo-300'
                                    : link.url
                                        ? 'text-slate-400 hover:bg-white/5 hover:text-white'
                                        : 'cursor-not-allowed text-slate-600'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveScroll
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    )
}
