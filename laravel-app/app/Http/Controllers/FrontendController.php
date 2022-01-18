<?php

namespace App\Http\Controllers;
use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function author()
{
$author=Author::where('status','0')->get();
return response()->json([
'status'=>200,
'author'=>$author
]);
}
public function book($slug) {
    $author=Author::where('slug',$slug)->first();
    if($author) {
    $book=Book::where('author_id',$author->id)->get();
    if($book) {
    return response()->json([
    'status'=>200,
    'book_data'=>[
    'book'=>$book,
    'author'=>$author,
    ]
    ]);
    }
    else {
    return response()->json([
    'status'=>400,
    'message'=>'No book available'
    ]);
    }
    }
    else {
    return response()->json([
    'status'=>404,
    'message'=>'No such author found'
    ]);
    }
    }


public function viewbook($author_slug,$book_slug){
    $author=Author::where('slug',$author_slug)->first();
    if($author) {
    $book=Book::where('author_id',$author->id)->where('slug', $book_slug)->first();
    if($book) {
    return response()->json([
    'status'=>200,
    'book'=>$book,
    ]);
    }
    else {
    return response()->json([
    'status'=>400,
    'message'=>'No book available'
    ]);
    }
    }
    else {
    return response()->json([
    'status'=>404,
    'message'=>'No such author found'
    ]);
    }
}

}
