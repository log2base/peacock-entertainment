<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/single-drama', function () {
    return Inertia::render('Works/SingleDrama');
})->name('works.single-drama');

Route::get('/television-series', function () {
    return Inertia::render('Works/TelevisionSeries');
})->name('works.tv-series');

Route::get('/music', function () {
    return Inertia::render('Works/Music');
})->name('works.music');

Route::get('/cinema', function () {
    return Inertia::render('Works/Cinema');
})->name('works.cinema');

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
});
