import { Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function UsersRoles({ users, roles, filters }) {
    const [search, setSearch] = useState(filters?.search || '')
    const [roleFilter, setRoleFilter] = useState(filters?.role || '')

    function handleSearch(e) {
        e.preventDefault()
        router.get('/admin/users/roles', { search, role: roleFilter }, { preserveState: true, replace: true })
    }

    function handleRoleFilter(val) {
        setRoleFilter(val)
        router.get('/admin/users/roles', { search, role: val }, { preserveState: true, replace: true })
    }

    function handleDelete(id, name) {
        if (confirm(`Are you sure you want to delete user "${name}"?`)) {
            router.delete(`/admin/users/${id}`)
        }
    }

    return (
        <AdminLayout title="User Roles">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">User Management</h2>
                    <p className="mt-1 text-sm text-slate-400">Manage users, their roles, and permissions</p>
                </div>
                <Link href="/admin/users/create" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98]">
                    <span className="text-lg">+</span> Create User
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50 backdrop-blur-sm" />
                    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </form>
                <select value={roleFilter} onChange={(e) => handleRoleFilter(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50 backdrop-blur-sm">
                    <option value="" className="bg-slate-900">All Roles</option>
                    {roles?.map((r) => <option key={r.id} value={r.name} className="bg-slate-900">{r.name}</option>)}
                </select>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">User</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Roles</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Direct Permissions</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.data?.map((user) => (
                            <tr key={user.id} className="group transition-colors hover:bg-white/[0.02]">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">{user.name?.charAt(0)}</div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {user.roles?.length > 0 ? user.roles.map((role) => (
                                            <span key={role.id} className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300 capitalize">{role.name}</span>
                                        )) : <span className="text-xs text-slate-600">No roles</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {user.permissions?.length > 0 ? user.permissions.slice(0, 3).map((p) => (
                                            <span key={p.id} className="rounded-lg bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">{p.name}</span>
                                        )) : <span className="text-xs text-slate-600">—</span>}
                                        {(user.permissions?.length || 0) > 3 && <span className="text-[11px] text-slate-500">+{user.permissions.length - 3}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/users/${user.id}/roles/edit`} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white">Manage</Link>
                                        <button onClick={() => handleDelete(user.id, user.name)} className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!users.data || users.data.length === 0) && (
                    <div className="flex flex-col items-center py-16">
                        <div className="mb-4 text-4xl">👥</div>
                        <h3 className="text-lg font-semibold text-white">No users found</h3>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {users.links && users.last_page > 1 && (
                <div className="mt-8 flex items-center justify-center gap-1">
                    {users.links.map((link, i) => (
                        <Link key={i} href={link.url || '#'} className={`rounded-lg px-3 py-1.5 text-sm font-medium ${link.active ? 'bg-indigo-500/20 text-indigo-300' : link.url ? 'text-slate-400 hover:bg-white/5' : 'cursor-not-allowed text-slate-600'}`} dangerouslySetInnerHTML={{ __html: link.label }} preserveState />
                    ))}
                </div>
            )}
        </AdminLayout>
    )
}
