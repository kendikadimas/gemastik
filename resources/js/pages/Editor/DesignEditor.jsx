import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import MockupViewer3D from '@/Components/Editor/MockupViewer3D';
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

export default function DesignEditor({ initialDesign }) {
    // State utama aplikasi editor
    const [canvasObjects, setCanvasObjects] = useState(initialDesign?.canvas_data || []);
    const [selectedId, setSelectedId] = useState(null);
    const [designName, setDesignName] = useState(initialDesign?.title || 'Desain Batik Baru');
    const [isSaving, setIsSaving] = useState(false);
    const [motifs, setMotifs] = useState([]);
    const [loadingMotifs, setLoadingMotifs] = useState(true);

    const stageRef = useRef();
    const [show3DModal, setShow3DModal] = useState(false);
    const [patternFor3D, setPatternFor3D] = useState('');

    // Load motifs dari API saat komponen mount
    useEffect(() => {
        fetchMotifs();
    }, []);

    const fetchMotifs = async () => {
        try {
            setLoadingMotifs(true);
            const response = await fetch('/api/motifs/editor');
            const data = await response.json();
            setMotifs(data.motifs);
        } catch (error) {
            console.error('Error fetching motifs:', error);
            // Fallback ke data statis jika API gagal
            setMotifs([
                { id: 1, name: 'Mega Mendung', file_path: '/images/motifs/1.svg', preview_image_path: '/images/motifs/1.svg' },
                { id: 2, name: 'Motif Geometris', file_path: '/images/motifs/2.svg', preview_image_path: '/images/motifs/2.svg' },
                { id: 3, name: 'Gunungan', file_path: '/images/motifs/3.svg', preview_image_path: '/images/motifs/3.svg' },
                { id: 4, name: 'Parang Oranye', file_path: '/images/motifs/4.svg', preview_image_path: '/images/motifs/4.svg' },
                { id: 5, name: 'Bunga Simetris', file_path: '/images/motifs/5.svg', preview_image_path: '/images/motifs/5.svg' },
                { id: 6, name: 'Daun Emas', file_path: '/images/motifs/6.svg', preview_image_path: '/images/motifs/6.svg' },
                { id: 7, name: 'Garis Vertikal', file_path: '/images/motifs/7.svg', preview_image_path: '/images/motifs/7.svg' },
                { id: 8, name: 'Parang Emas', file_path: '/images/motifs/8.svg', preview_image_path: '/images/motifs/8.svg' },
            ]);
        } finally {
            setLoadingMotifs(false);
        }
    };

    // Fungsi untuk menyimpan desain ke database
    const handleSave = () => {
        if (!stageRef.current) return;
        setIsSaving(true);

        // 1. Generate thumbnail dari canvas
        const thumbnail = stageRef.current.toDataURL({
            mimeType: 'image/jpeg',
            quality: 0.8,
            pixelRatio: 1, // Resolusi 1x cukup untuk thumbnail
        });

        const designData = {
            title: designName,
            canvas_data: canvasObjects,
            thumbnail: thumbnail, // Kirim thumbnail sebagai data base64
        };

        // 2. Tentukan rute dan metode (buat baru atau update)
        const url = initialDesign ? `/designs/${initialDesign.id}` : '/designs';
        const method = initialDesign ? 'put' : 'post';

        // 3. Kirim data ke backend dan arahkan ke dashboard setelah selesai
        router[method](url, designData, {
            onSuccess: () => {
                alert('Desain berhasil disimpan!');
            },
            onError: (errors) => {
                console.error('Gagal menyimpan:', errors);
                alert('Gagal menyimpan desain.');
            },
            onFinish: () => {
                setIsSaving(false);
            },
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

    const stage = stageRef.current;
    const scale = stage.scaleX(); // Asumsi scale X dan Y sama

    // Hitung area yang terlihat (viewport) berdasarkan posisi pan dan zoom
    const exportArea = {
        x: -stage.x() / scale,
        y: -stage.y() / scale,
        width: stage.width() / scale,
        height: stage.height() / scale,
    };

    // Ekspor hanya area yang terlihat tersebut
    const dataURL = stage.toDataURL({
        ...exportArea,
        pixelRatio: 2 // Gunakan pixelRatio 2 agar tekstur lebih tajam
    });

    setPatternFor3D(dataURL);
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
    }, [canvasObjects, selectedId]);

    // Mendapatkan objek yang dipilih berdasarkan ID
    const selectedObject = canvasObjects.find(obj => obj.id === selectedId);

    return (
        <>
            <Head title="Editor Desain Batik" />
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans">
                <header className="flex items-center justify-between px-6 py-4 bg-white shadow sticky top-0 z-20 border-b">
                    <Link 
                        href="/dashboard"
                        className="flex items-center gap-2 bg-[#F8F5F2] hover:bg-[#F3EDE7] text-[#BA682A] px-3 py-2 rounded-lg transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-semibold">Kembali</span>
                    </Link>
                    <h1 className="text-xl font-bold text-[#BA682A] tracking-tight">Canvas Batik</h1>
                    <div className="flex items-center gap-3">
                        <input 
                            type="text" 
                            value={designName} 
                            onChange={(e) => setDesignName(e.target.value)}
                            className="border border-[#D2691E] rounded-lg px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D2691E] w-48"
                            placeholder="Nama desain"
                        />
                        <button 
                            onClick={handleShow3D} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition flex items-center gap-1 shadow"
                        >
                            Preview 3D
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`px-4 py-1.5 rounded-lg transition text-sm font-semibold shadow ${
                                isSaving 
                                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                                    : 'bg-[#D2691E] hover:bg-[#A0522D] text-white'
                            }`}
                        >
                            {isSaving ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </header>   
                <div className="flex flex-1 gap-4 px-6 py-4">
                    {/* Sidebar Kiri */}
                    <aside className="w-64 bg-white rounded-xl shadow-lg p-4 flex flex-col border border-[#F3EDE7]">
                        <MotifLibrary 
                            motifs={motifs} 
                            loading={loadingMotifs}
                            onRefresh={fetchMotifs}
                        />
                    </aside>
                    {/* Area Canvas */}
                    <main className="flex-1 flex bg-white rounded-xl shadow-lg border border-[#F3EDE7]">
                        <CanvasArea 
                            objects={canvasObjects} 
                            setObjects={setCanvasObjects}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            stageRef={stageRef}
                            style={{ width: '100%'}}
                        />
                    </main>
                    {/* Sidebar Kanan */}
                    <aside className="w-72 bg-white rounded-xl shadow-lg p-4 flex flex-col border border-[#F3EDE7]">
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

                {/* Modal 3D */}
                {show3DModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl w-3/4 h-3/4 p-6 relative flex flex-col z-50">
                            <button 
                                onClick={() => setShow3DModal(false)}
                                className="z-100 absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition"
                            >
                                ×
                            </button>
                            <MockupViewer3D patternUrl={patternFor3D} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}