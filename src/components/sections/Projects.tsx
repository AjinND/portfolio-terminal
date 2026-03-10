"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/content";
import { ExternalLink, Github } from "lucide-react";
import { useCursorStore } from "@/lib/store";

export function Projects() {
    return (
        <section id="projects" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Selected Works<span className="text-blue-600 dark:text-blue-400">.</span>
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
                        A collection of projects showcasing my full-stack capabilities, from AI integrations to complex web builders.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] }}
                            className="group relative bg-white/50 dark:bg-[#0f0f0f]/80 backdrop-blur-md rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-none"
                            onMouseEnter={() => {
                                useCursorStore.getState().setHoverState('project');
                                useCursorStore.getState().setCursorText('VIEW');
                            }}
                            onMouseLeave={() => {
                                useCursorStore.getState().setHoverState('default');
                                useCursorStore.getState().setCursorText('');
                            }}
                        >
                            <div className="p-8 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold tracking-tight">{project.name}</h3>
                                        <div className="flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            {project.status}
                                        </div>
                                    </div>
                                    <div className="flex gap-3 shrink-0 ml-4">
                                        {project.github !== "No Deployments Available" && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {project.URL !== "No Deployments Available" && (
                                            <a href={project.URL} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="text-zinc-600 dark:text-zinc-400 mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="space-y-4 mt-auto">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Highlights</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.highlights.map((highlight, i) => (
                                                <span key={i} className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full border border-zinc-200 dark:border-zinc-700">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
