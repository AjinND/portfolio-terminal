import { contact } from "@/data/content";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-6 mt-20" id="contact">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <Link href="/" className="font-bold text-xl tracking-tight block mb-2">
                        AJIN N D<span className="text-blue-600 dark:text-blue-400">.</span>
                    </Link>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Crafting digital experiences with precision and passion.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <a href={`mailto:${contact.email}`} className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors" aria-label="Email">
                        <Mail className="w-5 h-5" />
                    </a>
                    <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors" aria-label="GitHub">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="/resume.pdf" download="Ajin_ND_Resume.pdf" className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors" aria-label="Download Resume">
                        <FileText className="w-5 h-5" />
                    </a>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
                &copy; {year} Ajin N D. All rights reserved.
            </div>
        </footer>
    );
}
