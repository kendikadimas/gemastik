import { Head } from '@inertiajs/react';
import { useState } from 'react';
// import { Client } from "@gradio/client";

export default function BatikGeneratorPage({ auth }) {
    const [prompt, setPrompt] = useState('');
    const [resultImage, setResultImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt) {
            setError('Deskripsi batik tidak boleh kosong.');
            return;
        }

        setIsLoading(true);
        setResultImage(null);
        setError('');

        if (!window.gradio_client) {
        setError("Gradio client tidak berhasil dimuat. Coba refresh halaman.");
        setIsLoading(false);
        return;
    }

        try {
            const { client } = window.gradio_client;

            // Hubungkan ke Hugging Face Space Anda
            const app = await client("https://kendika-trial.hf.space/");
        
            // Panggil fungsi 'predict'
            const result = await app.predict("/predict", {
            prompt: prompt,
        });
            console.log('API Result:', result);

            const imageData = result.data[0];
            setResultImage(imageData);

        } catch (err) {
            console.error("API Error:", err);
            setError('Gagal menghasilkan gambar. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-12">
            <Head title="AI Batik Generator" />
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

                    {isLoading && (
                        <div className="text-center mt-8">
                            <p>AI sedang bekerja, mohon tunggu sebentar...</p>
                        </div>
                    )}
                    {resultImage && (
                        <div className="mt-10 pt-6 border-t">
                            <h3 className="text-2xl font-bold text-center mb-4">Hasil Karya Anda</h3>
                            <img src={resultImage} alt="Hasil AI Batik Generator" className="mx-auto rounded-lg shadow-xl" />
                        </div>
                    )}
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
}
