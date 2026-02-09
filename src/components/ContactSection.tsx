import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { trackEvent } from "../lib/analytics";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Track form submission attempt
      trackEvent('contact_form', 'submit_start', 'contact_section');

      // Simulate API call (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In production, send to your API endpoint:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      console.log('Form data:', data);
      
      // Show success message
      toast.success('Message sent successfully! We\'ll get back to you soon.', {
        duration: 5000,
        position: 'top-center',
        icon: '✅',
      });

      // Track successful submission
      trackEvent('contact_form', 'submit_success', 'contact_section');

      // Reset form
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again.', {
        duration: 5000,
        position: 'top-center',
      });

      // Track error
      trackEvent('contact_form', 'submit_error', 'contact_section');
    }
  };

  return (
    <>
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Have a project in mind? Let's discuss how ATTMOC can help bring your vision to life.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
          >
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-semibold text-gray-800">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className={`w-full p-3 border rounded-lg bg-white text-gray-900 ${
                  errors.name ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                }`}
                placeholder="Your Name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-semibold text-gray-800">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full p-3 border rounded-lg bg-white text-gray-900 ${
                  errors.email ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Field (Optional) */}
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 font-semibold text-gray-800">
                Phone <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Subject Field */}
            <div className="mb-4">
              <label htmlFor="subject" className="block mb-2 font-semibold text-gray-800">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                {...register("subject")}
                className={`w-full p-3 border rounded-lg bg-white text-gray-900 ${
                  errors.subject ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                }`}
                placeholder="Project Inquiry"
                aria-invalid={errors.subject ? "true" : "false"}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <p id="subject-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-semibold text-gray-800">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={5}
                className={`w-full p-3 border rounded-lg bg-white text-gray-900 ${
                  errors.message ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                }`}
                placeholder="Tell us about your project..."
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-blue-600 hover:bg-blue-700 text-white w-full font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </motion.form>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Location */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">123 Innovation Drive<br />Tech City, TC 12345</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                  <a href="mailto:info@attmoc.space" className="text-blue-600 dark:text-blue-400 hover:underline">
                    info@attmoc.space
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
                  <div className="flex gap-3">
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" aria-label="Twitter">
                      Twitter
                    </a>
                    <span className="text-gray-400">•</span>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" aria-label="LinkedIn">
                      LinkedIn
                    </a>
                    <span className="text-gray-400">•</span>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" aria-label="GitHub">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                  <p className="text-gray-600 dark:text-gray-300">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}