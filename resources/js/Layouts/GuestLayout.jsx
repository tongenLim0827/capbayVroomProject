import { Link } from '@inertiajs/react';
import Base from '@/Pages/Base';

export default function GuestLayout({ children, pageTitle }) {
    return (
        <Base>
            <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center space-y-4">
                <div className='w-full text-left'>
                    <Link
                        href="/"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ← Back to home
                    </Link>
                </div>

                <h1 className="text-center text-xl font-semibold mb-4">
                    {pageTitle === 'Log in' ? 'Log in to get started!' : 'Create account'}
                </h1>

                <div className="w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>

            {/* Footer Link */}
            <div className="text-center">
                {pageTitle === 'Log in' ? (
                    <Link
                        href={route('register')}
                        className="rounded-md px-3 py-2 text-sm text-gray-600 ring-1 ring-transparent transition hover:underline focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Don't have an account? Create one.
                    </Link>
                ) : (
                    <Link
                        href={route('login')}
                        className="rounded-md px-3 py-2 text-sm text-gray-600 ring-transparent transition hover:underline focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Already registered? Log in.
                    </Link>
                )}
            </div>
            </div>
        </Base>

    );
}
