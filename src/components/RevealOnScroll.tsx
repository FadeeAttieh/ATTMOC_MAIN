import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
}: RevealOnScrollProps) {
  const directions: Record<string, { hidden: any; visible: any }> = {
    up: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
    down: {
      hidden: { opacity: 0, y: -30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
    left: {
      hidden: { opacity: 0, x: 30, scale: 0.95 },
      visible: { opacity: 1, x: 0, scale: 1 },
    },
    right: {
      hidden: { opacity: 0, x: -30, scale: 0.95 },
      visible: { opacity: 1, x: 0, scale: 1 },
    },
    fade: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  const variants: Variants = directions[direction];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
