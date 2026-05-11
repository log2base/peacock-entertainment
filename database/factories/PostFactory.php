<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'image' => null,
            'rating' => $this->faker->randomFloat(1, 1, 10),
            'url' => $this->faker->url(),
            'status' => true,
            'is_featured' => false,
        ];
    }
}
