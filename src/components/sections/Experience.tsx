import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    role: "Media & Creation / UI/UX Intern",
    company: "Intent",
    description: [
      "Currently working on the startup company 'Intent' in the roles of Media & Creation and UI/UX.",
      "Designing creative media assets and visual presentation elements.",
      "Collaborating on branding strategies and digital content layout styles.",
      "Designing user-centric interfaces and layouts for web applications.",
      "Creating modern wireframes, prototypes, and digital asset templates."
    ]
  },
  {
    role: "Frontend Web Development Intern",
    company: "TechForge",
    description: [
      "Developed responsive web pages.",
      "Improved UI consistency.",
      "Optimized layouts."
    ]
  },
  {
    role: "Cloud Computing Trainee",
    company: "ANP Softech",
    description: [
      "Learned IaaS, PaaS, SaaS.",
      "Cloud deployment workflow.",
      "Virtual machine setup."
    ]
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10" ref={ref}>
      <div className="mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Professional Journey
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-[1px] bg-[var(--color-primary-accent)] mx-auto"
        />
      </div>

      <div className="relative border-l border-[var(--color-glass)] ml-4 md:ml-0 space-y-16">
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 * idx }}
            className="relative pl-8 md:pl-16"
          >
            {/* Timeline Dot */}
            <div className="absolute top-0 -left-[9px] md:-left-[9px] w-4 h-4 rounded-full bg-[var(--color-primary-bg)] border-2 border-[var(--color-primary-accent)] shadow-[0_0_10px_var(--color-primary-accent)]" />
            
            <div className="bg-[var(--color-cards)] border border-[var(--color-glass)] p-8 rounded-2xl relative overflow-hidden group hover:border-[var(--color-primary-accent)] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)] to-[var(--color-highlight)] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{exp.role}</h3>
              <h4 className="text-[var(--color-highlight)] font-mono mb-6">{exp.company}</h4>
              
              <ul className="space-y-3">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start text-[var(--color-secondary-text)]">
                    <span className="text-[var(--color-primary-accent)] mr-3 mt-1">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
