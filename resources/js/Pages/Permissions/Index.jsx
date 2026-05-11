import { Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function PermissionsIndex({ permissions, groups, filters }) {
    const [search, setSearch] = useState(filters?.search || '')
    const [group, setGroup] = useState(filters?.group || '')

    function handleSearch(e) {
        e.preventDefault()
        router.get('/admin/permissions', { search, group }, { preserveState: true, replace: true })
    }

    function handleGroupChange(val) {
        setGroup(val)
        router.get('/admin/permissions', { search, group: val }, { preserveState: true, replace: true })
    }

    function handleDelete(id, name) {
        if (confirm(`Delete permission "${name}"?`)) {
            router.delete(`/admin/permissions/${id}`)
        }
    }

    return (
        <AdminLayout title="Permissions">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">All Permissions</h2>
                    <p className="mt-1 text-sm text-slate-400">Manage granular access permissions</p>
                </div>
                <Link href="/admin/permissions/create" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98]">
                    <span className="text-lg">+</span> Create Permission
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search permissions..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50 backdrop-blur-sm" />
                    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </form>
                <select value={group} onChange={(e) => handleGroupChange(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50 backdrop-blur-sm">
                    <option value="" className="bg-slate-900">All Groups</option>
                    {groups?.map((g) => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
                </select>
            </div>

            {/* Permissions Table */}
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Permission</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Group</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Action</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {permissions.data?.map((perm) => {
                            const parts = perm.name.split('.')
                            return (
                                <tr key={perm.id} className="group transition-colors hover:bg-white/[0.02]">
                                    <td className="px-6 py-4">
                                        <span className="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300">{perm.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400 capitalize">{parts[0]}</td>
                                    <td className="px-6 py-4 text-sm text-slate-400">{parts[1] || '-'}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/permissions/${perm.id}/edit`} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white">Edit</Link>
                                            <button onClick={() => handleDelete(perm.id, perm.name)} className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {(!permissions.data || permissions.data.length === 0) && (
                    <div className="flex flex-col items-center py-16">
                        <div className="mb-4 text-4xl">🔑</div>
                        <h3 className="text-lg font-semibold text-white">No permissions found</h3>
                        <p className="mt-1 text-sm text-slate-500">Create permissions to define granular access</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {permissions.links && permissions.last_page > 1 && (
                <div className="mt-8 flex items-center justify-center gap-1">
                    {permissions.links.map((link, i) => (
                        <Link key={i} href={link.url || '#'} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${link.active ? 'bg-indigo-500/20 text-indigo-300' : link.url ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'cursor-not-allowed text-slate-600'}`} dangerouslySetInnerHTML={{ __html: link.label }} preserveState />
                    ))}
                </div>
            )}
        </AdminLayout>
    )
}
