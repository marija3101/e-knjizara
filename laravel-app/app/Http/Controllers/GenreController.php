<?php

namespace App\Http\Controllers;

use App\Http\Resources\GenreCollection;
use App\Http\Resources\GenreResource;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GenreController extends Controller
{

    public function index()
    {
        $genre = Genre::all();
        //return new AuthorCollection($authors);

        return response()->json([
            'status'=>200,
            'genre'=>$genre,
        ]);
    }
    public function allgenres()
    {
    $genre = Genre::where('status','0')->get();
       

        return response()->json([
            'status'=>200,
            'genre'=>$genre,
        ]);
    }

   
    public function show(Genre $genre)
    {
       
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:100',
            'name' => 'required|string|max:100',
       


        ]);

        if ($validator->fails()){ return response()->json(['status'=>400,'errors'=>$validator->messages()]);}
      

        
        else {
            $genre = new Genre;
            $genre->slug=$request->input('slug');
            $genre->name=$request->input('name');
            $genre->status=$request->input('status')==true ? '1' : '0';
            $genre->save();
            return response()->json(['status'=>200,'message'=>'genre added successfully']);

        }
    }

    public function edit($id)
{
$genre=Genre::find($id);
if($genre)
{
return response()->json([
'status'=>200,
'genre'=>$genre
]);
}
else
{
return response()->json([
'status'=>404,
'message'=>'No Genre Id Found']);
} }
 


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:100',
            'name' => 'required|string|max:100',
        ]);

        
        if($validator->fails())
{
return response()->json([
'status'=>422,
'errors'=>$validator->messages(),
]); }
else{

    $genre = Genre::find($id);
    
    if($genre) { 

    $genre->slug=$request->input('slug');
    $genre->name=$request->input('name');
    $genre->status=$request->input('status')==true ? '1' : '0';
    $genre->save();
    return response()->json([
        'status'=>200,
        'message'=>'Genre updated successfully']);
    }
    else {
        return response()->json([
            'status'=>404,
            'message'=>'No Genre Id Found']);
    




      
    

}
}
    }

   
    public function destroy($id)
{
$genre=Genre::find($id);
if($genre)
{
$genre->delete();
return response()->json([
'status'=>200,
'message'=>'Genre deleted successfully',
]);
}
else{
return response()->json([
'status'=>404,
'message'=>'No genre ID found',
]);
}
}
}
