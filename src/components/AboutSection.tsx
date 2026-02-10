import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function AboutSection() {
  return (
    <div className="container mx-auto">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white drop-shadow-lg"
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
          <p className="text-white mb-4 leading-relaxed">
            ATTMOC (Attieh Ministry of Code) is a team of passionate designers, developers, and strategists. 
            We help businesses grow with modern digital solutions that combine cutting-edge technology with 
            exceptional user experiences.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <motion.div
              className="text-center p-4 rounded-xl bg-emerald-900/30 border border-emerald-700"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-white">2015</div>
              <div className="text-sm text-white">Founded</div>
            </motion.div>
            
            <motion.div
              className="text-center p-4 rounded-xl bg-emerald-900/30 border border-emerald-700"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-white">12+</div>
              <div className="text-sm text-white">Team Members</div>
            </motion.div>
            
            <motion.div
              className="text-center p-4 rounded-xl bg-emerald-900/30 border border-emerald-700"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-white">150+</div>
              <div className="text-sm text-white">Projects</div>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}