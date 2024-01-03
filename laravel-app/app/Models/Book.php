<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Author;
use App\Models\PublicationCity;


class Book extends Model
{
   
    protected $with=['author','city'];
    protected $guarded = ['id'];
   
    

    use HasFactory;
   
    public function author()
    {
      
       return $this->belongsTo(Author::class, 'author_id', 'id');
    }
    public function city()
    {
      
       return $this->belongsTo(PublicationCity::class, 'city_id', 'id');
    }
    public function publicationCity()
    {
        
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
