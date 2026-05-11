import { useForm, Link } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function UserCreate({ roles }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        roles: [],
    })

    function toggleRole(name) {
        setData('roles', data.roles.includes(name)
            ? data.roles.filter((r) => r !== name)
            : [...data.roles, name]
        )
    }

    function submit(e) {
        e.preventDefault()
        post('/admin/users')
    }

    return (
        <AdminLayout title="Create User">
            <Link href="/admin/users/roles" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">← Back to Users</Link>
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
                <h2 className="mb-1 text-2xl font-bold text-white">Create New User</h2>
                <p className="mb-8 text-sm text-slate-400">Add a new user and assign them roles directly.</p>
                <form onSubmit={submit}>
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-slate-300">Name <span className="text-red-400">*</span></label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required placeholder="e.g., John Doe" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50" />
                        {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                    </div>
                    
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-slate-300">Email Address <span className="text-red-400">*</span></label>
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required placeholder="john@example.com" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50" />
                        {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                    </div>

                    <div className="mb-8">
                        <label className="mb-2 block text-sm font-medium text-slate-300">Password <span className="text-red-400">*</span></label>
                        <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50" />
                        {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                    </div>

                    <div className="mb-8">
                        <label className="mb-4 block text-sm font-medium text-slate-300">Assign Roles (Optional)</label>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {roles.map((role) => (
                                <label key={role.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${data.roles.includes(role.name) ? 'border-indigo-500/30 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'}`}>
                                    <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-all ${data.roles.includes(role.name) ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'}`}>
                                        {data.roles.includes(role.name) && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <div className="text-sm font-medium text-white capitalize">{role.name}</div>
                                    <input type="checkbox" checked={data.roles.includes(role.name)} onChange={() => toggleRole(role.name)} className="sr-only" />
                                </label>
                            ))}
                        </div>
                        {errors.roles && <p className="mt-2 text-sm text-red-400">{errors.roles}</p>}
                    </div>

                    <div className="flex gap-3 border-t border-white/5 pt-6">
                        <button type="submit" disabled={processing} className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98] disabled:opacity-50">{processing ? 'Creating...' : 'Create User'}</button>
                        <Link href="/admin/users/roles" className="rounded-xl bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white">Cancel</Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
