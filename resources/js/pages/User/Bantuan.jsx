import { useState } from 'react';
import UserLayout from '@/layouts/User/Layout';
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react';

export default function Bantuan() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      category: 'Batik & Motif',
      question: 'Apa perbedaan antara Batik Tulis, Cap, dan Printing?',
      answer: 'Batik Tulis dilukis tangan, sangat eksklusif. Batik Cap menggunakan stempel tembaga. Batik Printing dicetak mesin, paling terjangkau.'
    },
    {
      id: 2,
      category: 'Batik & Motif',
      question: 'Bagaimana cara merawat kain batik?',
      answer: 'Cuci dengan air dingin, hindari deterjen keras, jemur di tempat teduh, setrika dengan suhu rendah, dan simpan di tempat kering.'
    },
    {
      id: 3,
      category: 'Batik & Motif',
      question: 'Motif batik mana yang cocok untuk acara formal?',
      answer: 'Motif klasik seperti Parang, Kawung, Truntum, atau Sido Mukti cocok untuk acara formal. Pilih warna yang tidak terlalu mencolok.'
    },
    {
      id: 4,
      category: 'Layanan',
      question: 'Apakah Larasena melayani pengiriman internasional?',
      answer: 'Ya, kami melayani pengiriman ke berbagai negara. Biaya dan waktu pengiriman bervariasi tergantung destinasi. Hubungi customer service untuk informasi detail.'
    },
    {
      id: 5,
      category: 'Layanan',
      question: 'Berapa lama waktu pembuatan batik custom?',
      answer: 'Batik tulis custom membutuhkan 2-4 minggu, batik cap 1-2 minggu, dan batik printing 3-7 hari kerja, tergantung kompleksitas desain.'
    },
    {
      id: 6,
      category: 'Kemitraan',
      question: 'Bagaimana cara menjadi mitra atau pemasok?',
      answer: 'Anda dapat mengajukan kemitraan melalui formulir di website atau menghubungi tim bisnis kami. Kami mencari mitra yang berkomitmen pada kualitas batik.'
    },
    {
      id: 7,
      category: 'Konveksi',
      question: 'Apa minimum order untuk layanan konveksi?',
      answer: 'Minimum order untuk konveksi adalah 50 pieces per desain. Untuk order besar di atas 500 pieces, tersedia harga khusus.'
    },
    {
      id: 8,
      category: 'Konveksi',
      question: 'Bisa tidak menggunakan desain sendiri?',
      answer: 'Ya, Anda bisa menggunakan desain sendiri. Tim kami akan membantu memastikan desain sesuai untuk produksi batik dan memberikan saran teknis.'
    },
    {
      id: 9,
      category: 'Pembayaran',
      question: 'Metode pembayaran apa saja yang diterima?',
      answer: 'Kami menerima transfer bank, kartu kredit, e-wallet (OVO, GoPay, Dana), dan untuk order besar tersedia sistem cicilan.'
    },
    {
      id: 10,
      category: 'Pembayaran',
      question: 'Apakah ada garansi untuk produk batik?',
      answer: 'Ya, kami memberikan garansi kualitas 30 hari. Jika ada masalah kualitas, produk dapat dikembalikan atau diganti.'
    }
  ];

  const categories = ['Semua', 'Batik & Motif', 'Layanan', 'Konveksi', 'Kemitraan', 'Pembayaran'];
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredFaq = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <UserLayout title="Bantuan">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#BA682A] rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pusat Bantuan</h1>
          <p className="text-gray-600">Temukan jawaban untuk pertanyaan seputar layanan batik Larasena</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari pertanyaan atau kata kunci..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#BA682A] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#BA682A] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-gray-600 text-sm mt-1">
              {filteredFaq.length} pertanyaan ditemukan
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredFaq.map((faq) => (
              <div key={faq.id} className="p-6">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div>
                    <span className="inline-block px-2 py-1 bg-[#BA682A] bg-opacity-10 text-[#BA682A] text-xs rounded-full mb-2">
                      {faq.category}
                    </span>
                    <h3 className="font-medium text-gray-800">{faq.question}</h3>
                  </div>
                  {openFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                
                {openFaq === faq.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Masih Butuh Bantuan?</h3>
          <p className="text-gray-600 mb-6">
            Tim customer service kami siap membantu Anda 24/7. Hubungi kami melalui:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-[#BA682A] rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Live Chat</h4>
                <p className="text-sm text-gray-600">Respon dalam 5 menit</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-[#BA682A] rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Telepon</h4>
                <p className="text-sm text-gray-600">0274-123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-[#BA682A] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Email</h4>
                <p className="text-sm text-gray-600">help@larasena.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}