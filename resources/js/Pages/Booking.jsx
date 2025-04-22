import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
export default function Booking() {
    const user = usePage().props.auth.user;
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [loanAmount, setLoanAmount] = useState(200000);
    const { data, setData, post, processing, errors, reset } = useForm({
            name: user.name,
            email: user.email,
            phone_no: user.phone_no,
            is_purchased: true,
            downpayment_amount_paid: 0,
            downpayment_amount: 0,
            loan_amount: loanAmount,
            process_status: 'SUBMITTED'
        });

    useEffect(() => {
        setData('loan_amount', loanAmount - data.downpayment_amount)
    }, [data.downpayment_amount]);
    const submit = (e) => {
        e.preventDefault();

        post(route('booking'), {
            onSuccess: () => {
                setIsSubmitSuccess(true);
            },
            onFinish: () => reset('downpayment_amount_paid', 'downpayment_amount', 'loan_amount'),
        });
    };

    const isEmptyForm = () => {
        if (!data.email || !data.phone_no) return false;

        if (data.is_purchased) {
            return data.downpayment_amount && data.loan_amount;
        }

        return true;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Book an appointment
                </h2>
            }
        >
            <Head title="Booking" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            Booking Form
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                                    disabled={true}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                                    disable={true}
                                    autoComplete="email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="phone_no" value="Phone Number" />

                                <TextInput
                                    id="phone_no"
                                    name="phone_no"
                                    value={data.phone_no}
                                    className="mt-1 block w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                                    disabled={true}
                                    required
                                />
                            </div>

                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="is_purchased"
                                        checked={data.is_purchased}
                                        onChange={(e) =>
                                            setData('is_purchased', e.target.checked)
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        I have purchased the car
                                    </span>
                                </label>
                            </div>

                            {
                                data.is_purchased ?
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="downpayment_amount_paid" value="Downpayment Amount (PAID)" />

                                        <TextInput
                                            id="downpayment_amount_paid"
                                            name="downpayment_amount_paid"
                                            value={data.downpayment_amount_paid}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('downpayment_amount_paid', Number(e.target.value))}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="downpayment_amount" value="Downpayment Amount" />

                                        <TextInput
                                            id="downpayment_amount"
                                            name="downpayment_amount"
                                            value={data.downpayment_amount}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('downpayment_amount', Number(e.target.value))}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="loan_amount" value="Loan Amount" />

                                        <TextInput
                                            id="loan_amount"
                                            name="loan_amount"
                                            value={data.loan_amount}
                                            className="mt-1 block w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                                            disabled={true}
                                            required
                                        />
                                    </div>
                                </div> :
                                <div></div>
                            }

                            <div className="flex justify-end gap-4">
                                {isSubmitSuccess && (
                                    <div className="text-green-500 rounded-lg text-center font-medium">
                                        Booking submitted successfully!
                                    </div>
                                )}
                                <PrimaryButton className="bg-blue-700 hover:bg-blue-800 transition-colors ${
                                        !isEmptyForm() || processing ? 'opacity-50 cursor-not-allowed' : ''}`}"
                                    disabled={!isEmptyForm() || processing}>
                                    SEND
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
