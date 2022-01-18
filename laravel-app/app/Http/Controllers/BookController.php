<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        //return new BookCollection($books);
        return response()->json([
            'status'=>200,
            'books'=>$books,
        ]);
    }

    public function show(Book $book)
    {
        return new BookResource($book);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:100',
            'title' => 'required|string|max:100',
            'description' => 'required',
            'author_id' => 'required',
            'city_id' => 'required',
            'price'=>'required',
            'image'=>'required|image|mimes:jpeg,png,jpg'
        ]);

    if ($validator->fails()) {  return response()->json([
        'status'=>422,
        'errors'=>$validator->messages(),
    ]);

        }
        else  {
            $book = new Book;
            $book->author_id=$request->input('author_id');
            $book->city_id=$request->input('city_id');
            $book->slug=$request->input('slug');
            $book->title=$request->input('title');
            $book->price=$request->input('price');
            $book->description=$request->input('description');
            if($request->hasFile('image')) {
                $file=$request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename =time().'.'.$extension;
                $file->move('uploads/product/',$filename);
                $book->image = 'uploads/product/'.$filename;
            }
            $book->save();

            return response()->json([
                'status'=>200,
                'message'=>'Product added',
            ]);

        }
      



    }

 

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:100',
            'title' => 'required|string|max:100',
            'description' => 'required',
            'author_id' => 'required',
            'price'=>'required',
            'city_id' => 'required'
        ]);

    if ($validator->fails()) {  return response()->json([
        'status'=>422,
        'errors'=>$validator->messages(),
    ]);
        
        }
        else  {
            $book=Book::find($id);
            if( $book ){

            
            $book->author_id=$request->input('author_id');
            $book->city_id=$request->input('city_id');
            $book->slug=$request->input('slug');
            $book->title=$request->input('title');
            $book->price=$request->input('price');
            $book->description=$request->input('description');
            if($request->hasFile('image')) {
                $path=$book->image;
                if(File::exists($path)) { 
                    File::delete($path);}
                    $file=$request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename =time().'.'.$extension;
                $file->move('uploads/product/',$filename);
                $book->image = 'uploads/product/'.$filename;

            }
            $book->update();

            return response()->json([
                'status'=>200,
                'message'=>'Book updated successfully',
            ]);
        } else {
            return response()->json([
                'status'=>404,
                'message'=>'Book not found',
            ]);
        }

        }
      

       
    }



   
    public function edit($id) {
        $book=Book::find($id);
        if($book) {
        return response()->json([
        'status'=>200,
        'book'=>$book,
        ]);}
        else {
        return response()->json([
        'status'=>404,
        'message'=>'No book found',
        ]);
        }
        }
        public function destroy($id)
{
$book=Book::find($id);
if($book)
{
$book->delete();
return response()->json([
'status'=>200,
'message'=>'Book deleted successfully',
]);
}
else{
return response()->json([
'status'=>404,
'message'=>'No book ID found',
]);
}
}
    
}

