'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const codeLines = [
  '$ npm create next-app@latest',
  '✓ Creating a new Next.js project...',
  '$ cd attmoc-client-project',
  '$ npm install && npm run build',
  '✓ Build completed in 2.4s',
  '$ npm test',
  '✓ All tests passed (24/24)',
  '$ docker build -t attmoc/app .',
  '✓ Container built successfully',
  '$ kubectl apply -f deployment.yml',
  '✓ Deployed to production',
  '$ vercel deploy --prod',
  '✓ Live at https://your-app.vercel.app',
  '',
  '> Project 1 Complete - Full Stack Deployment',
  '',
  '$ npx create-next-app web-app',
  '$ npx react-native init MobileApp',
  '$ npm install @azure/functions',
  '✓ Setting up cloud infrastructure...',
  '$ npm run deploy',
  '✓ Web app deployed ✓ Mobile app published',
  '',
  '> ATTMOC - Building for web, mobile & cloud',
  '',
];

interface CodeTerminalProps {
  resetTrigger?: number;
}

export default function CodeTerminal({ resetTrigger = 0 }: CodeTerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Reset terminal text when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      setCurrentText('');
      setCharIndex(0);
    }
  }, [resetTrigger]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      // Clear screen and loop - like a real terminal
      const resetTimer = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentText('');
        setCharIndex(0);
      }, 2000);
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
    <motion.div
      className="bg-gray-900 dark:bg-black rounded-xl shadow-2xl overflow-hidden border border-gray-700 h-full"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
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
      <div 
        ref={terminalBodyRef}
        className="p-6 font-mono text-sm h-full overflow-y-auto pt-6"
        style={{ scrollBehavior: 'smooth' }}
      >
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
    </motion.div>
  );
}
