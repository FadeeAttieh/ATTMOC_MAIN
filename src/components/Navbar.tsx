import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useSpring } from "framer-motion";
import { trackEvent } from "../lib/analytics";
import { featureFlags } from "../config/featureFlags";

const sections = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
];

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function animatedScrollTo(targetY: number, duration = 875) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start: number | null = null;

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = Math.min(1, (timestamp - start) / duration);
    const eased = easeInOutQuad(time);
    window.scrollTo(0, startY + diff * eased);
    if (time < 1) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      
      // Active section detection
      let found = "hero";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && currentScrollY >= el.offsetTop - 80) {
          found = section.id;
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      animatedScrollTo(el.offsetTop - 60, 875);
      trackEvent('navigation', 'scroll', id);
    }
  };

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    trackEvent('theme', 'toggle', newTheme);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/10 dark:bg-gray-900/30 backdrop-blur-lg" 
            : "bg-white/5 dark:bg-gray-900/20 backdrop-blur-md"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-start pl-4 pr-6 py-3 gap-8">
          {/* Logo with tagline */}
          <Link 
            href="/" 
            className="group flex items-center gap-3 hover:opacity-90 transition-all duration-300"
            aria-label="ATTMOC Home"
          >
            <motion.img 
              src="/AttMOC_logo.png" 
              alt="ATTMOC Logo" 
              className="w-24 h-24 object-contain"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-xl text-blue-700 dark:text-blue-400 leading-tight" style={{ textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px' }}>
                ATTMOC
              </span>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium tracking-wider uppercase" style={{ textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px' }}>
                Digital Excellence Since 2020
              </span>
            </div>
          </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-2 items-center flex-1">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative px-4 py-2 font-medium transition-all duration-200 bg-transparent border-0 ${
                active === section.id
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              }`}
              style={{ 
                background: 'transparent',
                textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-current={active === section.id ? "page" : undefined}
            >
              <span className="relative z-10">{section.label}</span>
            </motion.button>
          ))}
          {featureFlags.careers && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/careers" 
                className="relative px-4 py-2 font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 inline-block"
                style={{ background: 'transparent', textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px' }}
              >
                Careers
              </Link>
            </motion.div>
          )}
          {featureFlags.quote && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/quote" 
                className="relative px-4 py-2 font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 inline-block"
                style={{ background: 'transparent', textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px' }}
              >
                Quote
              </Link>
            </motion.div>
          )}
          {featureFlags.blog && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/blog" 
                className="relative px-4 py-2 font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 inline-block"
                style={{ background: 'transparent', textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px' }}
              >
                Blog
              </Link>
            </motion.div>
          )}

          {/* Dark mode toggle */}
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="ml-4 p-2.5 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {resolvedTheme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.323 3.677a1 1 0 00-1.414-1.414L12.586 5.41a1 1 0 101.414 1.414l.707-.707zm2.828 2.828a1 1 0 00-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-1.657 4.323a1 1 0 00-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zm-2.828 2.828a1 1 0 00-1.414-1.414l.707.707a1 1 0 101.414-1.414l-.707.707zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-4.323-3.677a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zm-2.828-2.828a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm1.657-4.323a1 1 0 000 1.414l.707-.707a1 1 0 10-1.414-1.414l.707.707z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Dark mode toggle for mobile */}
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {resolvedTheme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.323 3.677a1 1 0 00-1.414-1.414L12.586 5.41a1 1 0 101.414 1.414l.707-.707zm2.828 2.828a1 1 0 00-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-1.657 4.323a1 1 0 00-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zm-2.828 2.828a1 1 0 00-1.414-1.414l.707.707a1 1 0 101.414-1.414l-.707.707zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-4.323-3.677a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zm-2.828-2.828a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm1.657-4.323a1 1 0 000 1.414l.707-.707a1 1 0 10-1.414-1.414l.707.707z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>
          )}

          <motion.button
            className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            onClick={() => setMenuOpen((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect x="4" y="7" width="16" height="2" rx="1" fill="currentColor" />
              <rect x="4" y="15" width="16" height="2" rx="1" fill="currentColor" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu - Slide-in drawer */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      <motion.div
        id="mobile-menu"
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 md:hidden overflow-y-auto"
        style={{
          borderLeft: "1px solid rgba(200,200,255,0.2)",
        }}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <motion.button
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            onClick={() => setMenuOpen(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Logo in drawer */}
        <div className="px-8 mb-8">
          <div className="flex items-center gap-3">
            <img src="/AttMOC_logo.png" alt="ATTMOC Logo" className="w-20 h-20 object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-blue-700 dark:text-blue-400">
                ATTMOC
              </span>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium tracking-wider uppercase">
                Digital Excellence
              </span>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="px-8 space-y-2">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                active === section.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {section.label}
            </motion.button>
          ))}
          
          {featureFlags.careers && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sections.length * 0.05 }}
            >
              <Link 
                href="/careers" 
                className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Careers
              </Link>
            </motion.div>
          )}
          
          {featureFlags.quote && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (sections.length + 1) * 0.05 }}
            >
              <Link 
                href="/quote" 
                className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Quote
              </Link>
            </motion.div>
          )}
          
          {featureFlags.blog && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (sections.length + 2) * 0.05 }}
            >
              <Link 
                href="/blog" 
                className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </nav>
    </>
  );
}