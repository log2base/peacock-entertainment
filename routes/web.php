<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', [HomeController::class, 'home'])->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/who-we-are', function () {
    return Inertia::render('WhoWeAre');
})->name('who.we.are');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Auth Routes
Route::get('/login', [\App\Http\Controllers\AuthController::class, 'showLogin'])->name('login')->middleware('guest');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])->middleware('guest');
Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->name('logout')->middleware('auth');

/*
|--------------------------------------------------------------------------
| Role & Permission Management Routes
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->middleware('auth')->group(function () {
    // Profile Settings
    Route::get('profile', [\App\Http\Controllers\AuthController::class, 'showProfile'])->name('profile');
    Route::put('profile', [\App\Http\Controllers\AuthController::class, 'updateProfile'])->name('profile.update');
    Route::put('password', [\App\Http\Controllers\AuthController::class, 'updatePassword'])->name('password.update');

    // Roles CRUD
    Route::resource('roles', RoleController::class);

    // Permissions CRUD
    Route::resource('permissions', PermissionController::class)->except(['show']);

    // User Role Assignment & User Management
    Route::get('users/roles', [UserRoleController::class, 'index'])->name('users.roles.index');
    Route::get('users/create', [UserRoleController::class, 'create'])->name('users.roles.create');
    Route::post('users', [UserRoleController::class, 'store'])->name('users.roles.store');
    Route::delete('users/{user}', [UserRoleController::class, 'destroy'])->name('users.roles.destroy');
    Route::get('users/{user}/roles/edit', [UserRoleController::class, 'edit'])->name('users.roles.edit');
    Route::put('users/{user}/roles', [UserRoleController::class, 'update'])->name('users.roles.update');
    Route::post('users/{user}/assign-role', [UserRoleController::class, 'assignRole'])->name('users.roles.assign');
    Route::post('users/{user}/remove-role', [UserRoleController::class, 'removeRole'])->name('users.roles.remove');

    // Categories CRUD
    Route::resource('categories', \App\Http\Controllers\CategoryController::class);

    // Posts CRUD
    Route::resource('posts', PostController::class);

    // Toggle featured status
    Route::post('posts/{post}/toggle-featured', [PostController::class, 'toggleFeatured'])->name('posts.toggle-featured');
});

// Dynamic Category Route (Placed at the very end to not override actual routes like /login or /admin)
Route::get('/{slug}', [HomeController::class, 'category'])->name('works.category');
Route::get('/{slug}', [HomeController::class, 'category'])->name('works.category');
