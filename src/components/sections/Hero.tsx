import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import Orb from './Orb';
import RotatingText from './RotatingText';

const roles = [
  "Media & Creation / UI/UX Intern",
  "Full Stack Developer",
  "Frontend Developer",
  "Data Analyst"
];

export default function Hero() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initial check
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
    setTheme(currentTheme);

    // Observer for dynamic switching
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const orbBgColor = theme === 'dark' ? '#050b14' : '#f8fafc';

  return (
    <section id="hero" className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
          backgroundColor={orbBgColor}
        />
      </div>

      {/* Camera HUD Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 flex flex-col justify-between p-8 border-[1px] border-[var(--color-glass)] m-4">
        <div className="flex justify-between items-center text-[var(--color-secondary-text)] font-mono text-xs">
          <span>REC [🔴]</span>
          <span>FHD 1080 60FPS</span>
          <span>ISO 800</span>
        </div>
        <div className="flex justify-center">
          <div className="w-[1px] h-4 bg-[var(--color-secondary-text)]" />
        </div>
        <div className="flex justify-between items-center text-[var(--color-secondary-text)] font-mono text-xs">
          <span>TCR 01:23:45:12</span>
          <div className="flex space-x-1">
            <div className="w-1 h-2 bg-[var(--color-typography)]" />
            <div className="w-1 h-3 bg-[var(--color-typography)]" />
            <div className="w-1 h-1 bg-[var(--color-highlight)]" />
            <div className="w-1 h-4 bg-[var(--color-typography)]" />
          </div>
          <span>CH1 AUDIO</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.95] }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-slate-500 pb-4">
            KUMARAVEL K
          </h1>
        </motion.div>

        <div className="mb-8 overflow-hidden w-full flex justify-center min-h-[40px]">
          <RotatingText
            texts={roles}
            mainClassName="text-xl md:text-2xl font-light text-[var(--color-highlight)] tracking-widest uppercase flex justify-center"
            staggerFrom="last"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            staggerDuration={0.02}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic group relative px-8 py-4 bg-[var(--color-typography)] text-[var(--color-primary-bg)] font-semibold rounded-full overflow-hidden flex items-center space-x-2 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
          >
            <span className="relative z-10">View Portfolio</span>
            <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
          
          <a 
            href="/resume.pdf" 
            download="Kumaravel_K_Resume.pdf"
            className="magnetic group px-8 py-4 bg-[var(--color-cards)] border border-[var(--color-soft-divider)] text-[var(--color-typography)] font-semibold rounded-full flex items-center space-x-2 hover:bg-[var(--color-secondary-bg)] hover:scale-105 transition-all duration-300 cursor-pointer shadow-md"
          >
            <span>Download Resume</span>
            <FiDownload className="group-hover:-translate-y-1 transition-transform" />
          </a>

          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic group px-8 py-4 bg-transparent border border-[var(--color-primary-accent)] text-[var(--color-primary-accent)] font-semibold rounded-full flex items-center space-x-2 hover:bg-[var(--color-primary-accent)] hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
          >
            <span>Hire Me</span>
            <FiMail />
          </button>
        </motion.div>
      </div>

      {/* Social Icons */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute left-8 bottom-1/2 translate-y-1/2 flex flex-col space-y-6 z-30 hidden lg:flex"
      >
        {[
          { icon: <FiGithub size={20} />, href: "https://github.com/kumaravel198" },
          { icon: <FiLinkedin size={20} />, href: "https://www.linkedin.com/in/kumaravel-k-3904192a8/" },
          { icon: <FiMail size={20} />, href: "mailto:kumaravel.kv198@gmail.com" }
        ].map((social, i) => (
          <a key={i} href={social.href} className="magnetic text-[var(--color-secondary-text)] hover:text-[var(--color-primary-accent)] hover:scale-110 transition-all duration-300">
            {social.icon}
          </a>
        ))}
        <div className="w-[1px] h-24 bg-[var(--color-soft-divider)] mx-auto mt-4" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-widest text-[var(--color-secondary-text)] mb-2">Scroll</span>
        <div className="w-[1px] h-16 bg-[var(--color-soft-divider)] relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-[var(--color-highlight)] absolute top-0"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
