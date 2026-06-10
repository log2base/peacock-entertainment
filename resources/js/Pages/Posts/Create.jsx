import { Link, useForm } from '@inertiajs/react'
import { useState, useRef } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'

const Toggle = ({ checked, onChange, label, disabled, hint }) => (
    <div className="flex items-start gap-3">
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            } ${checked ? 'bg-amber-500' : 'bg-slate-600'}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <div>
            <span className="text-sm font-medium text-slate-300">{label}</span>
            {hint && <p className="mt-0.5 text-xs text-rose-400">{hint}</p>}
        </div>
    </div>
)

const StatusToggle = ({ checked, onChange }) => (
    <div className="flex items-center gap-3">
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer ${checked ? 'bg-indigo-500' : 'bg-slate-600'}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className="text-sm font-medium text-slate-300">Active (visible to users)</span>
    </div>
)

const FieldError = ({ error }) => error ? <p className="mt-2 text-sm text-rose-400">{error}</p> : null

const inputCls = (error) =>
    `w-full rounded-xl border bg-primary/5 px-4 py-3 text-sm text-primary placeholder-slate-500 outline-none transition-all focus:bg-primary/[0.07] focus:ring-2 ${
        error
            ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/20'
            : 'border-primary/20 focus:border-indigo-500/50 focus:ring-indigo-500/20'
    }`

export default function PostCreate({ categories, featuredCount }) {
    const [preview, setPreview] = useState(null)
    const fileRef = useRef(null)
    const canFeature = (featuredCount ?? 0) < 8

    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        title: '',
        image: null,
        rating: '5',
        url: '',
        status: true,
        is_featured: false,
    })

    function handleImageChange(e) {
        const file = e.target.files[0]
        if (!file) return
        setData('image', file)
        setPreview(URL.createObjectURL(file))
    }

    function handleSubmit(e) {
        e.preventDefault()
        post('/admin/posts', { forceFormData: true })
    }

    return (
        <AdminLayout title="Create Post">
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/admin/posts" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-primary">Create Post</h2>
                        <p className="mt-1 text-sm text-slate-400">Add a new post to your platform</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-primary/[0.02] p-6 backdrop-blur-sm sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">

                        {/* Category */}
                        <div>
                            <label htmlFor="category_id" className="mb-2 block text-sm font-medium text-slate-300">
                                Category
                            </label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className={`${inputCls(errors.category_id)} bg-slate-900`}
                            >
                                <option value="" className="bg-slate-900 text-primary">— No category —</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id} className="bg-slate-900 text-primary">{cat.name}</option>
                                ))}
                            </select>
                            <FieldError error={errors.category_id} />
                        </div>

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-300">
                                Title <span className="text-rose-400">*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={inputCls(errors.title)}
                                placeholder="e.g., The Dark Knight"
                            />
                            <FieldError error={errors.title} />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">Cover Image</label>
                            <div
                                onClick={() => fileRef.current?.click()}
                                className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/20 bg-primary/[0.02] p-6 transition-all hover:border-indigo-500/40 hover:bg-primary/[0.05]"
                            >
                                {preview ? (
                                    <img src={preview} alt="Preview" className="max-h-48 w-auto rounded-lg object-cover" />
                                ) : (
                                    <>
                                        <svg className="mb-3 h-10 w-10 text-slate-600 transition-colors group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm text-slate-500">Click to upload image</p>
                                        <p className="mt-1 text-xs text-slate-600">PNG, JPG, WEBP up to 2MB</p>
                                    </>
                                )}
                                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </div>
                            {preview && (
                                <button type="button" onClick={() => { setPreview(null); setData('image', null); fileRef.current.value = '' }}
                                    className="mt-2 text-xs text-rose-400 hover:text-rose-300">
                                    Remove image
                                </button>
                            )}
                            <FieldError error={errors.image} />
                        </div>

                        {/* Rating */}
                        <div>
                            <label htmlFor="rating" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                                Rating <span className="text-rose-400">*</span>
                                <span className="rounded-lg bg-indigo-500/10 px-2 py-0.5 text-sm font-bold text-indigo-400">{data.rating}/10</span>
                            </label>
                            <input
                                id="rating"
                                type="range"
                                min="0" max="10" step="0.5"
                                value={data.rating}
                                onChange={(e) => setData('rating', e.target.value)}
                                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-primary/10 accent-indigo-500"
                            />
                            <div className="mt-1 flex justify-between text-xs text-slate-600">
                                <span>0</span><span>5</span><span>10</span>
                            </div>
                            <FieldError error={errors.rating} />
                        </div>

                        {/* URL */}
                        <div>
                            <label htmlFor="url" className="mb-2 block text-sm font-medium text-slate-300">External URL</label>
                            <input
                                id="url" type="url" value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                className={inputCls(errors.url)}
                                placeholder="https://example.com/watch"
                            />
                            <FieldError error={errors.url} />
                        </div>

                        {/* Toggles */}
                        <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/[0.02] p-4">
                            <StatusToggle
                                checked={data.status}
                                onChange={(v) => setData('status', v)}
                            />
                            <Toggle
                                checked={data.is_featured}
                                onChange={(v) => setData('is_featured', v)}
                                label="Featured post ★"
                                disabled={!canFeature && !data.is_featured}
                                hint={!canFeature && !data.is_featured ? `Max 8 featured posts reached` : null}
                            />
                        </div>
                        <FieldError error={errors.is_featured} />

                        {/* Actions */}
                        <div className="mt-8 flex items-center justify-end gap-4 border-t border-primary/20 pt-6">
                            <Link href="/admin/posts" className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-primary/5 hover:text-primary">
                                Cancel
                            </Link>
                            <button type="submit" disabled={processing}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-indigo-500/25 transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50">
                                {processing ? (
                                    <>
                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating...
                                    </>
                                ) : 'Create Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}
