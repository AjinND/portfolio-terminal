"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import useInputHistory from "./hooks/userInputHistory";

export default function EnhancedPortfolio() {

  const { history, currentInput, addToHistory, navigateHistory, setCurrentInput } = useInputHistory();
  const [output, setOutput] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState<number>(14);
  const [textColor, setTextColor] = useState<string>("#00FF00");
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  const projects = [
    {
      id: 1,
      name: "Image Prompt Generator",
      description: "A responsive web application that helps users create well-structured prompts for AI image generation tools.",
      tech: ["Next JS", "Tailwind CSS", "Hugging Face API"],
      github: "https://github.com/AjinND/image-prompt-generator",
      URL: "https://image-prompt-generator.vercel.app/",
      status: "Completed",
      highlights: ["Prompt Generation", "Hugging Face", "AI Image Generation"]
    },
    {
      id: 2,
      name: "Website Builder",
      description: "A powerful drag-and-drop website builder that helps you design and generate code for web applications across multiple frameworks.",
      tech: ["Next JS", "Tailwind CSS", "React DnD", "Redux Persist", "OpenAI API"],
      github: "https://github.com/AjinND/website-builder",
      URL: "No Deployments Available",
      status: "In Progress (Development paused)",
      highlights: ["Drag-and-Drop Interface", "Multi-Framework Support", "AI-Powered Code Generation"]
    },
    {
      id: 3,
      name: "Personal Expense Tracker",
      description: "A simple web application to track personal expenses with real-time updates and data visualization.",
      tech: ["React JS", "Next JS", "Node.js", "MongoDB", "Tailwind CSS", "Cloudinary"],
      github: "https://github.com/AjinND/personal-expense-tracker",
      URL: "https://personal-expense-tracker-ii4k0y1t0-ajins-projects-6acee4cb.vercel.app/",
      status: "In Progress (Development paused, Preview available)",
      highlights: [ "User authentication", "Expense management", "Data visualization" ]
    },
    {
      id: 4,
      name: "Artist Portfolio & E-commerce Website",
      description: "A modern, visually stunning artist portfolio and e-commerce websitefor Artists to showcase and sell their artwork online.",
      tech: ["Tailwind CSS", "Next JS", "React Context API"],
      github: "https://github.com/AjinND/moon-doggy",
      URL: "https://moon-doggy-pjz5lf53s-ajins-projects-6acee4cb.vercel.app/",
      status: "In Progress (Development Paused, Preview available)",
      highlights: ["Portfolio Showcase", "E-commerce Integration", "Responsive Design"]
    },
    {
      id: 5,
      name: "Ping - Messaging Application",
      description: "A real-time messaging application with media sharing capabilities",
      tech: ["React Native", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com/AjinND/Ping",
      URL: "No Deployments Available",
      status: "Completed",
      highlights: ["Real-time messaging", "User authentication", "Media upload"]
    },
    {
      id: 6,
      name: "Fake Review Detection",
      description: "Machine learning model for detecting fraudulent reviews in e-commerce platforms",
      tech: ["Python", "ML", "Data Analysis", "Scikit-learn"],
      github: "https://github.com/AjinND/Fake-Review-Detection",
      URL: "No Deployments Available",
      status: "Completed",
      highlights: ["NLP processing", "Classification model", "80% + accuracy"]
    }
  ];

  const skills = {
    languages: ["JavaScript", "Python", "Java", "TypeScript"],
    frontend: ["React", "React Native", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Spring", "MongoDB", "PostgreSQL"],
    tools: ["Git", "Docker", "AWS", "PCF", "Jenkins"]
  };

  const printHelp = () => {
    const help = [
      "",
      "  Available Commands:",
      "  ├─ about        Display personal information",
      "  ├─ projects     List all projects with details",
      "  ├─ skills       Show technical skills breakdown",
      "  ├─ contact      Display contact information",
      "  ├─ settings     Customize terminal settings",
      "  ├─ clear        Clear terminal output",
      "  └─ help         Show this help message",
      ""
    ];
    setOutput(prev => [...prev, ...help]);
  };

  const printAbout = () => {
    const about = [
      "",
      "  ╔════════════════════════════════════════╗",
      "  ║          ABOUT AJIN N D                ║",
      "  ╚════════════════════════════════════════╝",
      "",
      "  Name:     Ajin N D",
      "  Role:     Full-Stack Software Developer",
      "  Location: India",
      "  Status:   Available for freelance & full-time",
      "",
      "  Bio: Passionate developer with expertise in building scalable,",
      "       user-centric applications. Specializing in web and mobile",
      "       development with a focus on clean code and performance.",
      ""
    ];
    setOutput(prev => [...prev, ...about]);
  };

  const printProjects = () => {
    const projectLines = ["", "  ╔════════════════════════════════════════╗", "  ║            FEATURED PROJECTS          ║", "  ╚════════════════════════════════════════╝", ""];
    
    projects.forEach((proj, idx) => {
      projectLines.push(
        `  [${idx + 1}] ${proj.name}`,
        `      Status: ${proj.status}`,
        `      Tech: ${proj.tech.join(" • ")}`,
        `      ${proj.description}`,
        `      Highlights: ${proj.highlights.join(" | ")}`,
        `      GitHub: ${proj.github}`,
        `      URL: ${proj.URL}`,
        ""
      );
    });
    
    projectLines.push("");
    setOutput(prev => [...prev, ...projectLines]);
  };

  const printSkills = () => {
    const skillLines = [
      "",
      "  ╔════════════════════════════════════════╗",
      "  ║           TECHNICAL SKILLS             ║",
      "  ╚════════════════════════════════════════╝",
      "",
      "  Languages:",
      `    ${skills.languages.map((s, i) => `[${i + 1}] ${s}`).join("  ")}`,
      "",
      "  Frontend:",
      `    ${skills.frontend.map((s, i) => `[${i + 1}] ${s}`).join("  ")}`,
      "",
      "  Backend:",
      `    ${skills.backend.map((s, i) => `[${i + 1}] ${s}`).join("  ")}`,
      "",
      "  Tools & Platforms:",
      `    ${skills.tools.map((s, i) => `[${i + 1}] ${s}`).join("  ")}`,
      ""
    ];
    setOutput(prev => [...prev, ...skillLines]);
  };

  const printContact = () => {
    const contact = [
      "",
      "  ╔════════════════════════════════════════╗",
      "  ║         CONTACT INFORMATION            ║",
      "  ╚════════════════════════════════════════╝",
      "",
      "  Email:    ajindavis007@gmail.com",
      "  GitHub:   github.com/AjinND",
      "  LinkedIn: linkedin.com/in/ajin-n-d-37b684193",
      "",
      "  Feel free to reach out for collaboration or inquiries!",
      ""
    ];
    setOutput(prev => [...prev, ...contact]);
  };

  const printSettings = () => {
    const settings = [
      "",
      "  ╔════════════════════════════════════════╗",
      "  ║        TERMINAL SETTINGS               ║",
      "  ╚════════════════════════════════════════╝",
      "",
      "  Current Settings:",
      `    Font Size: ${fontSize}px`,
      `    Text Color: ${textColor}`,
      "",
      "  Change Font Size:",
      "    $ fontsize [8-32]",
      "    Example: fontsize 18",
      "",
      "  Change Text Color:",
      "    $ textcolor [hex-code]",
      "    Examples: textcolor #00FF00",
      "              textcolor #FF0000",
      "              textcolor #00FFFF",
      "",
      "  Popular Colors:",
      "    Lime Green:   #00FF00",
      "    Bright Green: #39FF14",
      "    Cyan:         #00FFFF",
      "    Red:          #FF0000",
      "    Yellow:       #FFFF00",
      "    White:        #FFFFFF",
      "    Purple:       #FF00FF",
      ""
    ];
    setOutput(prev => [...prev, ...settings]);
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = currentInput.toLowerCase().trim();
      
      if (!cmd) return;

      setOutput(prev => [...prev, `$ ${currentInput}`]);
      addToHistory(currentInput);

      if (cmd === "help") {
        printHelp();
      } else if (cmd === "about") {
        printAbout();
      } else if (cmd === "projects") {
        printProjects();
      } else if (cmd === "skills") {
        printSkills();
      } else if (cmd === "contact") {
        printContact();
      } else if (cmd === "settings") {
        printSettings();
      } else if (cmd === "clear") {
        setOutput([]);
      } else if (cmd.startsWith("fontsize ")) {
        const size = parseInt(cmd.split(" ")[1]);
        if (!isNaN(size) && size > 8 && size < 32) {
          setFontSize(size);
          setOutput(prev => [...prev, `  Font size changed to ${size}px ✓`, ""]);
        } else {
          setOutput(prev => [...prev, `  Invalid size. Use between 8-32px`, ""]);
        }
      } else if (cmd.startsWith("textcolor ")) {
        const color = cmd.split(" ")[1];
        if (/^#[0-9A-F]{6}$/i.test(color)) {
          setTextColor(color);
          setOutput(prev => [...prev, `  Text color changed to ${color} ✓`, ""]);
        } else {
          setOutput(prev => [...prev, `  Invalid hex color format. Use #RRGGBB`, ""]);
        }
      } else {
        setOutput(prev => [...prev, `  Command not found: '${currentInput}'`, `  Type 'help' for available commands`, ""]);
      }

      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  useEffect(() => {
    if (!showBanner) {
      printHelp();
    }
  }, [showBanner]);

  if (showBanner) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center p-4">
        <div className="border-2 border-green-500 p-8 max-w-2xl w-full bg-black text-green-500 font-mono">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold mb-2 animate-pulse">&gt; PORTFOLIO TERMINAL</div>
            <div className="text-sm text-yellow-400 mb-4">v1.0 - Enhanced Experience</div>
          </div>
          
          <div className="border-t border-b border-green-500 py-4 mb-6 text-sm">
            <p className="mb-2">⚠️  WARNING: This experience is optimized for desktop/laptop</p>
            <p className="text-xs text-gray-400">Mobile support available with limited features</p>
          </div>

          <div className="space-y-2 text-sm mb-8">
            <p>Interactive terminal-based portfolio showcasing:</p>
            <p className="ml-4">• Project portfolio with detailed descriptions</p>
            <p className="ml-4">• Technical skills and expertise</p>
            <p className="ml-4">• Customizable terminal appearance</p>
            <p className="ml-4">• Full command-line interface</p>
          </div>

          <button
            onClick={() => setShowBanner(false)}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 transition-colors"
          >
            &gt; START TERMINAL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black text-green-500 font-mono flex flex-col"
      style={{ fontSize: `${fontSize}px`, color: textColor }}>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6" style={{ paddingBottom: '200px' }}>
        <div className="max-w-4xl mx-auto">
          {output.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-2xl font-bold mb-4">Welcome to Ajin's Portfolio Terminal</div>
              <div className="text-sm opacity-75">Type 'help' to get started</div>
            </div>
          ) : (
            output.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap break-words">
                {line}
              </div>
            ))
          )}
          <div ref={scrollEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-green-500 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <ChevronRight size={16} />
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none"
              style={{ color: textColor }}
              autoFocus
              placeholder="Enter command..."
            />
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs opacity-70">
            <button onClick={printHelp} className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-black transition-colors">
              help
            </button>
            <button onClick={printAbout} className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-black transition-colors">
              about
            </button>
            <button onClick={printProjects} className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-black transition-colors">
              projects
            </button>
            <button onClick={printSkills} className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-black transition-colors">
              skills
            </button>
            <button onClick={printContact} className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-black transition-colors">
              contact
            </button>
            <button onClick={printSettings} className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-black transition-colors">
              settings
            </button>
            <button onClick={() => setOutput([])} className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-black transition-colors">
              clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}