'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeLines = [
  '$ npm create next-app@latest',
  '✓ Creating a new Next.js project...',
  '$ cd attmoc-client-project',
  '$ npm install react typescript tailwind',
  '✓ Installing dependencies...',
  '$ npm run dev',
  '✨ Building your digital future...',
  '✓ Ready on http://localhost:3000',
  '',
  '> ATTMOC - Code that transforms businesses',
];

export default function CodeTerminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      // Reset after a pause
      const resetTimer = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentText('');
        setCharIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const currentLine = codeLines[currentLineIndex];

    if (charIndex < currentLine.length) {
      // Type character by character
      const typingTimer = setTimeout(() => {
        setCurrentText(currentLine.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 30); // Typing speed
      return () => clearTimeout(typingTimer);
    } else {
      // Move to next line after a brief pause
      const nextLineTimer = setTimeout(() => {
        setDisplayedLines([...displayedLines, currentLine]);
        setCurrentLineIndex(currentLineIndex + 1);
        setCurrentText('');
        setCharIndex(0);
      }, 200);
      return () => clearTimeout(nextLineTimer);
    }
  }, [currentLineIndex, charIndex, displayedLines]);

  return (
    <div className="w-full h-full bg-gray-900 dark:bg-black rounded-xl shadow-2xl overflow-hidden border border-gray-700">
      {/* Terminal Header */}
      <div className="bg-gray-800 dark:bg-gray-950 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-sm ml-4 font-mono">terminal — attmoc</span>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm h-[300px] md:h-[350px] overflow-hidden">
        <div className="space-y-2">
          {displayedLines.map((line, index) => (
            <div
              key={index}
              className={`${
                line.startsWith('$')
                  ? 'text-green-400'
                  : line.startsWith('✓')
                  ? 'text-blue-400'
                  : line.startsWith('✨')
                  ? 'text-purple-400'
                  : line.startsWith('>')
                  ? 'text-cyan-400 font-semibold'
                  : 'text-gray-400'
              }`}
            >
              {line}
            </div>
          ))}
          {currentText && (
            <div
              className={`${
                currentText.startsWith('$')
                  ? 'text-green-400'
                  : currentText.startsWith('✓')
                  ? 'text-blue-400'
                  : currentText.startsWith('✨')
                  ? 'text-purple-400'
                  : currentText.startsWith('>')
                  ? 'text-cyan-400 font-semibold'
                  : 'text-gray-400'
              }`}
            >
              {currentText}
              <motion.span
                className="inline-block w-2 h-4 bg-green-400 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
