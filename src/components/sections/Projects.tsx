import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: "Automated Gmail Inbox Cleanup",
    subtitle: "n8n Automation Workflow",
    description: "Built an intelligent automation workflow to organize emails, identify spam and promotional messages, reduce manual effort, and generate summary reports.",
    tech: ["n8n", "Automation", "Email Processing"],
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=2070&auto=format&fit=crop",
    demoUrl: "https://github.com/kumaravel-k-3904192a8",
    codeUrl: "https://github.com/kumaravel-k-3904192a8"
  },
  {
    id: 2,
    title: "Face Recognition Attendance",
    subtitle: "Computer Vision System",
    description: "Developed a real-time attendance system using face recognition technology with approximately 90% recognition accuracy and automated attendance logging.",
    tech: ["Python", "OpenCV", "Face Recognition", "Image Processing"],
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=2234&auto=format&fit=crop",
    demoUrl: "https://github.com/kumaravel-k-3904192a8",
    codeUrl: "https://github.com/kumaravel-k-3904192a8"
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Selected Works
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[1px] bg-[var(--color-primary-accent)] origin-left"
          />
        </div>
      </div>

      <div className="space-y-24">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 * idx }}
            className="group cursor-pointer relative"
            onClick={() => setSelectedId(project.id)}
          >
            <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
              
              {/* Image Container */}
              <div className="w-full lg:w-3/5 overflow-hidden rounded-2xl relative aspect-video bg-[var(--color-cards)] border border-[var(--color-glass)]">
                <div className="absolute inset-0 bg-[var(--color-primary-bg)] opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10 mix-blend-color" />
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Text Container */}
              <div className="w-full lg:w-2/5 space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold group-hover:text-[var(--color-highlight)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--color-primary-accent)] uppercase tracking-widest text-sm font-mono">
                  {project.subtitle}
                </p>
                <p className="text-[var(--color-secondary-text)] text-lg leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-xs border border-[var(--color-glass)] rounded-full text-[var(--color-secondary-text)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Popup */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              layoutId={`project-${selectedProject.id}`}
              className="bg-[var(--color-secondary-bg)] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[var(--color-glass)] relative"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="magnetic absolute top-6 right-6 z-50 p-4 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-[var(--color-highlight)]"
              >
                <FiX size={24} />
              </button>

              <div className="w-full h-64 md:h-[400px] relative">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary-bg)] to-transparent" />
              </div>

              <div className="p-8 md:p-16 space-y-8 relative -mt-32 z-10">
                <div>
                  <h3 className="text-4xl md:text-6xl font-bold mb-4">{selectedProject.title}</h3>
                  <p className="text-[var(--color-primary-accent)] uppercase tracking-widest font-mono">{selectedProject.subtitle}</p>
                </div>

                <div className="w-24 h-[1px] bg-[var(--color-glass)]" />

                <p className="text-xl text-[var(--color-secondary-text)] leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-4 py-2 text-sm bg-[var(--color-cards)] border border-[var(--color-glass)] rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 pt-8">
                  <a 
                    href={selectedProject.demoUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="magnetic flex items-center space-x-2 px-6 py-3 bg-[var(--color-typography)] text-[var(--color-primary-bg)] font-semibold rounded-full hover:scale-105 transition-transform shadow-md cursor-pointer"
                  >
                    <FiExternalLink />
                    <span>Live Demo</span>
                  </a>
                  <a 
                    href={selectedProject.codeUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="magnetic flex items-center space-x-2 px-6 py-3 bg-transparent border border-[var(--color-soft-divider)] text-[var(--color-typography)] rounded-full hover:bg-[var(--color-cards)] hover:scale-105 transition-all cursor-pointer"
                  >
                    <FiGithub />
                    <span>Source Code</span>
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
