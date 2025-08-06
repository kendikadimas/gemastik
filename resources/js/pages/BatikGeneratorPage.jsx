import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import axios from 'axios';

export default function BatikGeneratorPage({ auth }) {
    const [prompt, setPrompt] = useState('');
    const [resultImage, setResultImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResultImage(null);
        setError('');

        if (!prompt) {
            setError('Deskripsi batik tidak boleh kosong.');
            setIsLoading(false);
            return;
        }

        try {
            // Memanggil backend Laravel Anda. URL ini harus cocok dengan yang ada di routes/api.php
            const response = await axios.post('/api/batik-generator', { prompt });
            
            // Laravel akan mengembalikan data gambar dalam format Base64
            if (response.data.image_data) {
                setResultImage(response.data.image_data);
            } else {
                throw new Error('Respons dari server tidak berisi data gambar.');
            }

        } catch (err) {
            console.error("Submit Error:", err.response);
            // Menampilkan pesan error yang lebih informatif dari backend jika ada
            setError(err.response?.data?.error || 'Terjadi kesalahan di server. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="AI Batik Generator" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-2 text-center">AI Batik Generator</h2>
                        <p className="text-gray-600 text-center mb-6">Jelaskan motif batik yang Anda inginkan, dan biarkan AI membuatnya untuk Anda.</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Contoh: 'seekor burung merak dengan ekor bunga teratai, gaya tradisional, warna biru dan emas'"
                                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    disabled={isLoading}
                                ></textarea>
                            </div>
                            
                            <div className="text-center">
                                <button type="submit" disabled={isLoading} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-all">
                                    {isLoading ? 'Sedang Menggambar...' : 'Buat Batik'}
                                </button>
                            </div>
                        </form>

                        {/* Area untuk menampilkan hasil atau status */}
                        <div className="mt-10 pt-6 border-t min-h-[100px]">
                            {isLoading && (
                                <div className="text-center">
                                    <p className="font-semibold">AI sedang bekerja, proses ini bisa memakan waktu hingga 1 menit...</p>
                                    <p className="text-sm text-gray-500">Mohon jangan menutup atau me-refresh halaman.</p>
                                </div>
                            )}
                            
                            {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
                            
                            {resultImage && (
                                <div>
                                    <h3 className="text-2xl font-bold text-center mb-4">Hasil Karya AI</h3>
                                    <img 
                                        src={resultImage} 
                                        alt="Hasil AI Batik Generator" 
                                        className="mx-auto rounded-lg shadow-xl border" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}