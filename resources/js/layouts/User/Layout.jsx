import Sidebar from './Sidebar';
import { Head } from '@inertiajs/react';
import { Bell, Settings } from 'lucide-react';

export default function UserLayout({ children, title }) {
  return (
    <>
      <Head title={title} />
      <div className="flex bg-gray-50">
        <Sidebar />
        <main className="flex-1 min-h-screen">
          <header
            className="flex items-center justify-between px-6 py-6 border-b bg-white shadow-sm"
            style={{ height: '97px' }}
          >
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#BA682A' }}>Hi, Moreno! Selamat Membatik</h1>
              {/* <p className="text-sm text-gray-400 mt-1">
                Selamat datang kembali, berikut batik yang sudah anda buat.
              </p> */}
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <img 
                src="https://i.pravatar.cc/32" 
                alt="Avatar" 
                className="rounded-full w-8 h-8" 
              />
            </div>
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
