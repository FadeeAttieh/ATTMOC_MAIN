import { useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { NextSeo } from "next-seo";
import Navbar from "../components/Navbar";
import OptimizedImage from "../components/OptimizedImage";
import ScrollProgress from "../components/ScrollProgress";
import StatsSection from "../components/StatsSection";
import RevealOnScroll from "../components/RevealOnScroll";
import FloatingShapes from "../components/FloatingShapes";
import Showcase3D from "../components/Showcase3D";
import { trackEvent } from "../lib/analytics";

// Dynamic imports for code splitting - components below the fold
const ServicesSection = dynamic(() => import("../components/ServicesSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>,
});

const PortfolioSection = dynamic(() => import("../components/PortfolioSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>,
});

const AboutSection = dynamic(() => import("../components/AboutSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>,
});

const ContactSection = dynamic(() => import("../components/ContactSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>,
});

const FAQSection = dynamic(() => import("../components/FAQSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-gray-500">Loading...</div></div>,
});

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects for hero section
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const handleContactClick = () => {
    trackEvent('cta', 'click', 'get_quote');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <NextSeo
        title="ATTMOC - Web, Mobile & App Development | Your Digital Partner"
        description="ATTMOC (Attieh Ministry of Code) builds modern websites, web apps, mobile applications, and powerful brands using cutting-edge technology. Transform your digital presence with Next.js, React, and AI-powered solutions."
        canonical="https://attmoc.com"
        openGraph={{
          url: 'https://attmoc.com',
          title: 'ATTMOC - Web, Mobile & App Development',
          description: 'Building websites, web apps, mobile apps and powerful brands with modern technology',
          images: [
            {
              url: 'https://attmoc.com/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'ATTMOC - Digital Solutions',
              type: 'image/jpeg',
            },
          ],
          siteName: 'ATTMOC',
          type: 'website',
          locale: 'en_US',
        }}
        twitter={{
          handle: '@attmoc',
          site: '@attmoc',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'web development, mobile app, web app, branding, digital solutions, React, Next.js, TypeScript, AI integration, custom software',
          },
          {
            name: 'author',
            content: 'ATTMOC - Attieh Ministry of Code',
          },
          {
            property: 'article:publisher',
            content: 'https://attmoc.com',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/AttMOC_logo.png',
          },
          {
            rel: 'apple-touch-icon',
            href: '/AttMOC_logo.png',
            sizes: '180x180',
          },
          {
            rel: 'manifest',
            href: '/site.webmanifest',
          },
        ]}
      />

      <ScrollProgress />
      <Navbar />
      <main>
        <motion.section
          id="hero"
          ref={heroRef}
          className="min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat sm:px-4 md:px-8 lg:px-16 relative overflow-hidden"
          style={{ 
            backgroundImage: "url('/hero-bg.jpg')",
          }}
        >
          {/* Parallax background layer */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('/hero-bg.jpg')",
              y: heroY,
              scale: heroScale,
            }}
          />
          
          {/* Floating 3D Shapes Background */}
          <FloatingShapes />
          
          {/* Content with fade effect */}
          <motion.div 
            className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-95 p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col items-center mx-auto text-center responsive-container max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl relative z-10"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              <OptimizedImage
                src="/hero-fg.jpg"
                alt="ATTMOC Hero"
                width={200}
                height={200}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 sm:mb-6 shadow-lg"
                priority
              />
            </motion.div>
            
            <motion.h1 
              className="heading-main font-bold mb-2 sm:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We Build Websites, Apps & Brands
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-6 text-base sm:text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              ATTMOC (Attieh Ministry of Code) creates modern digital solutions that help businesses grow and connect with their audience.
            </motion.p>
            
            <motion.button
              onClick={handleContactClick}
              className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              aria-label="Get a quote for your project"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Stats Section with Counter Animations */}
        <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex justify-center w-full">
          <div className="responsive-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatsSection />
          </div>
        </section>

        <section id="services" className="py-12 sm:py-20 bg-white dark:bg-gray-900 flex justify-center w-full">
          <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="up">
              <ServicesSection />
            </RevealOnScroll>
          </div>
        </section>

        <section id="portfolio" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 flex justify-center w-full">
          <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="up" delay={0.2}>
              <PortfolioSection />
            </RevealOnScroll>
          </div>
        </section>

        {/* 3D Showcase Section */}
        <section id="showcase" className="py-12 sm:py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex justify-center w-full">
          <div className="responsive-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="fade">
              <Showcase3D />
            </RevealOnScroll>
          </div>
        </section>

        <section id="about" className="py-12 sm:py-20 bg-white dark:bg-gray-900 flex justify-center w-full">
          <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="left">
              <AboutSection />
            </RevealOnScroll>
          </div>
        </section>

        <section id="contact" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 flex justify-center w-full">
          <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="up">
              <ContactSection />
            </RevealOnScroll>
          </div>
        </section>

        <section id="faq" className="py-12 sm:py-20 bg-white dark:bg-gray-900 flex justify-center w-full">
          <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="fade">
              <FAQSection />
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}