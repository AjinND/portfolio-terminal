"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/content";

export function Experience() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeExperience = experiences[activeIndex];

    return (
        <section id="experience" className="py-32 relative">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Experience<span className="text-zinc-400">.</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 min-h-[400px]">
                    {/* Left side: Tab navigation */}
                    <div className="md:w-1/3 flex overflow-x-auto md:flex-col gap-2 pb-4 md:pb-0 scrollbar-hide shrink-0 relative">
                        {/* Interactive tab highlight (desktop only) */}
                        <div className="hidden md:block absolute left-0 w-1 bg-zinc-200 dark:bg-zinc-800 h-full rounded-full" />
                        <motion.div
                            className="hidden md:block absolute left-0 w-1 bg-zinc-900 dark:bg-zinc-100 rounded-full z-10"
                            animate={{
                                top: `${activeIndex * 80}px`, /* Approx height gap mapping */
                                height: '64px'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        {experiences.map((exp, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    // Make sure height matches the animated line mapping
                                    className={`relative flex items-center h-16 px-6 md:pl-8 text-left whitespace-nowrap md:whitespace-normal font-medium transition-colors md:rounded-r-2xl rounded-2xl md:rounded-l-none ${isActive
                                        ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/50 md:bg-transparent"
                                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 md:bg-transparent bg-zinc-50 dark:bg-zinc-900/40"
                                        }`}
                                >
                                    <span className="line-clamp-2 leading-tight">
                                        {exp.company}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right side: Content display */}
                    <div className="md:w-2/3 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm"
                            >
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 leading-tight">
                                    {activeExperience.title}
                                </h3>
                                <div className="text-zinc-500 dark:text-zinc-400 font-medium tracking-wide mb-8">
                                    {activeExperience.period}
                                </div>
                                <ul className="space-y-4">
                                    {activeExperience.description.map((desc, i) => (
                                        <li key={i} className="flex gap-4 text-zinc-600 dark:text-zinc-300 leading-relaxed text-[1.05rem]">
                                            <span className="text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                            <span>{desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
