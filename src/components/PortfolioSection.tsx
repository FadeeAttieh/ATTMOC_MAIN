import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Built with Next.js, Stripe, and Sanity CMS. Increased sales by 40% for our client.",
    image: "/project1.jpg",
    alt: "Project 1",
  },
  {
    title: "Brand Identity for Startup",
    description: "Logo, website, and mobile app for a fintech startup. Won a design award in 2025.",
    image: "/project2.jpg",
    alt: "Project 2",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export default function PortfolioSection() {
  return (
    <div className="container mx-auto">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Portfolio / Case Studies
      </motion.h2>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-2xl transition-shadow border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.03, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={project.image}
              alt={project.alt}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}