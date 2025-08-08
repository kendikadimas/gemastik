<?php

namespace App\Http\Controllers;

use App\Models\Production;
use App\Models\Design;
use App\Models\Konveksi;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductionController extends Controller
{
    public function index()
    {
        $productions = Production::with(['design', 'konveksi', 'product'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($production) {
                return [
                    'id' => $production->id,
                    'design' => $production->design,
                    'konveksi' => $production->konveksi,
                    'product' => $production->product,
                    'quantity' => $production->quantity,
                    'total_price' => $production->total_price,
                    'production_status' => $production->production_status,
                    'payment_status' => $production->payment_status,
                    'customer_data' => $production->customer_data,
                    'created_at' => $production->created_at,
                    'status_color' => $production->status_color,
                    'status_label' => $production->status_label,
                    'progress_percentage' => $production->progress_percentage,
                ];
            });

        $stats = [
            'total_orders' => Production::where('user_id', Auth::id())->count(),
            'in_progress' => Production::where('user_id', Auth::id())->where('production_status', 'diproses')->count(),
            'completed' => Production::where('user_id', Auth::id())->where('production_status', 'diterima_selesai')->count(),
            'total_value' => Production::where('user_id', Auth::id())->sum('total_price'),
        ];

        $designs = Design::where('user_id', Auth::id())->get();
        $konveksis = Konveksi::where('is_verified', true)->get();
        $products = Product::all();

        return Inertia::render('User/Produksi', [
            'productions' => $productions,
            'stats' => $stats,
            'designs' => $designs,
            'konveksis' => $konveksis,
            'products' => $products
        ]);
    }

    public function create(Request $request)
    {
        $designs = Design::where('user_id', Auth::id())->get();
        $konveksis = Konveksi::where('is_verified', true)->get();
        $products = Product::all();

        // Jika ada convection_id dari parameter
        $selectedConvection = null;
        if ($request->convection_id) {
            $selectedConvection = Konveksi::find($request->convection_id);
        }

        return Inertia::render('User/CreateProduction', [
            'designs' => $designs,
            'konveksis' => $konveksis,
            'products' => $products,
            'selectedConvection' => $selectedConvection,
            'initialConvectionId' => $request->convection_id
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'design_id' => 'required|exists:designs,id',
            'product_id' => 'required|exists:product,id',
            'convection_id' => 'required|exists:konveksis,id',
            'quantity' => 'required|integer|min:12',
            'customer_name' => 'required|string|max:255',
            'customer_company' => 'nullable|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string|max:20',
            'customer_address' => 'required|string',
            'batik_type' => 'required|string',
            'fabric_size' => 'required|string',
            'deadline' => 'required|date|after:today',
            'special_notes' => 'nullable|string',
        ]);

        $design = Design::find($validated['design_id']);
        $product = Product::find($validated['product_id']);
        $konveksi = Konveksi::find($validated['convection_id']);

        // Hitung harga berdasarkan product dan quantity
        $pricePerUnit = $this->calculatePrice($product, $validated['batik_type'], $validated['quantity']);
        $totalPrice = $pricePerUnit * $validated['quantity'];

        $production = Production::create([
            'user_id' => Auth::id(),
            'convection_user_id' => $konveksi->user_id ?? 1, // Default jika belum ada relasi user
            'design_id' => $validated['design_id'],
            'product_id' => $validated['product_id'],
            'quantity' => $validated['quantity'],
            'price_per_unit' => $pricePerUnit,
            'total_price' => $totalPrice,
            'production_status' => 'diterima',
            'payment_status' => 'unpaid',
            // Data customer disimpan sebagai JSON atau buat table terpisah
            'customer_data' => json_encode([
                'name' => $validated['customer_name'],
                'company' => $validated['customer_company'],
                'email' => $validated['customer_email'],
                'phone' => $validated['customer_phone'],
                'address' => $validated['customer_address'],
                'batik_type' => $validated['batik_type'],
                'fabric_size' => $validated['fabric_size'],
                'deadline' => $validated['deadline'],
                'special_notes' => $validated['special_notes'],
            ])
        ]);

        return redirect()->route('production.index')->with('success', 'Pesanan produksi berhasil dibuat!');
    }

    private function calculatePrice($product, $batikType, $quantity)
    {
        $basePrice = 50000; // Harga dasar per unit

        // Multiplier berdasarkan jenis batik
        $typeMultiplier = [
            'Batik Tulis' => 3.0,
            'Batik Cap' => 2.0,
            'Batik Printing' => 1.0,
        ];

        // Discount berdasarkan quantity
        $quantityDiscount = 1.0;
        if ($quantity >= 100) {
            $quantityDiscount = 0.85; // 15% discount
        } elseif ($quantity >= 50) {
            $quantityDiscount = 0.90; // 10% discount
        } elseif ($quantity >= 25) {
            $quantityDiscount = 0.95; // 5% discount
        }

        return $basePrice * ($typeMultiplier[$batikType] ?? 1.0) * $quantityDiscount;
    }

    public function show(Production $production)
    {
        $production->load(['design', 'konveksi', 'product']);
        
        return Inertia::render('User/ProductionDetail', [
            'production' => $production
        ]);
    }
}