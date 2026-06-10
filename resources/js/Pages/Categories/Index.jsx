import { Link, router } from '@inertiajs/react'
import { useState } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'

export default function CategoriesIndex({ categories }) {
    function handleDelete(id, name) {
        if (confirm(`Are you sure you want to delete the category "${name}"?`)) {
            router.delete(`/admin/categories/${id}`)
        }
    }

    return (
        <AdminLayout title="Categories">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-primary">All Categories</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Manage your content categories
                    </p>
                </div>
                <Link
                    href="/admin/categories/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.98]"
                >
                    <span className="text-lg">+</span>
                    Create Category
                </Link>
            </div>

            {/* Categories List */}
            <div className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.02] backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-primary/[0.04] text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium">Slug</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {categories.data?.map((category) => (
                                <tr key={category.id} className="transition-colors hover:bg-primary/[0.04]">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-primary">
                                        {category.name}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-slate-400">
                                        {category.slug}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            category.status 
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                        }`}>
                                            {category.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={`/admin/categories/${category.id}/edit`}
                                                className="text-indigo-400 transition-colors hover:text-indigo-300"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id, category.name)}
                                                className="text-rose-400 transition-colors hover:text-rose-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {(!categories.data || categories.data.length === 0) && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 py-16 mt-4">
                    <div className="mb-4 text-4xl">📁</div>
                    <h3 className="text-lg font-semibold text-primary">No categories found</h3>
                    <p className="mt-1 text-sm text-slate-500">Create your first category to get started</p>
                </div>
            )}

            {/* Pagination */}
            {categories.links && categories.last_page > 1 && (
                <div className="mt-8 flex items-center justify-center gap-1">
                    {categories.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                                link.active
                                    ? 'bg-indigo-500/20 text-indigo-300'
                                    : link.url
                                        ? 'text-slate-400 hover:bg-primary/5 hover:text-primary'
                                        : 'cursor-not-allowed text-slate-600'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveState
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    )
}
