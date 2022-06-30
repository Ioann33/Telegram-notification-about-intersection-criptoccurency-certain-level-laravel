<?php

namespace App\Http\Controllers;

use App\Mail\SingUp;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Mail;
class MailController extends Controller
{

    public function send(){
//        Mail::send(['text'=>'mail'], ['name', 'Ioann importent messeg'], function ($message){
//            $message->to('ivan.karmalyk2017@gmail.com', 'To Ioann DEv')->subject('Test email');
//            $message->from('sebastanovici@gmail.com', 'Anonimys');
//        });
        $trigger = 'across 22300 btc/usdt';
        Mail::to('ivan.karmalyk2017@gmail.com')->send(new SingUp($trigger));

        return view('welcome');
    }
}
