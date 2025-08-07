import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer, Rect } from 'react-konva';
import useImage from 'use-image';

// Komponen kecil untuk merender satu gambar motif di dalam canvas
const MotifImage = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    // Hook 'useImage' untuk memuat gambar dengan aman ke dalam Konva
    const [image] = useImage(shapeProps.src, 'Anonymous');

    // Hubungkan Transformer ke node ini saat terpilih
    useEffect(() => {
        if (isSelected) {
            // trRef didapat dari parent melalui context atau prop, tapi cara ini lebih simpel
            const tr = shapeRef.current.getStage().findOne('Transformer');
            if (tr) {
                tr.nodes([shapeRef.current]);
                tr.getLayer().batchDraw();
            }
        }
    }, [isSelected]);

    return (
        <KonvaImage
            id={shapeProps.id} // ID penting untuk seleksi
            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
            {...shapeProps}
            image={image}
            draggable
            onDragEnd={(e) => {
                onChange({
                    ...shapeProps,
                    x: e.target.x(),
                    y: e.target.y(),
                });
            }}
            onTransformEnd={() => {
                const node = shapeRef.current;
                if (!node) return;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                
                // Reset skala untuk menghindari penumpukan transformasi
                node.scaleX(1);
                node.scaleY(1);

                onChange({
                    ...shapeProps,
                    x: node.x(),
                    y: node.y(),
                    width: Math.max(5, node.width() * scaleX),
                    height: Math.max(node.height() * scaleY),
                    rotation: node.rotation(),
                });
            }}
        />
    );
};

// Komponen utama untuk seluruh area canvas
export default function CanvasArea({ objects, setObjects, selectedId, setSelectedId, stageRef }) {
    const trRef = useRef();
    
    // State lokal untuk posisi dan skala panggung (canvas)
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
    const [stageScale, setStageScale] = useState(1);

    // Efek untuk menghubungkan Transformer dengan node yang dipilih
    useEffect(() => {
        if (trRef.current) {
            const selectedNode = stageRef.current.findOne('#' + selectedId);
            if (selectedNode) {
                trRef.current.nodes([selectedNode]);
            } else {
                trRef.current.nodes([]);
            }
            trRef.current.getLayer()?.batchDraw();
        }
    }, [selectedId, objects, stageRef]);

    // Fungsi untuk membatalkan pilihan jika klik di area kosong
    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    };
    
    // Fungsi untuk menangani zoom dengan mouse scroll wheel
    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.05;
        const stage = stageRef.current;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };
        const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
        
        setStageScale(newScale);
        setStagePos({
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        });
    };
    
    // Fungsi untuk menangani pan (geser) canvas
    const handleStageDragEnd = (e) => {
        // Hanya update jika yang digeser adalah panggungnya langsung, bukan motif
        if (e.target === stageRef.current) {
            setStagePos({ x: e.target.x(), y: e.target.y() });
        }
    };

    // Fungsi untuk menangani drop motif dari pustaka
    const handleDrop = (e) => {
        e.preventDefault();
        if (!stageRef.current) return;
        stageRef.current.setPointersPositions(e);
        
        const pos = stageRef.current.getPointerPosition();
        const dropX = (pos.x - stagePos.x) / stageScale;
        const dropY = (pos.y - stagePos.y) / stageScale;
        
        const motifData = JSON.parse(e.dataTransfer.getData('application/json'));
        
        const newObject = {
            id: 'obj' + Date.now(),
            x: dropX,
            y: dropY,
            src: motifData.file_path,
            width: 150,
            height: 150,
            rotation: 0,
        };
        setObjects([...objects, newObject]);
    };

    return (
        <div 
            className="bg-white shadow-lg cursor-grab active:cursor-grabbing"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <Stage
                width={800}
                height={600}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                ref={stageRef}
                scaleX={stageScale}
                scaleY={stageScale}
                x={stagePos.x}
                y={stagePos.y}
                onWheel={handleWheel}
                onDragEnd={handleStageDragEnd}
                draggable 
            >
                <Layer>
                    <Rect
                        x={-stagePos.x / stageScale}
                        y={-stagePos.y / stageScale}
                        width={800 / stageScale}
                        height={600 / stageScale}
                        fill="white"
                        listening={false}
                    />
                    {objects.map((obj) => (
                        <MotifImage
                            key={obj.id}
                            shapeProps={obj}
                            isSelected={obj.id === selectedId}
                            onSelect={() => {
                                setSelectedId(obj.id);
                            }}
                            onChange={(newAttrs) => {
                                const newObjects = objects.slice();
                                const objIndex = newObjects.findIndex(o => o.id === obj.id);
                                if (objIndex !== -1) {
                                    newObjects[objIndex] = newAttrs;
                                    setObjects(newObjects);
                                }
                            }}
                        />
                    ))}
                    <Transformer ref={trRef} />
                </Layer>
            </Stage>
        </div>
    );
}