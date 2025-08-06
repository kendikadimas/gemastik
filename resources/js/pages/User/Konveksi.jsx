// Pages/User/Konveksi.jsx
import UserLayout from '@/layouts/User/Layout';
import { Search, ChevronDown, MapPin, Star, Shield, CheckCircle, Briefcase, Award, Users, TrendingUp } from 'lucide-react';

export default function Konveksi() {
  const statsCards = [
    {
      title: 'Total Partner',
      value: '850',
      subtitle: 'Motif Batik',
      color: '#BA682A',
      icon: <Briefcase className="w-8 h-8 text-white" />
    },
    {
      title: 'Terverifikasi',
      value: '67',
      subtitle: 'Style Batik',
      color: '#FF8C42',
      icon: <Award className="w-8 h-8 text-white" />
    },
    {
      title: 'Lokasi',
      value: '28',
      subtitle: 'Daerah',
      color: '#82C341',
      icon: <Users className="w-8 h-8 text-white" />
    },
    {
      title: 'Penjualan',
      value: '90',
      subtitle: 'Trend Motif',
      color: '#FFD23F',
      icon: <TrendingUp className="w-8 h-8 text-white" />
    }
  ];

  const konveksiData = [
    {
      id: 1,
      name: 'Zarstronot Cloth',
      description: 'Realisasikan ide yang ada kembankan dan menjadi kenyataan',
      location: 'Sokaraja',
      rating: 4.9,
      isVerified: true,
      colors: ['#F9DC5C', '#FF8C42', '#F9DC5C', '#FF8C42'],
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Batik Nusantara Co.',
      description: 'Spesialis batik tradisional dengan kualitas premium terbaik',
      location: 'Yogyakarta',
      rating: 4.8,
      isVerified: true,
      colors: ['#82C341', '#FF8C42', '#F9DC5C', '#BA682A'],
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Majesty Batik House',
      description: 'Konveksi modern dengan sentuhan batik kontemporer',
      location: 'Solo',
      rating: 4.7,
      isVerified: false,
      colors: ['#BA682A', '#F9DC5C', '#82C341', '#FF8C42'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Heritage Cloth Works',
      description: 'Melestarikan warisan budaya melalui karya batik berkualitas',
      location: 'Pekalongan',
      rating: 4.6,
      isVerified: true,
      colors: ['#FF8C42', '#82C341', '#F9DC5C', '#BA682A'],
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Royal Batik Studio',
      description: 'Layanan konveksi batik eksklusif untuk semua kebutuhan',
      location: 'Jakarta',
      rating: 4.5,
      isVerified: true,
      colors: ['#82C341', '#BA682A', '#FF8C42', '#F9DC5C'],
      image: 'https://images.unsplash.com/photo-1594736797933-d0f59ba4e24d?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Artisan Batik Gallery',
      description: 'Kolaborasi seni dan teknologi untuk batik masa depan',
      location: 'Bandung',
      rating: 4.4,
      isVerified: false,
      colors: ['#F9DC5C', '#82C341', '#BA682A', '#FF8C42'],
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop'
    }
  ];

  const filterOptions = [
    { label: 'Semua Lokasi', value: 'all' },
    { label: 'Yogyakarta', value: 'yogya' },
    { label: 'Solo', value: 'solo' },
    { label: 'Pekalongan', value: 'pekalongan' }
  ];

  return (
    <UserLayout title="Konveksi">
      <div className="mb-8">
        <p className="text-gray-600">
          Realisasikan ide yang ada kembankan dan menjadi kenyataan
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-4xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#BA682A' }} />
          <input
            type="text"
            placeholder="Jelajahi keragaman batik nusantara"
            className="w-full pl-12 pr-6 py-4 border-2 rounded-2xl text-lg focus:outline-none focus:border-[#BA682A] transition-colors"
            style={{ borderColor: '#BA682A' }}
          />
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {['Kategori Konveksi', 'Lokasi Daerah', 'Rating & Ulasan'].map((filter, index) => (
          <div key={index} className="relative">
            <select className="w-full px-4 py-3 border-2 rounded-xl appearance-none bg-white focus:outline-none focus:border-[#BA682A] transition-colors text-gray-700">
              <option>{filter}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            style={{ backgroundColor: stat.color }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                {stat.icon}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.subtitle}</div>
              </div>
            </div>
            <h3 className="font-semibold text-lg">{stat.title}</h3>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute -top-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Konveksi Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {konveksiData.map((konveksi) => (
          <div
            key={konveksi.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-100"
          >
            {/* Header with verification */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-xl text-gray-800 group-hover:text-[#BA682A] transition-colors">
                      {konveksi.name}
                    </h3>
                    {konveksi.isVerified && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Terverifikasi
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {konveksi.description}
                  </p>
                </div>
              </div>

              {/* Location and Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-sm" style={{ color: '#BA682A' }}>
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{konveksi.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-800">{konveksi.rating}</span>
                </div>
              </div>

              {/* Color Palette */}
              <div className="flex gap-2 mb-4">
                {konveksi.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-8 rounded-lg shadow-sm"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>

              {/* Action Button */}
              <button
                className="w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: '#BA682A' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#9d5a24';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#BA682A';
                }}
              >
                Lihat Detail Konveksi
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button
          className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          style={{ backgroundColor: '#BA682A' }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#9d5a24';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#BA682A';
          }}
        >
          Muat Lebih Banyak Konveksi
        </button>
      </div>
    </UserLayout>
  );
}