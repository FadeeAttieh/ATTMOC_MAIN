import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import RevealOnScroll from "./RevealOnScroll";

const stats = [
  { label: "Projects Completed", value: 150, suffix: "+", icon: "🚀" },
  { label: "Happy Clients", value: 120, suffix: "+", icon: "😊" },
  { label: "Years Experience", value: 5, suffix: "+", icon: "⭐" },
  { label: "Team Members", value: 12, suffix: "+", icon: "👥" },
];

export default function StatsSection() {
  return (
    <RevealOnScroll direction="fade">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </RevealOnScroll>
  );
}
