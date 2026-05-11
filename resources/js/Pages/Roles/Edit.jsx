import { useForm, Link } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function RolesEdit({ role, permissions, groupedPermissions, rolePermissions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: rolePermissions || [],
    })

    function togglePerm(name) {
        setData('permissions', data.permissions.includes(name)
            ? data.permissions.filter((p) => p !== name)
            : [...data.permissions, name]
        )
    }

    function toggleGroup(perms) {
        const names = perms.map((p) => p.name)
        const all = names.every((n) => data.permissions.includes(n))
        setData('permissions', all
            ? data.permissions.filter((p) => !names.includes(p))
            : [...new Set([...data.permissions, ...names])]
        )
    }

    function toggleAll() {
        setData('permissions', data.permissions.length === permissions.length ? [] : permissions.map((p) => p.name))
    }

    function submit(e) {
        e.preventDefault()
        put(`/admin/roles/${role.id}`)
    }

    return (
        <AdminLayout title="Edit Role">
            <Link href="/admin/roles" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">← Back to Roles</Link>
            <div className="mx-auto max-w-4xl rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
                <h2 className="mb-1 text-2xl font-bold text-white">Edit Role: <span className="text-indigo-400 capitalize">{role.name}</span></h2>
                <p className="mb-8 text-sm text-slate-400">Update role name and permissions</p>
                <form onSubmit={submit}>
                    <div className="mb-8">
                        <label className="mb-2 block text-sm font-medium text-slate-300">Role Name <span className="text-red-400">*</span></label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50" />
                        {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                    </div>
                    <div className="mb-8">
                        <div className="mb-4 flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-300">Permissions</label>
                            <button type="button" onClick={toggleAll} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-indigo-300 hover:bg-white/10">{data.permissions.length === permissions.length ? 'Deselect All' : 'Select All'}</button>
                        </div>
                        <div className="space-y-6">
                            {Object.entries(groupedPermissions).map(([group, perms]) => {
                                const names = perms.map((p) => p.name)
                                const allSel = names.every((n) => data.permissions.includes(n))
                                const someSel = names.some((n) => data.permissions.includes(n))
                                return (
                                    <div key={group} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                                        <div className="mb-3 flex items-center gap-3">
                                            <button type="button" onClick={() => toggleGroup(perms)} className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${allSel ? 'border-indigo-500 bg-indigo-500 text-white' : someSel ? 'border-indigo-500/50 bg-indigo-500/30 text-white' : 'border-white/20'}`}>
                                                {(allSel || someSel) && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d={allSel ? "M5 13l4 4L19 7" : "M20 12H4"} /></svg>}
                                            </button>
                                            <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">{group}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                            {perms.map((perm) => (
                                                <label key={perm.id} className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 transition-all ${data.permissions.includes(perm.name) ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-400 hover:bg-white/5'}`}>
                                                    <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${data.permissions.includes(perm.name) ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'}`}>
                                                        {data.permissions.includes(perm.name) && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                                    </div>
                                                    <span className="text-xs font-medium">{perm.action}</span>
                                                    <input type="checkbox" checked={data.permissions.includes(perm.name)} onChange={() => togglePerm(perm.name)} className="sr-only" />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex gap-3 border-t border-white/5 pt-6">
                        <button type="submit" disabled={processing} className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98] disabled:opacity-50">{processing ? 'Saving...' : 'Update Role'}</button>
                        <Link href="/admin/roles" className="rounded-xl bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white">Cancel</Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
