import { useRef, useState, useEffect } from "react";
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
import CodeToVisual from "../components/CodeToVisual";
import { trackEvent } from "../lib/analytics";

// Dynamic imports for code splitting - components below the fold
const ServicesSection = dynamic(() => import("../components/ServicesSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-emerald-300">Loading...</div></div>,
});

const PortfolioSection = dynamic(() => import("../components/PortfolioSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-emerald-300">Loading...</div></div>,
});

const AboutSection = dynamic(() => import("../components/AboutSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-emerald-300">Loading...</div></div>,
});

const ContactSection = dynamic(() => import("../components/ContactSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-emerald-300">Loading...</div></div>,
});

const FAQSection = dynamic(() => import("../components/FAQSection"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-emerald-300">Loading...</div></div>,
});

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Reset code animation when scrolled back to top
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest === 0) {
        setResetTrigger(prev => prev + 1);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  // Code-to-Visual animation: slide down and disappear
  const codeVisualY = useTransform(scrollYProgress, [0, 0.6], ['0%', '100%']);
  const codeVisualOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0.8, 0.5, 0]);
  
  // Content box animations
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
            href: '/favicon.png?v=3',
          },
          {
            rel: 'apple-touch-icon',
            href: '/favicon.png?v=3',
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
          className="min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950"
        >
          {/* Animated Code-to-Visual - Slides down and vanishes */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pt-28"
            style={{ 
              opacity: codeVisualOpacity,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <CodeToVisual key={resetTrigger} scrollYProgress={scrollYProgress} />
            </div>
          </motion.div>
          
          {/* Content - Clean with transparent backgrounds */}
          <motion.div 
            className="flex flex-col items-center mx-auto text-center max-w-4xl relative z-10"
            style={{ 
              opacity: contentOpacity,
              y: contentY,
            }}
          >
            <motion.h1 
              className="font-bold mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg"
              style={{ color: '#000000 !important' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              We Build Websites, Apps & Brands
            </motion.h1>
            
            <motion.p 
              className="mb-8 text-lg sm:text-xl md:text-2xl max-w-2xl drop-shadow"
              style={{ color: '#000000 !important' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              ATTMOC creates modern digital solutions that help businesses grow and connect with their audience.
            </motion.p>
            
            <motion.button
              onClick={handleContactClick}
              className="font-semibold px-10 py-4 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              style={{ backgroundColor: '#000000 !important', color: '#ffffff !important' }}
              aria-label="Get a quote for your project"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Stats Section with Counter Animations */}
        <section className="py-12 sm:py-20 bg-gradient-to-b from-black to-emerald-900 flex justify-center w-full">
          <div className="responsive-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatsSection />
          </div>
        </section>

        <section id="services" className="py-12 sm:py-20 bg-gradient-to-br from-black via-emerald-950 to-emerald-900 flex justify-center w-full">
          <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="up">
              <ServicesSection />
            </RevealOnScroll>
          </div>
        </section>

        <section id="portfolio" className="py-12 sm:py-20 bg-gradient-to-br from-emerald-950 to-black flex justify-center w-full">
          <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="up" delay={0.2}>
              <PortfolioSection />
            </RevealOnScroll>
          </div>
        </section>

        {/* 3D Showcase Section */}
        <section id="showcase" className="py-12 sm:py-20 bg-gradient-to-br from-black via-emerald-900 to-emerald-800 flex justify-center w-full">
          <div className="responsive-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="fade">
              <Showcase3D />
            </RevealOnScroll>
          </div>
        </section>

        <section id="about" className="py-12 sm:py-20 bg-gradient-to-br from-black to-emerald-950 flex justify-center w-full">
          <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="left">
              <AboutSection />
            </RevealOnScroll>
          </div>
        </section>

        <section id="contact" className="py-12 sm:py-20 bg-gradient-to-br from-emerald-950 via-emerald-900 to-black flex justify-center w-full">
          <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="up">
              <ContactSection />
            </RevealOnScroll>
          </div>
        </section>

        <section id="faq" className="py-12 sm:py-20 bg-gradient-to-br from-black to-emerald-900 flex justify-center w-full">
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