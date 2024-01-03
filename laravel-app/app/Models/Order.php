<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Orderitems;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $guarded = ['id'];
    public function orderitems(){
        return $this->hasMany(Orderitems::class, 'order_id', 'id');
    }
}
