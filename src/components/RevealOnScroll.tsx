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
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -75 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: 75 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: -75 },
      visible: { opacity: 1, x: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  const variants: Variants = directions[direction];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
