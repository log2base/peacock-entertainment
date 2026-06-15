<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles and permissions first
        $this->call([
            RolesAndPermissionsSeeder::class,
            CategorySeeder::class,
            // PostSeeder::class,
        ]);

        // Create a super-admin user
        $superAdmin = User::factory()->create([
            'name' => 'Peacock Entertainment',
            'email' => 'peacockentertainmentlimited@gmail.com',
            'password' => bcrypt('ABcd1234$'),
        ]);
        $superAdmin->assignRole('super-admin');

        // Create a test user with admin role
        $admin = User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'testadmin@peacock.test',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        // Create a test user with editor role
        $editor = User::factory()->create([
            'name' => 'Test Editor',
            'email' => 'editor@peacock.test',
            'password' => bcrypt('password'),
        ]);
        $editor->assignRole('editor');

        // Create a test user with viewer role
        $viewer = User::factory()->create([
            'name' => 'Test Viewer',
            'email' => 'viewer@peacock.test',
            'password' => bcrypt('password'),
        ]);
        $viewer->assignRole('viewer');
    }
}
