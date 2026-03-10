"use client";

import { useEffect, useRef } from "react";
import { useCursorStore } from "@/lib/store";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
    const { hoverState } = useCursorStore();
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const isVisible = useRef(false);

    // Smooth out the mouse movements
    const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
    const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        const manageMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible.current) isVisible.current = true;
        };

        window.addEventListener("mousemove", manageMouseMove);

        // Provide some basic interactivity tagging directly on DOM
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a') || target.closest('button') || target.tagName.toLowerCase() === 'button';
            if (isClickable && hoverState === 'default') {
                useCursorStore.getState().setHoverState('link');
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a') || target.closest('button') || target.tagName.toLowerCase() === 'button';
            if (isClickable) {
                useCursorStore.getState().setHoverState('default');
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
            document.body.style.cursor = 'auto'; // cleanup
        };
    }, [mouseX, mouseY, hoverState]);

    // Variants based on the hovered element
    const variants = {
        default: {
            width: 16,
            height: 16,
            backgroundColor: "var(--foreground)",
            mixBlendMode: "difference" as const,
            border: "0px solid transparent"
        },
        link: {
            width: 48,
            height: 48,
            backgroundColor: "var(--foreground)",
            mixBlendMode: "difference" as const,
            scale: 1.2,
            border: "0px solid transparent"
        },
        project: {
            width: 48,
            height: 48,
            backgroundColor: "var(--foreground)",
            mixBlendMode: "difference" as const,
            scale: 1,
            border: "0px solid transparent",
            backdropFilter: "none"
        },
        hero: {
            width: 0,
            height: 0,
            opacity: 0,
            backgroundColor: "transparent",
            mixBlendMode: "normal" as const,
            scale: 0,
            border: "none",
            backdropFilter: "none"
        }
    };

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full text-xs font-bold tracking-widest overflow-hidden text-background"
            style={{
                left: springX,
                top: springY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            variants={variants}
            animate={hoverState}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    );
}
