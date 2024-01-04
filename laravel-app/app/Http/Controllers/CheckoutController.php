<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controllers;
use App\Models\Order;
use App\Models\Cart;

class CheckoutController extends Controller
{
    public function placeorder(Request $request){
        if(auth('sanctum')->check()) {

            $validator = Validator::make($request->all(),[
                'firstname' => 'required|max:120',
                'lastname' => 'required|max:120',
                'phone' => 'required|max:120',
                'email' => 'required|max:120',
                'address' => 'required|max:120',
                'city' => 'required|max:120',
                'state' => 'required|max:120',
                'zipcode' => 'required|max:120',

        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
                ]);
        } else {
            $user_id = auth('sanctum')->user()->id;
            $order = new Order;
            $order->user_id = $user_id;
            $order->firstname = $request->firstname;
            $order->lastname = $request->lastname;
            $order->phone = $request->phone;
            $order->email = $request->email;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->state = $request->state;
            $order->zipcode = $request->zipcode;
            $order->tracking_no = 'order'.rand(1111,9999);
            $order->save();

            $cart = Cart::where('user_id', $user_id)->get();
            $orderitems = [];
            foreach($cart as $item) {
                $orderitems[] = [
                    'book_id'=>$item->book_id,
                    'qty'=>$item->book_qty,
                    'price'=>$item->book->price,
                ];
                $item->book->update([
                    'quantity'=>$item->book->quantity - $item->book_qty
                ]);
            }

            $order->orderitems()->createMany($orderitems);
            Cart::destroy($cart);
            return response()->json([
                'status'=>200,
                'message'=>'Order Placed Successfully',
                ]);
        }


        } else {
            return response()->json([
                'status'=>401,
                'message'=>'Login to continue',
                ]);
        }

    }
}
