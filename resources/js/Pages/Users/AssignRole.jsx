import { useForm, Link } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function AssignRole({ user, roles, permissions, userRoles, userDirectPermissions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
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
        <AdminLayout title="Edit User Profile & Roles">
            <Link href="/admin/users/roles" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-primary">← Back to User Roles</Link>
            <div className="mx-auto max-w-4xl">
                <form onSubmit={submit}>
                    {/* Profile Information */}
                    <div className="mb-6 rounded-2xl border border-primary/10 bg-primary/[0.03] p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-lg font-semibold text-primary">Profile Information</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-primary/20 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none ring-indigo-500/50 transition-all focus:border-indigo-500/50 focus:bg-slate-800/70 focus:ring-2 backdrop-blur-sm"
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-primary/20 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none ring-indigo-500/50 transition-all focus:border-indigo-500/50 focus:bg-slate-800/70 focus:ring-2 backdrop-blur-sm"
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-300">New Password (leave blank to keep current)</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-xl border border-primary/20 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none ring-indigo-500/50 transition-all focus:border-indigo-500/50 focus:bg-slate-800/70 focus:ring-2 backdrop-blur-sm"
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                            </div>
                        </div>
                    </div>
                    {/* Roles Selection */}
                    <div className="mb-6 rounded-2xl border border-primary/10 bg-primary/[0.03] p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-lg font-semibold text-primary">Roles</h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {roles.map((role) => (
                                <label key={role.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${data.roles.includes(role.name) ? 'border-indigo-500/30 bg-indigo-500/10' : 'border-primary/10 bg-primary/[0.02] hover:border-primary/20 hover:bg-primary/[0.04]'}`}>
                                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${data.roles.includes(role.name) ? 'border-indigo-500 bg-indigo-500' : 'border-primary/30'}`}>
                                        {data.roles.includes(role.name) && <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-primary capitalize">{role.name}</div>
                                        <div className="text-[11px] text-slate-500">{role.permissions?.length || 0} perms</div>
                                    </div>
                                    <input type="checkbox" checked={data.roles.includes(role.name)} onChange={() => toggleRole(role.name)} className="sr-only" />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Direct Permissions */}
                    <div className="mb-6 rounded-2xl border border-primary/10 bg-primary/[0.03] p-6 backdrop-blur-sm">
                        <h3 className="mb-1 text-lg font-semibold text-primary">Direct Permissions</h3>
                        <p className="mb-4 text-xs text-slate-500">These are in addition to permissions inherited from roles</p>
                        <div className="space-y-4">
                            {Object.entries(grouped).sort().map(([group, perms]) => (
                                <div key={group}>
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{group}</div>
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                        {perms.map((perm) => (
                                            <label key={perm.id} className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 transition-all ${data.permissions.includes(perm.name) ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-400 hover:bg-primary/5'}`}>
                                                <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${data.permissions.includes(perm.name) ? 'border-indigo-500 bg-indigo-500' : 'border-primary/30'}`}>
                                                    {data.permissions.includes(perm.name) && <svg className="h-2.5 w-2.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
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
                        <button type="submit" disabled={processing} className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98] disabled:opacity-50">{processing ? 'Saving...' : 'Save Changes'}</button>
                        <Link href="/admin/users/roles" className="rounded-xl bg-primary/5 px-6 py-2.5 text-sm font-medium text-slate-400 hover:bg-primary/10 hover:text-primary">Cancel</Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
