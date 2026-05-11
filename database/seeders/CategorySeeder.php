<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Drama', 'slug' => 'drama', 'status' => true],
            ['name' => 'TV Series', 'slug' => 'tv-series', 'status' => true],
            ['name' => 'Music', 'slug' => 'music', 'status' => true],
            ['name' => 'Cinema', 'slug' => 'cinema', 'status' => true],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::firstOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
