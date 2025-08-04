import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';

// Impor semua komponen yang dibutuhkan
import MotifLibrary from '@/Components/Editor/MotifLibrary';
import CanvasArea from '@/Components/Editor/CanvasArea';
import PropertiesToolbar from '@/Components/Editor/PropertiesToolbar';
import LayerPanel from '@/Components/Editor/LayerPanel';

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

    // Fungsi untuk menyimpan desain (saat ini hanya simulasi)
    const handleSave = () => {
        console.log("Menyimpan desain...");
        console.log({
            name: designName,
            canvas_data: JSON.stringify(canvasObjects),
        });
        alert('Desain disimpan! (Cek console log)');
        // TODO: Ganti dengan logika POST ke API Laravel
    };

    // Fungsi untuk membersihkan semua objek dari canvas
    const handleClearCanvas = () => {
        if (window.confirm('Apakah Anda yakin ingin menghapus semua motif dari canvas?')) {
            setCanvasObjects([]);
            setSelectedId(null);
        }
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
                <header className="flex items-center justify-between p-2 bg-white border-b shadow-sm z-10">
                    <input 
                        type="text" 
                        value={designName} 
                        onChange={(e) => setDesignName(e.target.value)}
                        className="font-bold border rounded px-2 py-1"
                    />
                    <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition-colors">
                        Simpan
                    </button>
                </header>

                <div className="flex flex-grow overflow-hidden">
                    {/* Sidebar Kiri */}
                    <aside className="w-64 bg-white p-4 overflow-y-auto shadow-md flex flex-col">
                        <MotifLibrary motifs={staticMotifs} />
                        <div className="mt-auto pt-4">
                            <LayerPanel
                                objects={canvasObjects}
                                selectedId={selectedId}
                                onSelect={setSelectedId}
                                onClear={handleClearCanvas}
                            />
                        </div>
                    </aside>

                    {/* Area Canvas Utama */}
                    <main className="flex-grow flex items-center justify-center p-4">
                        <CanvasArea 
                            objects={canvasObjects} 
                            setObjects={setCanvasObjects}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                        />
                    </main>

                    {/* Sidebar Kanan */}
                    <aside className="w-72 bg-white p-4 shadow-md">
                        <PropertiesToolbar 
                            selectedObject={selectedObject}
                            onUpdate={updateObjectProperties}
                        />
                    </aside>
                </div>
            </div>
        </>
    );
}