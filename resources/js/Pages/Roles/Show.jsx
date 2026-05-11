import { Link } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function RolesShow({ role }) {
    return (
        <AdminLayout title="Role Details">
            <Link href="/admin/roles" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">← Back to Roles</Link>
            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white capitalize">{role.name}</h2>
                            <p className="mt-1 text-sm text-slate-400">{role.permissions?.length || 0} permissions assigned</p>
                        </div>
                        <Link href={`/admin/roles/${role.id}/edit`} className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98]">Edit Role</Link>
                    </div>

                    {/* Permissions */}
                    <div className="mb-8">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">Assigned Permissions</h3>
                        {role.permissions?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {role.permissions.map((perm) => (
                                    <span key={perm.id} className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">{perm.name}</span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">No permissions assigned to this role.</p>
                        )}
                    </div>

                    {/* Users with this role */}
                    {role.users && (
                        <div>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">Users with this Role ({role.users.length})</h3>
                            {role.users.length > 0 ? (
                                <div className="space-y-2">
                                    {role.users.map((user) => (
                                        <div key={user.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">{user.name?.charAt(0)}</div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500">No users assigned to this role.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
