import { useEffect, useState } from "react";
import Link from "next/link";
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
  
  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-gradient-to-r from-black/90 to-emerald-950/90 backdrop-blur-lg border-b border-emerald-800/50" 
            : "bg-gradient-to-r from-black/80 to-emerald-950/80 backdrop-blur-md"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between pl-4 pr-6 py-3">
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
              <span className="font-bold text-xl text-white leading-tight" style={{ textShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px' }}>
                ATTMOC
              </span>
              <span className="text-[10px] text-white font-medium tracking-wider uppercase" style={{ textShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 2px' }}>
                Digital Excellence Since 2015
              </span>
            </div>
          </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-2 items-center">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative px-4 py-2 font-medium transition-all duration-200 bg-transparent border-0`}
              style={{ 
                background: 'transparent',
                color: 'white !important',
                textShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-current={active === section.id ? "page" : undefined}
            >
              <span className="relative z-10" style={{ color: 'white !important' }}>{section.label}</span>
            </motion.button>
          ))}
          {featureFlags.careers && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/careers" 
                className="relative px-4 py-2 font-medium transition-all duration-200 inline-block"
                style={{ background: 'transparent', color: 'white !important', textShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px' }}
              >
                Careers
              </Link>
            </motion.div>
          )}
          {featureFlags.quote && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/quote" 
                className="relative px-4 py-2 font-medium transition-all duration-200 inline-block"
                style={{ background: 'transparent', color: 'white !important', textShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px' }}
              >
                Quote
              </Link>
            </motion.div>
          )}
          {featureFlags.blog && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/blog" 
                className="relative px-4 py-2 font-medium transition-all duration-200 inline-block"
                style={{ background: 'transparent', color: 'white !important', textShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px' }}
              >
                Blog
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button
            className="p-2 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      <motion.div
        id="mobile-menu"
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-br from-black to-emerald-950 backdrop-blur-xl shadow-2xl z-[110] md:hidden overflow-y-auto border-l border-emerald-800"
        style={{
          borderLeft: "1px solid rgba(200,200,255,0.2)",
        }}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <motion.button
            className="p-2 rounded-lg bg-emerald-800/50 text-white border border-emerald-700"
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
              <span className="font-bold text-xl text-white">
                ATTMOC
              </span>
              <span className="text-[10px] text-white font-medium tracking-wider uppercase">
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
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-900/50"
                  : "text-white hover:bg-emerald-900/50 border border-emerald-800"
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
                className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-white hover:bg-emerald-900/50 transition-all duration-200 border border-emerald-800"
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
                className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-white hover:bg-emerald-900/50 transition-all duration-200 border border-emerald-800"
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
                className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-white hover:bg-emerald-900/50 transition-all duration-200 border border-emerald-800"
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