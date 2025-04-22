<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'downpayment_amount_paid' => 'required|integer',
            'loan_amount' => 'required|integer',
            'promotion_eligibility' => 'boolean',
            'process_status' => 'string'
        ]);

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'email' => $request->email,
            'phone_no' => $request->phone_no,
            'is_purchased' => $request->is_purchased,
            'downpayment_amount' => $request->downpayment_amount,
            'downpayment_amount_paid' => $request->downpayment_amount_paid,
            'loan_amount' => $request->loan_amount,
            'promotion_eligibility' => $request->promotion_eligibility,
            'process_status' => $request->process_status,
        ]);

        return back()->with('message', 'Booking submitted successfully.');
    }

    public function history(Request $request)
    {
        $user = $request->user();

        $bookings = $user->bookings()->latest()->get();

        return response()->json($bookings);
    }
}
