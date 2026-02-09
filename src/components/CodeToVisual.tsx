'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, MotionValue } from 'framer-motion';

const codeSteps = [
  {
    code: '// Navbar Component\n<nav className="flex items-center\n  gap-6 px-4">\n  <a className="flex items-center gap-3">\n    <img src="/AttMOC_logo.png"\n      className="w-24 h-24 object-contain" />\n    <div className="flex flex-col">\n      <span className="font-bold text-xl\n        text-emerald-600">ATTMOC</span>\n      <span className="text-[10px]\n        text-gray-600 uppercase">\n        Digital Excellence Since 2020\n      </span>\n    </div>\n  </a>\n  <div className="flex gap-6">\n    <Link href="#hero">Home</Link>\n    <Link href="#services">Services</Link>\n    <Link href="#portfolio">Portfolio</Link>\n    <Link href="#about">About</Link>\n    <Link href="#contact">Contact</Link>\n    <Link href="#faq">FAQ</Link>\n  </div>\n</nav>',
    visual: 'nav-basic',
  },
  {
    code: '// Hero Section\n<section className="min-h-screen\n  flex items-center justify-center">\n  <div className="text-center">\n    <h1 className="text-5xl font-bold\n      text-gray-900">\n      Build Your Digital Future\n    </h1>\n  </div>\n</section>',
    visual: 'hero-added',
  },
  {
    code: '// Add engaging subtext\n<p className="text-xl text-gray-600\n  mt-4 max-w-2xl">\n  We create modern websites, apps\n  and brands that transform your\n  business vision into reality.\n</p>',
    visual: 'subtext-added',
  },
  {
    code: '// Call-to-Action Button\n<button className="mt-8 px-8 py-4\n  bg-emerald-500 text-white\n  rounded-lg font-semibold\n  hover:bg-emerald-600\n  transition-all">\n  Get Started Today\n</button>',
    visual: 'cta-added',
  },
];

interface CodeToVisualProps {
  scrollYProgress?: MotionValue<number>;
}

export default function CodeToVisual({ scrollYProgress }: CodeToVisualProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Type out code character by character
  useEffect(() => {
    const currentCode = codeSteps[currentStep].code;
    
    if (charIndex < currentCode.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedCode(currentCode.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 15); // Faster typing: 15ms per character
      return () => clearTimeout(timer);
    } else if (charIndex >= currentCode.length) {
      // Pause before moving to next step
      const pauseTimer = setTimeout(() => {
        setIsTyping(false);
        const nextTimer = setTimeout(() => {
          setCurrentStep((prev) => (prev + 1) % codeSteps.length);
          setCharIndex(0);
          setDisplayedCode('');
          setIsTyping(true);
        }, 800); // Shorter pause: 800ms
        return () => clearTimeout(nextTimer);
      }, 600); // Shorter pause: 600ms
      return () => clearTimeout(pauseTimer);
    }
  }, [charIndex, currentStep, isTyping]);

  const visual = codeSteps[currentStep].visual;

  // Opposite slide animations: terminal slides down, visual slides up
  const terminalY = scrollYProgress ? useTransform(scrollYProgress, [0, 0.6], ['0%', '100%']) : '0%';
  const visualY = scrollYProgress ? useTransform(scrollYProgress, [0, 0.6], ['0%', '-100%']) : '0%';

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-0">
      {/* Code Side */}
      <motion.div 
        className="flex-1 bg-white dark:bg-gray-900 rounded-l-xl p-6 overflow-hidden border border-gray-300 dark:border-gray-700 flex flex-col"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{ y: terminalY }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-4 font-mono">App.tsx</span>
        </div>
        <div className="flex-1 overflow-auto">
          <pre className="font-mono text-sm text-gray-900 whitespace-pre-wrap">
            {displayedCode}
            <motion.span
              className="inline-block w-2 h-4 bg-gray-900 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </pre>
        </div>
      </motion.div>

      {/* Visual Output Side - Same size as code */}
      <motion.div 
        className="flex-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-r-xl border-t border-r border-b border-gray-300 dark:border-gray-700 overflow-hidden flex flex-col @container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{ y: visualY }}
      >
        {/* Preview Label */}
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-mono">Preview</span>
        </div>
        
        {/* Visual Output */}
        <div className="flex-1 p-4 overflow-auto">
          <AnimatePresence mode="wait">
            {visual === 'nav-basic' && (
              <motion.div
                key="nav"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <nav className="flex items-center gap-4 px-4 py-3 bg-white rounded-lg shadow-sm">
                  <a className="group flex items-center gap-2 hover:opacity-90 transition-all duration-300 cursor-pointer" onClick={(e) => e.preventDefault()}>
                    <img alt="ATTMOC Logo" className="w-12 h-12 object-contain" src="/AttMOC_logo.png" />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-emerald-600 leading-tight">ATTMOC</span>
                      <span className="text-[7px] text-gray-600 font-medium tracking-wider uppercase">Digital Excellence Since 2020</span>
                    </div>
                  </a>
                  <div className="hidden @lg:flex gap-3 text-xs">
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Home</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Services</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Portfolio</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">About</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Contact</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">FAQ</span>
                  </div>
                  <button className="ml-auto @lg:hidden p-2" onClick={(e) => e.preventDefault()}>
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </nav>
              </motion.div>
            )}
            
            {visual === 'hero-added' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col"
              >
                <nav className="flex items-center gap-4 px-4 py-3 bg-white rounded-lg shadow-sm mb-4">
                  <a className="group flex items-center gap-2 hover:opacity-90 transition-all duration-300 cursor-pointer" onClick={(e) => e.preventDefault()}>
                    <img alt="ATTMOC Logo" className="w-12 h-12 object-contain" src="/AttMOC_logo.png" />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-emerald-600 leading-tight">ATTMOC</span>
                      <span className="text-[7px] text-gray-600 font-medium tracking-wider uppercase">Digital Excellence Since 2020</span>
                    </div>
                  </a>
                  <div className="hidden @lg:flex gap-3 text-xs">
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Home</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Services</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Portfolio</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">About</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Contact</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">FAQ</span>
                  </div>
                  <button className="ml-auto @lg:hidden p-2" onClick={(e) => e.preventDefault()}>
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </nav>
                <motion.div 
                  className="flex-1 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-8"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                    Build Your Digital Future
                  </h1>
                </motion.div>
              </motion.div>
            )}
            
            {visual === 'subtext-added' && (
              <motion.div
                key="subtext"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col"
              >
                <nav className="flex items-center gap-4 px-4 py-3 bg-white rounded-lg shadow-sm mb-4">
                  <a className="group flex items-center gap-2 hover:opacity-90 transition-all duration-300 cursor-pointer" onClick={(e) => e.preventDefault()}>
                    <img alt="ATTMOC Logo" className="w-12 h-12 object-contain" src="/AttMOC_logo.png" />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-emerald-600 leading-tight">ATTMOC</span>
                      <span className="text-[7px] text-gray-600 font-medium tracking-wider uppercase">Digital Excellence Since 2020</span>
                    </div>
                  </a>
                  <div className="hidden @lg:flex gap-3 text-xs">
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Home</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Services</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Portfolio</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">About</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Contact</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">FAQ</span>
                  </div>
                  <button className="ml-auto @lg:hidden p-2" onClick={(e) => e.preventDefault()}>
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </nav>
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-8">
                  <div className="text-center max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Build Your Digital Future
                    </h1>
                    <motion.p 
                      className="text-lg text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      We create modern websites, apps and brands that transform your business vision into reality.
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {visual === 'cta-added' && (
              <motion.div
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col"
              >
                <nav className="flex items-center gap-4 px-4 py-3 bg-white rounded-lg shadow-sm mb-4">
                  <a className="group flex items-center gap-2 hover:opacity-90 transition-all duration-300 cursor-pointer" onClick={(e) => e.preventDefault()}>
                    <img alt="ATTMOC Logo" className="w-12 h-12 object-contain" src="/AttMOC_logo.png" />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-emerald-600 leading-tight">ATTMOC</span>
                      <span className="text-[7px] text-gray-600 font-medium tracking-wider uppercase">Digital Excellence Since 2020</span>
                    </div>
                  </a>
                  <div className="hidden @lg:flex gap-3 text-xs">
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Home</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Services</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Portfolio</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">About</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">Contact</span>
                    <span className="text-gray-700 hover:text-emerald-500 cursor-pointer">FAQ</span>
                  </div>
                  <button className="ml-auto @lg:hidden p-2" onClick={(e) => e.preventDefault()}>
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </nav>
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-8">
                  <div className="text-center max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Build Your Digital Future
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                      We create modern websites, apps and brands that transform your business vision into reality.
                    </p>
                    <motion.button
                      className="px-8 py-4 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Get Started Today
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
