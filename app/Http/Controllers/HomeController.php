<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        $featuredPosts = Post::where('is_featured', true)
            ->where('status', true)
            ->with('category')
            ->latest()
            ->take(4)
            ->get();

        // Fetch posts grouped by category for section-wise display
        $categories = Category::where('status', true)
            ->whereHas('posts', function ($query) {
                $query->where('status', true);
            })
            ->get();

        $categorySections = [];
        foreach ($categories as $category) {
            $categorySections[] = [
                'category' => $category,
                'posts' => Post::where('category_id', $category->id)
                    ->where('status', true)
                    ->with('category')
                    ->latest()
                    ->take(8)
                    ->get(),
            ];
        }

        return Inertia::render('Home', [
            'featuredPosts' => $featuredPosts,
            'categorySections' => $categorySections,
        ]);
    }

    public function category($slug)
    {
        $category = Category::where('slug', $slug)->where('status', true)->firstOrFail();

        $posts = Post::where('category_id', $category->id)
            ->where('status', true)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        // All hardcoded pages now receive dynamic posts too
        $viewMap = [
            'drama'     => 'Works/SingleDrama',
            'tv-series' => 'Works/TelevisionSeries',
            'music'     => 'Works/Music',
            'cinema'    => 'Works/Cinema',
        ];

        $view = $viewMap[$slug] ?? 'Works/Category';

        return Inertia::render($view, [
            'category' => $category,
            'posts'    => $posts,
        ]);
    }
}