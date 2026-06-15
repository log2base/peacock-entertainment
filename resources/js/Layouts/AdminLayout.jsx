import { Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function AdminLayout({ children, title }) {
    const { flash, auth } = usePage().props
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const roleNavItems = [
        { href: '/admin/roles', label: 'Roles', icon: '🛡️' },
        { href: '/admin/permissions', label: 'Permissions', icon: '🔑' },
        { href: '/admin/users/roles', label: 'User Roles', icon: '👥' },
    ]

    const contentNavItems = [
        { href: '/admin/categories', label: 'Categories', icon: '📁' },
        { href: '/admin/posts', label: 'Posts', icon: '🎬' },
    ]

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [sidebarOpen])

    const NavSection = ({ label, items }) => (
        <div className="mt-6">
            <div className="mb-2 px-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">{label}</span>
            </div>
            {items.map((item) => {
                const isActive = window.location.pathname.startsWith(item.href)
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                            ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/10 text-indigo-300 shadow-sm shadow-indigo-500/5'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                        {isActive && (
                            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50" />
                        )}
                    </Link>
                )
            })}
        </div>
    )

    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
                            P
                        </div>
                        <span className="text-lg font-semibold text-white tracking-tight">Peacock</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
                        aria-label="Close menu"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 pb-24">
                    {/* <NavSection label="Role Management" items={roleNavItems} /> */}
                    <NavSection label="Content" items={contentNavItems} />
                </nav>

                {/* Back to home */}
                <div className="shrink-0 border-t border-white/10 p-4">
                    <Link
                        href="/"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-white/5 hover:text-white"
                    >
                        <span>←</span>
                        Back to Home
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="min-w-0 lg:ml-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-white/10 bg-slate-950/60 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
                            aria-label="Open menu"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="truncate text-base font-semibold text-white sm:text-lg">{title}</h1>
                    </div>
                    {auth?.user && (
                        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                            <div className="hidden text-right sm:block">
                                <div className="text-sm font-medium text-white">{auth.user.name}</div>
                                <div className="text-xs text-slate-500">
                                    {auth.user.roles?.[0] || 'No role'}
                                </div>
                                <div className="mt-1 flex justify-end gap-2">
                                    <Link
                                        href="/admin/profile"
                                        className="text-xs text-indigo-400 transition-colors hover:text-indigo-300"
                                    >
                                        Profile
                                    </Link>
                                    <span className="text-xs text-slate-600">•</span>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="text-xs text-red-400 transition-colors hover:text-red-300"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                                {auth.user.name?.charAt(0)}
                            </div>
                        </div>
                    )}
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mx-4 mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 backdrop-blur-sm sm:mx-6 lg:mx-8">
                        <span className="mr-2">✓</span>
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-4 mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur-sm sm:mx-6 lg:mx-8">
                        <span className="mr-2">✕</span>
                        {flash.error}
                    </div>
                )}

                {/* Page Content */}
                <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    )
}
