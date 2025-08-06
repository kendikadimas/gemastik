import UserLayout from '@/layouts/User/Layout';
import { Link } from '@inertiajs/react';
import {
  Plus,
  Filter,
  Grid3X3,
  List,
  Heart,
  Edit3,
  Download,
  Share2,
  Search,
} from 'lucide-react';

export default function Dashboard() {
  const filterItems = ['Semua', 'Mokup File', 'Mokup File', 'Mokup File'];

  const batikProjects = [
    {
      id: 1,
      title: 'Mokup Batik Banyumasan Oke',
      date: '24 Juli 2025',
      image:
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
      favorite: true,
    },
    {
      id: 2,
      title: 'Mokup Batik Banyumasan Oke',
      date: '24 Juli 2025',
      image:
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
      favorite: false,
    },
    {
      id: 3,
      title: 'Mokup Batik Banyumasan Oke',
      date: '24 Juli 2025',
      image:
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
      favorite: true,
    },
    {
      id: 4,
      title: 'Mokup Batik Banyumasan Oke',
      date: '24 Juli 2025',
      image:
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
      favorite: false,
    },
    {
      id: 5,
      title: 'Mokup Batik Banyumasan Oke',
      date: '24 Juli 2025',
      image:
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
      favorite: true,
    },
    {
      id: 6,
      title: 'Mokup Batik Banyumasan Oke',
      date: '24 Juli 2025',
      image:
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
      favorite: false,
    },
  ];

  return (
    <UserLayout title="Batik Saya">
      {/* Header dengan Action Cards */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#BA682A' }}>Batik Saya</h1>
          <p className="text-gray-600 text-sm">
            Selamat datang kembali, berikut batik yang sudah anda buat.
          </p>
        </div>
        
        {/* Action Cards */}
        <div className="flex gap-4">
          <div
            className="relative overflow-hidden rounded-2xl p-4 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-16 w-48"
            style={{
              background: 'linear-gradient(135deg, #D2691E 0%, #A0522D 100%)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="relative z-10 h-full flex items-center justify-between">
              <div>
                <h3 className="font-medium text-sm">Tambah Mokup</h3>
                {/* <span className="text-xs opacity-90">35 Mokup</span> */}
              </div>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                }}
              >
                <Plus className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl p-4 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-16 w-48"
            style={{
              background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="relative z-10 h-full flex items-center justify-between">
              <div>
                <h3 className="font-medium text-sm">Tambah 3D</h3>
                {/* <span className="text-xs opacity-90">7 File</span> */}
              </div>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                }}
              >
                <Plus className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section dengan Search */}
      <div className="flex items-center justify-between gap-6 mb-6">
        <div className="flex gap-2">
          {filterItems.map((filter, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                index === 0
                  ? 'bg-[#D2691E] text-white shadow-md'
                  : index === 1
                  ? 'bg-gray-100 text-gray-600 shadow-md hover:bg-gray-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">Sort</span>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for something"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#D2691E] focus:border-transparent w-64"
            />
          </div>
          
          <div className="flex bg-white border border-gray-200 rounded-lg p-1">
            <button className="p-2 rounded-md bg-[#D2691E] text-white">
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Cards - Layout yang lebih rapi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {batikProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-gray-100"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Tag Mokup */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                  Mokup
                </span>
              </div>

              {/* Date Tag */}
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                  23-7-2025
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Hover Buttons */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex gap-2">
                  <button
                    className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                      project.favorite
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={project.favorite ? 'currentColor' : 'none'}
                    />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-[#D2691E] hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-green-500 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm mb-2 group-hover:text-[#D2691E] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500">
                Di buat pada · {project.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}