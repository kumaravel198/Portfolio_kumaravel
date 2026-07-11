import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 85 },
      { name: "SQL", level: 80 },
      { name: "HTML & CSS", level: 92 },
      { name: "JavaScript", level: 85 },
      { name: "Basic Java", level: 70 }
    ]
  },
  {
    title: "Data & Analytics",
    skills: [
      { name: "Data Cleaning", level: 88 },
      { name: "Exploratory Data Analysis (EDA)", level: 85 },
      { name: "Data Processing", level: 82 }
    ]
  },
  {
    title: "Data Visualization",
    skills: [
      { name: "Power BI", level: 88 },
      { name: "Excel Dashboards", level: 90 }
    ]
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "GitHub & Git", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "n8n Automation", level: 82 }
    ]
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary-accent)] font-semibold mb-3 block font-mono"
        >
          [ THE TOOLKIT ]
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-400"
        >
          Technical Arsenal
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-20 h-[1px] bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-8 rounded-[28px] bg-neutral-900/5 dark:bg-neutral-950/20 border border-[var(--color-glass)] overflow-hidden hover:border-[var(--color-primary-accent)]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-all duration-500 flex flex-col justify-between"
          >
            {/* Ambient Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)]/5 to-[var(--color-highlight)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10 space-y-7 w-full">
              <h3 className="text-lg font-bold text-[var(--color-typography)] group-hover:text-[var(--color-primary-accent)] transition-colors duration-300">
                {category.title}
              </h3>
              
              <div className="space-y-5">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-mono text-[var(--color-secondary-text)] group-hover:text-[var(--color-typography)] transition-colors">
                      <span className="truncate tracking-tight font-medium">{skill.name}</span>
                      <span className="font-semibold text-[var(--color-primary-accent)]">{skill.level}%</span>
                    </div>
                    {/* Extremely Sleek Thin Progress Track */}
                    <div className="h-[2px] w-full rounded-full bg-neutral-200 dark:bg-neutral-800/80 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.15 + (0.05 * sIdx),
                          type: "spring", 
                          stiffness: 55, 
                          damping: 15 
                        }}
                        className="h-full bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] rounded-full absolute top-0 left-0 shadow-[0_0_8px_rgba(79,70,229,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
