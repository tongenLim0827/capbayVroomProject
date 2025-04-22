import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function BookingDetail({ booking, isEdit, setShowModal, setIsEdit, isEligible }) {
    // const [editedBooking, setEditedBooking] = useState({ ...booking });
    const bgColor = isEligible ? 'bg-green-500 text-white' : 'bg-red-500 text-white';

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: booking.name,
        email: booking.email,
        phone_no: booking.phone_no,
        process_status: booking.process_status,
        is_purchased: booking.is_purchased,
        downpayment_amount: booking.downpayment_amount,
        downpayment_amount_paid: booking.downpayment_amount_paid,
        loan_amount: booking.loan_amount,
        promotion_eligibility: booking.promotion_eligibility,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleClose = () => {
        setShowModal(false);
        setIsEdit(false);
    };

    const handleSave = () => {
        patch(route('tracker.update', booking.id), {
            ...data,
            onFinish: () => {
                handleClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl transition-all">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{isEdit ? 'Edit Booking' : 'Booking Details'}</h2>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                        { label: 'Name', key: 'name' },
                        { label: 'Email', key: 'email' },
                        { label: 'Phone Number', key: 'phone_no' },
                        { label: 'Process Status', key: 'process_status', isEditable: true },
                        { label: 'Purchase Status', key: 'is_purchased', isBoolean: true },
                        { label: 'Downpayment', key: 'downpayment_amount', isEditable: true },
                        { label: 'Downpayment Paid', key: 'downpayment_amount_paid' },
                        { label: 'Loan', key: 'loan_amount' },
                        { label: 'Promotion Eligibility', key: 'promotion_eligibility', isEditable: true },
                        { label: 'Registered On', key: 'created_at', isDate: true },
                    ].map(({ label, key, isEditable, isBoolean, isDate }) => (
                        <div key={key}>
                            <p className="text-gray-600 font-medium mb-1">{label}</p>
                            {isEdit && isEditable ? (
                                key === 'process_status' ? (
                                    <select
                                        name={key}
                                        value={data[key]}
                                        onChange={handleChange}
                                        className={`w-full border-white rounded px-3 py-1 text-gray-700 focus:outline-none focus:ring focus:bg-gray-200
                                            ${data[key] === 'SUBMITTED' ? 'bg-blue-300 text-black' :
                                                data[key] === 'PROCESSING' ? 'bg-yellow-300 text-black' :
                                                data[key] === 'COMPLETED' ? 'bg-green-300 text-black' :
                                                data[key] === 'REJECTED' ? 'bg-red-300 text-black' :
                                            'bg-gray-100 text-gray-800'}`}
                                    >
                                        <option value="SUBMITTED">Submitted</option>
                                        <option value="PROCESSING">In Progress</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="REJECTED">Cancelled</option>
                                    </select>
                                ) : (
                                    key === 'promotion_eligibility' ? (
                                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}>
                                            {isEligible ? 'Yes' : 'No'}
                                        </div>
                                    ) : (
                                        <TextInput
                                            type="text"
                                            name={key}
                                            value={data[key]}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-1 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    )
                                )
                            ) : (isBoolean) ? (
                                <p className={`font-semibold ${booking[key] ? 'text-green-600' : 'text-red-500'}`}>
                                    {booking[key] ? 'Yes' : 'No'}
                                </p>
                            ) : isDate ? (
                                <p>{new Date(booking[key]).toLocaleString()}</p>
                            ) : (key === 'promotion_eligibility' ? (
                                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}>
                                    {isEligible ? 'Yes' : 'No'}
                                </div>
                            ) : (
                                <p>{booking[key]}</p>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end gap-4 justify-center">
                    {isEdit && (
                        <PrimaryButton
                            onClick={handleClose}
                            className="bg-white hover:text-white text-black rounded transition"
                        >
                            Cancel
                        </PrimaryButton>
                    )}
                    <PrimaryButton
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                    >
                        {isEdit ? 'Save' : 'Close'}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
