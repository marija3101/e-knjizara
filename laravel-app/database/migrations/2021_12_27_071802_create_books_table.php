<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('metatitle')->nullable();
            $table->string('metakeywords')->nullable();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description');
            $table->string('quantity');
            $table->string('language');
            $table->string('cover');
            $table->foreignId('author_id');
            $table->foreignId('genre_id');
            $table->string('image')->nullable();
            $table->tinyInteger('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
