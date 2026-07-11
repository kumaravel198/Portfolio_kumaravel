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

  // Toggle theme with temporary transition class to avoid hover lag
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme-transitioning', 'true');
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTimeout(() => {
      document.documentElement.removeAttribute('data-theme-transitioning');
    }, 450);
  };

  // Handle scroll to highlight active tab and add scroll shadow (optimized with requestAnimationFrame)
  useEffect(() => {
    let isTicking = false;

    // Cache elements once on mount
    const cachedItems = navItems.map(item => ({
      href: item.href,
      el: document.querySelector(item.href) as HTMLElement | null
    }));

    const handleScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);

          const scrollPosition = window.scrollY + 200; // offset for nav height
          
          for (const item of cachedItems) {
            if (item.el) {
              const top = item.el.offsetTop;
              const height = item.el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveTab(item.href);
              }
            }
          }
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial check
    handleScroll();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color,box-shadow] duration-200 ease-out ${
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

        <nav className="hidden lg:flex items-center space-x-1 bg-neutral-950/70 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-150 ease-out select-none cursor-pointer ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-[var(--color-secondary-text)] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] rounded-full z-0 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 33 }}
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
            className="p-3 rounded-full bg-neutral-900/30 border border-[var(--color-glass)] text-[var(--color-typography)] hover:text-[var(--color-highlight)] hover:border-[var(--color-highlight)] hover:scale-105 transition-[color,border-color,background-color,transform] duration-150 ease-out cursor-pointer shadow-lg flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-full bg-neutral-900/30 border border-[var(--color-glass)] text-[var(--color-typography)] hover:text-[var(--color-highlight)] hover:border-[var(--color-highlight)] transition-[color,border-color,background-color] duration-150 ease-out cursor-pointer flex items-center justify-center"
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
