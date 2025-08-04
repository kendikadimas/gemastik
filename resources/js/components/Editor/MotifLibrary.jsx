// Komponen untuk menampilkan daftar motif yang bisa di-drag
export default function MotifLibrary({ motifs }) {
    return (
        <div>
            <h3 className="font-bold mb-4 text-black">Pustaka Motif</h3>
            <div className="grid grid-cols-2 gap-2">
                {motifs.map(motif => (
                    <div 
                        key={motif.id}
                        className="border p-1 cursor-pointer"
                        // Untuk drag and drop, tambahkan event di sini
                        onDragStart={(e) => {
                            // Kirim data motif yang di-drag
                            e.dataTransfer.setData('application/json', JSON.stringify(motif));
                        }}
                        draggable // Penting!
                    >
                        <img 
                            src={motif.preview_image_path} 
                            alt={motif.name} 
                            className="w-full h-auto"
                        />
                        <p className="text-xs text-center">{motif.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}