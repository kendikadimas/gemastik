import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import UserLayout from '@/layouts/User/Layout';

export default function CreateProduction({ designs, convections, products, initialConvectionId, selectedConvection }) {
    const { data, setData, post, processing, errors } = useForm({
        design_id: designs[0]?.id || '',
        product_id: products[0]?.id || '',
        convection_id: selectedConvection?.id || convections[0]?.id || '',
        quantity: 12, // Nilai default
    });

    const selectedDesign = designs.find(d => d.id == data.design_id);

    const submit = (e) => {
        e.preventDefault();
        // Pastikan convection_id diisi jika selectedConvection ada
        if (selectedConvection) {
            setData('convection_id', selectedConvection.id);
        }
        post(route('production.store'));
    };

    return (
        <UserLayout title="Pesan Produksi">
            <Head title="Pesan Produksi Baru" />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
                <h1 className="text-2xl font-bold mb-6 text-[#BA682A]">Formulir Pesanan Produksi</h1>
                
                <form onSubmit={submit} className="space-y-6">
                    {/* Langkah 1: Pilih Desain */}
                    <div>
                        <label className="block text-lg font-medium mb-2">1. Pilih Desain Anda</label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                            {designs.map(design => (
                                <div 
                                    key={design.id} 
                                    onClick={() => setData('design_id', design.id)}
                                    className={`border-4 rounded-lg cursor-pointer transition-all ${data.design_id == design.id ? 'border-[#BA682A]' : 'border-transparent'}`}
                                >
                                    <img src={design.image_url} alt={design.title} className="w-full h-24 object-cover rounded-md"/>
                                    <p className="text-xs text-center p-1 truncate">{design.title}</p>
                                </div>
                            ))}
                        </div>
                        {errors.design_id && <p className="text-sm text-red-500 mt-2">{errors.design_id}</p>}
                    </div>

                    {/* Langkah 2: Pilih Produk & Konveksi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                        <div>
                            <label htmlFor="product_id" className="block text-lg font-medium mb-2">2. Pilih Tipe Produk</label>
                            <select
                                id="product_id"
                                value={data.product_id}
                                onChange={e => setData('product_id', e.target.value)}
                                className="w-full border-gray-300 rounded-lg"
                            >
                                {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                            </select>
                            {errors.product_id && <p className="text-sm text-red-500 mt-2">{errors.product_id}</p>}
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">3. Mitra Konveksi</label>
                            {selectedConvection ? (
                                <>
                                    {/* Tampilkan info konveksi */}
                                    <div className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100">
                                        <p className="font-semibold">{selectedConvection.name}</p>
                                        <p className="text-sm text-gray-500">{selectedConvection.location}</p>
                                    </div>
                                    {/* Input hidden agar convection_id tetap dikirim */}
                                    <input
                                        type="hidden"
                                        name="convection_id"
                                        value={data.convection_id || selectedConvection.id}
                                    />
                                </>
                            ) : (
                                // Jika tidak, tampilkan sebagai dropdown
                                <select
                                    id="convection_id"
                                    value={data.convection_id}
                                    onChange={e => setData('convection_id', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg"
                                >
                                    {convections.map(convection => <option key={convection.id} value={convection.id}>{convection.name}</option>)}
                                </select>
                            )}
                            {errors.convection_id && <p className="text-sm text-red-500 mt-2">{errors.convection_id}</p>}
                        </div>
                    </div>

                    {/* Langkah 3: Jumlah & Detail */}
                    <div className="pt-4 border-t">
                        <label htmlFor="quantity" className="block text-lg font-medium mb-2">4. Tentukan Jumlah (min. 12 pcs)</label>
                        <input
                            id="quantity"
                            type="number"
                            min="12"
                            value={data.quantity}
                            onChange={e => setData('quantity', e.target.value)}
                            className="w-full md:w-1/3 border-gray-300 rounded-lg"
                        />
                        {errors.quantity && <p className="text-sm text-red-500 mt-2">{errors.quantity}</p>}
                    </div>

                    {/* Tombol Submit */}
                    <div className="text-right pt-6">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-8 py-3 bg-[#BA682A] text-white font-bold rounded-lg hover:bg-[#A0522D] disabled:bg-gray-400"
                        >
                            {processing ? 'Memproses...' : 'Kirim Pesanan Produksi'}
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}