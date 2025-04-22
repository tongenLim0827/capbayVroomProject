<?php
use App\Http\Controllers\TrackerController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/booking', function () {
    return Inertia::render('Booking');
})->middleware(['auth', 'verified'])->name('booking');

Route::get('/history', function () {
    $user = Auth::user();
    $bookings = Booking::where('user_id', $user->id)->get();

    return Inertia::render('History', [
        'bookings' => $bookings
    ]);
})->middleware(['auth', 'verified'])->name('history');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/tracker', [TrackerController::class, 'index'])->name('tracker.index');
    Route::patch('/tracker/{id}', [TrackerController::class, 'update'])->name('tracker.update');
});

require __DIR__.'/auth.php';
