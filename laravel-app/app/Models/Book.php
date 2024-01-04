<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Author;
use App\Models\Genre;


class Book extends Model
{
   
    protected $with=['author','genre'];
    protected $guarded = ['id'];
   
    

    use HasFactory;
   
    public function author()
    {
      
       return $this->belongsTo(Author::class, 'author_id', 'id');
    }
    public function genre()
    {
      
       return $this->belongsTo(Genre::class, 'genre_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
