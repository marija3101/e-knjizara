<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;
use App\Models\User;

class Comment extends Model
{
    protected $with=['book'];
    protected $guarded = ['id'];
    use HasFactory;

    public function book()
    {
      
       return $this->belongsTo(Book::class, 'book_id', 'id');
    }

}
