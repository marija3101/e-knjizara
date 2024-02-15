<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Coupon extends Model
{
    protected $guarded = ['id'];
    use HasFactory;
    protected $table = "coupons";


    public function order()
    {
      
       return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
