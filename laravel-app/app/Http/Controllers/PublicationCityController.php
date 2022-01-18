<?php

namespace App\Http\Controllers;

use App\Http\Resources\PublicationCityCollection;
use App\Http\Resources\PublicationCityResource;
use App\Models\PublicationCity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PublicationCityController extends Controller
{

    public function index()
    {
        $city = PublicationCity::all();
        //return new AuthorCollection($authors);

        return response()->json([
            'status'=>200,
            'city'=>$city,
        ]);
    }
    public function allcitis()
    {
    $city = PublicationCity::where('status','0')->get();
       

        return response()->json([
            'status'=>200,
            'city'=>$city,
        ]);
    }

   
    public function show(PublicationCity $city)
    {
       
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'zip_code' => 'required|string',
       


        ]);

        if ($validator->fails()){ return response()->json(['status'=>400,'errors'=>$validator->messages()]);}
      

        
        else {
            $city = new PublicationCity;
            $city->slug=$request->input('slug');
            $city->name=$request->input('name');
            $city->zip_code=$request->input('zip_code');
            $city->status=$request->input('status')==true ? '1' : '0';
            $city->save();
            return response()->json(['status'=>200,'message'=>'City added successfully']);

        }
    }

    public function edit($id)
{
$city=PublicationCity::find($id);
if($city)
{
return response()->json([
'status'=>200,
'city'=>$city
]);
}
else
{
return response()->json([
'status'=>404,
'message'=>'No PublicationCity Id Found']);
} }
 


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'zip_code' => 'required|string',
        ]);

        
        if($validator->fails())
{
return response()->json([
'status'=>422,
'errors'=>$validator->messages(),
]); }
else{

    $city = PublicationCity::find($id);
    
    if($city) { 

    $city->slug=$request->input('slug');
    $city->name=$request->input('name');
    $city->zip_code=$request->input('zip_code');
    $city->status=$request->input('status')==true ? '1' : '0';
    $city->save();
    return response()->json([
        'status'=>200,
        'message'=>'PublicationCity updated successfully']);
    }
    else {
        return response()->json([
            'status'=>404,
            'message'=>'No PublicationCity Id Found']);
    




      
    

}
}
    }

   
    public function destroy($id)
{
$city=PublicationCity::find($id);
if($city)
{
$city->delete();
return response()->json([
'status'=>200,
'message'=>'PublicationCity deleted successfully',
]);
}
else{
return response()->json([
'status'=>404,
'message'=>'No city ID found',
]);
}
}
}
