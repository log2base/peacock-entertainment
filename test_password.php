<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = App\Models\User::first();
echo "Before: " . $user->password . "\n";
$user->update(['password' => Hash::make('newpassword123')]);
$user->refresh();
echo "After: " . $user->password . "\n";
