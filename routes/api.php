<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/trigger', function (){
    return redirect(\route('send.mess', ['message' => file_get_contents("php://input")]));
});

Route::post('/save',[\App\Http\Controllers\ApiController::class, 'saveNote']);


Route::get('/all', [\App\Http\Controllers\ApiController::class, 'getNotes']);

Route::delete('/dell/{id}', function ($id){
    $delete = new \App\Http\Controllers\ApiController();
    $delete->delete($id);
});

