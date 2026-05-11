import { useForm, Link } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function AssignRole({ user, roles, permissions, userRoles, userDirectPermissions }) {
    const { data, setData, put, processing } = useForm({
        roles: userRoles || [],
        permissions: userDirectPermissions || [],
    })

    function toggleRole(name) {
        setData('roles', data.roles.includes(name)
            ? data.roles.filter((r) => r !== name)
            : [...data.roles, name]
        )
    }

    function togglePerm(name) {
        setData('permissions', data.permissions.includes(name)
            ? data.permissions.filter((p) => p !== name)
            : [...data.permissions, name]
        )
    }

    function submit(e) {
        e.preventDefault()
        put(`/admin/users/${user.id}/roles`)
    }

    // Group permissions by prefix
    const grouped = {}
    permissions.forEach((p) => {
        const g = p.name.split('.')[0] || 'general'
        if (!grouped[g]) grouped[g] = []
        grouped[g].push(p)
    })

    return (
        <AdminLayout title="Assign Roles & Permissions">
            <Link href="/admin/users/roles" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">← Back to User Roles</Link>
            <div className="mx-auto max-w-4xl">
                {/* User Info Card */}
                <div className="mb-6 flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/25">{user.name?.charAt(0)}</div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{user.name}</h2>
                        <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                </div>

                <form onSubmit={submit}>
                    {/* Roles Selection */}
                    <div className="mb-6 rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-lg font-semibold text-white">Roles</h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {roles.map((role) => (
                                <label key={role.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${data.roles.includes(role.name) ? 'border-indigo-500/30 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'}`}>
                                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${data.roles.includes(role.name) ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'}`}>
                                        {data.roles.includes(role.name) && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white capitalize">{role.name}</div>
                                        <div className="text-[11px] text-slate-500">{role.permissions?.length || 0} perms</div>
                                    </div>
                                    <input type="checkbox" checked={data.roles.includes(role.name)} onChange={() => toggleRole(role.name)} className="sr-only" />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Direct Permissions */}
                    <div className="mb-6 rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm">
                        <h3 className="mb-1 text-lg font-semibold text-white">Direct Permissions</h3>
                        <p className="mb-4 text-xs text-slate-500">These are in addition to permissions inherited from roles</p>
                        <div className="space-y-4">
                            {Object.entries(grouped).sort().map(([group, perms]) => (
                                <div key={group}>
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{group}</div>
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                        {perms.map((perm) => (
                                            <label key={perm.id} className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 transition-all ${data.permissions.includes(perm.name) ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-400 hover:bg-white/5'}`}>
                                                <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${data.permissions.includes(perm.name) ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'}`}>
                                                    {data.permissions.includes(perm.name) && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                                </div>
                                                <span className="text-xs font-medium">{perm.name.split('.')[1] || perm.name}</span>
                                                <input type="checkbox" checked={data.permissions.includes(perm.name)} onChange={() => togglePerm(perm.name)} className="sr-only" />
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3">
                        <button type="submit" disabled={processing} className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98] disabled:opacity-50">{processing ? 'Saving...' : 'Save Changes'}</button>
                        <Link href="/admin/users/roles" className="rounded-xl bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white">Cancel</Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
