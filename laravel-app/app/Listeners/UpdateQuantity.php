<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\Book;
use App\Events\Quantity;

class UpdateQuantity
{


    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(Quantity $event)
    {
        
        $data = $event->data;


        $book = Book::where('id',  $data['book_id'])->get();

        
        foreach($book as $item) {

        $item->update([
            'quantity'=> $item->quantity - $data['book_qty']
        ]);

        
    }

    }
}
