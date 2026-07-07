import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[var(--color-glass)] bg-[var(--color-primary-bg)] pt-20 pb-10 px-6 md:px-12 z-10 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-[var(--color-primary-accent)] rounded-[100%] opacity-5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-typography)] to-[var(--color-secondary-text)]">
          KUMARAVEL.
        </h2>

        <p className="text-xl md:text-2xl text-[var(--color-secondary-text)] font-light italic mb-12 max-w-2xl">
          "Transforming Ideas Into Digital Experiences."
        </p>

        <div className="flex space-x-6 mb-16">
          <a href="https://github.com/kumaravel198" target="_blank" rel="noreferrer" className="magnetic text-[var(--color-secondary-text)] hover:text-[var(--color-typography)] transition-colors p-4 rounded-full border border-[var(--color-glass)] hover:border-[var(--color-typography)]">
            <FiGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/kumaravel-k-3904192a8/" target="_blank" rel="noreferrer" className="magnetic text-[var(--color-secondary-text)] hover:text-[var(--color-typography)] transition-colors p-4 rounded-full border border-[var(--color-glass)] hover:border-[var(--color-typography)]">
            <FiLinkedin size={24} />
          </a>
          <a href="mailto:kumaravel.kv198@gmail.com" className="magnetic text-[var(--color-secondary-text)] hover:text-[var(--color-typography)] transition-colors p-4 rounded-full border border-[var(--color-glass)] hover:border-[var(--color-typography)]">
            <FiMail size={24} />
          </a>
        </div>

        <div className="w-full border-t border-[var(--color-glass)] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[var(--color-secondary-text)]">
          <p>© {new Date().getFullYear()} Kumaravel K. All rights reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="magnetic mt-4 md:mt-0 flex items-center space-x-2 hover:text-[var(--color-typography)] transition-colors group"
          >
            <span>Back to top</span>
            <span className="w-8 h-8 rounded-full border border-[var(--color-glass)] flex items-center justify-center group-hover:border-[var(--color-typography)] group-hover:-translate-y-1 transition-all">
              <FiArrowUp />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
