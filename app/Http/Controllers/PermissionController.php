<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of permissions.
     */
    public function index(Request $request)
    {
        $query = Permission::query();

        // Search filter
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Group filter
        if ($request->filled('group')) {
            $query->where('name', 'like', $request->group . '.%');
        }

        $permissions = $query->orderBy('name')->paginate(20)->withQueryString();

        // Get unique groups for the filter dropdown
        $groups = Permission::all()
            ->map(fn($p) => explode('.', $p->name)[0])
            ->unique()
            ->sort()
            ->values()
            ->toArray();

        return inertia('Permissions/Index', [
            'permissions' => $permissions,
            'groups' => $groups,
            'filters' => $request->only('search', 'group'),
        ]);
    }

    /**
     * Show the form for creating a new permission.
     */
    public function create()
    {
        // Get unique groups for suggestions
        $groups = Permission::all()
            ->map(fn($p) => explode('.', $p->name)[0])
            ->unique()
            ->sort()
            ->values()
            ->toArray();

        return inertia('Permissions/Create', [
            'groups' => $groups,
        ]);
    }

    /**
     * Store a newly created permission in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name'],
        ]);

        Permission::create(['name' => $validated['name']]);

        return redirect()->route('permissions.index')
            ->with('success', 'Permission created successfully.');
    }

    /**
     * Show the form for editing the specified permission.
     */
    public function edit(Permission $permission)
    {
        $groups = Permission::all()
            ->map(fn($p) => explode('.', $p->name)[0])
            ->unique()
            ->sort()
            ->values()
            ->toArray();

        return inertia('Permissions/Edit', [
            'permission' => $permission,
            'groups' => $groups,
        ]);
    }

    /**
     * Update the specified permission in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name,' . $permission->id],
        ]);

        $permission->update(['name' => $validated['name']]);

        return redirect()->route('permissions.index')
            ->with('success', 'Permission updated successfully.');
    }

    /**
     * Remove the specified permission from storage.
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();

        return redirect()->route('permissions.index')
            ->with('success', 'Permission deleted successfully.');
    }
}
