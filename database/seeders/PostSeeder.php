<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = \App\Models\Category::all();

        foreach ($categories as $category) {
            \App\Models\Post::factory()->count(15)->create([
                'category_id' => $category->id,
            ]);
        }
    }
}
