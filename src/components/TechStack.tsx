'use client';

import { motion } from 'framer-motion';

const technologies = [
  { name: 'React', icon: '⚛️', color: 'from-emerald-400 to-emerald-500', delay: 0 },
  { name: 'Next.js', icon: '▲', color: 'from-gray-800 to-gray-900', delay: 0.1 },
  { name: 'TypeScript', icon: 'TS', color: 'from-emerald-600 to-emerald-700', delay: 0.2 },
  { name: 'Tailwind', icon: '🎨', color: 'from-teal-400 to-emerald-500', delay: 0.3 },
  { name: 'Node.js', icon: '🟢', color: 'from-emerald-600 to-emerald-700', delay: 0.4 },
  { name: 'AI/ML', icon: '🤖', color: 'from-emerald-500 to-emerald-600', delay: 0.5 },
  { name: 'Azure', icon: '☁️', color: 'from-emerald-500 to-emerald-600', delay: 0.6 },
  { name: 'Mobile', icon: '📱', color: 'from-orange-500 to-red-500', delay: 0.7 },
];

export default function TechStack() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-6">
        Technologies We Master
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {technologies.map((tech) => (
          <motion.div
            key={tech.name}
            className={`relative p-4 rounded-xl bg-gradient-to-br ${tech.color} text-white shadow-lg overflow-hidden group cursor-pointer`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: tech.delay, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-3xl">{tech.icon}</span>
              <div>
                <div className="font-bold text-lg">{tech.name}</div>
                <div className="text-xs text-white/80">Expert Level</div>
              </div>
            </div>

            {/* Corner accent */}
            <motion.div
              className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: tech.delay + 0.2 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-6 p-4 rounded-xl bg-black border border-emerald-800/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-white text-center">
          💡 <strong>Modern Stack</strong> = Fast Development + Better Performance + Lower Costs
        </p>
      </motion.div>
    </div>
  );
}
