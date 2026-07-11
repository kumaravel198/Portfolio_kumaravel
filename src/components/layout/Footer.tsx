import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[var(--color-glass)] bg-[var(--color-primary-bg)] pt-20 pb-10 px-6 md:px-12 z-10 overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[250px] bg-[var(--color-primary-accent)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-400 select-none">
          KUMARAVEL K
        </h2>

        <p className="text-sm text-[var(--color-secondary-text)] tracking-wider font-light mb-8 max-w-xl select-none leading-relaxed">
          Designing systems. Building interfaces. Crafting products.
        </p>

        {/* Social Icons with border wrappers */}
        <div className="flex space-x-3 mb-12">
          {[
            { icon: <FiGithub size={18} />, href: "https://github.com/kumaravel198", label: "GitHub" },
            { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/in/kumaravel-k-3904192a8/", label: "LinkedIn" },
            { icon: <FiMail size={18} />, href: "mailto:kumaravel.kv198@gmail.com", label: "Email" }
          ].map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target="_blank" 
              rel="noreferrer" 
              title={social.label}
              className="magnetic text-[var(--color-secondary-text)] hover:text-[var(--color-typography)] hover:bg-neutral-950/5 dark:hover:bg-white/5 transition-all duration-300 p-3 rounded-2xl border border-[var(--color-glass)] hover:border-neutral-400 dark:hover:border-neutral-700 shadow-sm flex items-center justify-center bg-neutral-900/5 dark:bg-neutral-950/20"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Sub Footer details */}
        <div className="w-full border-t border-[var(--color-glass)] pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-mono text-neutral-500 gap-4">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Kumaravel K. All rights reserved.</p>
            <span className="hidden sm:inline text-neutral-700">|</span>
            <p className="hidden sm:inline text-[9px] bg-neutral-950/5 dark:bg-neutral-950/40 border border-[var(--color-glass)] px-2 py-0.5 rounded text-neutral-500 font-mono">SPEC SCALE 1:1</p>
            <p className="hidden sm:inline text-[9px] bg-neutral-950/5 dark:bg-neutral-950/40 border border-[var(--color-glass)] px-2 py-0.5 rounded text-neutral-500 font-mono">BUILD V2.0</p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="magnetic flex items-center space-x-2 hover:text-[var(--color-typography)] transition-colors group cursor-pointer"
          >
            <span className="font-semibold tracking-wider text-[10px] uppercase">Back to top</span>
            <span className="w-8 h-8 rounded-xl border border-[var(--color-glass)] flex items-center justify-center bg-neutral-900/5 dark:bg-neutral-950/20 group-hover:border-[var(--color-primary-accent)]/30 group-hover:text-[var(--color-primary-accent)] group-hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
              <FiArrowUp size={12} />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
