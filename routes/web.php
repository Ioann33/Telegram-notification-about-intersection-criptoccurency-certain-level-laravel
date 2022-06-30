<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Notification;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/send', function (\Illuminate\Http\Request $request){
    $telegram = new \App\Http\Controllers\TelegramController();
    $telegram->send($request->message);
})->name('send.mess');


//Notification::route('telegram', '577569100')
//    ->notify(new \App\Notifications\Telegram());

require __DIR__.'/auth.php';
