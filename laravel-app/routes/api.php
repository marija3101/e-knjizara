<?php

use App\Models\Genre;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserBookController;
use App\Http\Controllers\AuthorBookController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreBookController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Mail;
use App\Mail\HelloMail;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('user.books', UserBookController::class)->only(['index']);
Route::resource('author.books', AuthorBookController::class)->only(['index']);
Route::resource('genre.books', GenreBookController::class)->only(['index']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('getAuthor',[FrontendController::class,'author']);

Route::get('fetchbooks/{slug}',[FrontendController::class,'book']);

Route::get('viewbookdetail/{author_slug}/{book_slug}',[FrontendController::class,'viewbook']);

Route::get('cart', [CartController::class, 'viewcart']);

Route::get('view-comment/{book_id}', [CommentController::class, 'viewcom']);

Route::put('cart-updatequantity/{cart_id}/{scope}',[CartController::class,'updatequantity']);

Route::delete('delete-cartitem/{cart_id}',[CartController::class,'deleteCartitem']);



Route::post('add-to-cart',[CartController::class,'addtocart']);

Route::post('place-order',[CheckoutController::class, 'placeorder']);

Route::group(['middleware' => ['auth:sanctum','isAdmin']], function () {

   

    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message'=>'You are in', 'status'=>200],200);
    });
    Route::resource('books', BookController::class)->only(['update', 'store', 'destroy']);
    Route::resource('store-author', AuthorController::class)->only(['store']);
    Route::resource('store-genre',GenreController::class)->only(['store']);

    

    Route::get('admin/orders', [OrderController::class, 'index']);

   
    Route::resource('genres', GenreController::class)->only(['update', 'store', 'destroy']);

    Route::get('all-authors', [AuthorController::class, 'allauthors']);
    Route::get('all-genres', [GenreController::class, 'allgenres']);
    Route::get('all-users', [UserController::class, 'allusers']);
    
    Route::resource('store-book', BookController::class)->only(['store']);
    
    

    Route::get('edit-author/{id}',[AuthorController::class,'edit']);
Route::put('update-author/{id}',[AuthorController::class,'update']);
Route::delete('delete-author/{id}',[AuthorController::class,'destroy']);
Route::get('edit-book/{id}', [BookController::class,'edit']);
Route::post('update-book/{id}', [BookController::class,'update']);
Route::get('edit-genre/{id}', [GenreController::class,'edit']);
Route::post('update-genre/{id}', [GenreController::class,'update']);
Route::delete('delete-book/{id}',[BookController::class,'destroy']);
Route::delete('delete-genre/{id}',[GenreController::class,'destroy']);

});
Route::group(['middleware' => ['auth:sanctum']], function () {


    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('mail', function () {
        $user = auth()->user();
        Mail::to($user->email)->send(new HelloMail($user));
        
    });

   
});



Route::resource('books', BookController::class)->only(['index', 'show']);
Route::resource('view-author', AuthorController::class)->only(['index']);
Route::resource('view-book', BookController::class)->only(['index']);
Route::resource('store-comment', CommentController::class)->only(['store']);
Route::resource('view-genre', GenreController::class)->only(['index']);
Route::resource('genres', GenreController::class)->only(['index', 'show']);



