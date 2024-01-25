<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Book;
class CommentController extends Controller

{

    public function viewcom($id)
    {
       
            $coms = Comment::where('book_id',$id)->get();
            return response()->json([
            'status'=>200,
            'comment'=>$coms,
            ]);
            return response()->json([
            'status'=>401,
            'message'=>'Login to View Cart Data',
            ]);
            
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comment' => 'required|string',
            'raiting' => 'required|between:1,5',
            'book_id' => 'required',
        ]);

    if ($validator->fails()) {  return response()->json([
        'status'=>422,
        'errors'=>$validator->messages(),
    ]);

        }
        else  {
            $comment = new Comment;
            $comment->book_id=$request->input('book_id');
            $comment->comment=$request->input('comment');
            $comment->raiting=$request->input('raiting');
            $comment->save();

            return response()->json([
                'status'=>200,
                'message'=>'Thank you for the feedback',
            ]);

        }
      



    }
}
