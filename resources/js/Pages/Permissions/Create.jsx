import { useForm, Link } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function PermissionsCreate({ groups }) {
    const { data, setData, post, processing, errors } = useForm({ name: '' })

    function submit(e) {
        e.preventDefault()
        post('/admin/permissions')
    }

    return (
        <AdminLayout title="Create Permission">
            <Link href="/admin/permissions" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">← Back to Permissions</Link>
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
                <h2 className="mb-1 text-2xl font-bold text-white">Create New Permission</h2>
                <p className="mb-8 text-sm text-slate-400">Use dot notation like <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">module.action</code></p>
                <form onSubmit={submit}>
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-slate-300">Permission Name <span className="text-red-400">*</span></label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g., user.create" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50" />
                        {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                    </div>
                    {groups?.length > 0 && (
                        <div className="mb-8">
                            <label className="mb-2 block text-xs font-medium text-slate-500">Existing Groups (click to use as prefix)</label>
                            <div className="flex flex-wrap gap-2">
                                {groups.map((g) => (
                                    <button key={g} type="button" onClick={() => setData('name', g + '.')} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-white/10 hover:text-white capitalize">{g}</button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex gap-3 border-t border-white/5 pt-6">
                        <button type="submit" disabled={processing} className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98] disabled:opacity-50">{processing ? 'Creating...' : 'Create Permission'}</button>
                        <Link href="/admin/permissions" className="rounded-xl bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white">Cancel</Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
