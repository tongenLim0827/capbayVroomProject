import { Head, Link } from '@inertiajs/react';

export default function Base({ children }) {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-cover bg-center relative selection:bg-[#FF2D20] selection:text-white"
                style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/005/880/500/non_2x/background-with-blue-gradient-free-vector.jpg')" }}>

                <div className="relative z-10 flex-grow flex items-center justify-center px-6">
                    {children}
                </div>

                <footer className="relative z-10 text-center py-4 text-sm">
                    &copy; 2025 CapBay Auto. All rights reserved.
                </footer>
            </div>
        </>
    );
}
