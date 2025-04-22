import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function History() {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View booking history
                </h2>
            }
        >
            <Head title="History" />

            <div className="w-full max-w-2xl mx-auto text-left bg-white/80 dark:bg-zinc-900/80 rounded-3xl shadow-2xl backdrop-blur-md p-8 sm:p-12">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    Booking History
                </h2>
            </div>

        </AuthenticatedLayout>
    );
}
