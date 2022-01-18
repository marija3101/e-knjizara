<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;
class Cart extends Model
{
    use HasFactory;
    protected $table = 'carts';
    protected $fillable = [
        'user_id',
        'book_qty',
        'book_id',
    ];
    protected $with=['book'];
public function book() {
return $this->belongsTo(Book::class, 'book_id', 'id');
}

}
