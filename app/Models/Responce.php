<?php

namespace App\Models;



class Responce
{
    /**
     * transform input data to JSON and send this
     * @param array $data
     */
    static public function json(array $data){
        $json = json_encode($data);
        header('Content-Type: application/json');
        echo $json;
    }
}
