// pages/index.js
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <header className="w-full bg-green-500 text-white text-center py-4">
                <h1 className="text-2xl font-bold">Welcome!</h1>
            </header>
            <main className="flex flex-col items-center mt-10">
                <button 
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-600 transition duration-200"
                    onClick={() => router.push('/barcodescanner')}
                >
                    Barcode Scanner
                </button>
                <button 
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-600 transition duration-200 mt-4"
                    onClick={() => router.push('/ocrscanner')}
                >
                    OCR Scanner
                </button>
            </main>
        </div>
    );
}