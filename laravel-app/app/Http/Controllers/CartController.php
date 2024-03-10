<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Cart;

class CartController extends Controller
{
    public function addtocart(Request $request) {


        if(auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $book_id = $request->book_id;
            $book_qty = $request->book_qty;
            $bookCheck = Book::where('id',$book_id)->first();
            if($bookCheck) {
                if(Cart::where('book_id',$book_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status'=>409,
                        'message'=>$bookCheck->name.'Already Added to Cart',
                        ]);
                } else {
                    $cartitem = new Cart;
                    $cartitem->user_id = $user_id;
                    $cartitem->book_id = $book_id;
                    $cartitem->book_qty = $book_qty;
               
               
                  /*  $cartitem->book->update([
                        'quantity'=>$cartitem->book->quantity - $cartitem->book_qty
                    ]);*/


                    $cartitem->save();

                    return response()->json([
                        'status'=>201,
                        'message'=>'Added to cart'
                        ]);
                }
               
            } else {
                return response()->json([
                    'status'=>404,
                    'message'=>'Book Not Found'
                    ]);
            }

            return response()->json([
                'status'=>201,
                'message'=>'i am in cart'
                ]);
        } else {
            return response()->json([
                'status'=>401,
                'message'=>'Login to Add to Cart'
                ]);
        }
    }
    public function viewcart() {
        if(auth('sanctum')->check()) {
        $user_id=auth('sanctum')->user()->id;
        $cartitems=Cart::where('user_id',$user_id)->get();
        return response()->json([
        'status'=>200,
        'cart'=>$cartitems,
        ]);
        }
    
        else {
        return response()->json([
        'status'=>401,
        'message'=>'Login to View Cart Data',
        ]);
        }
        }
        public function updatequantity($cart_id,$scope){
            if(auth('sanctum')->check()){
            $user_id=auth('sanctum')->user()->id;
            $cartitem=Cart::where('id',$cart_id)->where('user_id',$user_id)->first();

            if($scope=="inc"){
                if($cartitem->book_qty === 10) {
                    return response()->json([
                        'status'=>200,
                        'message'=>'Quantity updated',
                        ]);
                }
           
               
            
            if($cartitem->book->quantity > 0) {

                $cartitem->book_qty+=1;
            $cartitem->book->update([
                'quantity'=>$cartitem->book->quantity - 1
            ]);

        } 

            } else if($scope=="dec"){
                if($cartitem->book_qty === 1) {
                    return response()->json([
                        'status'=>200,
                        'message'=>'Quantity updated',
                        ]);
                }
            $cartitem->book_qty-=1;

            $cartitem->book->update([
                'quantity'=>$cartitem->book->quantity + 1
            ]);
            }
            $cartitem->update();
            return response()->json([
            'status'=>200,
            'message'=>'Quantity updated',
            ]);
            }
            else{
            return response()->json([
            'status'=>401,
            'message'=>'Login to continue',
            ]);
            }
            }

            public function deleteCartitem($cart_id){
                if(auth('sanctum')->check()){
                $user_id=auth('sanctum')->user()->id;
                $cartitem=Cart::where('id',$cart_id)->where('user_id',$user_id)->first();
                

                if($cartitem){
        
                    $cartitem->book->update([
                        'quantity'=>$cartitem->book->quantity + $cartitem->book_qty
                    ]);


                
                $cartitem->delete();
                return response()->json([
                'status'=>200,
                'message'=>'Cart item removed successfully',
                ]);
                }else{
                return response()->json([
                'status'=>404,
                'message'=>'Cart item not found',
                ]);
                }
                }
                else{
                return response()->json([
                'status'=>401,
                'message'=>'Login to continue',
                ]);
                }
                }


}
