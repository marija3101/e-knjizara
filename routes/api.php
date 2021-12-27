<?php

use App\Models\PublicationCity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::resource('user.book', UserBookController::class)->only(['index']);
Route::resource('author.book', AuthorBooksController::class)->only(['index']);
Route::resource('city.book', StarringSeriesController::class)->only(['index']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profiles', function (Request $request) {
        return auth()->user();
    });
    Route::resource('books', BookController::class)->only(['update', 'store', 'destroy']);
    Route::resource('authors', AuthorController::class)->only(['update', 'store', 'destroy']);
    Route::resource('city', PublicationCityController::class)->only(['update', 'store', 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::resource('books', BookController::class)->only(['index', 'show']);
Route::resource('authors', AuthorController::class)->only(['index', 'show']);
Route::resource('city', PublicationCityController::class)->only(['index', 'show']);
