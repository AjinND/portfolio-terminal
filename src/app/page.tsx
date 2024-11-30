"use client";

import { useState, useRef, useEffect } from "react";
import userInputHistory from "./hooks/userInputHistory";

export default function Home() {
  const [output, setOutput] = useState([
    "Welcome to My Portfolio Terminal",
    'Type "help" for available commands',
  ]);
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("#00FF00");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastContentRef = useRef<HTMLDivElement>(null);

  const [banner, setBanner] = useState(true);

  const commandMap: { [key: string]: string[] } = {
    help: [
      "Available commands:",
      "- about: Display personal information",
      "- projects: List recent projects",
      "- skills: Show technical skills",
      "- contact: Display contact information",
      "- settings: Customize terminal appearance",
    ],
    about: [
      "Name: Ajin N D",
      "Role: Software Developer",
      "Location: India",
      "Bio: Passionate developer creating innovative solutions",
    ],
    projects: [
      "Recent Projects:",
      "1. Ping - Messaging Application",
      "Description: A messaging application built with React Native, Node.js, and MongoDB.",
      "GitHub: https://github.com/AjinND/Ping",
      "2. Fake Review Detection - Machine Learning Model to detect fake reviews",
      "Description: A machine learning model for predicting the amount of fakes reviews in an online store.",
      "GitHub: https://github.com/AjinND/Fake-Review-Detection",
    ],
    skills: [
      "Technical Skills:",
      "Languages: JavaScript, Python, Java",
      "Frameworks: React, Node.js, Spring",
      "Tools: Git, Docker, AWS, PCF",
    ],
    contact: [
      "Contact Information:",
      "Email: ajindavis007@gmail.com",
      "LinkedIn: /ajin-n-d-37b684193",
      "GitHub: /AjinND",
    ],
    settings: [
      "Current Terminal Settings:",
      `Font Size: ${fontSize}px`,
      `Text Color: ${textColor}`,
    ],
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const lowercaseCommand = currentInput.toLowerCase().trim();
      let response;

      addToHistory(lowercaseCommand);

      if (lowercaseCommand.startsWith("fontsize ")) {
        const size = parseInt(lowercaseCommand.split(" ")[1]);
        if (!isNaN(size)) {
          setFontSize(size);
          response = [`Font size set to ${size}px`];
        } else {
          response = ["Invalid font size. Please enter a number."];
        }
      } else if (lowercaseCommand.startsWith("textcolor ")) {
        const color = lowercaseCommand.split(" ")[1];
        setTextColor(color);
        response = [`Text color set to ${color}`];
      } else {
        response = commandMap[lowercaseCommand] || [
          `Command not found: ${currentInput}`,
          'Type "help" for available commands',
        ];
      }

      setOutput([...output, `> ${currentInput}`, ...response]);

      if (lowercaseCommand === "clear") {
        setOutput([
          "Welcome to My Portfolio Terminal",
          'Type "help" for available commands',
        ]);
      }

      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateHistory("up");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateHistory("down");
    }
  };

  useEffect(() => {
    if (lastContentRef.current) {
      lastContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  const handleScreenClick = () => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const handleRightClick = (e:React.MouseEvent ) => {
    e.preventDefault();
    navigator.clipboard.readText().then((text) => {
      setCurrentInput(text);
      inputRef.current?.focus();
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentInput);
    setOutput([...output, `Copied: ${currentInput}`]);
    setCurrentInput("");
  };

  const { currentInput, addToHistory, navigateHistory, setCurrentInput } =
    userInputHistory();

  return (
    <div>
      {banner ? (
        <div className="bg-black text-white h-screen flex items-center justify-center">
          <div className=" p-8  border-solid border-zinc-500 rounded-none border-16 w-40">
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Redirecting to Ajin N D Portfolio
            </h2>
            <p className="text-lg mb-8 font-mono text-yellow-500">
              WARNING: This experience is best viewed on a desktop or laptop
              computer.
            </p>
            <p className="text-lg mb-8 font-mono">Click 'START' to begin.</p>
            <div className="flex justify-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                onClick={() => setBanner(false)}
              >
                START
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-black text-green-500 p-4 min-h-screen font-mono"
          style={{
            fontFamily: "Monaco, monospace",
            fontSize: `${fontSize}px`,
            color: textColor,
          }}
          onClick={handleScreenClick}
          onContextMenu={handleRightClick}
        >
          <div className="h-full overflow-y-auto whitespace-pre-wrap">
            {output.map((line, index) => (
              <div key={index} ref={lastContentRef}>
                {line}
              </div>
            ))}
          </div>
          <div className="flex fixed bottom-0 left-0 right-0 bg-black py-2">
            <span className="mr-2">{">"}</span>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent outline-none flex-1"
              style={{ color: textColor }}
              autoFocus
              ref={inputRef}
            />
            <button className="ml-2 hover:text-white" onClick={handleCopy}>
              Copy
            </button>
            <button
              className="ml-2 hover:text-white"
              onClick={() =>
                setOutput([
                  ...output,
                  "Customize the Terminal:",
                  '1. Type "fontsize [number]" to set font size.\nExample: fontsize 18',
                  '2. Type "textcolor [hex-code]" to set text color.\nExample: textcolor #FF0000',
                ])
              }
            >
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
