<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserRoleController extends Controller
{
    /**
     * Display a listing of users with their roles.
     */
    public function index(Request $request)
    {
        $query = User::with('roles', 'permissions');

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        // Role filter
        if ($request->filled('role')) {
            $query->role($request->role);
        }

        $users = $query->orderBy('name')->paginate(15)->withQueryString();
        $roles = Role::orderBy('name')->get();

        return inertia('Users/Roles', [
            'users' => $users,
            'roles' => $roles,
            'filters' => $request->only('search', 'role'),
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        $roles = Role::orderBy('name')->get();
        return inertia('Users/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'roles' => ['nullable', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        if (!empty($validated['roles'])) {
            $user->assignRole($validated['roles']);
        }

        return redirect()->route('users.roles.index')
            ->with('success', "User '{$user->name}' created successfully.");
    }

    /**
     * Show the form for assigning roles/permissions to a user.
     */
    public function edit(User $user)
    {
        $user->load('roles', 'permissions');
        $roles = Role::with('permissions')->orderBy('name')->get();
        $permissions = Permission::orderBy('name')->get();

        return inertia('Users/AssignRole', [
            'user' => $user,
            'roles' => $roles,
            'permissions' => $permissions,
            'userRoles' => $user->roles->pluck('name')->toArray(),
            'userDirectPermissions' => $user->getDirectPermissions()->pluck('name')->toArray(),
        ]);
    }

    /**
     * Update the user's roles and direct permissions.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'string', 'min:8'],
            'roles' => ['nullable', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (!empty($validated['password'])) {
            $user->update([
                'password' => bcrypt($validated['password'])
            ]);
        }

        $user->syncRoles($validated['roles'] ?? []);
        $user->syncPermissions($validated['permissions'] ?? []);

        return redirect()->route('users.roles.index')
            ->with('success', "Profile, roles and permissions updated for {$user->name}.");
    }

    /**
     * Quickly assign a single role to a user.
     */
    public function assignRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', 'string', 'exists:roles,name'],
        ]);

        $user->assignRole($validated['role']);

        return back()->with('success', "Role '{$validated['role']}' assigned to {$user->name}.");
    }

    /**
     * Quickly remove a single role from a user.
     */
    public function removeRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => ['required', 'string', 'exists:roles,name'],
        ]);

        $user->removeRole($validated['role']);

        return back()->with('success', "Role '{$validated['role']}' removed from {$user->name}.");
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user)
    {
        // Prevent deleting super-admin if they are the only one, or just prevent it entirely
        if ($user->hasRole('super-admin') && User::role('super-admin')->count() === 1) {
            return back()->with('error', 'Cannot delete the last super-admin user.');
        }

        $user->delete();

        return redirect()->route('users.roles.index')
            ->with('success', 'User deleted successfully.');
    }
}
