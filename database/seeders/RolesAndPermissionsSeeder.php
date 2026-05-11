<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions grouped by module
        $permissions = [
            // User Management
            'user.view',
            'user.create',
            'user.edit',
            'user.delete',

            // Role Management
            'role.view',
            'role.create',
            'role.edit',
            'role.delete',

            // Permission Management
            'permission.view',
            'permission.create',
            'permission.edit',
            'permission.delete',

            // Content Management
            'content.view',
            'content.create',
            'content.edit',
            'content.delete',
            'content.publish',

            // Settings
            'settings.view',
            'settings.edit',

            // Reports
            'report.view',
            'report.export',
        ];

        // Create all permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        // Super Admin — gets all permissions via Gate::before
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);

        // Admin — gets most permissions
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions([
            'user.view', 'user.create', 'user.edit', 'user.delete',
            'role.view', 'role.create', 'role.edit', 'role.delete',
            'permission.view',
            'content.view', 'content.create', 'content.edit', 'content.delete', 'content.publish',
            'settings.view', 'settings.edit',
            'report.view', 'report.export',
        ]);

        // Editor — content focused
        $editor = Role::firstOrCreate(['name' => 'editor']);
        $editor->syncPermissions([
            'content.view', 'content.create', 'content.edit', 'content.publish',
            'report.view',
        ]);

        // Viewer — read-only access
        $viewer = Role::firstOrCreate(['name' => 'viewer']);
        $viewer->syncPermissions([
            'user.view',
            'content.view',
            'report.view',
        ]);
    }
}
