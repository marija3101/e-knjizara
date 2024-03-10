<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\Quantity;
use App\Models\Book;


class QuantityController extends Controller
{
    public function message(Request $request){
    event(new Quantity($request->input('data')));

    
      return [];
    }
}
