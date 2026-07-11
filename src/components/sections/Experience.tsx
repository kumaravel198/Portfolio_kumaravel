import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';

const experiences = [
  {
    role: "Media & Creation / UI/UX Intern",
    company: "Intent",
    period: "Jan 2026 – Present",
    color: "var(--color-primary-accent)",
    description: [
      "Currently working on the startup company 'Intent' in the roles of Media & Creation and UI/UX.",
      "Designing creative media assets and visual presentation elements.",
      "Collaborating on branding strategies and digital content layout styles.",
      "Designing user-centric interfaces and layouts for web applications.",
      "Creating modern wireframes, prototypes, and digital asset templates."
    ],
    skills: ["Figma", "Branding", "UI/UX Layouts", "Prototyping", "Asset Design"]
  },
  {
    role: "Frontend Web Development Intern",
    company: "TechForge",
    period: "Sep 2025 – Dec 2025",
    color: "var(--color-highlight)",
    description: [
      "Developed responsive web pages and structured layouts.",
      "Improved UI consistency across dashboard analytics widgets.",
      "Optimized layout assets to improve paint speed and response times."
    ],
    skills: ["React", "CSS Grid", "Responsive Design", "Optimization"]
  },
  {
    role: "Cloud Computing Trainee",
    company: "ANP Softech",
    period: "Jun 2025 – Aug 2025",
    color: "var(--color-secondary-accent)",
    description: [
      "Studied structural cloud layers (IaaS, PaaS, SaaS) and deployments.",
      "Engineered automated cloud deployment workflows.",
      "Created virtual machine containers and managed routing logs."
    ],
    skills: ["Cloud Models", "Virtual Machines", "Deployment Logistics"]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      id="experience" 
      className="py-32 px-6 md:px-12 max-w-5xl mx-auto relative z-10" 
      ref={containerRef}
    >
      <div className="mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary-accent)] font-semibold mb-3 block font-mono"
        >
          [ PATH & MILESTONES ]
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-400"
        >
          Professional Journey
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-20 h-[1px] bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] mx-auto"
        />
      </div>

      <div className="relative ml-4 md:ml-6 mt-12">
        {/* Vertical Timeline Track Line */}
        <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-neutral-200 dark:bg-neutral-900 rounded-full" />
        
        {/* Scroll Progress Active Track Line */}
        <motion.div 
          style={{ scaleY }}
          className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[var(--color-primary-accent)] via-[var(--color-secondary-accent)] to-[var(--color-highlight)] origin-top rounded-full shadow-[0_0_8px_var(--color-primary-accent)]"
        />

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Marker Dot */}
              <div 
                className="absolute top-2.5 -left-[4.5px] w-2.5 h-2.5 rounded-full bg-[var(--color-primary-bg)] border-2 transition-all duration-500 group-hover:scale-125 z-10"
                style={{ 
                  borderColor: exp.color,
                  boxShadow: `0 0 8px ${exp.color}`
                }}
              />
              
              {/* Timeline Card */}
              <div className="relative rounded-[28px] bg-neutral-900/5 dark:bg-neutral-950/20 border border-[var(--color-glass)] p-6 md:p-8 overflow-hidden hover:border-[var(--color-primary-accent)]/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)]">
                {/* Subtle Ambient Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${exp.color}, transparent 60%)`
                  }}
                />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--color-typography)] leading-snug">{exp.role}</h3>
                    <h4 className="font-semibold text-sm mt-1.5" style={{ color: exp.color }}>{exp.company}</h4>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-3 py-1 rounded-full border border-[var(--color-glass)] bg-neutral-950/5 dark:bg-neutral-950/20 text-[var(--color-secondary-text)] self-start sm:self-auto shadow-sm">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-6 text-[13px] md:text-[14px] text-[var(--color-secondary-text)] leading-relaxed font-light">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-primary-accent)] shrink-0" style={{ backgroundColor: exp.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-glass)]">
                  {exp.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="text-[9px] font-semibold px-2.5 py-1 rounded-lg bg-neutral-950/5 dark:bg-neutral-950/40 border border-[var(--color-glass)] text-[var(--color-secondary-text)] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
