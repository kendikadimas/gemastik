<?php

namespace App\Http\Controllers;

use App\Models\Design;
use App\Models\Konveksi;
use App\Models\Product;
use App\Models\Production;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductionController extends Controller
{


    public function index()
    {
        $productions = Auth::user()->productionOrders()
            ->with(['design', 'product', 'convection'])
            ->orderBy('created_at', 'desc')
            ->paginate(10); // Gunakan paginasi

        return Inertia::render('User/Produksi', [
            'productions' => $productions
        ]);
    }
    /**
     * Menampilkan form untuk membuat pesanan produksi baru.
     * Pengguna akan memilih salah satu desain miliknya.
     */
    public function create(Request $request)
    {
        $designs = Auth::user()->designs()->orderBy('updated_at', 'desc')->get();
        
        $products = Product::all();

        $selectedConvection = null;
        $convections = [];

        // Jika ada ID konveksi dari URL, cari data konveksi tersebut
        if ($request->has('konveksi_id')) {
            $selectedConvection = Konveksi::findOrFail($request->query('konveksi_id'));
        } else {
            // Jika tidak, ambil semua data konveksi untuk dropdown
            $convections = Konveksi::all();
        }
        
        return Inertia::render('User/CreateProduction', [
            'designs' => $designs,
            'products' => $products,
            'convections' => $convections,
            'selectedConvection' => $selectedConvection,
        ]);
    }

    /**
     * Menyimpan pesanan produksi baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'design_id' => 'required|exists:designs,id',
            'product_id' => 'required|exists:product,id',
            'convection_id' => 'required|exists:konveksis,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Pastikan desain yang dipilih adalah milik pengguna yang login
        $design = Design::where('id', $request->design_id)->where('user_id', Auth::id())->firstOrFail();
        $product = Product::findOrFail($request->product_id);

        // Cari data user dari konveksi yang dipilih
        $konveksi = Konveksi::findOrFail($request->convection_id);
        
        // Ambil user yang terhubung dari data konveksi
        $convectionUser = $konveksi->user; 
        
        if(!$convectionUser || $convectionUser->role !== 'Convection') {
            return back()->withErrors(['convection_id' => 'Mitra konveksi tidak valid atau tidak memiliki peran yang benar.']);
        }

        // Hitung total harga
        $totalPrice = $request->quantity * $product->base_price;

        Production::create([
            'production_status' => 'diterima',
            'quantity' => $request->quantity,
            'price_per_unit' => $product->base_price,
            'total_price' => $totalPrice,
            'payment_status' => 'unpaid',
            'convection_user_id' => $convectionUser->id,
            'user_id' => Auth::id(),
            'design_id' => $design->id,
            'product_id' => $product->id,
        ]);

        // Arahkan ke riwayat pesanan setelah berhasil
        return redirect()->route('dashboard')->with('success', 'Pesanan produksi berhasil dibuat!');
    }
}