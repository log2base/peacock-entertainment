import { useForm, Head } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function Profile({ user }) {
    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
    })

    const passwordForm = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    })

    function handleProfileSubmit(e) {
        e.preventDefault()
        profileForm.put('/admin/profile', {
            preserveScroll: true,
            onSuccess: () => profileForm.clearErrors(),
        })
    }

    function handlePasswordSubmit(e) {
        e.preventDefault()
        passwordForm.put('/admin/password', {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset('current_password', 'new_password', 'new_password_confirmation')
            },
        })
    }

    return (
        <AdminLayout title="Profile Settings">
            <Head title="Profile Settings" />

            <div className="mx-auto max-w-4xl space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow-lg shadow-indigo-500/25">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Account Profile</h2>
                        <p className="mt-1 text-sm text-slate-400">Manage your profile details and security settings</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Profile Information */}
                    <div className="rounded-2xl border border-primary/20 bg-primary/[0.02] p-6 backdrop-blur-sm sm:p-8">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                            <p className="text-xs text-slate-400">Update your account name and email address.</p>
                        </div>

                        <form onSubmit={handleProfileSubmit} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData('name', e.target.value)}
                                    required
                                    className={`w-full rounded-xl border bg-primary/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:bg-primary/[0.07] focus:ring-2 ${
                                        profileForm.errors.name
                                            ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20'
                                            : 'border-primary/20 focus:border-indigo-500/50 focus:ring-indigo-500/20'
                                    }`}
                                />
                                {profileForm.errors.name && (
                                    <p className="mt-2 text-sm text-rose-400">{profileForm.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={(e) => profileForm.setData('email', e.target.value)}
                                    required
                                    className={`w-full rounded-xl border bg-primary/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:bg-primary/[0.07] focus:ring-2 ${
                                        profileForm.errors.email
                                            ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20'
                                            : 'border-primary/20 focus:border-indigo-500/50 focus:ring-indigo-500/20'
                                    }`}
                                />
                                {profileForm.errors.email && (
                                    <p className="mt-2 text-sm text-rose-400">{profileForm.errors.email}</p>
                                )}
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {profileForm.processing ? 'Saving...' : 'Save Profile'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Update Password */}
                    <div className="rounded-2xl border border-primary/20 bg-primary/[0.02] p-6 backdrop-blur-sm sm:p-8">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white">Update Password</h3>
                            <p className="text-xs text-slate-400">Ensure your account is using a secure, random password.</p>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.current_password}
                                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                    required
                                    className={`w-full rounded-xl border bg-primary/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:bg-primary/[0.07] focus:ring-2 ${
                                        passwordForm.errors.current_password
                                            ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20'
                                            : 'border-primary/20 focus:border-indigo-500/50 focus:ring-indigo-500/20'
                                    }`}
                                    placeholder="••••••••"
                                />
                                {passwordForm.errors.current_password && (
                                    <p className="mt-2 text-sm text-rose-400">{passwordForm.errors.current_password}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.new_password}
                                    onChange={(e) => passwordForm.setData('new_password', e.target.value)}
                                    required
                                    className={`w-full rounded-xl border bg-primary/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:bg-primary/[0.07] focus:ring-2 ${
                                        passwordForm.errors.new_password
                                            ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20'
                                            : 'border-primary/20 focus:border-indigo-500/50 focus:ring-indigo-500/20'
                                    }`}
                                    placeholder="••••••••"
                                />
                                {passwordForm.errors.new_password && (
                                    <p className="mt-2 text-sm text-rose-400">{passwordForm.errors.new_password}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.new_password_confirmation}
                                    onChange={(e) => passwordForm.setData('new_password_confirmation', e.target.value)}
                                    required
                                    className={`w-full rounded-xl border bg-primary/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:bg-primary/[0.07] focus:ring-2 ${
                                        passwordForm.errors.new_password_confirmation
                                            ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20'
                                            : 'border-primary/20 focus:border-indigo-500/50 focus:ring-indigo-500/20'
                                    }`}
                                    placeholder="••••••••"
                                />
                                {passwordForm.errors.new_password_confirmation && (
                                    <p className="mt-2 text-sm text-rose-400">{passwordForm.errors.new_password_confirmation}</p>
                                )}
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
