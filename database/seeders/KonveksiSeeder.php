<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Konveksi;

class KonveksiSeeder extends Seeder
{
    public function run()
    {
        $konveksis = [
            [
                'name' => 'Zarstronot Cloth',
                'description' => 'Realisasikan ide yang ada kembankan dan menjadi kenyataan',
                'location' => 'Sokaraja',
                'rating' => 4.9,
                'is_verified' => true,
                'no_telp' => '081234567890',
                'documentation' => null,
                'icon' => null,
            ],
            [
                'name' => 'Batik Nusantara Co.',
                'description' => 'Spesialis batik tradisional dengan kualitas premium terbaik',
                'location' => 'Yogyakarta',
                'rating' => 4.8,
                'is_verified' => true,
                'no_telp' => '081234567891',
                'documentation' => null,
                'icon' => null,
            ],
            [
                'name' => 'Majesty Batik House',
                'description' => 'Konveksi modern dengan sentuhan batik kontemporer',
                'location' => 'Solo',
                'rating' => 4.7,
                'is_verified' => false,
                'no_telp' => '081234567892',
                'documentation' => null,
                'icon' => null,
            ],
            [
                'name' => 'Heritage Cloth Works',
                'description' => 'Melestarikan warisan budaya melalui karya batik berkualitas',
                'location' => 'Pekalongan',
                'rating' => 4.6,
                'is_verified' => true,
                'no_telp' => '081234567893',
                'documentation' => null,
                'icon' => null,
            ],
            [
                'name' => 'Royal Batik Studio',
                'description' => 'Layanan konveksi batik eksklusif untuk semua kebutuhan',
                'location' => 'Jakarta',
                'rating' => 4.5,
                'is_verified' => true,
                'no_telp' => '081234567894',
                'documentation' => null,
                'icon' => null,
            ],
            [
                'name' => 'Artisan Batik Gallery',
                'description' => 'Kolaborasi seni dan teknologi untuk batik masa depan',
                'location' => 'Bandung',
                'rating' => 4.4,
                'is_verified' => false,
                'no_telp' => '081234567895',
                'documentation' => null,
                'icon' => null,
            ],
            [
                'name' => 'Batik Tulis Klasik',
                'description' => 'Ahli batik tulis dengan pengalaman puluhan tahun',
                'location' => 'Cirebon',
                'rating' => 4.8,
                'is_verified' => true,
                'no_telp' => '081234567896',
                'documentation' => null,
                'icon' => null,
            ],
            [
                'name' => 'Modern Batik Works',
                'description' => 'Inovasi batik untuk generasi digital',
                'location' => 'Surabaya',
                'rating' => 4.3,
                'is_verified' => false,
                'no_telp' => '081234567897',
                'documentation' => null,
                'icon' => null,
            ],
            [
                'name' => 'Tradisi Batik Nusantara',
                'description' => 'Mempertahankan keaslian motif batik tradisional',
                'location' => 'Garut',
                'rating' => 4.7,
                'is_verified' => true,
                'no_telp' => '081234567898',
                'documentation' => null,
                'icon' => null,
            ],
            [
                'name' => 'Batik Express',
                'description' => 'Layanan cepat untuk kebutuhan batik mendadak',
                'location' => 'Semarang',
                'rating' => 4.2,
                'is_verified' => false,
                'no_telp' => '081234567899',
                'documentation' => null,
                'icon' => null,
            ],
        ];

        foreach ($konveksis as $konveksi) {
            Konveksi::create($konveksi);
        }
    }
}