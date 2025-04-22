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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('name');
            $table->string('email');
            $table->string('phone_no');
            $table->unsignedInteger('downpayment_amount_paid');
            $table->boolean('promotion_eligibility')->default(false);
            $table->string('process_status');
            $table->boolean('is_purchased')->default(false);
            $table->decimal('downpayment_amount', 10, 2)->nullable();
            $table->decimal('loan_amount', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
