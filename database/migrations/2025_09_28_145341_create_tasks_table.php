<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
            $table->text('details')->nullable(); 
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium'); 
            $table->enum('space', ['work', 'fitness', 'personal']); 
            $table->date('due_date')->nullable(); 
            $table->json('tags')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
