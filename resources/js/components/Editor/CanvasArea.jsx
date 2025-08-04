import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';

// Komponen MotifImage tidak ada perubahan
const MotifImage = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const [image] = useImage(shapeProps.src, 'Anonymous');
    return (
        <KonvaImage
            onClick={onSelect} onTap={onSelect} ref={shapeRef} {...shapeProps} image={image} draggable
            onDragEnd={(e) => onChange({ ...shapeProps, x: e.target.x(), y: e.target.y() })}
            onTransformEnd={(e) => {
                const node = shapeRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
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

export default function CanvasArea({ objects, setObjects, selectedId, setSelectedId }) {
    const trRef = useRef();
    const stageRef = useRef();
    const [stage, setStage] = useState({ scale: 1, x: 0, y: 0 });

    useEffect(() => {
        if (!trRef.current) return;
        const selectedNode = stageRef.current.findOne('#' + selectedId);
        if (selectedNode) {
            trRef.current.nodes([selectedNode]);
        } else {
            trRef.current.nodes([]);
        }
        trRef.current.getLayer()?.batchDraw();
    }, [selectedId]);

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    };
    
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
        setStage({
            scale: newScale,
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        });
    };
    
    // --- PERUBAHAN DI SINI ---
    const handleStageDragEnd = (e) => {
        if (e.target === stageRef.current) {
            setStage({ ...stage, x: e.target.x(), y: e.target.y() });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (!stageRef.current) return;
        stageRef.current.setPointersPositions(e);
        const pos = stageRef.current.getPointerPosition();
        const dropX = (pos.x - stage.x) / stage.scale;
        const dropY = (pos.y - stage.y) / stage.scale;
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
                width={800} height={600}
                onMouseDown={checkDeselect} onTouchStart={checkDeselect}
                ref={stageRef}
                scaleX={stage.scale} scaleY={stage.scale}
                x={stage.x} y={stage.y}
                onWheel={handleWheel}
                onDragEnd={handleStageDragEnd}
                // --- DAN PERUBAHAN DI SINI ---
                draggable 
            >
                <Layer>
                    {objects.map((obj) => (
                        <MotifImage
                            key={obj.id} shapeProps={obj} isSelected={obj.id === selectedId}
                            onSelect={() => setSelectedId(obj.id)}
                            onChange={(newAttrs) => {
                                const newObjects = objects.slice();
                                const objIndex = newObjects.findIndex(o => o.id === obj.id);
                                newObjects[objIndex] = newAttrs;
                                setObjects(newObjects);
                            }}
                        />
                    ))}
                    <Transformer ref={trRef} />
                </Layer>
            </Stage>
        </div>
    );
}