"use client";

import { motion } from "framer-motion";
import { about } from "@/data/content";

export function About() {
    return (
        <section id="about" className="py-24 px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-12">
                        About Me<span className="text-blue-600 dark:text-blue-400">.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2">
                            <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 font-medium">
                                {about.bio}
                            </p>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                I thrive at the intersection of robust backend architecture and intuitive frontend design. With a strong foundation in the Spring Boot ecosystem and modern frontend frameworks like React and Next.js, I have successfully led technical initiatives from conception to deployment. I am recognized for my rapid technology adoption, collaborative leadership, and ability to deliver scalable solutions in fast-paced environments.
                            </p>
                        </div>

                        <div className="space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                            <div>
                                <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Location</h3>
                                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{about.location}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Role</h3>
                                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{about.role}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Availability</h3>
                                <p className="flex items-center text-zinc-900 dark:text-zinc-100 font-medium">
                                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 mr-3 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                    {about.status}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
