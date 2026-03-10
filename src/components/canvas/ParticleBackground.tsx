"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
    const particlesRef = useRef<THREE.Points>(null);

    // Mouse position ref (normalized device coordinates)
    const mouse = useRef(new THREE.Vector2(-1000, -1000));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Convert screen coordinates to normalized device coordinates (-1 to +1)
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const particleCount = 2000;

    const [positions, initialPositions] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const init = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            // Spread particles out in a 3D grid
            const x = (Math.random() - 0.5) * 25;
            const y = (Math.random() - 0.5) * 25;
            const z = (Math.random() - 0.5) * 10;

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            init[i * 3] = x;
            init[i * 3 + 1] = y;
            init[i * 3 + 2] = z;
        }
        return [pos, init];
    }, [particleCount]);

    useFrame((state) => {
        // Calculate world coordinates from the normalized mouse
        const mouseWorldX = (mouse.current.x * state.viewport.width) / 2;
        const mouseWorldY = (mouse.current.y * state.viewport.height) / 2;

        if (!particlesRef.current) return;

        // Very subtle rotation of the entire field
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.x += 0.0002;

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            // Current position
            let x = positions[ix];
            let y = positions[iy];

            // Spring back to original position
            const targetX = initialPositions[ix];
            const targetY = initialPositions[iy];

            // Calculate distance from mouse to the BASE position (prevents jitter)
            const baseDx = mouseWorldX - targetX;
            const baseDy = mouseWorldY - targetY;
            const dist = Math.sqrt(baseDx * baseDx + baseDy * baseDy);

            let targetPosX = targetX;
            let targetPosY = targetY;

            // Interaction parameters
            const interactionRadius = 5.0; // Much larger radius
            const maxPush = 3.0; // How far particles get pushed away

            if (dist < interactionRadius) {
                // Non-linear falloff for a softer edge
                const force = Math.pow(1 - dist / interactionRadius, 2);
                const angle = Math.atan2(baseDy, baseDx);

                // Push target position away from mouse
                targetPosX -= Math.cos(angle) * force * maxPush;
                targetPosY -= Math.sin(angle) * force * maxPush;
            }

            // Smoothly interpolate current position to target position
            x += (targetPosX - x) * 0.08;
            y += (targetPosY - y) * 0.08;

            // Sine wave breathing effect for Z
            const time = state.clock.getElapsedTime();
            const z = initialPositions[iz] + Math.sin(time + x * 0.5) * 0.2;

            positions[ix] = x;
            positions[iy] = y;
            positions[iz] = z;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions as Float32Array}
                    itemSize={3}
                    args={[positions as Float32Array, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#888888" // Neutral tone, will be visually integrated into dark/light mode
                transparent
                opacity={0.4}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
}

export function ParticleBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const eventSource = typeof window !== 'undefined' ? document.documentElement : undefined;

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1}
                eventSource={eventSource as unknown as React.MutableRefObject<HTMLElement>}
                eventPrefix="page"
            >
                <Particles />
            </Canvas>
        </div>
    );
}
