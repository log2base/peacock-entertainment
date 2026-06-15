import { useForm, Link, Head } from '@inertiajs/react'

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    function submit(e) {
        e.preventDefault()
        post('/login')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4">
            <Head title="Login" />

            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-primary/[0.03] p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-primary shadow-lg shadow-indigo-500/25">
                        P
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>
                </div>

                <form onSubmit={submit}>
                    {/* Email */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="w-full rounded-xl border border-primary/20 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none ring-indigo-500/50 transition-all focus:border-indigo-500/50 focus:bg-slate-800/70 focus:ring-2 backdrop-blur-sm"
                            placeholder="user@example.com"
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            className="w-full rounded-xl border border-primary/20 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none ring-indigo-500/50 transition-all focus:border-indigo-500/50 focus:bg-slate-800/70 focus:ring-2 backdrop-blur-sm"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                        )}
                    </div>

                    {/* Remember Me */}
                    <div className="mb-8 flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-primary/30 bg-gray-100 text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-slate-900"
                            />
                            <span className="text-sm text-slate-400">Remember me</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 text-sm font-semibold text-primary shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}
