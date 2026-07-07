import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Timeline', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('#hero');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'light'; // Default to light mode
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // Handle scroll to highlight active tab and add scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled background state
      setScrolled(window.scrollY > 50);

      // Determine active section
      const scrollPosition = window.scrollY + 200; // offset for nav height
      
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(item.href);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveTab(href);
    setMobileMenuOpen(false);
    
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-[var(--color-primary-bg)]/80 backdrop-blur-md border-b border-[var(--color-glass)] shadow-[0_4px_30px_rgba(0,0,0,0.15)]' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="text-xl md:text-2xl font-bold tracking-tighter text-[var(--color-typography)] uppercase select-none"
        >
          KUMARAVEL <span className="text-[var(--color-primary-accent)]">K</span>
        </a>

        {/* Desktop Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 bg-neutral-900/40 p-1.5 rounded-full border border-[var(--color-glass)] backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-[var(--color-secondary-text)] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls (Theme Toggle & Mobile Menu Toggle) */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-neutral-900/30 border border-[var(--color-glass)] text-[var(--color-typography)] hover:text-[var(--color-highlight)] hover:border-[var(--color-highlight)] hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-full bg-neutral-900/30 border border-[var(--color-glass)] text-[var(--color-typography)] hover:text-[var(--color-highlight)] hover:border-[var(--color-highlight)] transition-all duration-300 cursor-pointer flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[var(--color-primary-bg)]/95 backdrop-blur-lg border-b border-[var(--color-glass)] overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = activeTab === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-lg font-semibold px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-[var(--color-primary-accent)]/20 to-[var(--color-highlight)]/20 text-[var(--color-highlight)] border-l-2 border-[var(--color-highlight)]' 
                        : 'text-[var(--color-secondary-text)] hover:text-[var(--color-typography)] hover:bg-neutral-900/30'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
