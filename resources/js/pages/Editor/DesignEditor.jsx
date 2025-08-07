import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import MockupViewer3D from '@/Components/Editor/MockupViewer3D';
// Impor semua komponen yang dibutuhkan
import MotifLibrary from '@/Components/Editor/MotifLibrary';
import CanvasArea from '@/Components/Editor/CanvasArea';
import PropertiesToolbar from '@/Components/Editor/PropertiesToolbar';
import LayerPanel from '@/Components/Editor/LayerPanel';

    function downloadURI(uri, name) {
        const link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
}

// Data motif statis sebagai pengganti database
const staticMotifs = [
    { id: 1, name: 'Mega Mendung', file_path: '/images/motifs/1.svg', preview_image_path: '/images/motifs/1.svg' },
    { id: 2, name: 'Motif Geometris', file_path: '/images/motifs/2.svg', preview_image_path: '/images/motifs/2.svg' },
    { id: 3, name: 'Gunungan', file_path: '/images/motifs/3.svg', preview_image_path: '/images/motifs/3.svg' },
    { id: 4, name: 'Parang Oranye', file_path: '/images/motifs/4.svg', preview_image_path: '/images/motifs/4.svg' },
    { id: 5, name: 'Bunga Simetris', file_path: '/images/motifs/5.svg', preview_image_path: '/images/motifs/5.svg' },
    { id: 6, name: 'Daun Emas', file_path: '/images/motifs/6.svg', preview_image_path: '/images/motifs/6.svg' },
    { id: 7, name: 'Garis Vertikal', file_path: '/images/motifs/7.svg', preview_image_path: '/images/motifs/7.svg' },
    { id: 8, name: 'Parang Emas', file_path: '/images/motifs/8.svg', preview_image_path: '/images/motifs/8.svg' },
];

export default function DesignEditor({ initialDesign }) {
    // State utama aplikasi editor
    const [canvasObjects, setCanvasObjects] = useState(initialDesign?.canvas_data || []);
    const [selectedId, setSelectedId] = useState(null);
    const [designName, setDesignName] = useState(initialDesign?.name || 'Desain Batik Baru');

    const stageRef = useRef();
    const [show3DModal, setShow3DModal] = useState(false);
    const [patternFor3D, setPatternFor3D] = useState('');
    // Fungsi untuk menyimpan desain (saat ini hanya simulasi)
    const handleSave = () => {
        if (!stageRef.current) {
            return;
        }
        
        // ✨ 2. Ekspor canvas yang terlihat menjadi JPG
        const dataURL = stageRef.current.toDataURL({
            mimeType: 'image/jpeg',
            quality: 0.9, // Kualitas JPG (0.0 - 1.0)
            pixelRatio: 2, // Ekspor dengan resolusi 2x lebih tinggi agar tajam
        });
        downloadURI(dataURL, `${designName}.jpg`);
        
        // Anda tetap bisa menyimpan data JSON ke database jika perlu
        console.log("Menyimpan data JSON...");
        console.log({
            name: designName,
            canvas_data: JSON.stringify(canvasObjects),
        });
    };

    // Fungsi untuk membersihkan semua objek dari canvas
    const handleClearCanvas = () => {
        if (window.confirm('Apakah Anda yakin ingin menghapus semua motif dari canvas?')) {
            setCanvasObjects([]);
            setSelectedId(null);
        }
    };

    const handleShow3D = () => {
        if (!stageRef.current) return;
        
        // Ekspor canvas menjadi gambar untuk dijadikan tekstur
        const patternDataURL = stageRef.current.toDataURL({ pixelRatio: 1 });
        setPatternFor3D(patternDataURL);
        setShow3DModal(true);
    };

    // Fungsi untuk memperbarui properti objek dari toolbar
    const updateObjectProperties = (id, newAttrs) => {
        const newObjects = canvasObjects.slice();
        const objIndex = newObjects.findIndex(obj => obj.id === id);
        if (objIndex !== -1) {
            newObjects[objIndex] = { ...newObjects[objIndex], ...newAttrs };
            setCanvasObjects(newObjects);
        }
    };

    // Hook untuk menangani semua shortcut keyboard
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            // Hapus Motif
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
                setCanvasObjects(canvasObjects.filter(obj => obj.id !== selectedId));
                setSelectedId(null);
            }
            
            // Simpan Desain
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                handleSave();
            }

            if (!selectedId) return;

            const selectedIndex = canvasObjects.findIndex(obj => obj.id === selectedId);
            const selectedObject = canvasObjects[selectedIndex];

            // Duplikasi Motif
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                const newObject = {
                    ...selectedObject,
                    id: 'obj' + Date.now(),
                    x: selectedObject.x + 15,
                    y: selectedObject.y + 15,
                };
                setCanvasObjects(prev => [...prev, newObject]);
                setSelectedId(newObject.id);
            }

            // Layer Ordering
            if (e.ctrlKey && (e.key === '[' || e.key === ']')) {
                e.preventDefault();
                const newObjects = [...canvasObjects];
                
                // Send Backward
                if (e.key === '[' && selectedIndex > 0) {
                    [newObjects[selectedIndex], newObjects[selectedIndex - 1]] = [newObjects[selectedIndex - 1], newObjects[selectedIndex]];
                    setCanvasObjects(newObjects);
                }

                // Bring Forward
                if (e.key === ']' && selectedIndex < newObjects.length - 1) {
                    [newObjects[selectedIndex], newObjects[selectedIndex + 1]] = [newObjects[selectedIndex + 1], newObjects[selectedIndex]];
                    setCanvasObjects(newObjects);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canvasObjects, selectedId]); // Dependency agar state di dalam listener selalu terbaru

    // Mendapatkan objek yang dipilih berdasarkan ID
    const selectedObject = canvasObjects.find(obj => obj.id === selectedId);



    return (
        <>
            <Head title="Editor Desain Batik" />
            <div className="flex flex-col h-screen font-sans bg-gray-200">
                <header className="flex items-center justify-between p-3 bg-white border-b shadow-sm z-10">
                    {/* Button Kembali - Pojok Kiri */}
                    <div className="flex items-center">
                        <Link 
                            href="/dashboard"
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Kembali</span>
                        </Link>
                    </div>

                    {/* Logo/Title - Center */}
                    <div className="flex items-center">
                        <h1 className="text-lg font-bold text-gray-800">Canvas Batik</h1>
                    </div>

                    {/* Penamaan File dan Actions - Pojok Kanan */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-600">Nama File:</label>
                            <input 
                                type="text" 
                                value={designName} 
                                onChange={(e) => setDesignName(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                                placeholder="Masukkan nama desain"
                            />
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleShow3D} 
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg transition-colors text-sm font-medium"
                            >
                                Lihat 3D
                            </button>
                            <button 
                                onClick={handleSave} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-colors text-sm font-medium"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex flex-grow overflow-hidden">
                    {/* Sidebar Kiri */}
                    <aside className="w-64 bg-white p-4 overflow-y-auto shadow-md flex flex-col">
                        <MotifLibrary motifs={staticMotifs} />
                    </aside>

                    {/* Area Canvas Utama */}
                    <main className="flex-grow flex items-center justify-center p-4">
                        <CanvasArea 
                            objects={canvasObjects} 
                            setObjects={setCanvasObjects}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            stageRef={stageRef}
                        />
                    </main>

                    {/* Sidebar Kanan */}
                    <aside className="w-72 bg-white p-4 shadow-md">
                        <PropertiesToolbar 
                            selectedObject={selectedObject}
                            onUpdate={updateObjectProperties}
                        />
                        <div className="mt-auto pt-4">
                            <LayerPanel
                                objects={canvasObjects}
                                selectedId={selectedId}
                                onSelect={setSelectedId}
                                onClear={handleClearCanvas}
                            />
                        </div>
                    </aside>
                </div>
            </div>
            
            {/* Modal 3D */}
            {show3DModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-2xl w-3/4 h-3/4 p-4 relative">
                        <button 
                            onClick={() => setShow3DModal(false)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 transition-colors"
                        >
                            ×
                        </button>
                        <MockupViewer3D patternUrl={patternFor3D} />
                    </div>
                </div>
            )}
        </>
    );
}