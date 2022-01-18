<?php

use App\Models\PublicationCity;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserBookController;
use App\Http\Controllers\AuthorBookController;
use App\Http\Controllers\PublicationCityController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\PublicationCityBookController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\CartController;

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
Route::resource('city.books', PublicationCityBookController::class)->only(['index']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('getAuthor',[FrontendController::class,'author']);

Route::get('fetchbooks/{slug}',[FrontendController::class,'book']);

Route::get('viewbookdetail/{author_slug}/{book_slug}',[FrontendController::class,'viewbook']);

Route::get('cart', [CartController::class, 'viewcart']);

Route::put('cart-updatequantity/{cart_id}/{scope}',[CartController::class,'updatequantity']);

Route::delete('delete-cartitem/{cart_id}',[CartController::class,'deleteCartitem']);

Route::post('add-to-cart',[CartController::class,'addtocart']);

Route::group(['middleware' => ['auth:sanctum','isAdmin']], function () {

    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message'=>'You are in', 'status'=>200],200);
    });
    Route::resource('books', BookController::class)->only(['update', 'store', 'destroy']);
    Route::resource('store-author', AuthorController::class)->only(['store']);
    Route::resource('store-city', PublicationCityController::class)->only(['store']);

    
   
    Route::resource('cities', PublicationCityController::class)->only(['update', 'store', 'destroy']);

    Route::get('all-authors', [AuthorController::class, 'allauthors']);
    Route::get('all-citis', [PublicationCityController::class, 'allcitis']);
    Route::get('all-users', [UserController::class, 'allusers']);
    
    Route::resource('store-book', BookController::class)->only(['store']);

    Route::get('edit-author/{id}',[AuthorController::class,'edit']);
Route::put('update-author/{id}',[AuthorController::class,'update']);
Route::delete('delete-author/{id}',[AuthorController::class,'destroy']);
Route::get('edit-book/{id}', [BookController::class,'edit']);
Route::post('update-book/{id}', [BookController::class,'update']);
Route::get('edit-city/{id}', [PublicationCityController::class,'edit']);
Route::post('update-city/{id}', [PublicationCityController::class,'update']);
Route::delete('delete-book/{id}',[BookController::class,'destroy']);
Route::delete('delete-city/{id}',[PublicationCityController::class,'destroy']);

});
Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/logout', [AuthController::class, 'logout']);
});



Route::resource('books', BookController::class)->only(['index', 'show']);
Route::resource('view-author', AuthorController::class)->only(['index']);
Route::resource('view-book', BookController::class)->only(['index']);
Route::resource('view-city', PublicationCityController::class)->only(['index']);
Route::resource('cities', PublicationCityController::class)->only(['index', 'show']);
