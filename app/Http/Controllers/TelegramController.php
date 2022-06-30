<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\Telegram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class TelegramController extends Controller
{
    public function send($message){
        $user = Auth::user();
        Notification::send($user, new Telegram($message));
        return view('dashboard');
    }
}
