import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { CameraControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Komponen untuk memuat model dan secara otomatis memposisikan kamera
function Model({ patternUrl, cameraControlsRef }) {
    const { nodes } = useGLTF('/models/white_shirt.glb');
    console.log('Loaded nodes:', nodes);
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

    const meshNames = ['Object_2', 'Object_3', 'Object_4', 'Object_5', 'Object_6', 'Object_7', 'Object_8', 'Object_9', 'Object_10', 'Object_11'];

    // ✨ EFEK UNTUK OTOMATIS MEMUSATKAN KAMERA ✨
    useEffect(() => {
        if (groupRef.current && cameraControlsRef.current) {
            // Fungsi ini akan otomatis mengatur posisi dan zoom kamera agar pas dengan model
            cameraControlsRef.current.fitToBox(groupRef.current, true);
        }
    }, [nodes, cameraControlsRef]);

    return (
        <group ref={groupRef} dispose={null}>
            {meshNames.map(name => {
                if (nodes[name]) {
                    return (
                        <mesh
                            key={name}
                            geometry={nodes[name].geometry}
                            material={material}
                        />
                    );
                }
                return null;
            })}
        </group>
    );
}

// Komponen utama untuk viewer 3D dengan tombol kontrol
export default function MockupViewer3D({ patternUrl }) {
    const cameraControlsRef = useRef();

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
            <Canvas>
                <Suspense fallback={null}>
                    <Model patternUrl={patternUrl} cameraControlsRef={cameraControlsRef} />
                </Suspense>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <hemisphereLight intensity={1} groundColor="white" />
                
                {/* Ganti OrbitControls dengan CameraControls */}
                <CameraControls ref={cameraControlsRef} />
            </Canvas>
            
            {/* ✨ Tombol Kontrol Kamera ✨ */}
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