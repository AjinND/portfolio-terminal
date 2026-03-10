"use client";

import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
import { contact } from "@/data/content";
import { useState } from "react";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSuccess(true);
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setIsSuccess(false), 5000);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-32 relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Let's Talk<span className="text-blue-600 dark:text-blue-400">.</span>
                    </h2>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                        Have a project in mind or just want to chat? I'm always open to discussing new opportunities and creative ideas.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-6">Get in touch</h3>

                            <div className="space-y-6">
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                                        <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Email Me</div>
                                        <div className="font-medium">{contact.email}</div>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                                        <MapPin className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">Location</div>
                                        <div className="font-medium">India (Open to Remote)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm shadow-xl shadow-zinc-200/20 dark:shadow-none space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="John Doe"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="john@example.com"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isSuccess}
                                className="w-full py-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                                ) : isSuccess ? (
                                    <span className="text-green-500 dark:text-green-600 font-bold">Message Sent! ✓</span>
                                ) : (
                                    <>Send Message <Send className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
