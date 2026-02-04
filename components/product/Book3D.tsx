"use client";

import { useTexture, Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

interface Book3DContentProps {
    coverImage: string;
    backImage?: string;
}

function Book({ coverImage, backImage }: Book3DContentProps) {
    const mesh = useRef<Mesh>(null);

    // Load textures with fallback to placeholder
    const props = useTexture({
        map: coverImage || "/images/books/placeholder.jpg",
        back: backImage || coverImage || "/images/books/placeholder.jpg",
    });

    return (
        <Float
            speed={2}
            rotationIntensity={1}
            floatIntensity={1}
            floatingRange={[0, 0.5]}
        >
            <group rotation={[0, -Math.PI / 4, 0]}> {/* Initial rotation to show spine */}
                <mesh ref={mesh} receiveShadow castShadow>
                    <boxGeometry args={[2.8, 4, 0.4]} /> {/* Standard book proportions */}
                    <meshStandardMaterial attach="material-0" color="#f5f5f5" /> {/* Right: Pages */}
                    <meshStandardMaterial attach="material-1" color="#1a1a1a" /> {/* Left: Spine */}
                    <meshStandardMaterial attach="material-2" color="#f5f5f5" /> {/* Top: Pages */}
                    <meshStandardMaterial attach="material-3" color="#f5f5f5" /> {/* Bottom: Pages */}
                    <meshStandardMaterial attach="material-4" map={props.map} /> {/* Front */}
                    <meshStandardMaterial attach="material-5" map={props.back} /> {/* Back */}
                </mesh>
            </group>
        </Float>
    );
}

interface Book3DProps {
    coverImage: string;
    backImage?: string;
    className?: string;
}

export default function Book3D({ coverImage, backImage, className }: Book3DProps) {
    return (
        <div className={className}>
            <Canvas shadows camera={{ position: [0, 0, 5.5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={1}
                    castShadow
                />
                <Book coverImage={coverImage} backImage={backImage} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                    autoRotate={true}
                    autoRotateSpeed={2}
                />
            </Canvas>
        </div>
    );
}
