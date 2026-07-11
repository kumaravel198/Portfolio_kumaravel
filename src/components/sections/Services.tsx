import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FiLayout, FiTarget, FiGrid, FiZap, 
  FiSearch, FiCode, FiSmartphone, FiGlobe, FiX
} from 'react-icons/fi';

const services = [
  {
    title: "UI/UX Design",
    description: "Designing intuitive user flows, logical wireframes, and premium mobile/web interfaces.",
    extendedDescription: "Crafting seamless digital experiences through deep research, user-centric wireframing, and pixel-perfect high-fidelity interface design.",
    skills: ["User Flow Mapping", "Wireframing & Prototyping", "Figma Design & Collaboration", "Usability Testing"],
    themeColor: "#ff0055",
    icon: <FiLayout size={18} />
  },
  {
    title: "Product Strategy",
    description: "Aligning creative designs and systems strategy directly with core business objectives.",
    extendedDescription: "Synthesizing design vision and business objectives to define roadmap, system scope, and competitive positioning.",
    skills: ["Market & Competitor Analysis", "Product Roadmap Planning", "Feature Prioritization", "User Persona Research"],
    themeColor: "#ff5e36",
    icon: <FiTarget size={18} />
  },
  {
    title: "Design Systems",
    description: "Building production-ready Figma component frameworks and dynamic tokens scales.",
    extendedDescription: "Creating component-driven ecosystems in Figma with design tokens that scale perfectly from UI concept to production code.",
    skills: ["Figma Component Libraries", "Design Tokens Architecture", "Component Documentation", "Developer Handoff Workflows"],
    themeColor: "#ff8a00",
    icon: <FiGrid size={18} />
  },
  {
    title: "Interactive Prototyping",
    description: "Developing responsive prototypes with rich micro-interactions and transitions.",
    extendedDescription: "Building highly interactive, high-fidelity mockups with complex transitions and micro-animations to simulate real-world app states.",
    skills: ["Micro-interaction Design", "Advanced Figma Prototyping", "Interactive Component States", "Motion Design Principles"],
    themeColor: "#4f46e5",
    icon: <FiZap size={18} />
  },
  {
    title: "User Research",
    description: "Conducting user testing, interviews, and journey mappings for data-backed solutions.",
    extendedDescription: "Uncovering deep customer insights through qualitative interviews, quantitative surveys, and comprehensive usability testing.",
    skills: ["User Testing & Interviews", "A/B Testing Methodologies", "User Journey Mapping", "Feedback Analysis Reports"],
    themeColor: "#06b6d4",
    icon: <FiSearch size={18} />
  },
  {
    title: "Design Engineering",
    description: "Converting design tokens into highly optimized React, Tailwind, and CSS modules.",
    extendedDescription: "Translating static visual tokens and component mockups directly into clean, responsive, and reusable frontend layouts.",
    skills: ["HTML5 & CSS Grid Layouts", "React & TypeScript", "Tailwind & Utility CSS", "Animation Engineering"],
    themeColor: "#10b981",
    icon: <FiCode size={18} />
  },
  {
    title: "Mobile App Design",
    description: "Creating responsive app layouts with native platform guidelines (iOS & Android).",
    extendedDescription: "Designing responsive, platform-native application interfaces for iOS and Android, respecting Apple Human Interface Guidelines and Google Material Design.",
    skills: ["iOS Native Guidelines", "Android Material Systems", "Adaptive Mobile Layouts", "Touch Target Optimization"],
    themeColor: "#a855f7",
    icon: <FiSmartphone size={18} />
  },
  {
    title: "Web Design",
    description: "Building fast, SEO-friendly, and accessible websites with clean layout structures.",
    extendedDescription: "Structuring modern, fast-loading websites optimized for SEO, readability, and accessibility (WCAG compliance).",
    skills: ["Responsive Grid Layouts", "Semantic HTML & Accessibility", "Performance & Speed Audits", "SEO Best Practices"],
    themeColor: "#ec4899",
    icon: <FiGlobe size={18} />
  }
];

interface MascotRobotProps {
  themeColor: string;
}

function MascotRobot({ themeColor }: MascotRobotProps) {
  return (
    <svg viewBox="0 0 200 240" className="w-48 h-56 select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={themeColor} stopOpacity="1" />
          <stop offset="100%" stopColor={themeColor} stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Antenna */}
        <rect x="95" y="15" width="10" height="25" rx="5" fill="#475569" />
        <motion.circle 
          cx="100" 
          cy="15" 
          r="8" 
          fill={themeColor} 
          animate={{ opacity: [0.5, 1, 0.5] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Ears */}
        <rect x="42" y="55" width="12" height="30" rx="4" fill="#334155" />
        <rect x="146" y="55" width="12" height="30" rx="4" fill="#334155" />
        
        {/* Head */}
        <rect x="50" y="40" width="100" height="70" rx="24" fill="url(#bodyGradient)" stroke="#334155" strokeWidth="2" />
        
        {/* Screen */}
        <rect x="62" y="50" width="76" height="50" rx="14" fill="url(#screenGradient)" stroke={`${themeColor}33`} strokeWidth="1.5" />
        
        {/* Scanline */}
        <motion.line 
          x1="63" 
          y1="52" 
          x2="137" 
          y2="52" 
          stroke={themeColor} 
          strokeWidth="0.5" 
          opacity="0.2"
          animate={{ y: [0, 46, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Eyes */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.05, 1, 1, 1, 0.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: '100px', originY: '75px' }}
        >
          <circle cx="85" cy="75" r="7" fill={themeColor} />
          <circle cx="85" cy="75" r="14" fill="url(#eyeGlow)" opacity="0.4" />
          <circle cx="83" cy="73" r="2.5" fill="#ffffff" />
          
          <circle cx="115" cy="75" r="7" fill={themeColor} />
          <circle cx="115" cy="75" r="14" fill="url(#eyeGlow)" opacity="0.4" />
          <circle cx="113" cy="73" r="2.5" fill="#ffffff" />
        </motion.g>

        {/* Mouth */}
        <path d="M92 90 Q100 95 108 90" fill="none" stroke={themeColor} strokeWidth="2" strokeLinecap="round" />

        {/* Neck */}
        <rect x="88" y="108" width="24" height="12" rx="4" fill="#334155" />
        
        {/* Body */}
        <rect x="64" y="118" width="72" height="70" rx="20" fill="url(#bodyGradient)" stroke="#334155" strokeWidth="2" />
        
        {/* Chest Light */}
        <motion.circle 
          cx="100" 
          cy="148" 
          r="10" 
          fill={themeColor} 
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="100" cy="148" r="18" fill="url(#eyeGlow)" opacity="0.25" />

        {/* Left Arm (Waving) */}
        <motion.g
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: '65px', originY: '135px' }}
        >
          <path d="M64 135 C45 130 35 110 32 105" fill="none" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
          <circle cx="32" cy="105" r="7" fill={themeColor} />
        </motion.g>

        {/* Right Arm */}
        <motion.g
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: '135px', originY: '135px' }}
        >
          <path d="M136 135 C155 140 170 148 180 152" fill="none" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
          <circle cx="180" cy="152" r="7" fill={themeColor} />
        </motion.g>

        {/* Jet Flame */}
        <motion.path 
          d="M90 190 L100 215 L110 190 Z" 
          fill="url(#eyeGlow)" 
          opacity="0.8"
          animate={{ 
            scaleY: [0.8, 1.3, 0.8],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: '100px', originY: '190px' }}
        />
      </motion.g>
    </svg>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  return (
    <section id="services" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary-accent)] font-semibold mb-3 block font-mono"
        >
          [ MY EXPERTISE ]
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-400"
        >
          Capabilities
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-20 h-[1px] bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            whileHover={{ 
              y: -5,
              scale: 1.01,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
            transition={{ duration: 0.6, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedService(service)}
            className="group relative flex flex-col justify-between p-6.5 bg-neutral-900/5 dark:bg-neutral-950/20 border border-[var(--color-glass)] rounded-[28px] hover:border-[var(--color-primary-accent)]/30 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] text-left"
          >
            {/* Ambient Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)]/5 to-[var(--color-highlight)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-neutral-950/5 dark:bg-white/5 flex items-center justify-center border border-[var(--color-glass)] group-hover:border-[var(--color-primary-accent)]/30 group-hover:bg-[var(--color-primary-accent)]/10 transition-all duration-300 shadow-sm shrink-0">
                <div style={{ color: service.themeColor }} className="transition-all duration-300">
                  {service.icon}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="space-y-1.5 pt-1">
                <h3 className="font-bold text-[16px] md:text-[17px] text-[var(--color-typography)] group-hover:text-[var(--color-primary-accent)] transition-colors duration-300 leading-snug">
                  {service.title}
                </h3>
                <p className="text-[12px] md:text-[13px] text-[var(--color-secondary-text)] leading-relaxed font-light font-body">
                  {service.description}
                </p>
              </div>
            </div>
            
            {/* Subtle bottom-right indicator arrow */}
            <div className="absolute bottom-4.5 right-4.5 opacity-0 translate-x-2 -translate-y-2 group-hover:opacity-70 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-[var(--color-secondary-text)] group-hover:text-[var(--color-primary-accent)]">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Modal Popup with Animated Mascot */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content Wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-4xl glass-panel rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center p-6 md:p-10 gap-8 md:gap-12"
              style={{
                borderColor: `${selectedService.themeColor}33`,
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px -5px ${selectedService.themeColor}15`
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-neutral-900/10 dark:bg-white/5 flex items-center justify-center border border-[var(--color-glass)] hover:border-red-500/30 hover:bg-red-500/10 text-[var(--color-secondary-text)] hover:text-red-500 transition-all duration-300 cursor-pointer"
              >
                <FiX size={20} />
              </button>

              {/* Left Side: Mascot Robot (Slides/Bounces In) */}
              <motion.div
                initial={{ x: -100, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -100, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 18, stiffness: 120, delay: 0.1 }}
                className="flex flex-col items-center justify-center shrink-0 w-full md:w-auto"
              >
                <MascotRobot themeColor={selectedService.themeColor} />
                <div className="mt-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono text-[var(--color-secondary-text)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: selectedService.themeColor }} />
                  <span>Kovi AI assistant loaded</span>
                </div>
              </motion.div>

              {/* Right Side: Content Details */}
              <div className="flex-1 space-y-6 text-left w-full">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0"
                      style={{ 
                        backgroundColor: `${selectedService.themeColor}15`,
                        borderColor: `${selectedService.themeColor}30`,
                        color: selectedService.themeColor
                      }}
                    >
                      {selectedService.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-typography)]">
                      {selectedService.title}
                    </h3>
                  </div>
                  <p className="text-[14px] md:text-[15px] text-[var(--color-secondary-text)] font-light leading-relaxed">
                    {selectedService.extendedDescription}
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-[var(--color-glass)] via-[var(--color-soft-divider)] to-transparent" />

                <div className="space-y-4">
                  <h4 className="text-[12px] uppercase font-mono tracking-wider text-[var(--color-secondary-text)] font-semibold">
                    Core Specializations & Outputs
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.skills.map((skill, sIdx) => (
                      <motion.div
                        key={sIdx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + sIdx * 0.05 }}
                        className="flex items-center gap-2.5 p-3 rounded-2xl bg-neutral-900/5 dark:bg-white/3 border border-[var(--color-glass)]"
                      >
                        <span 
                          className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                          style={{ backgroundColor: selectedService.themeColor, color: selectedService.themeColor }}
                        />
                        <span className="text-[12px] md:text-[13px] font-medium text-[var(--color-typography)] font-body">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedService(null)}
                    style={{ backgroundColor: selectedService.themeColor }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl text-white font-semibold text-xs md:text-sm shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-mono tracking-wider uppercase"
                  >
                    Ack / Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
