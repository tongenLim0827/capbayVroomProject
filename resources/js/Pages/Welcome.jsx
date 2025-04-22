import { Head, Link } from '@inertiajs/react';
import Base from './Base';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
        <Base>
            <Head title="Welcome" />
            <div className="w-full max-w-3xl text-center bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl backdrop-blur-lg py-10 px-6">

                <div className="flex justify-center mb-6">
                    <img src="images/sport-car.png" alt="Car Icon" className="h-20 w-20" />
                </div>

                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                    CapBay Vroom Test Drive
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    Register and schedule your test drive experience with ease.
                </p>

                <nav className="flex justify-center gap-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-full px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-full px-6 py-3 text-white bg-green-600 hover:bg-green-700 transition shadow-lg"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-full px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 transition shadow-lg"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </Base>
        </>
    );
}
