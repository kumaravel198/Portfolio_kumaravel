import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: "InboxZen - Email Automation Dashboard",
    subtitle: "UX/UI Case Study & Dashboard Design",
    description: "Designed the UX architecture, layout grid, and interactive dashboard UI for an automated email workspace. Built color tokens, typography scales, and a responsive component library to help users track automation rules and inbox efficiency metrics.",
    tech: ["Dashboard UI", "Figma Design System", "React", "n8n Workflow", "Interaction Design"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    demoUrl: "https://github.com/kumaravel-k-3904192a8",
    codeUrl: "https://github.com/kumaravel-k-3904192a8"
  },
  {
    id: 2,
    title: "ChronosFace - Attendance Control App",
    subtitle: "Mobile App Design & Design System",
    description: "Created the mobile user flows, journey maps, and high-fidelity prototype layouts for a face recognition check-in system. Created a comprehensive design system with auto-layout cards, light/dark mode design tokens, and seamless micro-interaction states.",
    tech: ["Mobile UI/UX", "User Flow Mapping", "Figma Components", "Prototyping", "Design Tokens"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop",
    demoUrl: "https://github.com/kumaravel-k-3904192a8",
    codeUrl: "https://github.com/kumaravel-k-3904192a8"
  }
];

function InteractiveProjectCard({ project, idx, onClick }: { project: typeof projects[0]; idx: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const rotateX = useTransform(y, [0, 1], [4, -4]);
  const rotateY = useTransform(x, [0, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const isEven = idx % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group cursor-pointer relative w-full rounded-[32px] bg-neutral-900/5 dark:bg-neutral-950/20 border border-[var(--color-glass)] p-6 md:p-8 hover:border-[var(--color-primary-accent)]/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)] will-change-transform-opacity"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)]/5 to-[var(--color-highlight)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]" />

      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
        
        {/* Image Frame Container */}
        <div 
          style={{ transform: "translateZ(20px)" }}
          className="w-full lg:w-3/5 overflow-hidden rounded-[24px] relative aspect-video bg-neutral-100 dark:bg-neutral-950 border border-[var(--color-glass)] shadow-sm group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950/20 via-transparent to-transparent opacity-80 z-10 pointer-events-none mix-blend-multiply" />
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="object-cover w-full h-full scale-100 group-hover:scale-102 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Text Container */}
        <div 
          style={{ transform: "translateZ(15px)" }}
          className="w-full lg:w-2/5 space-y-4"
        >
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[var(--color-primary-accent)] font-bold">
            {project.subtitle}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-typography)] group-hover:text-[var(--color-primary-accent)] transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <p className="text-[var(--color-secondary-text)] text-[13px] md:text-[14px] font-light leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 text-[9px] font-semibold border border-[var(--color-glass)] rounded-full text-[var(--color-secondary-text)] font-mono bg-neutral-950/5 dark:bg-neutral-950/40">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary-accent)] font-semibold mb-3 block font-mono"
        >
          [ THE PORTFOLIO ]
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-400"
        >
          Selected Works
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-20 h-[1px] bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] mx-auto"
        />
      </div>

      <div className="space-y-12">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 * idx, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveProjectCard 
              project={project}
              idx={idx}
              onClick={() => setSelectedId(project.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Theme-aware Fullscreen Case Study Details Popup */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 dark:bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[var(--color-primary-bg)] dark:bg-neutral-950 w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-[32px] border border-[var(--color-glass)] relative shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedId(null)}
                className="magnetic absolute top-6 right-6 z-50 p-3 bg-neutral-200/80 dark:bg-neutral-900/80 hover:bg-neutral-300 dark:hover:bg-neutral-800 backdrop-blur-md rounded-full text-[var(--color-typography)] transition-colors border border-[var(--color-glass)] cursor-pointer shadow-lg"
              >
                <FiX size={16} />
              </button>

              {/* Banner Image */}
              <div className="w-full h-64 md:h-[350px] relative">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-bg)] dark:from-neutral-950 via-transparent to-transparent" />
              </div>

              {/* Modal Details */}
              <div className="p-8 md:p-12 space-y-6 relative -mt-20 z-10 bg-[var(--color-primary-bg)] dark:bg-neutral-950 rounded-t-[32px] border-t border-[var(--color-glass)]">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[var(--color-primary-accent)] font-bold mb-2 block">
                    {selectedProject.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-typography)] tracking-tight">{selectedProject.title}</h3>
                </div>

                <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)]" />

                <p className="text-[15px] text-[var(--color-secondary-text)] font-light leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-3.5 py-1.5 text-[10px] font-semibold bg-neutral-950/5 dark:bg-[var(--color-glass)] border border-[var(--color-glass)] rounded-full text-[var(--color-secondary-text)] font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 pt-8 border-t border-[var(--color-glass)]">
                  <a 
                    href={selectedProject.demoUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="magnetic flex items-center space-x-2 px-6 py-3 bg-[var(--color-typography)] text-[var(--color-primary-bg)] font-bold rounded-full hover:scale-[1.03] transition-transform shadow-md cursor-pointer text-xs"
                  >
                    <FiExternalLink />
                    <span>Live Showcase</span>
                  </a>
                  <a 
                    href={selectedProject.codeUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="magnetic flex items-center space-x-2 px-6 py-3 bg-transparent border border-[var(--color-glass)] text-[var(--color-typography)] rounded-full hover:bg-neutral-950/5 dark:hover:bg-white/5 hover:scale-[1.03] transition-all cursor-pointer text-xs font-semibold"
                  >
                    <FiGithub />
                    <span>Specs Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
