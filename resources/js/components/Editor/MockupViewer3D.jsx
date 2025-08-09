import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { CameraControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Daftar model yang tersedia
const MODEL_LIST = [
    { label: 'Kemeja Lengan Panjang', value: 'kemeja', file: '/models/white_shirt.glb' },
    { label: 'Kaos', value: 'kaos', file: '/models/kaos.glb' },
    { label: 'Polo', value: 'polo', file: '/models/polo.glb' },
    { label: 'Dress', value: 'dress', file: '/models/dress.glb' },
    // Tambahkan model lain di sini
];

// Komponen untuk memuat model dan secara otomatis memposisikan kamera
function Model({ patternUrl, cameraControlsRef, modelFile }) {
    const { nodes } = useGLTF(modelFile);
    const groupRef = useRef();

    const patternTexture = useLoader(THREE.TextureLoader, patternUrl);
    patternTexture.wrapS = THREE.RepeatWrapping;
    patternTexture.wrapT = THREE.RepeatWrapping;
    patternTexture.repeat.set(6, 6);
    patternTexture.flipY = false;

    const material = new THREE.MeshStandardMaterial({
        map: patternTexture,
        metalness: 0.1,
        roughness: 0.8,
    });

    const meshNames = Object.keys(nodes).filter(name => nodes[name]?.geometry);

    // ✨ EFEK UNTUK OTOMATIS MEMUSATKAN KAMERA ✨
    useEffect(() => {
        if (groupRef.current && cameraControlsRef.current) {
            // Fungsi ini akan otomatis mengatur posisi dan zoom kamera agar pas dengan model
            cameraControlsRef.current.fitToBox(groupRef.current, true);
        }
    }, [nodes, cameraControlsRef]);

    return (
        <group ref={groupRef} dispose={null}>
            {meshNames.map(name => (
                <mesh
                    key={name}
                    geometry={nodes[name].geometry}
                    material={material}
                />
            ))}
        </group>
    );
}

// Komponen utama untuk viewer 3D dengan tombol kontrol
export default function MockupViewer3D({ patternUrl }) {
    const cameraControlsRef = useRef();
    const [selectedModel, setSelectedModel] = React.useState(MODEL_LIST[0]);

    // Fungsi untuk mengubah sudut pandang kamera
    const setView = (position) => {
        if (cameraControlsRef.current) {
            // Posisi Kamera [x, y, z], Target Kamera [x, y, z]
            const [camX, camY, camZ] = position;
            cameraControlsRef.current.setLookAt(camX, camY, camZ, 0, 0, 0, true);
        }
    };

    return (
        <div className="w-full h-full bg-gray-200 relative">
            {/* Dropdown model */}
            <div className="absolute top-4 left-4 z-50">
                <select
                    value={selectedModel.value}
                    onChange={e => {
                        const found = MODEL_LIST.find(m => m.value === e.target.value);
                        if (found) setSelectedModel(found);
                    }}
                    className="px-3 py-2 rounded-lg border border-gray-300 bg-white shadow"
                >
                    {MODEL_LIST.map(model => (
                        <option key={model.value} value={model.value}>{model.label}</option>
                    ))}
                </select>
            </div>
            <Canvas>
                <Suspense fallback={null}>
                    <Model
                        patternUrl={patternUrl}
                        cameraControlsRef={cameraControlsRef}
                        modelFile={selectedModel.file}
                    />
                </Suspense>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <hemisphereLight intensity={1} groundColor="white" />
                <CameraControls ref={cameraControlsRef} />
            </Canvas>
            {/* Tombol Kontrol Kamera */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-70 backdrop-blur-sm p-2 rounded-lg flex gap-2 shadow-lg">
                <button onClick={() => setView([0, 0, 3])} className="px-3 py-1 rounded hover:bg-gray-200">Depan</button>
                <button onClick={() => setView([0, 0, -3])} className="px-3 py-1 rounded hover:bg-gray-200">Belakang</button>
                <button onClick={() => setView([-3, 0, 0])} className="px-3 py-1 rounded hover:bg-gray-200">Kiri</button>
                <button onClick={() => setView([3, 0, 0])} className="px-3 py-1 rounded hover:bg-gray-200">Kanan</button>
                <button onClick={() => setView([0, 3, 0])} className="px-3 py-1 rounded hover:bg-gray-200">Atas</button>
            </div>
        </div>
    );
}