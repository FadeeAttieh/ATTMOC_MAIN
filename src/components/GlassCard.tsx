import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl p-6
        bg-white/80
        backdrop-blur-xl
        border border-white/30
        shadow-xl shadow-black/5
        ${className}
      `}
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        whileHover={{ opacity: 1, x: ['0%', '200%'] }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
