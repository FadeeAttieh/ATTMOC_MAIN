import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function AboutSection() {
  return (
    <div className="container mx-auto">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h2>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <motion.img
          src="/team.jpg"
          alt="Our Team"
          className="w-48 h-48 object-cover rounded-full shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        
        <GlassCard className="flex-1" hover={false}>
          <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
            ATTMOC (Attieh Ministry of Code) is a team of passionate designers, developers, and strategists. 
            We help businesses grow with modern digital solutions that combine cutting-edge technology with 
            exceptional user experiences.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <motion.div
              className="text-center p-4 rounded-xl bg-white/20 dark:bg-gray-900/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2020</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Founded</div>
            </motion.div>
            
            <motion.div
              className="text-center p-4 rounded-xl bg-white/20 dark:bg-gray-900/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">20+</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Team Members</div>
            </motion.div>
            
            <motion.div
              className="text-center p-4 rounded-xl bg-white/20 dark:bg-gray-900/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">150+</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Projects</div>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}