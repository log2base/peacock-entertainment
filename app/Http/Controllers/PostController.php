<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $posts = Post::with('category')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return inertia('Posts/Index', [
            'posts'        => $posts,
            'featuredCount' => Post::where('is_featured', true)->count(),
            'filters'      => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return inertia('Posts/Create', [
            'categories' => Category::where('status', true)->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'title'       => 'required|string|max:255',
            'image'       => 'nullable|image|max:2048',
            'rating'      => 'required|numeric|min:0|max:10',
            'url'         => 'nullable|url|max:500',
            'status'      => 'boolean',
            'is_featured' => 'boolean',
        ]);

        // Enforce max 4 featured posts
        if (!empty($validated['is_featured']) && Post::where('is_featured', true)->count() >= 4) {
            return back()->withErrors(['is_featured' => 'Maximum 4 featured posts allowed. Please un-feature another post first.']);
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        Post::create($validated);

        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }

    public function show(Post $post)
    {
        return inertia('Posts/Show', ['post' => $post->load('category')]);
    }

    public function edit(Post $post)
    {
        return inertia('Posts/Edit', [
            'post'          => $post,
            'categories'    => Category::where('status', true)->get(['id', 'name']),
            'featuredCount' => Post::where('is_featured', true)->count(),
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'title'       => 'required|string|max:255',
            'image'       => 'nullable|image|max:2048',
            'rating'      => 'required|numeric|min:0|max:10',
            'url'         => 'nullable|url|max:500',
            'status'      => 'boolean',
            'is_featured' => 'boolean',
        ]);

        // Enforce max 4 featured (exclude current post from count)
        if (!empty($validated['is_featured']) && !$post->is_featured) {
            if (Post::where('is_featured', true)->count() >= 4) {
                return back()->withErrors(['is_featured' => 'Maximum 4 featured posts allowed. Please un-feature another post first.']);
            }
        }

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $validated['image'] = $request->file('image')->store('posts', 'public');
        } else {
            unset($validated['image']);
        }

        $post->update($validated);

        return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }
        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }

    /**
     * Toggle is_featured directly from the index table (AJAX-style Inertia request).
     */
    public function toggleFeatured(Post $post)
    {
        if (!$post->is_featured) {
            $count = Post::where('is_featured', true)->count();
            if ($count >= 4) {
                return back()->withErrors(['featured' => 'Maximum 4 featured posts reached. Un-feature another post first.']);
            }
        }

        $post->update(['is_featured' => !$post->is_featured]);

        return back()->with('success', $post->is_featured ? 'Post un-featured.' : 'Post featured.');
    }
}
