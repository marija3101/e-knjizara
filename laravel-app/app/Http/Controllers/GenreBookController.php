<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class GenreBookController extends Controller
{
    public function index($genre_id)
    {
        $books = Book::get()->where('genre_id', $genre_id);
        if (is_null($books)) return response()->json('Data not found', 404);
        return response()->json($books);
    }
}
