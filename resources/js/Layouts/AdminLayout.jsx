import { Link, usePage } from '@inertiajs/react'

export default function AdminLayout({ children, title }) {
    const { flash, auth } = usePage().props

    const roleNavItems = [
        { href: '/admin/roles', label: 'Roles', icon: '🛡️' },
        { href: '/admin/permissions', label: 'Permissions', icon: '🔑' },
        { href: '/admin/users/roles', label: 'User Roles', icon: '👥' },
    ]

    const contentNavItems = [
        { href: '/admin/categories', label: 'Categories', icon: '📁' },
        { href: '/admin/posts', label: 'Posts', icon: '🎬' },
    ]

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
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                            isActive
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 z-40 h-screen w-64 border-r border-white/5 bg-slate-950/80 backdrop-blur-xl">
                {/* Logo */}
                <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
                        P
                    </div>
                    <span className="text-lg font-semibold text-white tracking-tight">Peacock</span>
                </div>

                {/* Navigation */}
                <nav className="px-3 overflow-y-auto">
                    <NavSection label="Role Management" items={roleNavItems} />
                    <NavSection label="Content" items={contentNavItems} />
                </nav>

                {/* Back to home */}
                <div className="absolute bottom-0 w-full border-t border-white/5 p-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-white/5 hover:text-white"
                    >
                        <span>←</span>
                        Back to Home
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-slate-950/60 px-8 backdrop-blur-xl">
                    <h1 className="text-lg font-semibold text-white">{title}</h1>
                    {auth?.user && (
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-sm font-medium text-white">{auth.user.name}</div>
                                <div className="text-xs text-slate-500">
                                    {auth.user.roles?.[0] || 'No role'}
                                </div>
                                <Link 
                                    href="/logout" 
                                    method="post" 
                                    as="button"
                                    className="mt-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                                >
                                    Log Out
                                </Link>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                                {auth.user.name?.charAt(0)}
                            </div>
                        </div>
                    )}
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mx-8 mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 backdrop-blur-sm">
                        <span className="mr-2">✓</span>
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-8 mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur-sm">
                        <span className="mr-2">✕</span>
                        {flash.error}
                    </div>
                )}

                {/* Page Content */}
                <div className="p-8">{children}</div>
            </main>
        </div>
    )
}
