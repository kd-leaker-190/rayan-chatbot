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
        Schema::create('operator_invitations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('website_id')->constrained('websites')->cascadeOnDelete();
            $table->foreignId('role_id')->constrained('roles')->restrictOnDelete();
            $table->foreignId('invited_by_user_id')->nullable()->constrained('users')->nullOnDelete();

            $table->string('email');

            $table->string('token_hash', 64)->unique();

            $table->enum('status', ['pending', 'accepted', 'revoked'])->default('pending');

            $table->timestamp('expires_at');
            $table->timestamp('accepted_at')->nullable();

            $table->index(['website_id', 'email']);
            $table->index(['email', 'status']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operator_invitations');
    }
};
