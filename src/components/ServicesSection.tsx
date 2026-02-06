import { motion } from "framer-motion";

const services = [
  {
    title: "Website Development",
    description: "Responsive, SEO-friendly websites using React, Next.js, and Tailwind CSS.",
    image: "/websites.jpg",
    alt: "Websites",
  },
  {
    title: "Web App Solutions",
    description: "Custom web applications for business automation and customer engagement.",
    image: "/webapps.jpg",
    alt: "Web Apps",
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile apps built with React Native and Flutter.",
    image: "/mobile.jpg",
    alt: "Mobile Apps",
  },
  {
    title: "Branding & Design",
    description: "Logo, identity, and UI/UX design to elevate your brand presence.",
    image: "/branding.jpg",
    alt: "Branding",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export default function ServicesSection() {
  return (
    <div className="container mx-auto">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Our Services
      </motion.h2>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={itemVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-6 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={service.image}
              alt={service.alt}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              {service.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}