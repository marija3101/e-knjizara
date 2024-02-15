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
            $order->status = $request->status;
            $order->tracking_no = 'order'.rand(1111,9999);
            $order->save();

            $res = $request->res;
            $cart = Cart::where('user_id', $user_id)->get();
            $orderitems = [];
            

          foreach($cart as $item) {
            if($res == null) { 
                $orderitems[] = [
                    'book_id'=>$item->book_id,
                    'qty'=>$item->book_qty,
                    'price'=> $item->book->price

                ]; } else {
                    $orderitems[] = [
                        'book_id'=>$item->book_id,
                        'qty'=>$item->book_qty,
                    'price'=> (int)$item->book->price * ((100 - 10) /100)
                    ];
                }
                $item->book->update([
                    'quantity'=>$item->book->quantity - $item->book_qty
                ]);
            }

            $order->orderitems()->createMany($orderitems);
            Cart::destroy($cart);
            return response()->json([
                'status'=>200,
                'message'=>'Order Placed Successfully',
                'order'=>$order
                ]);
        }


        } else {
            return response()->json([
                'status'=>401,
                'message'=>'Login to continue',
                ]);
        }

    }

    public function vieworder() {
        if(auth('sanctum')->check()) {
        $user_id=auth('sanctum')->user()->id;
        $orderitems=Order::where('user_id',$user_id)->get();
        return response()->json([
        'status'=>200,
        'order'=>$orderitems,
        ]);
        }
    
        else {
        return response()->json([
        'status'=>401,
        'message'=>'Login to view',
        ]);
        }
        }

        public function allorders()
        {
            $order = Order::where('status','1')->get();
            //return new AuthorCollection($authors);
    
            return response()->json([
                'status'=>200,
                'order'=>$order,
            ]);
        }
}
