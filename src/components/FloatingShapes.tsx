'use client';

import { motion } from 'framer-motion';

interface ShapeProps {
  delay: number;
  duration: number;
  x: string;
  y: string;
  size: number;
  color: string;
  shape: 'box' | 'circle' | 'diamond';
}

function FloatingShape({ delay, duration, x, y, size, color, shape }: ShapeProps) {
  const shapeClass = {
    box: 'rounded-lg',
    circle: 'rounded-full',
    diamond: 'rounded-lg rotate-45',
  }[shape];

  return (
    <motion.div
      className={`absolute ${shapeClass} ${color} backdrop-blur-sm`}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export default function FloatingShapes() {
  const shapes: ShapeProps[] = [
    // Left side
    { delay: 0, duration: 8, x: '5%', y: '15%', size: 60, color: 'bg-purple-500/20', shape: 'box' },
    { delay: 1, duration: 10, x: '10%', y: '60%', size: 80, color: 'bg-pink-500/20', shape: 'circle' },
    { delay: 2, duration: 9, x: '8%', y: '85%', size: 50, color: 'bg-blue-500/20', shape: 'diamond' },
    
    // Right side
    { delay: 1.5, duration: 11, x: '85%', y: '20%', size: 70, color: 'bg-blue-500/20', shape: 'circle' },
    { delay: 0.5, duration: 9, x: '90%', y: '70%', size: 55, color: 'bg-purple-500/20', shape: 'box' },
    { delay: 2.5, duration: 10, x: '88%', y: '45%', size: 45, color: 'bg-pink-500/20', shape: 'diamond' },
    
    // Center background
    { delay: 3, duration: 12, x: '45%', y: '10%', size: 40, color: 'bg-indigo-500/15', shape: 'circle' },
    { delay: 1, duration: 11, x: '50%', y: '90%', size: 35, color: 'bg-violet-500/15', shape: 'box' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-30">
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </div>
  );
}
