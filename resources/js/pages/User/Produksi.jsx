import UserLayout from '@/layouts/User/Layout';
import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { 
  Plus, 
  Clock, 
  Package, 
  CheckCircle, 
  ArrowRight, 
  Upload, 
  User,
  Palette,
  Search,
  Filter,
  Download,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  CreditCard
} from 'lucide-react';

export default function Produksi({ productions = [], stats = {}, designs = [], konveksis = [], products = [] }) {
  const [currentStep, setCurrentStep] = useState('dashboard');
  const [selectedMotif, setSelectedMotif] = useState(null);

  // Form untuk create production
  const { data, setData, post, processing, errors, reset } = useForm({
    design_id: '',
    product_id: products[0]?.id || '',
    convection_id: konveksis[0]?.id || '',
    quantity: 50,
    customer_name: '',
    customer_company: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
    batik_type: 'Batik Printing',
    fabric_size: '210 cm x 110 cm (Standar)',
    deadline: '',
    special_notes: '',
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const calculateEstimatedPrice = () => {
    const basePrice = 50000;
    const typeMultiplier = {
      'Batik Tulis': 3.0,
      'Batik Cap': 2.0,
      'Batik Printing': 1.0,
    };
    
    let quantityDiscount = 1.0;
    if (data.quantity >= 100) {
      quantityDiscount = 0.85;
    } else if (data.quantity >= 50) {
      quantityDiscount = 0.90;
    } else if (data.quantity >= 25) {
      quantityDiscount = 0.95;
    }

    const pricePerUnit = basePrice * (typeMultiplier[data.batik_type] || 1.0) * quantityDiscount;
    return pricePerUnit * data.quantity;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    post(route('production.store'), {
      onSuccess: () => {
        setCurrentStep('confirmation');
        reset();
      }
    });
  };

  // Dashboard View dengan data dinamis
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

{/*       
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow" style={{ background: 'linear-gradient(135deg, #BA682A 0%, #8B4513 100%)' }}>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">{stats.total_orders || 0}</div>
            <div className="text-sm opacity-90 font-medium">Total Pesanan</div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">{stats.in_progress || 0}</div>
            <div className="text-sm opacity-90 font-medium">Dalam Produksi</div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">{stats.completed || 0}</div>
            <div className="text-sm opacity-90 font-medium">Pesanan Selesai</div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow" style={{ background: 'linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)' }}>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1">{formatCurrency(stats.total_value || 0).slice(0, -3)}</div>
            <div className="text-sm opacity-90 font-medium">Total Pendapatan</div>
          </div>
        </div>
      </div> */}

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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Desain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Konveksi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Qty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productions.map((production) => (
                <tr key={production.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">PRD-{production.id.toString().padStart(4, '0')}</div>
                    <div className="text-sm text-gray-500">{new Date(production.created_at).toLocaleDateString('id-ID')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{production.design?.title}</div>
                    <div className="text-sm text-gray-500">{production.customer_data?.batik_type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{production.konveksi?.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{production.quantity}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: production.status_color }}
                    >
                      {production.status_label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${production.progress_percentage}%`,
                            backgroundColor: production.status_color
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{production.progress_percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{formatCurrency(production.total_price)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => router.visit(`/production/${production.id}`)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
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

  // Create Order View dengan data dinamis
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
            Pilih Desain Batikmu
          </h1>
          <p className="text-gray-600 mt-1">
            Pilih desain yang ingin diproduksi untuk pesanan baru
          </p>
        </div>
      </div>

      {/* Design Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {designs.map((design) => (
          <div
            key={design.id}
            onClick={() => {
              setData('design_id', design.id);
              setSelectedMotif(design);
              setCurrentStep('form');
            }}
            className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={design.image_url || design.thumbnail || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop'}
                alt={design.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">{design.title}</h3>
                  <p className="text-white/90 text-sm">Mulai dari {formatCurrency(50000)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Order Form View dengan integrasi backend
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
            Lengkapi informasi pesanan untuk desain {selectedMotif?.title}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
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
                      value={data.customer_name}
                      onChange={e => setData('customer_name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                    {errors.customer_name && <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Perusahaan
                    </label>
                    <input
                      type="text"
                      value={data.customer_company}
                      onChange={e => setData('customer_company', e.target.value)}
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
                      value={data.customer_email}
                      onChange={e => setData('customer_email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      placeholder="customer@email.com"
                      required
                    />
                    {errors.customer_email && <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      value={data.customer_phone}
                      onChange={e => setData('customer_phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      placeholder="+62 812 3456 7890"
                      required
                    />
                    {errors.customer_phone && <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap *
                  </label>
                  <textarea
                    rows="3"
                    value={data.customer_address}
                    onChange={e => setData('customer_address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                    placeholder="Masukkan alamat lengkap"
                    required
                  />
                  {errors.customer_address && <p className="text-red-500 text-sm mt-1">{errors.customer_address}</p>}
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
                    <select 
                      value={data.batik_type}
                      onChange={e => setData('batik_type', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                    >
                      <option value="Batik Printing">Batik Printing</option>
                      <option value="Batik Cap">Batik Cap</option>
                      <option value="Batik Tulis">Batik Tulis</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah (pcs) *
                    </label>
                    <input
                      type="number"
                      value={data.quantity}
                      onChange={e => setData('quantity', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      placeholder="50"
                      min="12"
                      required
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konveksi Partner *
                    </label>
                    <select 
                      value={data.convection_id}
                      onChange={e => setData('convection_id', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                    >
                      {konveksis.map(konveksi => (
                        <option key={konveksi.id} value={konveksi.id}>{konveksi.name} - {konveksi.location}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline *
                    </label>
                    <input
                      type="date"
                      value={data.deadline}
                      onChange={e => setData('deadline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                      required
                    />
                    {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan Khusus
                  </label>
                  <textarea
                    rows="3"
                    value={data.special_notes}
                    onChange={e => setData('special_notes', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
                    placeholder="Tambahkan catatan khusus untuk pesanan ini..."
                  />
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
                  type="submit"
                  disabled={processing}
                  className="flex-1 px-6 py-3 bg-[#BA682A] text-white rounded-xl hover:bg-[#9d5a24] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {processing ? 'Memproses...' : 'Buat Pesanan'}
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
                  src={selectedMotif?.image_url || selectedMotif?.thumbnail || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop'}
                  alt={selectedMotif?.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-800">{selectedMotif?.title}</h4>
                  <p className="text-sm text-gray-500">{data.batik_type}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 py-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Jenis Batik</span>
                <span className="font-medium">{data.batik_type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quantity</span>
                <span className="font-medium">{data.quantity} pcs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimasi per Unit</span>
                <span className="font-medium">{formatCurrency(calculateEstimatedPrice() / data.quantity)}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-semibold pt-4 border-t border-gray-200">
              <span>Total Estimasi</span>
              <span style={{ color: '#BA682A' }}>{formatCurrency(calculateEstimatedPrice())}</span>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-blue-800 font-medium">Catatan Harga</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Harga final akan dikonfirmasi oleh konveksi setelah review desain.
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
          Pesanan Anda telah berhasil disimpan dan akan segera diproses oleh mitra konveksi.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            setCurrentStep('dashboard');
            setSelectedMotif(null);
            router.reload();
          }}
          className="flex-1 px-6 py-3 bg-[#BA682A] text-white rounded-xl hover:bg-[#9d5a24] transition-colors"
        >
          Kembali ke Dashboard
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