// Pages/User/Produksi.jsx
import UserLayout from '@/layouts/User/Layout';
import { useState } from 'react';
import { 
  Plus, 
  Clock, 
  Package, 
  CheckCircle, 
  ArrowRight, 
  Upload, 
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Palette,
  Ruler,
  ShoppingBag,
  CreditCard,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  AlertCircle
} from 'lucide-react';

export default function Produksi() {
  const [currentStep, setCurrentStep] = useState('dashboard'); // dashboard, create, form, confirmation
  const [selectedMotif, setSelectedMotif] = useState(null);
  const [orderData, setOrderData] = useState({});

  // Sample existing orders
  const existingOrders = [
    {
      id: 'ORD-2024-001',
      motif: 'Batik Parang Barong',
      type: 'Batik Tulis',
      quantity: 50,
      status: 'Dalam Produksi',
      progress: 65,
      estimatedDays: 14,
      orderDate: '2024-07-15',
      customer: 'PT. Budaya Nusantara',
      value: 15000000
    },
    {
      id: 'ORD-2024-002',
      motif: 'Batik Kawung Modern',
      type: 'Batik Cap',
      quantity: 100,
      status: 'Menunggu Konfirmasi',
      progress: 0,
      estimatedDays: 21,
      orderDate: '2024-08-01',
      customer: 'Toko Batik Indah',
      value: 12500000
    },
    {
      id: 'ORD-2024-003',
      motif: 'Batik Truntum Wedding',
      type: 'Batik Printing',
      quantity: 200,
      status: 'Selesai',
      progress: 100,
      estimatedDays: 0,
      orderDate: '2024-06-20',
      customer: 'Wedding Organizer Sari',
      value: 8000000
    }
  ];

  const availableMotifs = [
    {
      id: 1,
      name: 'Batik Parang Barong',
      category: 'Tradisional',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      basePrice: 300000
    },
    {
      id: 2,
      name: 'Batik Kawung Prabu',
      category: 'Tradisional',
      image: 'https://images.unsplash.com/photo-1594736797933-d0f59ba4e24d?w=300&h=300&fit=crop',
      basePrice: 350000
    },
    {
      id: 3,
      name: 'Batik Mega Mendung',
      category: 'Nusantara',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      basePrice: 280000
    },
    {
      id: 4,
      name: 'Batik Modern Fractal',
      category: 'Modern',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&h=300&fit=crop',
      basePrice: 400000
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Dalam Produksi': return '#F59E0B';
      case 'Menunggu Konfirmasi': return '#EF4444';
      case 'Selesai': return '#10B981';
      default: return '#6B7280';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  // Dashboard View
  const DashboardView = () => (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#BA682A' }}>
            Manajemen Produksi
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola pesanan produksi batik Anda dengan mudah
          </p>
        </div>
        <button
          onClick={() => setCurrentStep('create')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#BA682A] text-white font-semibold rounded-xl hover:bg-[#9d5a24] transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Buat Pesanan Baru
        </button>
      </div>

      {/* Stats Cards - Gradient Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow" style={{ background: 'linear-gradient(135deg, #BA682A 0%, #8B4513 100%)' }}>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">124</div>
            <div className="text-sm opacity-90 font-medium">Total Pesanan</div>
          </div>
          <div className="mt-4">
            <span className="text-xs opacity-75">Bulan ini</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">15</div>
            <div className="text-sm opacity-90 font-medium">Dalam Produksi</div>
          </div>
          <div className="mt-4">
            <span className="text-xs opacity-75">Sedang dikerjakan</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">89</div>
            <div className="text-sm opacity-90 font-medium">Pesanan Selesai</div>
          </div>
          <div className="mt-4">
            <span className="text-xs opacity-75">Bulan ini</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow" style={{ background: 'linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)' }}>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">2.8B</div>
            <div className="text-sm opacity-90 font-medium">Total Pendapatan</div>
          </div>
          <div className="mt-4">
            <span className="text-xs opacity-75">Rupiah</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Daftar Pesanan</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari pesanan..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID Pesanan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Motif & Jenis</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Qty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nilai</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {existingOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.orderDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.motif}</div>
                    <div className="text-sm text-gray-500">{order.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{order.quantity}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${order.progress}%`,
                            backgroundColor: getStatusColor(order.status)
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{order.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{formatCurrency(order.value)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Create Order View
  const CreateOrderView = () => (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setCurrentStep('dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
        </button>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#BA682A' }}>
            Pilih Motif Batik
          </h1>
          <p className="text-gray-600 mt-1">
            Pilih motif yang ingin diproduksi untuk pesanan baru
          </p>
        </div>
      </div>

      {/* Motif Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableMotifs.map((motif) => (
          <div
            key={motif.id}
            onClick={() => {
              setSelectedMotif(motif);
              setCurrentStep('form');
            }}
            className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={motif.image}
                alt={motif.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-[#BA682A] text-white text-xs font-semibold rounded-full">
                  {motif.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">{motif.name}</h3>
                  <p className="text-white/90 text-sm">Mulai dari {formatCurrency(motif.basePrice)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Order Form View
  const OrderFormView = () => (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setCurrentStep('create')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
        </button>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#BA682A' }}>
            Detail Pesanan
          </h1>
          <p className="text-gray-600 mt-1">
            Lengkapi informasi pesanan untuk motif {selectedMotif?.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form className="space-y-8">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#BA682A]" />
                  Informasi Customer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Perusahaan
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      placeholder="Masukkan nama perusahaan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      placeholder="customer@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap *
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                    placeholder="Masukkan alamat lengkap"
                  ></textarea>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#BA682A]" />
                  Detail Produk
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenis Batik *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent">
                      <option>Batik Tulis</option>
                      <option>Batik Cap</option>
                      <option>Batik Printing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah (pcs) *
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      placeholder="50"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ukuran Kain
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent">
                      <option>210 cm x 110 cm (Standar)</option>
                      <option>250 cm x 110 cm</option>
                      <option>Custom Size</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan Khusus
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                    placeholder="Tambahkan catatan khusus untuk pesanan ini..."
                  ></textarea>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#BA682A]" />
                  Upload Referensi (Opsional)
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#BA682A] transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    Upload file referensi
                  </h4>
                  <p className="text-gray-500 mb-4">
                    Drag & drop file atau klik untuk browse
                  </p>
                  <button
                    type="button"
                    className="px-6 py-2 bg-[#BA682A] text-white rounded-lg hover:bg-[#9d5a24] transition-colors"
                  >
                    Pilih File
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep('create')}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep('confirmation')}
                  className="flex-1 px-6 py-3 bg-[#BA682A] text-white rounded-xl hover:bg-[#9d5a24] transition-colors flex items-center justify-center gap-2"
                >
                  Lanjut ke Konfirmasi
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Ringkasan Pesanan
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMotif?.image}
                  alt={selectedMotif?.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-800">{selectedMotif?.name}</h4>
                  <p className="text-sm text-gray-500">{selectedMotif?.category}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 py-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Harga Dasar</span>
                <span className="font-medium">{formatCurrency(selectedMotif?.basePrice || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimasi Quantity (50 pcs)</span>
                <span className="font-medium">{formatCurrency((selectedMotif?.basePrice || 0) * 50)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Biaya Admin</span>
                <span className="font-medium">Gratis</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-semibold pt-4 border-t border-gray-200">
              <span>Total Estimasi</span>
              <span style={{ color: '#BA682A' }}>{formatCurrency((selectedMotif?.basePrice || 0) * 50)}</span>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-blue-800 font-medium">Catatan Harga</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Harga final akan disesuaikan berdasarkan spesifikasi dan quantity pesanan Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Confirmation View
  const ConfirmationView = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Pesanan Berhasil Dibuat!
        </h1>
        <p className="text-gray-600">
          Pesanan Anda telah berhasil dibuat dan akan segera diproses oleh tim kami.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Detail Pesanan</h2>
          <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            Menunggu Konfirmasi
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">ID Pesanan</h3>
            <p className="text-2xl font-bold text-[#BA682A]">ORD-2024-004</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Tanggal Pesanan</h3>
            <p className="text-gray-600">06 Agustus 2024</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Motif Batik</h3>
            <p className="text-gray-600">{selectedMotif?.name}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Estimasi Selesai</h3>
            <p className="text-gray-600">27 Agustus 2024</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-800 mb-4">Timeline Proses</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Pesanan Dibuat</p>
                <p className="text-sm text-gray-500">06 Agustus 2024, 14:30</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Menunggu Konfirmasi</p>
                <p className="text-sm text-gray-500">Tim akan menghubungi dalam 2 jam</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-400">Proses Produksi</p>
                <p className="text-sm text-gray-400">Setelah konfirmasi pembayaran</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-400">Selesai & Pengiriman</p>
                <p className="text-sm text-gray-400">Estimasi 21 hari kerja</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-blue-800 mb-2">Langkah Selanjutnya</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Tim kami akan menghubungi Anda dalam 2 jam untuk konfirmasi detail</li>
              <li>• Pembayaran DP 50% diperlukan untuk memulai produksi</li>
              <li>• Anda akan menerima update progress secara berkala</li>
              <li>• Foto hasil produksi akan dikirim sebelum pengiriman</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            setCurrentStep('dashboard');
            setSelectedMotif(null);
          }}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
        >
          Kembali ke Dashboard
        </button>
        <button
          className="flex-1 px-6 py-3 bg-[#BA682A] text-white rounded-xl hover:bg-[#9d5a24] transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Invoice
        </button>
      </div>
    </div>
  );

  // Main Render Logic
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'dashboard':
        return <DashboardView />;
      case 'create':
        return <CreateOrderView />;
      case 'form':
        return <OrderFormView />;
      case 'confirmation':
        return <ConfirmationView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <UserLayout title="Produksi Batik">
      {renderCurrentStep()}
    </UserLayout>
  );
}