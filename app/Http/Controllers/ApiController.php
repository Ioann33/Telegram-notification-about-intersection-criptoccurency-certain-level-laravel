<?php

namespace App\Http\Controllers;

use App\Models\Responce;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function triggerActive(){
        redirect(route('send.mess'));
    }

    public function getNotes(){

    }
}
