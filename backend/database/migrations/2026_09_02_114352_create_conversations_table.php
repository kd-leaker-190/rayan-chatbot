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
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('website_id')->constrained('websites')->cascadeOnDelete();
            $table->foreignId('visitor_id')->constrained('visitors')->restrictOnDelete();
            $table->foreignId('operator_id')->nullable()->constrained('operators')->nullOnDelete();

            $table->string('title');

            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');

            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('closed_at')->nullable();

            $table->timestamp('visitor_last_read_at')->nullable();
            $table->timestamp('operator_last_read_at')->nullable();

            $table->index(['website_id', 'status']);
            $table->index(['operator_id', 'status']);
            $table->index(['visitor_id', 'created_at']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
