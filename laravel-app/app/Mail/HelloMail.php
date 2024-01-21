<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use PDF;
use App\Models\Order;
use App\Models\Orderitems;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;




class HelloMail extends Mailable
{
    use Queueable, SerializesModels;
    public $korisnik;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($korisnik)
    {
        $this->korisnik = $korisnik;

        
       
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

       $items = null;
        $user_id=auth('sanctum')->user()->id;
        $orderitems=Order::where('user_id',$user_id)->get();
        

        $items=Orderitems::where('order_id',$orderitems[sizeof($orderitems)-1]->id)->get();
        $bookId = array();
        foreach ($items as $item) {
           
            array_push($bookId,  $item->book_id);
           
        }
        $books = array();
        foreach ($bookId as $b) {

        array_push($books,  Book::where('id', $b)->get()); 
        }
        $pdf = PDF::loadView('faktura', array('orderitems' => $orderitems, 'items'=> $items, 'books'=>$books));
        return $this->view('mail')->subject('Porudžbina')->attachData($pdf->output(), "faktura.pdf");
        
        
    }
}
