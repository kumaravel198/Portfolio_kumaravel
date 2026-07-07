import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: "Programming",
    skills: ["Python", "SQL", "HTML", "CSS", "JavaScript", "Basic Java"]
  },
  {
    title: "Data Analytics",
    skills: ["Data Cleaning", "EDA", "Data Processing", "Power BI", "Excel Dashboards"]
  },
  {
    title: "Development",
    skills: ["React", "GitHub", "VS Code"]
  },
  {
    title: "Automation",
    skills: ["n8n", "Workflow Automation"]
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Technical Arsenal
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-[1px] bg-[var(--color-primary-accent)] mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * idx }}
            className="group relative p-8 rounded-2xl bg-[var(--color-cards)] border border-[var(--color-glass)] overflow-hidden hover:border-[var(--color-primary-accent)] transition-colors duration-500"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)] to-[var(--color-highlight)] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            
            <h3 className="text-xl font-bold mb-6 text-[var(--color-typography)] group-hover:text-[var(--color-highlight)] transition-colors">
              {category.title}
            </h3>
            
            <ul className="space-y-3 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-center text-[var(--color-secondary-text)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-accent)] mr-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm tracking-wide">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
