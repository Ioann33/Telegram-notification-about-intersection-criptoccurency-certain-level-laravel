<?php

namespace App\Http\Controllers;

use App\Models\InnerObjModel;
use App\Models\Note;
use App\Models\ObjModel;
use App\Models\Responce;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    public function triggerActive(){
        redirect(route('send.mess'));
    }

    public function getNotes(){
        $notesObj = new ObjModel();

        $notes = Note::all();

        if (!empty($notes)){
            foreach ($notes as $key => $note){
                $key++;
                $innerModel = new InnerObjModel();
                $innerModel->id = $note->id;
                $innerModel->name = $note->name;
                $innerModel->prise = $note->prise;
                $innerModel->dir = $note->dir;
                $innerModel->message = $note->message;
                $notesObj->$key = $innerModel;
            }
            return response()->json($notesObj);
        }
        return response()->json($notesObj);

    }

    public function saveNote(Request $request){
        $note = new Note();
        $note->name = $request->name;
        $note->prise = $request->prise;
        $note->dir = $request->dir;
        $note->message = $request->message;
        $note->save();
    }


    public function delete(int $id){
        $event = Note::findOrFail($id);
        $event->delete();
    }
}
