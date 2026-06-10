import { useForm, Link } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function PermissionsEdit({ permission, groups }) {
    const { data, setData, put, processing, errors } = useForm({ name: permission.name })

    function submit(e) {
        e.preventDefault()
        put(`/admin/permissions/${permission.id}`)
    }

    return (
        <AdminLayout title="Edit Permission">
            <Link href="/admin/permissions" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-primary">← Back to Permissions</Link>
            <div className="mx-auto max-w-2xl rounded-2xl border border-primary/10 bg-primary/[0.03] p-8 backdrop-blur-sm">
                <h2 className="mb-1 text-2xl font-bold text-primary">Edit Permission</h2>
                <p className="mb-8 text-sm text-slate-400">Update the permission name</p>
                <form onSubmit={submit}>
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-slate-300">Permission Name <span className="text-red-400">*</span></label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm text-primary placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 ring-indigo-500/50" />
                        {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                    </div>
                    {groups?.length > 0 && (
                        <div className="mb-8">
                            <label className="mb-2 block text-xs font-medium text-slate-500">Existing Groups</label>
                            <div className="flex flex-wrap gap-2">
                                {groups.map((g) => (
                                    <button key={g} type="button" onClick={() => setData('name', g + '.')} className="rounded-lg bg-primary/5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-primary/10 hover:text-primary capitalize">{g}</button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex gap-3 border-t border-primary/10 pt-6">
                        <button type="submit" disabled={processing} className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98] disabled:opacity-50">{processing ? 'Saving...' : 'Update Permission'}</button>
                        <Link href="/admin/permissions" className="rounded-xl bg-primary/5 px-6 py-2.5 text-sm font-medium text-slate-400 hover:bg-primary/10 hover:text-primary">Cancel</Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
