import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, FiDownload, FiMail, 
  FiGrid, FiLayers, FiType, FiSettings
} from 'react-icons/fi';
import Orb from './Orb';
import RotatingText from './RotatingText';
import heroImage from '../../assets/hero.png';

const roles = [
  "UI/UX & Product Designer",
  "Design Systems Architect",
  "Interaction Designer",
  "Creative Front-end Developer"
];

export default function Hero() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTool, setActiveTool] = useState<'select' | 'frame' | 'pen' | 'text' | 'hand'>('select');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
    setTheme(currentTheme);

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
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-primary-bg)] pt-20">
      {/* Interactive background canvas */}
      <div className="absolute inset-0 z-0 w-full h-full opacity-60">
        <Orb
          hoverIntensity={0.6}
          rotateOnHover={true}
          hue={260} // Purple/indigo base
          forceHoverState={false}
          backgroundColor={orbBgColor}
        />
      </div>

      {/* ----------------------------------------------------
         Figma Canvas HUD Overlays (Pixel Rulers, Sidebars, Toolbar)
         ---------------------------------------------------- */}
      
      {/* Top Ruler */}
      <div className="absolute top-16 left-0 right-0 h-4 border-b border-[var(--color-glass)] bg-[var(--color-primary-bg)]/80 backdrop-blur-sm z-30 flex items-end pointer-events-none select-none text-[8px] font-mono text-[var(--color-secondary-text)]">
        <div className="w-12 h-full border-r border-[var(--color-glass)]" />
        <div className="flex-1 flex justify-between px-4">
          {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800].map(val => (
            <span key={val} className="flex flex-col items-center">
              <span className="h-1.5 w-[1px] bg-[var(--color-glass)] mb-0.5" />
              {val}
            </span>
          ))}
        </div>
      </div>

      {/* Left Ruler */}
      <div className="absolute top-20 left-0 bottom-0 w-4 border-r border-[var(--color-glass)] bg-[var(--color-primary-bg)]/80 backdrop-blur-sm z-30 flex flex-col items-end pointer-events-none select-none text-[8px] font-mono text-[var(--color-secondary-text)] pt-4">
        {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(val => (
          <div key={val} className="flex items-center w-full h-[100px] justify-between pr-0.5">
            <span className="w-1.5 h-[1px] bg-[var(--color-glass)]" />
            <span className="origin-center -rotate-90">{val}</span>
          </div>
        ))}
      </div>

      {/* Center-Top Figma-Style Floating Toolbar */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/90 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center space-x-1">
        {[
          { id: 'select', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /></svg>, tooltip: 'Move (V)' },
          { id: 'frame', icon: <FiGrid size={14} />, tooltip: 'Frame (F)' },
          { id: 'pen', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rotate-45"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, tooltip: 'Pen (P)' },
          { id: 'text', icon: <FiType size={14} />, tooltip: 'Text (T)' },
          { id: 'hand', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5M14 10V5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5M10 10.5V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8.5M6 12V8.5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10.5a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6V11" /></svg>, tooltip: 'Hand (H)' }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id as any)}
            className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTool === tool.id 
                ? 'bg-[var(--color-primary-accent)] text-white shadow-md' 
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
            title={tool.tooltip}
          >
            {tool.icon}
          </button>
        ))}
        <div className="w-[1px] h-6 bg-white/10 mx-2" />
        {/* Zoom & Canvas Label */}
        <div className="flex items-center space-x-2 px-2 text-[10px] font-mono text-neutral-400">
          <span className="bg-white/5 px-2 py-0.5 rounded text-white">Draft</span>
          <span className="hidden md:inline">Portfolio_v2.0</span>
          <select 
            value={zoomLevel} 
            onChange={(e) => setZoomLevel(Number(e.target.value))}
            className="bg-transparent text-white border-none outline-none font-semibold cursor-pointer"
          >
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="100">100%</option>
            <option value="125">125%</option>
          </select>
        </div>
      </div>

      {/* Left Sidebar - Layers & Pages (Visible on large screens) */}
      <div className="absolute left-6 top-36 bottom-6 w-60 bg-[var(--color-primary-bg)]/85 border border-[var(--color-glass)] rounded-2xl p-5 backdrop-blur-md z-30 flex flex-col hidden xl:flex shadow-[0_8px_30px_rgba(0,0,0,0.15)] pointer-events-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-glass)] mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-typography)]">Layers</span>
          <FiLayers className="text-[var(--color-secondary-text)]" size={14} />
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs text-[var(--color-secondary-text)]">
          <div className="flex items-center text-[var(--color-typography)] font-semibold">
            <span className="mr-1.5">▼</span> <span>🏡 Hero_Section</span>
          </div>
          <div className="pl-4 space-y-2.5">
            <div className="flex items-center hover:text-[var(--color-primary-accent)] cursor-pointer">
              <span className="mr-2 text-indigo-400">❖</span>
              <span>AvatarComponent</span>
            </div>
            <div className="pl-4 text-[10px] text-neutral-500 flex items-center">
              <span className="mr-1.5">🖼️</span>
              <span>hero.png (Face preserved)</span>
            </div>
            <div className="flex items-center hover:text-[var(--color-primary-accent)] cursor-pointer text-[var(--color-primary-accent)]">
              <span className="mr-2 text-pink-400">❖</span>
              <span>Figma_Workspace</span>
            </div>
            <div className="flex items-center hover:text-[var(--color-primary-accent)] cursor-pointer">
              <span className="mr-2 text-blue-400">❖</span>
              <span>Design_Tokens_Card</span>
            </div>
            <div className="flex items-center hover:text-[var(--color-primary-accent)] cursor-pointer">
              <span className="mr-2 text-purple-400">❖</span>
              <span>Typography_Scales</span>
            </div>
            <div className="flex items-center hover:text-[var(--color-primary-accent)] cursor-pointer">
              <span className="mr-2 text-yellow-400">❖</span>
              <span>Interactive_Mockups</span>
            </div>
          </div>
          <div className="pt-2 flex items-center">
            <span className="mr-1.5 text-neutral-500">▶</span> <span>📄 About_Section</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1.5 text-neutral-500">▶</span> <span>🛠️ Technical_Arsenal</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1.5 text-neutral-500">▶</span> <span>📂 Selected_Works</span>
          </div>
        </div>
        <div className="pt-4 border-t border-[var(--color-glass)] text-[10px] text-neutral-500 font-mono flex items-center justify-between">
          <span>MULTIPLAYER MODE</span>
          <span className="text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            LIVE
          </span>
        </div>
      </div>

      {/* Right Sidebar - Design Parameters / Auto Layout (Visible on large screens) */}
      <div className="absolute right-6 top-36 bottom-6 w-60 bg-[var(--color-primary-bg)]/85 border border-[var(--color-glass)] rounded-2xl p-5 backdrop-blur-md z-30 flex flex-col hidden xl:flex shadow-[0_8px_30px_rgba(0,0,0,0.15)] pointer-events-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-glass)] mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-typography)]">Design</span>
          <FiSettings className="text-[var(--color-secondary-text)] animate-spin" style={{ animationDuration: '8s' }} size={14} />
        </div>
        <div className="flex-1 overflow-y-auto space-y-5 text-xs text-[var(--color-secondary-text)] font-mono">
          {/* Alignment Controls */}
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block mb-2">Align</span>
            <div className="grid grid-cols-6 gap-1 bg-[var(--color-glass)] p-1 rounded-lg">
              {['⇱', '⇳', '⇲', '⇰', '⇄', '⇇'].map((align, idx) => (
                <button key={idx} className="h-6 rounded bg-[var(--color-cards)] border border-[var(--color-glass)] flex items-center justify-center text-center font-bold text-[var(--color-typography)] hover:bg-[var(--color-primary-accent)] hover:text-white transition-colors cursor-pointer">{align}</button>
              ))}
            </div>
          </div>

          {/* Constraints & Layout */}
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block mb-2">Constraints</span>
            <div className="flex items-center justify-between bg-[var(--color-glass)] p-2 rounded-lg">
              <span className="font-semibold text-[var(--color-typography)]">↔ Left & Right</span>
              <span className="font-semibold text-[var(--color-typography)]">↕ Top & Bottom</span>
            </div>
          </div>

          {/* Auto Layout Props */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-neutral-400 uppercase">Auto Layout</span>
              <span className="text-[10px] text-[var(--color-primary-accent)] font-semibold">❖ ACTIVE</span>
            </div>
            <div className="space-y-2 bg-[var(--color-glass)] p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span>Direction</span>
                <span className="bg-[var(--color-cards)] px-2 py-0.5 rounded text-[var(--color-typography)] font-semibold">↓ Vertical</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Spacing (Gap)</span>
                <span className="bg-[var(--color-cards)] px-2 py-0.5 rounded text-[var(--color-typography)] font-semibold">24px</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Padding</span>
                <span className="bg-[var(--color-cards)] px-2 py-0.5 rounded text-[var(--color-typography)] font-semibold">16px 24px</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Align Items</span>
                <span className="bg-[var(--color-cards)] px-2 py-0.5 rounded text-[var(--color-typography)] font-semibold">Center</span>
              </div>
            </div>
          </div>

          {/* Design Tokens & Theme */}
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block mb-2">Design Tokens</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 border border-[var(--color-glass)] bg-[var(--color-cards)] rounded-lg text-center">
                <span className="text-[9px] block text-neutral-400">PRIMARY</span>
                <span className="text-[10px] font-bold text-[var(--color-primary-accent)]">#4F46E5</span>
              </div>
              <div className="p-2 border border-[var(--color-glass)] bg-[var(--color-cards)] rounded-lg text-center">
                <span className="text-[9px] block text-neutral-400">HIGHLIGHT</span>
                <span className="text-[10px] font-bold text-[var(--color-highlight)]">#FF0055</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-[var(--color-glass)] text-[10px] text-neutral-500 font-mono text-center">
          COMPOSITION SCALE 1:1
        </div>
      </div>

      {/* ----------------------------------------------------
         Main Canvas Area: Interactive Designer Grid Composition
         ---------------------------------------------------- */}
      
      <div 
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-300"
        style={{ transform: `scale(${zoomLevel / 100})` }}
      >
        {/* Left Column: UI/UX Designer Text & Profile Details */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 relative">
          
          {/* Smart guide line connecting Title to Canvas element (visual line only) */}
          <div className="absolute right-0 top-1/2 w-24 h-[1px] border-t border-dashed border-pink-500 opacity-40 pointer-events-none hidden lg:block" />

          {/* Tag badge for selection state */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-3.5 py-1.5 rounded-full border border-[var(--color-glass)] bg-[var(--color-cards)] text-xs font-mono font-bold tracking-wider text-[var(--color-primary-accent)] flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary-accent)] animate-ping" />
            <span>WORKSPACE: DESIGNER_MODE</span>
          </motion.div>

          {/* Heading Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-500 leading-none pb-2">
              KUMARAVEL K
            </h1>
          </motion.div>

          {/* Dynamic rotating designer subheadings */}
          <div className="h-10 md:h-12 overflow-hidden w-full flex justify-center lg:justify-start">
            <RotatingText
              texts={roles}
              mainClassName="text-xl md:text-2xl font-light text-[var(--color-highlight)] tracking-widest uppercase flex justify-center lg:justify-start"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2800}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-[var(--color-secondary-text)] font-light leading-relaxed max-w-lg"
          >
            Crafting premium interactive interfaces, layout design systems, and digital products. Specialized in transforming complex ideas into pixel-perfect, user-centered web and mobile experiences.
          </motion.p>

          {/* Interactive Figma CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4 w-full"
          >
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic group relative px-8 py-4 bg-[var(--color-typography)] text-[var(--color-primary-bg)] font-semibold rounded-full overflow-hidden flex items-center space-x-2 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg z-10"
            >
              <span className="relative z-10">Prototype Preview</span>
              <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            
            <a 
              href="/resume.pdf" 
              download="Kumaravel_K_Resume.pdf"
              className="magnetic group px-8 py-4 bg-[var(--color-cards)] border border-[var(--color-soft-divider)] text-[var(--color-typography)] font-semibold rounded-full flex items-center space-x-2 hover:bg-[var(--color-secondary-bg)] hover:scale-105 transition-all duration-300 cursor-pointer shadow-md z-10"
            >
              <span>Download Specs</span>
              <FiDownload className="group-hover:-translate-y-1 transition-transform" />
            </a>

            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic group px-8 py-4 bg-transparent border border-[var(--color-primary-accent)] text-[var(--color-primary-accent)] font-semibold rounded-full flex items-center space-x-2 hover:bg-[var(--color-primary-accent)] hover:text-white transition-all duration-300 cursor-pointer shadow-sm z-10"
            >
              <span>Initiate Flow</span>
              <FiMail />
            </button>
          </motion.div>
        </div>

        {/* Right Column: High-fidelity Figma canvas elements with user's face */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[460px] select-none">
          
          {/* Smart guides indicators (pink dashed lines representing constraints) */}
          <div className="absolute inset-0 border border-dashed border-pink-500/20 rounded-3xl pointer-events-none" />
          {/* Magenta smart guide dimension text labels */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-pink-500 text-white font-mono text-[9px] rounded shadow-md pointer-events-none z-10">
            W: 480px (Smart Guide)
          </div>
          <div className="absolute top-1/2 -left-8 -translate-y-1/2 px-2 py-0.5 bg-pink-500 text-white font-mono text-[9px] rounded shadow-md pointer-events-none z-10 origin-center -rotate-90">
            H: 420px
          </div>

          {/* Prototype connection lines (SVG curves) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Animated blue connection line from Color Tokens Card to Profile frame */}
            <motion.path
              d="M 60,330 C 40,240 180,240 200,160"
              fill="none"
              stroke="#0c8ce9"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -20 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            {/* Connection handle endpoints */}
            <circle cx="60" cy="330" r="4" fill="white" stroke="#0c8ce9" strokeWidth="2" />
            <circle cx="200" cy="160" r="4" fill="white" stroke="#0c8ce9" strokeWidth="2" />
            
            {/* Secondary violet line from profile image to typography card */}
            <motion.path
              d="M 320,130 C 370,130 360,320 400,320"
              fill="none"
              stroke="#a259ff"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 20 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <circle cx="320" cy="130" r="4" fill="white" stroke="#a259ff" strokeWidth="2" />
            <circle cx="400" cy="320" r="4" fill="white" stroke="#a259ff" strokeWidth="2" />
          </svg>

          {/* ----------------------------------------------------
             Main Frame: Avatar profile with Figma boundary box
             ---------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="relative z-10 w-[300px] h-[320px] rounded-2xl bg-gradient-to-tr from-[var(--color-cards)] to-white/5 border-2 border-[var(--color-primary-accent)] shadow-[0_24px_50px_-15px_rgba(0,0,0,0.4)] flex items-center justify-center p-2 backdrop-blur-xl group hover:-translate-y-1 transition-transform"
          >
            {/* Frame info labels (Figma Style Selection coordinates) */}
            <div className="absolute -top-6 left-0 bg-[var(--color-primary-accent)] text-white font-mono text-[9px] px-2 py-0.5 rounded-t-md shadow-md flex items-center gap-1.5">
              <span>❖ AvatarComponent</span>
              <span className="opacity-60">X: 520 Y: 180</span>
            </div>
            
            {/* Corner Resize Handles */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
              const classes: Record<string, string> = {
                'top-left': '-top-1.5 -left-1.5 cursor-nwse-resize',
                'top-right': '-top-1.5 -right-1.5 cursor-nesw-resize',
                'bottom-left': '-bottom-1.5 -left-1.5 cursor-nesw-resize',
                'bottom-right': '-bottom-1.5 -right-1.5 cursor-nwse-resize',
              };
              return (
                <div 
                  key={corner} 
                  className={`absolute w-3.5 h-3.5 bg-white border-2 border-[var(--color-primary-accent)] rounded shadow-sm z-20 ${classes[corner]}`} 
                />
              );
            })}

            {/* The Image (FACE 100% PRESERVED, NO DILUTION) */}
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-neutral-900 border border-white/10 flex items-center justify-center">
              <img 
                src={heroImage} 
                alt="Kumaravel K - UI/UX Designer Profile" 
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Layout grid overlay on top of face for wireframe feel */}
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none grid grid-cols-4 grid-rows-4 gap-0">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white" />
                ))}
              </div>
            </div>

            {/* Figma Auto Layout alignment pill overlay */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[var(--color-primary-bg)] border border-[var(--color-primary-accent)] text-[var(--color-primary-accent)] font-mono text-[9px] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1.5 font-bold">
              <span>Auto Layout</span>
              <span className="text-[8px] bg-[var(--color-primary-accent)] text-white px-1.5 rounded">H: Hug</span>
            </div>
          </motion.div>

          {/* ----------------------------------------------------
             Floating UI Cards & Cards (UX Journey, Color System, Typo Scales)
             ---------------------------------------------------- */}

          {/* Color Tokens (Design System Panel) */}
          <motion.div
            initial={{ x: -60, y: 120, opacity: 0 }}
            animate={{ x: -110, y: 130, opacity: 1 }}
            transition={{ delay: 1, duration: 1, type: "spring" }}
            className="absolute z-20 w-[140px] p-3 rounded-2xl bg-[var(--color-cards)] border border-[var(--color-glass)] backdrop-blur-xl shadow-xl flex flex-col space-y-2 hover:scale-105 hover:border-[var(--color-primary-accent)] transition-all cursor-default"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-glass)] pb-1.5 mb-1">
              <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-neutral-400">Tokens</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            </div>
            {[
              { label: 'Brand', hex: '#4F46E5', bg: 'bg-[#4f46e5]' },
              { label: 'Accent', hex: '#FF0055', bg: 'bg-[#ff0055]' },
              { label: 'Cyan', hex: '#06B6D4', bg: 'bg-[#06b6d4]' },
            ].map((token) => (
              <div key={token.label} className="flex items-center space-x-2">
                <div className={`w-3.5 h-3.5 rounded ${token.bg}`} />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-[var(--color-typography)] leading-tight">{token.label}</span>
                  <span className="text-[7.5px] font-mono text-[var(--color-secondary-text)] leading-none">{token.hex}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Typography Scale Card */}
          <motion.div
            initial={{ x: 60, y: 120, opacity: 0 }}
            animate={{ x: 120, y: 110, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, type: "spring" }}
            className="absolute z-20 w-[150px] p-3.5 rounded-2xl bg-[var(--color-cards)] border border-[var(--color-glass)] backdrop-blur-xl shadow-xl flex flex-col space-y-2 hover:scale-105 hover:border-[var(--color-primary-accent)] transition-all cursor-default"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-glass)] pb-1.5">
              <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-neutral-400">Typography</span>
              <span className="text-[8px] bg-purple-500/20 text-purple-400 px-1 rounded">Scale</span>
            </div>
            <div className="space-y-1.5 font-mono text-[8px] text-[var(--color-secondary-text)]">
              <div className="flex items-baseline justify-between border-b border-[var(--color-glass)]/20 pb-1">
                <span className="font-sans font-bold text-[11px] text-[var(--color-typography)]">H1</span>
                <span>Space Grotesk</span>
                <span className="font-semibold text-purple-400">48px</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-[var(--color-glass)]/20 pb-1">
                <span className="font-sans font-medium text-[9px] text-[var(--color-typography)]">H2</span>
                <span>Satoshi</span>
                <span className="font-semibold text-purple-400">32px</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-[8px] text-[var(--color-typography)]">Body</span>
                <span>Inter</span>
                <span className="font-semibold text-purple-400">14px</span>
              </div>
            </div>
          </motion.div>

          {/* Mobile UI Wireframe (Hologram Screen Mockup) */}
          <motion.div
            initial={{ x: 110, y: -110, opacity: 0 }}
            animate={{ x: 120, y: -110, opacity: 1 }}
            transition={{ delay: 1.4, duration: 1, type: "spring" }}
            className="absolute z-0 w-[120px] aspect-[9/16] rounded-2xl border border-dashed border-cyan-400/40 bg-cyan-400/5 p-2 backdrop-blur-sm shadow-xl flex flex-col justify-between hover:border-cyan-400 transition-colors"
          >
            <div className="flex justify-between items-center text-[7px] text-cyan-400 font-mono">
              <span>9:41</span>
              <span>100%</span>
            </div>
            
            {/* Wireframe components */}
            <div className="space-y-2 flex-1 flex flex-col justify-center">
              <div className="h-6 w-full rounded border border-dashed border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center text-[7px] text-cyan-400/60 font-mono">Header</div>
              <div className="h-10 w-full rounded border border-dashed border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center text-[7px] text-cyan-400/60 font-mono">Hero Slider</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="h-6 rounded border border-dashed border-cyan-400/30 bg-cyan-400/10" />
                <div className="h-6 rounded border border-dashed border-cyan-400/30 bg-cyan-400/10" />
              </div>
            </div>
            
            <div className="h-2 w-12 bg-cyan-400/30 rounded-full mx-auto" />
          </motion.div>

          {/* Animated Multiplayer Figma Cursor of a reviewer client */}
          <motion.div
            animate={{
              x: [-120, 10, -50, -120],
              y: [40, -140, -80, 40],
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut",
            }}
            className="absolute z-30 flex items-start pointer-events-none select-none"
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-pink-500 drop-shadow-md"
            >
              <path d="M4.39737 9.64157L1.63539 1.63539L9.64157 4.39737L6.1482 6.1482L4.39737 9.64157Z" fill="currentColor" stroke="white" strokeWidth="1" />
            </svg>
            <div className="ml-2.5 mt-2.5 px-2 py-0.5 rounded bg-pink-500 text-white font-mono text-[8px] font-semibold whitespace-nowrap shadow-md border border-white/10 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-white animate-ping" />
              Client (Reviewer)
            </div>
          </motion.div>

          {/* Third Multiplayer Cursor representing a product manager */}
          <motion.div
            animate={{
              x: [180, 60, 140, 180],
              y: [-120, -20, -140, -120],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut",
            }}
            className="absolute z-30 flex items-start pointer-events-none select-none"
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-orange-500 drop-shadow-md"
            >
              <path d="M4.39737 9.64157L1.63539 1.63539L9.64157 4.39737L6.1482 6.1482L4.39737 9.64157Z" fill="currentColor" stroke="white" strokeWidth="1" />
            </svg>
            <div className="ml-2.5 mt-2.5 px-2 py-0.5 rounded bg-orange-500 text-white font-mono text-[8px] font-semibold whitespace-nowrap shadow-md border border-white/10 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-white" />
              Dev Lead
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Animated Brand Design Icons (Figma, Framer, Sketch, Webflow) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
        {[
          { 
            name: "Figma", 
            x: "15%", 
            y: "80%", 
            color: "text-purple-400",
            icon: (
              <svg width="24" height="24" viewBox="0 0 384 512" fill="currentColor">
                <path d="M192 0C86 0 0 86 0 192c0 77.4 46.2 144 112.5 173.2c-6.8 5.7-11.2 14.2-11.2 23.8v1.5c0 53 43 96 96 96c46.7 0 85.5-33.3 94.2-77.7c22.1-4.8 42-14.7 58.7-28.7c33-27.7 53.8-69.6 53.8-116.3C404 86 318 0 192 0zm-32 96c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zm0 128c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zm64 128c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
            )
          },
          { 
            name: "Framer", 
            x: "85%", 
            y: "22%", 
            color: "text-blue-400",
            icon: (
              <svg width="24" height="24" viewBox="0 0 384 512" fill="currentColor">
                <path d="M0 96C0 60.7 28.7 32 64 32h256c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64v192l128 96V256L64 160zm256 0L192 256v192l128-96V160z" />
              </svg>
            )
          },
          { 
            name: "Sketch", 
            x: "70%", 
            y: "80%", 
            color: "text-yellow-400",
            icon: (
              <svg width="24" height="24" viewBox="0 0 512 512" fill="currentColor">
                <path d="M256 32L32 192l224 288 224-288L256 32zm0 76.5l143.5 101.5L256 427.5 112.5 210 256 108.5z" />
              </svg>
            )
          },
          { 
            name: "Webflow", 
            x: "45%", 
            y: "12%", 
            color: "text-indigo-400",
            icon: (
              <svg width="24" height="24" viewBox="0 0 512 512" fill="currentColor">
                <path d="M433.9 129.9c-22.6-22.6-59.2-22.6-81.8 0L256 226l-96.1-96.1c-22.6-22.6-59.2-22.6-81.8 0s-22.6 59.2 0 81.8L174.2 308l-96.1 96.1c-22.6 22.6-22.6 59.2 0 81.8s59.2 22.6 81.8 0L256 390l96.1 96.1c22.6 22.6 59.2 22.6 81.8 0s22.6-59.2 0-81.8L337.8 308l96.1-96.1c22.6-22.6 22.6-59.2 0-82z" />
              </svg>
            )
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            style={{ left: item.x, top: item.y }}
            className={`absolute z-10 w-12 h-12 rounded-2xl bg-[var(--color-cards)] border border-[var(--color-glass)] shadow-md flex items-center justify-center backdrop-blur-md ${item.color}`}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + idx,
              ease: "easeInOut"
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Page Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-secondary-text)] mb-2 font-mono">SCROLL CANVAS</span>
        <div className="w-[1px] h-16 bg-[var(--color-soft-divider)] relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-[var(--color-primary-accent)] absolute top-0"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
