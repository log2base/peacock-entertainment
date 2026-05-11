import { Link, useForm } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function CategoryCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        status: true
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/admin/categories')
    }

    return (
        <AdminLayout title="Create Category">
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <Link
                        href="/admin/categories"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Create Category</h2>
                        <p className="mt-1 text-sm text-slate-400">Add a new category for your content</p>
                    </div>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => {
                                    setData('name', e.target.value)
                                    // Optionally auto-generate slug
                                    if (!data.slug || data.slug === data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
                                        setData(data => ({
                                            ...data,
                                            name: e.target.value,
                                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                                        }))
                                    }
                                }}
                                className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:bg-white/[0.07] focus:ring-2 ${
                                    errors.name 
                                        ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20' 
                                        : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20'
                                }`}
                                placeholder="e.g., Action Movies"
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-rose-400">{errors.name}</p>
                            )}
                        </div>

                        {/* Slug Field */}
                        <div>
                            <label htmlFor="slug" className="mb-2 block text-sm font-medium text-slate-300">
                                Slug
                            </label>
                            <input
                                id="slug"
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:bg-white/[0.07] focus:ring-2 ${
                                    errors.slug 
                                        ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20' 
                                        : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20'
                                }`}
                                placeholder="e.g., action-movies"
                            />
                            {errors.slug && (
                                <p className="mt-2 text-sm text-rose-400">{errors.slug}</p>
                            )}
                        </div>

                        {/* Status Toggle */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                role="switch"
                                aria-checked={data.status}
                                onClick={() => setData('status', !data.status)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                                    data.status ? 'bg-indigo-500' : 'bg-slate-600'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        data.status ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                            <span className="text-sm font-medium text-slate-300">
                                Active (visible to users)
                            </span>
                        </div>
                        {errors.status && (
                            <p className="mt-2 text-sm text-rose-400">{errors.status}</p>
                        )}

                        {/* Submit Actions */}
                        <div className="mt-8 flex items-center justify-end gap-4 border-t border-white/10 pt-6">
                            <Link
                                href="/admin/categories"
                                className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating...
                                    </>
                                ) : (
                                    'Create Category'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}
