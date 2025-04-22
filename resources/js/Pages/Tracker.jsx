import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import BookingDetail from './BookingDetail';

export default function Tracker({ bookings }) {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBookings, setFilteredBookings] = useState(bookings);
    const [isEligible, setIsEligible] = useState(false);

    useEffect(() => {
        // Re-filter bookings whenever the list of bookings changes
        setFilteredBookings(
            bookings.filter(booking => {
                // Convert the search term to lowercase for case-insensitive comparisons
                const lowerSearchTerm = searchTerm.toLowerCase();

                // Check for name
                const matchesName = booking.name.toLowerCase().includes(lowerSearchTerm);

                // Check for is_purchased, ensure it checks true or false
                const matchesIsPurchased = booking.is_purchased.toString().toLowerCase().includes(lowerSearchTerm);

                // Check for downpayment_amount
                const matchesDownpaymentAmount = booking.downpayment_amount.toString().includes(searchTerm);

                // Check for downpayment_amount_paid
                const matchesDownpaymentAmountPaid = booking.downpayment_amount_paid.toString().includes(searchTerm);

                // Check for loan_amount
                const matchesLoanAmount = booking.loan_amount.toString().includes(searchTerm);

                // Check for promotion_eligibility
                const matchesPromotionEligibility = booking.promotion_eligibility.toString().toLowerCase().includes(lowerSearchTerm);

                // Check for created_at
                const matchesCreatedAt = new Date(booking.created_at).toLocaleDateString().toLowerCase().includes(lowerSearchTerm);

                return matchesName ||
                    matchesIsPurchased ||
                    matchesDownpaymentAmount ||
                    matchesDownpaymentAmountPaid ||
                    matchesLoanAmount ||
                    matchesPromotionEligibility ||
                    matchesCreatedAt;
            })
        );
    }, [bookings, searchTerm]);

    const eligibleBookings = bookings
        .filter(booking => booking.is_purchased && (booking.downpayment_amount_paid / booking.downpayment_amount) * 100 >= 10)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const topEligibleBookings = eligibleBookings.slice(0, 15);


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Booking Tracker
                </h2>
            }
        >
            <Head title="Tracker" />

            {showModal && <BookingDetail
                booking={selectedBooking}
                isEdit={isEdit}
                setShowModal={setShowModal}
                setIsEdit={setIsEdit}
                isEligible={isEligible}
            />}

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            Booking Tracker
                        </h2>

                        <div className="mb-6 flex items-centre justify-centre gap-2">
                            <TextInput
                                type="text"
                                placeholder="Search by..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
                            />
                        </div>

                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Booking</th>
                                    <th className="border px-4 py-2">Buyer</th>
                                    <th className="border px-4 py-2">Purchased?</th>
                                    <th className="border px-4 py-2">Downpayment</th>
                                    <th className="border px-4 py-2">Downpayment (PAID)</th>
                                    <th className="border px-4 py-2">Loan</th>
                                    <th className="border px-4 py-2">Eligible for Discount?</th>
                                    <th className="border px-4 py-2">Registered On</th>
                                    <th className="border px-4 py-2">Other Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking, index) => {
                                        const percentPaid = (booking.downpayment_amount_paid / booking.downpayment_amount) * 100;
                                        const isEligible = booking.is_purchased && percentPaid >= 10 && topEligibleBookings.includes(booking);
                                        const bgColor = isEligible ? 'bg-green-500 text-white' : 'bg-red-500 text-white';

                                        return (
                                            <tr key={index} className="text-center">
                                                <td className="border px-4 py-2">{index + 1}</td>
                                                <td className="border px-4 py-2">{booking.name}</td>
                                                <td className="border px-4 py-2 font-bold">
                                                    <div className="inline-block px-3 py-1 rounded-full">
                                                        {booking.is_purchased ? <span className='text-green-600'>Yes</span> : 'No'}
                                                    </div>
                                                </td>
                                                <td className="border px-4 py-2">{booking.downpayment_amount}</td>
                                                <td className="border px-4 py-2">{booking.downpayment_amount_paid}</td>
                                                <td className="border px-4 py-2">{booking.loan_amount}</td>
                                                <td className="border px-4 py-2">
                                                    <div className={`inline-block px-3 py-1 w-full rounded-full text-sm font-medium ${bgColor}`}>
                                                        {isEligible ? 'Yes' : 'No'}
                                                    </div>
                                                </td>
                                                <td className="border px-4 py-2">{new Date(booking.created_at).toLocaleDateString()}</td>
                                                <td className="border px-4 py-2 flex">
                                                    <PrimaryButton className="ms-4" disabled={false}
                                                        onClick={() => {
                                                            setSelectedBooking(booking);
                                                            setShowModal(true);
                                                            setIsEligible(isEligible);
                                                        }}
                                                    >
                                                        View
                                                    </PrimaryButton>
                                                    <PrimaryButton className="ms-4 bg-blue-500 hover:bg-blue-600" disabled={false}
                                                        onClick={() => {
                                                            setSelectedBooking(booking);
                                                            setShowModal(true);
                                                            setIsEdit(true);
                                                            setIsEligible(isEligible);
                                                        }}
                                                    >
                                                        Edit
                                                    </PrimaryButton>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">No bookings found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
