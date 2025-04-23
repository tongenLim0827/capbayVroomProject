<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Inertia\Inertia;

class TrackerController extends Controller
{
    public function index()
    {
        $bookings = Booking::all();
        return inertia('Tracker', [
            'bookings' => $bookings
        ]);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $updated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_no' => 'required|string|max:20',
            'process_status' => 'required|string|in:SUBMITTED,PROCESSING,COMPLETED,REJECTED',
            'is_purchased' => 'required|boolean',
            'downpayment_amount' => 'required|numeric',
            'downpayment_amount_paid' => 'required|numeric',
            'loan_amount' => 'required|numeric',
            'promotion_eligibility' => 'required|boolean',
        ]);

        if ($booking) {
            $booking->update($request->all());
            return redirect()->route('tracker.index')->with(['message' => 'Booking updated successfully']);
        }

        return response()->json(['message' => 'Booking not found'], 404);

    }
}
