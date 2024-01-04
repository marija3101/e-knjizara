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
            'metatitle' => 'required',
            'description' => 'required',
            'author_id' => 'required',
            'genre_id' => 'required',
            'price'=>'required|max:20',
            'quantity'=>'required',
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
            $book->genre_id=$request->input('genre_id');
            $book->slug=$request->input('slug');
            $book->title=$request->input('title');
            $book->price=$request->input('price');
            $book->quantity=$request->input('quantity');
            $book->description=$request->input('description');
            $book->metatitle=$request->input('metatitle');
            $book->metakeywords=$request->input('metakeywords');
            $book->status=$request->input('status') == true ? '1' : '0';
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
                'message'=>'Book added',
            ]);

        }
      



    }

 

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:100',
            'title' => 'required|string|max:100',
            'metatitle' => 'required',
            'description' => 'required',
            'author_id' => 'required',
            'genre_id' => 'required',
            'price'=>'required|max:20',
            'quantity'=>'required',
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
                $book->genre_id=$request->input('genre_id');
                $book->slug=$request->input('slug');
                $book->title=$request->input('title');
                $book->price=$request->input('price');
                $book->quantity=$request->input('quantity');
                $book->description=$request->input('description');
                $book->metatitle=$request->input('metatitle');
                $book->metakeywords=$request->input('metakeywords');
                $book->status=$request->input('status');
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

