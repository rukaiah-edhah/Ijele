'use client';

import { useRouter } from 'next/navigation';

export default function SuccessPage() {
    const router = useRouter();

    const handleGoToHome = () => {
        router.push('/Home');
    };

    return (
        <div className="flex items-center justify-center min-h-screen container mx-auto p-6">
            <div className="max-w-lg mx-auto text-center bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-gray-700 mb-6">Thank you for your payment. Your transaction was completed successfully.</p>
                <button
                    onClick={handleGoToHome}
                    className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}
