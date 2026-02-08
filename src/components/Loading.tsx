import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setProgress((prev) => {
        if (prev < 100) {
          frame = requestAnimationFrame(animate);
          return Math.min(prev + Math.random() * 2.5, 100);
        }
        return 100;
      });
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 z-50">
      {/* Logo Container with Progress Ring */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Progress Ring */}
        <svg width="200" height="200" viewBox="0 0 200 200" className="absolute">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Background Circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 85}
            strokeDashoffset={2 * Math.PI * 85 - (2 * Math.PI * 85 * progress / 100)}
            strokeLinecap="round"
            style={{ 
              transform: "rotate(-90deg)",
              transformOrigin: "center"
            }}
            filter="url(#shadow)"
          />
        </svg>
        
        {/* Logo with Animation */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            src="/AttMOC_logo.png" 
            alt="ATTMOC Logo" 
            className="w-32 h-32 object-contain"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Percentage Display */}
          <motion.div 
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm rounded-full shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {Math.floor(progress)}%
          </motion.div>
        </motion.div>
      </div>

      {/* Company Name and Tagline */}
      <motion.div 
        className="flex flex-col items-center gap-2 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">
          ATTMOC
        </h2>
        <p className="text-sm text-gray-600 font-medium tracking-wide">
          Digital Excellence Since 2020
        </p>
      </motion.div>

      {/* Loading Dots Animation */}
      <motion.div 
        className="flex gap-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}