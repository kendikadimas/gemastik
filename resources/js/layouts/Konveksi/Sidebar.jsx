import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, ShoppingCart, Users, DollarSign, Package } from 'lucide-react';

export default function Sidebar() {
  const { url } = usePage();

  const menuItems = [
    { name: 'Dashboard', href: route('konveksi.dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Pesanan', href: route('konveksi.orders'), icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Pelanggan', href: route('konveksi.customers'), icon: <Users className="w-5 h-5" /> },
    { name: 'Penghasilan', href: route('konveksi.income'), icon: <DollarSign className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex-col shadow-sm hidden md:flex">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-200" style={{ height: '97px' }}>
        <div className="flex items-center gap-3 h-full">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
            <img
              src="/images/lolares.png" // Pastikan path logo benar
              alt="Larasena Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800">Larasena</h1>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = url === item.href || (item.href !== '/' && url.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-[#BA682A] text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}