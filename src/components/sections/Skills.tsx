"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";

export function Skills() {
    const categories = [
        { title: "Languages", items: skills.languages },
        { title: "Frontend", items: skills.frontend },
        { title: "Backend", items: skills.backend },
        { title: "Tools & Platforms", items: skills.tools },
    ];

    return (
        <section id="skills" className="py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Technical Arsenal<span className="text-blue-600 dark:text-blue-400">.</span>
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
                        A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-8 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 hover:shadow-lg dark:hover:shadow-blue-900/10 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-xl font-bold mb-6 relative z-10 tracking-tight">{category.title}</h3>
                            <ul className="space-y-3 relative z-10">
                                {category.items.map((item, i) => (
                                    <li key={i} className="flex items-center text-zinc-700 dark:text-zinc-300 font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
