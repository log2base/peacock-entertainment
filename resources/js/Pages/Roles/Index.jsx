import { Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function RolesIndex({ roles, filters }) {
    const [search, setSearch] = useState(filters?.search || '')

    function handleSearch(e) {
        e.preventDefault()
        router.get('/admin/roles', { search }, { preserveState: true, replace: true })
    }

    function handleDelete(roleId, roleName) {
        if (confirm(`Are you sure you want to delete the role "${roleName}"?`)) {
            router.delete(`/admin/roles/${roleId}`)
        }
    }

    return (
        <AdminLayout title="Roles">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-primary">All Roles</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Manage roles and their associated permissions
                    </p>
                </div>
                <Link
                    href="/admin/roles/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.98]"
                >
                    <span className="text-lg">+</span>
                    Create Role
                </Link>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="mb-6">
                <div className="relative max-w-md">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search roles..."
                        className="w-full rounded-xl border border-primary/20 bg-primary/5 py-2.5 pl-10 pr-4 text-sm text-primary placeholder-slate-500 outline-none ring-indigo-500/50 transition-all focus:border-indigo-500/50 focus:bg-primary/[0.07] focus:ring-2 backdrop-blur-sm"
                    />
                    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </form>

            {/* Roles Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {roles.data?.map((role) => (
                    <div
                        key={role.id}
                        className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-primary/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/20 hover:bg-primary/[0.06] hover:shadow-xl hover:shadow-indigo-500/5"
                    >
                        {/* Glow effect */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
                        </div>

                        <div className="relative">
                            {/* Role name & badge */}
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-primary capitalize">
                                        {role.name}
                                    </h3>
                                    <span className="mt-1 inline-block rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300">
                                        {role.permissions?.length || 0} permissions
                                    </span>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-lg">
                                    🛡️
                                </div>
                            </div>

                            {/* Permission pills */}
                            <div className="mb-5 flex flex-wrap gap-1.5">
                                {role.permissions?.slice(0, 4).map((perm) => (
                                    <span
                                        key={perm.id}
                                        className="rounded-lg bg-primary/5 px-2 py-1 text-[11px] text-slate-400"
                                    >
                                        {perm.name}
                                    </span>
                                ))}
                                {(role.permissions?.length || 0) > 4 && (
                                    <span className="rounded-lg bg-primary/5 px-2 py-1 text-[11px] text-slate-500">
                                        +{role.permissions.length - 4} more
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 border-t border-primary/10 pt-4">
                                <Link
                                    href={`/admin/roles/${role.id}`}
                                    className="rounded-lg bg-primary/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-primary/10 hover:text-primary"
                                >
                                    View
                                </Link>
                                <Link
                                    href={`/admin/roles/${role.id}/edit`}
                                    className="rounded-lg bg-primary/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-primary/10 hover:text-primary"
                                >
                                    Edit
                                </Link>
                                {role.name !== 'super-admin' && (
                                    <button
                                        onClick={() => handleDelete(role.id, role.name)}
                                        className="ml-auto rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {(!roles.data || roles.data.length === 0) && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 py-16">
                    <div className="mb-4 text-4xl">🛡️</div>
                    <h3 className="text-lg font-semibold text-primary">No roles found</h3>
                    <p className="mt-1 text-sm text-slate-500">Create your first role to get started</p>
                </div>
            )}

            {/* Pagination */}
            {roles.links && roles.last_page > 1 && (
                <div className="mt-8 flex items-center justify-center gap-1">
                    {roles.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                                link.active
                                    ? 'bg-indigo-500/20 text-indigo-300'
                                    : link.url
                                        ? 'text-slate-400 hover:bg-primary/5 hover:text-primary'
                                        : 'cursor-not-allowed text-slate-600'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveState
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    )
}
