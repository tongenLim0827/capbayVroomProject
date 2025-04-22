import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function History() {

    const { bookings } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View booking history
                </h2>
            }
        >
            <Head title="History" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            Booking History
                        </h2>

                        <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Booking No</th>
                        <th className="border px-4 py-2">Purchased</th>
                        <th className="border px-4 py-2">Downpayment</th>
                        <th className="border px-4 py-2">Downpayment(PAID)</th>
                        <th className="border px-4 py-2">Loan</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <tr key={index} className="text-center">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2 font-bold">
                                    <div className="inline-block px-3 py-1 rounded-full">
                                        {booking.is_purchased ? <span className='text-green-600'>Yes</span> : 'No'}
                                    </div>
                                </td>
                                <td className="border px-4 py-2">{booking.downpayment_amount}</td>
                                <td className="border px-4 py-2">{booking.downpayment_amount_paid}</td>
                                <td className="border px-4 py-2">{booking.loan_amount}</td>
                                <td className="border px-4 py-2">
                                    <div className={
                                            `inline-block px-3 py-1 rounded-full text-sm font-medium
                                            ${booking.process_status === 'SUBMITTED' ? 'bg-blue-300 text-white' :
                                            booking.process_status === 'PROCESSING' ? 'bg-yellow-300 text-white' :
                                            booking.process_status === 'COMPLETED' ? 'bg-green-300 text-white' :
                                            booking.process_status === 'REJECTED' ? 'bg-red-300 text-white' :
                                            'bg-gray-100 text-gray-800'}`
                                        }>
                                        {booking.process_status}
                                    </div>
                                </td>
                                <td className="border px-4 py-2">{new Date(booking.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-4">No bookings yet.</td>
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
