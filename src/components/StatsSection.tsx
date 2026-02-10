import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import RevealOnScroll from "./RevealOnScroll";

const stats = [
  { 
    label: "Projects Completed", 
    value: 150, 
    suffix: "+", 
    icon: (
      <svg className="w-12 h-12 mx-auto text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    label: "Happy Clients", 
    value: 120, 
    suffix: "+", 
    icon: (
      <svg className="w-12 h-12 mx-auto text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  { 
    label: "Years Experience", 
    value: 10, 
    suffix: "+", 
    icon: (
      <svg className="w-12 h-12 mx-auto text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  { 
    label: "Team Members", 
    value: 12, 
    suffix: "+", 
    icon: (
      <svg className="w-12 h-12 mx-auto text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
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
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center p-6 bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 rounded-xl shadow-lg shadow-emerald-900/50 hover:shadow-2xl hover:shadow-emerald-700/50 transition-all cursor-pointer border border-emerald-800"
          >
            <div className="mb-4">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
              <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm md:text-base text-emerald-100 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </RevealOnScroll>
  );
}
