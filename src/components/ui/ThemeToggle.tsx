"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, MouseEvent, useRef, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function DustOverlay({
    x,
    y,
    color,
    onComplete,
    swapTheme
}: {
    x: number;
    y: number;
    color: string;
    onComplete: () => void;
    swapTheme: () => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Keep track of latest callbacks to avoid triggering re-runs
    const swapRef = useRef(swapTheme);
    const completeRef = useRef(onComplete);

    useEffect(() => {
        swapRef.current = swapTheme;
        completeRef.current = onComplete;
    }, [swapTheme, onComplete]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const PARTICLE_SIZE = window.innerWidth < 768 ? 15 : 20;
        const cols = Math.ceil(width / PARTICLE_SIZE);
        const rows = Math.ceil(height / PARTICLE_SIZE);

        const particles: any[] = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const bx = j * PARTICLE_SIZE + PARTICLE_SIZE / 2;
                const by = i * PARTICLE_SIZE + PARTICLE_SIZE / 2;
                const dx = bx - x;
                const dy = by - y;
                const angle = Math.atan2(dy, dx);

                particles.push({
                    x: j * PARTICLE_SIZE,
                    y: i * PARTICLE_SIZE,
                    baseX: j * PARTICLE_SIZE,
                    baseY: i * PARTICLE_SIZE,
                    vx: Math.cos(angle) * (Math.random() * 4 + 1),
                    vy: Math.sin(angle) * (Math.random() * 4 + 1) - Math.random() * 4,
                    active: false,
                    size: PARTICLE_SIZE + 1.5,
                });
            }
        }

        let animationFrameId: number;
        let radius = 0;
        const gravity = 0.4;

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            radius += 35;
            let allFallen = true;

            ctx.fillStyle = color;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                if (!p.active) {
                    const dx = p.baseX + PARTICLE_SIZE / 2 - x;
                    const dy = p.baseY + PARTICLE_SIZE / 2 - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < radius) {
                        p.active = true;
                    }
                }

                if (p.active) {
                    p.vy += gravity;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.size = Math.max(0, p.size - 0.05);
                }

                if (p.y < height && p.size > 0) {
                    allFallen = false;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                } else if (!p.active) {
                    allFallen = false;
                    ctx.fillRect(p.baseX, p.baseY, p.size, p.size);
                }
            }

            if (!allFallen) {
                animationFrameId = requestAnimationFrame(render);
            } else {
                completeRef.current();
            }
        };

        requestAnimationFrame(() => {
            swapRef.current();
            setTimeout(() => {
                render();
            }, 50);
        });

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [x, y, color]);

    return <canvas ref={canvasRef} className="fixed inset-0 z-[100] pointer-events-none" />;
}

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transData, setTransData] = useState({ x: 0, y: 0, color: '#000' });

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = theme === "dark";

    const handleSwap = useCallback(() => {
        setTheme(isDark ? "light" : "dark");
    }, [isDark, setTheme]);

    const handleComplete = useCallback(() => {
        setIsTransitioning(false);
    }, []);

    const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
        if (!mounted || isTransitioning) return;

        setTransData({
            x: e.clientX,
            y: e.clientY,
            color: isDark ? '#0a0a0a' : '#fafafa'
        });
        setIsTransitioning(true);
    };

    if (!mounted) return null;

    return (
        <>
            <button
                onClick={handleToggle}
                className={cn(
                    "relative z-40 flex items-center justify-center p-2 rounded-full overflow-hidden transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:scale-110 active:scale-95",
                    className
                )}
                aria-label="Toggle Dark Mode"
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
                    className="absolute"
                >
                    <Moon className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
                    className="absolute"
                >
                    <Sun className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />
                </motion.div>

                <div className="w-6 h-6 opacity-0" />
            </button>

            {isTransitioning && (
                <DustOverlay
                    x={transData.x}
                    y={transData.y}
                    color={transData.color}
                    swapTheme={handleSwap}
                    onComplete={handleComplete}
                />
            )}
        </>
    );
}
