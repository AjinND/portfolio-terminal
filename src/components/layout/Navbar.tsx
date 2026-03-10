"use client";

import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setIsScrolled(latest > 50);
    });

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${targetId}`);
        }
    };

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
                isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800" : "bg-transparent"
            )}
        >
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight" onClick={(e) => {
                    if (window.location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        window.history.pushState(null, "", "/");
                    }
                }}>
                    AJIN N D<span className="text-blue-600 dark:text-blue-400">.</span>
                </Link>
                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
                        <Link href="#experience" onClick={(e) => handleScroll(e, 'experience')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</Link>
                        <Link href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</Link>
                        <Link href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </motion.nav>
    );
}
