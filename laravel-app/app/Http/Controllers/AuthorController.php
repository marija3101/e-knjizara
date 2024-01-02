<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthorCollection;
use App\Http\Resources\AuthorResource;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    public function index()
    {
        $author = Author::all();
        //return new AuthorCollection($authors);

        return response()->json([
            'status'=>200,
            'author'=>$author,
        ]);
    }
    public function allauthors()
    {
        $author = Author::where('status','0')->get();
        //return new AuthorCollection($authors);

        return response()->json([
            'status'=>200,
            'author'=>$author,
        ]);
    }

   
    public function show(Author $author)
    {
        return new AuthorResource($author);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'metatitle'=>'required|max:100',
            'slug' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'resting_place' => 'required|string'

        ]);

        if ($validator->fails()){ return response()->json(['status'=>400,'errors'=>$validator->messages()]);}

        else {
            $author = new Author;
            $author->metatitle=$request->input('metatitle');
            $author->metakeywords=$request->input('metakeywords');
            $author->slug=$request->input('slug');
            $author->name=$request->input('name');
            $author->resting_place=$request->input('resting_place');
            $author->status=$request->input('status')==true ? '1' : '0';
            $author->save();
            return response()->json(['status'=>200,'message'=>'Author added successfully']);

        }
    }

    public function edit($id)
{
$author=Author::find($id);
if($author)
{
return response()->json([
'status'=>200,
'author'=>$author
]);
}
else
{
return response()->json([
'status'=>404,
'message'=>'No Author Id Found']);
} }
 


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'metatitle'=>'required|max:100',
            'slug' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'resting_place' => 'required|string'

        ]);

        if ($validator->fails()){ return response()->json(['status'=>422,'errors'=>$validator->messages()]);}

        else {
            $author = Author::find($id);
            if($author) { 
            $author->metatitle=$request->input('metatitle');
            $author->metakeywords=$request->input('metakeywords');
            $author->slug=$request->input('slug');
            $author->name=$request->input('name');
            $author->resting_place=$request->input('resting_place');
            $author->status=$request->input('status')==true ? '1' : '0';
            $author->save();
            return response()->json(['status'=>200,'message'=>'Author updated successfully']);

        } else {
            return response()->json(['status'=>404,'message'=>'No Author ID found']);
        }
    }
    }


    public function destroy($id)
{
$author=Author::find($id);
if($author)
{
$author->delete();
return response()->json([
'status'=>200,
'message'=>'Author deleted successfully',
]);
}
else{
return response()->json([
'status'=>404,
'message'=>'No author ID found',
]);
}
}
}
