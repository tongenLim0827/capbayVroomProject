<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;

class BookingRegisteredController extends Controller
{
    /**
     * Display the registration view.
     */
    // public function create(): Response
    // {
    //     return Inertia::render('Auth/Register');
    // }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'phone_no' => 'required|string|max:11',
            'is_purchased' => 'boolean',
            'downpayment_amount' => 'required|integer',
            'loan_amount' => 'required|integer',
        ]);

        $booking = Booking::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_no' => $request->phone_no,
            'is_purchased' => $request->is_purchased,
            'downpayment_amount' => $request->downpayment_amount,
            'loan_amount' => $request->loan_amount,
        ]);

        return back()->with('message', 'Booking submitted successfully.');
    }
}
