<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\Coupon;
use App\Models\Cart;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index()
    {
        $coupon = Coupon::all();

        return response()->json([
            'status'=>200,
            'coupon'=>$coupon,
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'value' => 'required|numeric',
        ]);


        if ($validator->fails()){ return response()->json(['status'=>400,'errors'=>$validator->messages()]);}


        else {
            if(auth('sanctum')->check()) {
               
            $coupon = new Coupon;
            $coupon->code='coupon'.rand(1111,9999);
            $coupon->user_id = auth('sanctum')->user()->id;
            $coupon->value=$request->input('value');
           
            $coupon->save();
            return response()->json(['status'=>200,'message'=>'Coupon added successfully']);

        }}
    }

    public function edit($id)
    {
    $coupon=Coupon::find($id);
    if($coupon)
    {
    return response()->json([
    'status'=>200,
    'coupon'=>$coupon
    ]);
    }
    else
    {
    return response()->json([
    'status'=>404,
    'message'=>'No Coupon Id Found']);
    } }


    
    

    public function applyCoupon(Request $request) {
        $coupon = Coupon::where('code',$request->couponName)->first();

        if(!$coupon) {
            return response()->json([
                'status'=>404,
                'message'=>'No coupon found',
                ]);
        } 
        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;

            $cart = Cart::where('user_id', $user_id)->get();

            $cartitems = 0;
            foreach($cart as $item) {
                $cartitems += (int)($item->book->price*$item->book_qty * ((100 - $coupon->value) /100));
            }

            Coupon::destroy($coupon->id);
        }
       
        return response()->json([
            'status'=>200,
            'discount'=>$cartitems,
            ]);


            
    }

    public function destroy($id)
    {
    $coupon=Coupon::find($id);
    if($coupon)
    {
    $coupon->delete();
    return response()->json([
    'status'=>200,
    'message'=>'Coupon deleted successfully',
    ]);
    }
    else{
    return response()->json([
    'status'=>404,
    'message'=>'No coupon ID found',
    ]);
    }
    }

    


}
