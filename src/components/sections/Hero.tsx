"use client";

import { motion } from "framer-motion";
import { contact } from "@/data/content";
import { ArrowDown, Mail, Github, Linkedin, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useCursorStore } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export function Hero() {
    const setHoverState = useCursorStore((state) => state.setHoverState);
    const heroRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const maskRadius = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 400, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 400, damping: 30 });
    // Keep radius springing for the expansion effect
    const smoothRadius = useSpring(maskRadius, { stiffness: 200, damping: 30 });

    const clipPathStyle = useMotionTemplate`circle(${smoothRadius}px at ${smoothX}px ${smoothY}px)`;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current && isHovered) {
                const { left, top } = sectionRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - left);
                mouseY.set(e.clientY - top);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, isHovered]);

    // Handle smooth radius expansion
    useEffect(() => {
        maskRadius.set(isHovered ? 175 : 0);
    }, [isHovered, maskRadius]);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (sectionRef.current) {
            const { left, top } = sectionRef.current.getBoundingClientRect();
            const enterX = e.clientX - left;
            const enterY = e.clientY - top;

            // Instantly sync the base values
            mouseX.jump(enterX);
            mouseY.jump(enterY);

            // Crucial: Instantly jump the physics springs to bypass their tracking delay on entry
            smoothX.jump(enterX);
            smoothY.jump(enterY);
        }
        setIsHovered(true);
        setHoverState('hero');
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden cursor-none"
        >
            {/* The absolute overlay containing the hidden graphic image that becomes unmasked */}
            <motion.div
                className="absolute inset-0 z-[30] pointer-events-none flex items-center justify-center bg-white dark:bg-black"
                style={{
                    clipPath: clipPathStyle,
                    WebkitClipPath: clipPathStyle
                }}
            >
                <Image
                    src="/hero-landscape.png"
                    alt="Hero graphic effect"
                    fill
                    priority
                    quality={100}
                    className="object-cover opacity-70 mix-blend-multiply dark:mix-blend-screen"
                    style={{
                        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
                    }}
                />
            </motion.div>

            {/* Standard Background decoration */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
                <div className="w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen animate-pulse duration-1000" />
            </div>

            <div
                ref={heroRef}
                className="relative max-w-4xl mx-auto text-center pointer-events-auto py-12"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setHoverState('default');
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className="mb-8"
                >
                    <span className="inline-block px-5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-md text-sm font-medium tracking-wide">
                        Available for new opportunities ✨
                    </span>
                </motion.div>

                <div className="overflow-hidden mb-6">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none"
                    >
                        Architecting
                    </motion.h1>
                </div>

                <div className="overflow-hidden mb-10">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900 dark:from-zinc-400 dark:to-zinc-100">
                            scalable solutions.
                        </span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-12 font-light"
                >
                    I am Ajin N D, a results-driven Full Stack Developer with 4+ years of experience specializing in Java, React, and AWS cloud-native applications.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-40 pointer-events-auto"
                >
                    <Link
                        href="#projects"
                        className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 font-medium hover:scale-105 transition-transform w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        View Projects <ArrowDown className="w-4 h-4" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <a href={`mailto:${contact.email}`} className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors" aria-label="Email">
                            <Mail className="w-5 h-5" />
                        </a>
                        <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors" aria-label="GitHub">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="/resume.pdf" download="Ajin_ND_Resume.pdf" className="p-4 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors" aria-label="Download Resume">
                            <FileText className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
