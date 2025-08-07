<?php

namespace Database\Seeders;

use App\Models\Motif;
use Illuminate\Database\Seeder;

class MotifSeeder extends Seeder
{
    public function run(): void
    {
        $motifs = [
            [
                'name' => 'Batik Parang Barong',
                'description' => 'Motif klasik dengan makna kekuatan dan keteguhan, biasa digunakan dalam upacara adat.',
                'category' => 'Tradisional',
                'location' => 'Yogyakarta',
                'image_url' => '/images/motifs/1.svg',
                'file_path' => '/images/motifs/1.svg',
                'colors' => ['#8B4513', '#D2691E', '#F4A460'],
                'is_featured' => true,
            ],
            [
                'name' => 'Batik Kawung Prabu',
                'description' => 'Simbolisasi kesempurnaan hidup dengan pola geometris yang harmonis dan elegan.',
                'category' => 'Tradisional',
                'location' => 'Solo',
                'image_url' => '/images/motifs/2.svg',
                'file_path' => '/images/motifs/2.svg',
                'colors' => ['#654321', '#A0522D', '#DEB887'],
            ],
            [
                'name' => 'Batik Mega Mendung',
                'description' => 'Motif awan yang melambangkan kesabaran dan ketenangan jiwa.',
                'category' => 'Nusantara',
                'location' => 'Cirebon',
                'image_url' => '/images/motifs/3.svg',
                'file_path' => '/images/motifs/3.svg',
                'colors' => ['#1E40AF', '#3B82F6', '#DBEAFE'],
                'is_featured' => true,
            ],
            [
                'name' => 'Batik Truntum Garuda',
                'description' => 'Motif yang melambangkan cinta kasih yang tumbuh kembali, cocok untuk acara sakral.',
                'category' => 'Tradisional',
                'location' => 'Yogyakarta',
                'image_url' => '/images/motifs/4.svg',
                'file_path' => '/images/motifs/4.svg',
                'colors' => ['#DC2626', '#F59E0B', '#FEF3C7'],
            ],
            [
                'name' => 'Batik Fractal Genesis',
                'description' => 'Perpaduan motif tradisional dengan pola fractal modern yang memukau.',
                'category' => 'Modern',
                'location' => 'Jakarta',
                'image_url' => '/images/motifs/5.svg',
                'file_path' => '/images/motifs/5.svg',
                'colors' => ['#7C3AED', '#A855F7', '#E0E7FF'],
            ],
            [
                'name' => 'Batik Sido Luhur',
                'description' => 'Motif yang melambangkan kehormatan dan kemuliaan hidup.',
                'category' => 'Tradisional',
                'location' => 'Solo',
                'image_url' => '/images/motifs/6.svg',
                'file_path' => '/images/motifs/6.svg',
                'colors' => ['#059669', '#10B981', '#D1FAE5'],
            ],
            [
                'name' => 'Batik Urban Jungle',
                'description' => 'Interpretasi modern dari motif flora dengan sentuhan kontemporer yang segar.',
                'category' => 'Kontemporer',
                'location' => 'Bandung',
                'image_url' => '/images/motifs/7.svg',
                'file_path' => '/images/motifs/7.svg',
                'colors' => ['#16A34A', '#22C55E', '#BBFBCE'],
            ],
            [
                'name' => 'Batik Pekalongan Coastal',
                'description' => 'Motif khas pesisir dengan warna-warna cerah yang mencerminkan kehidupan laut.',
                'category' => 'Nusantara',
                'location' => 'Pekalongan',
                'image_url' => '/images/motifs/8.svg',
                'file_path' => '/images/motifs/8.svg',
                'colors' => ['#0EA5E9', '#38BDF8', '#E0F2FE'],
            ],
        ];

        foreach ($motifs as $motif) {
            Motif::create($motif);
        }
    }
}