import { useCallback, useState } from "react";

// Custom hook for managing input history
const useInputHistory = (initialHistory = []) => {
  const [history, setHistory] = useState<string[]>(initialHistory);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState("");
  const [originalInput, setOriginalInput] = useState("");

  const addToHistory = useCallback(
    (input: string) => {
      if (input.trim() && !history.includes(input)) {
        setHistory((prevHistory) => [...prevHistory, input]);
      }
      setCurrentHistoryIndex(-1);
      setCurrentInput("");
      setOriginalInput("");
    },
    [history]
  );

  const navigateHistory = useCallback(
    (direction: string) => {
      // First time navigating, store the current input
      if (currentHistoryIndex === -1) {
        setOriginalInput(currentInput);
      }

      if (direction === "up") {
        // Navigate up through history
        if (currentHistoryIndex < history.length - 1) {
          const newIndex = currentHistoryIndex + 1;
          setCurrentHistoryIndex(newIndex);
          setCurrentInput(history[history.length - 1 - newIndex]);
        }
      } else if (direction === "down") {
        // Navigate down through history
        if (currentHistoryIndex > -1) {
          const newIndex = currentHistoryIndex - 1;
          setCurrentHistoryIndex(newIndex);

          // If we're going back to the original input
          if (newIndex === -1) {
            setCurrentInput(originalInput);
          } else {
            setCurrentInput(history[history.length - 1 - newIndex]);
          }
        }
      }
    },
    [currentHistoryIndex, history, currentInput, originalInput]
  );

  return {
    history,
    currentInput,
    addToHistory,
    navigateHistory,
    setCurrentInput,
  };
};

export default useInputHistory;
