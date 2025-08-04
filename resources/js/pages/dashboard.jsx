import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // Pastikan <Link> diimpor

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Selamat datang, {auth.user.name}!</div>
                    </div>

                    {/* ✨ TOMBOL UNTUK MEMULAI DESAIN ✨ */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                        <div className="p-6 text-center">
                            <h3 className="text-lg font-medium text-gray-900">Siap Berkreasi?</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Mulai desain batik unik Anda sekarang juga dengan motif-motif pilihan kami.
                            </p>
                            <Link
                                href={route('editor.show')} // Menggunakan nama route yang dibuat di web.php
                                className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Buat Desain Baru
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}