import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FiAward, FiBookOpen, FiCode } from 'react-icons/fi';

const education = [
  {
    degree: "B.Tech Information Technology",
    institution: "K.S.R College of Engineering and Technology",
    score: "CGPA 8.00",
    year: "2023–2027",
    description: "Currently in the final year of B.Tech Information Technology. Specializing in Software Engineering, Web Development, and Advanced AI architectures. Actively building projects and participating in technical hackathons.",
    skills: ["React & Node.js", "AI & ML", "Data Structures", "Tailwind CSS"],
    icon: <FiCode className="text-[var(--color-highlight)] transition-colors duration-300 group-hover:text-white" size={18} />,
    color: "var(--color-highlight)"
  },
  {
    degree: "Higher Secondary Education",
    institution: "Sree Saravana Niketan MHSS",
    score: "74%",
    year: "2021–2023",
    description: "Focused on Mathematics, Physics, Chemistry, and Computer Science. Built a strong analytical foundation and coding fundamentals.",
    skills: ["Python", "Mathematics", "Physics"],
    icon: <FiBookOpen className="text-[var(--color-primary-accent)] transition-colors duration-300 group-hover:text-white" size={18} />,
    color: "var(--color-primary-accent)"
  },
  {
    degree: "SSLC (Secondary School Leaving Certificate)",
    institution: "Brindavan Matriculation School",
    score: "100%",
    year: "2020–2021",
    description: "Completed secondary school with a perfect 100% score, laying down a strong baseline in logical reasoning and science.",
    skills: ["Science", "Mathematics", "Logic Foundations"],
    icon: <FiAward className="text-[var(--color-secondary-accent)] transition-colors duration-300 group-hover:text-white" size={18} />,
    color: "var(--color-secondary-accent)"
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const trackerY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      id="education" 
      className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 overflow-hidden" 
      ref={containerRef}
    >
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-primary-accent)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[var(--color-highlight)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="mb-24 text-center relative">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary-accent)] font-semibold mb-3 block font-mono"
        >
          My Academic Path
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-400"
        >
          Timeline
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-20 h-[1px] bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] mx-auto"
        />
      </div>

      {/* Timeline Layout */}
      <div className="relative mt-12">
        {/* Central timeline track - Background Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1px] bg-neutral-200 dark:bg-neutral-900 -translate-x-1/2 rounded-full" />
        
        {/* Central timeline track - Active Scroll Glowing Line */}
        <motion.div 
          style={{ scaleY }}
          className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[var(--color-primary-accent)] via-[var(--color-secondary-accent)] to-[var(--color-highlight)] -translate-x-1/2 origin-top rounded-full shadow-[0_0_12px_var(--color-highlight)]"
        />

        {/* Scroll Tracker Dot */}
        <motion.div
          style={{ top: trackerY }}
          className="absolute left-6 md:left-1/2 w-3.5 h-3.5 rounded-full bg-[var(--color-highlight)] -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_12px_rgba(0,229,255,0.8)] pointer-events-none"
        />

        {/* Timeline Rows */}
        <div className="space-y-16 relative">
          {education.map((edu, idx) => {
            const isEven = idx % 2 === 1;
            
            return (
              <div key={idx} className="relative flex flex-col md:grid md:grid-cols-9 gap-8 items-center group">
                {/* Desktop Left Side / Mobile Empty */}
                <div className={`col-span-4 w-full flex ${isEven ? 'md:justify-end order-3 md:order-1' : 'order-3 md:order-1 md:opacity-0 md:pointer-events-none md:select-none'}`}>
                  {!isEven && (
                    <div className="hidden md:block w-full h-full" />
                  )}
                  {isEven && <TimelineCard edu={edu} index={idx} align="right" />}
                </div>

                {/* Center Node / Bullet */}
                <div className="col-span-1 flex justify-center items-center z-10 order-1 md:order-2 absolute left-6 md:relative md:left-auto top-1/2 md:top-auto -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0">
                  <TimelineMarker edu={edu} />
                </div>

                {/* Desktop Right Side / Mobile Card */}
                <div className={`col-span-4 w-full flex ${isEven ? 'order-3 md:opacity-0 md:pointer-events-none md:select-none' : 'order-3'}`}>
                  {isEven && (
                    <div className="hidden md:block w-full h-full" />
                  )}
                  {!isEven && <TimelineCard edu={edu} index={idx} align="left" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Subcomponent: Timeline Card
function TimelineCard({ edu, index, align }: { edu: typeof education[0]; index: number; align: 'left' | 'right' }) {
  const isRightAlign = align === 'right';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isRightAlign ? -30 : 30, y: 15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.1, delay: index * 0.1 }}
      className="relative w-[calc(100%-2.5rem)] ml-10 md:ml-0 md:w-full bg-neutral-900/5 dark:bg-neutral-950/20 border border-[var(--color-glass)] p-6 md:p-8 rounded-[28px] overflow-hidden hover:border-[var(--color-primary-accent)]/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.35)] group/card hover:-translate-y-1"
    >
      {/* Glow overlay on card hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover/card:opacity-[0.03] transition-opacity duration-700 pointer-events-none" 
        style={{
          background: `radial-gradient(circle at 50% 50%, ${edu.color}, transparent 60%)`
        }}
      />
      
      {/* Light highlights on top right corner */}
      <div 
        className="absolute top-0 right-0 w-24 h-[1px] opacity-10 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{
          background: `linear-gradient(90deg, transparent, ${edu.color})`
        }}
      />
      <div 
        className="absolute top-0 right-0 w-[1px] h-24 opacity-10 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{
          background: `linear-gradient(180deg, ${edu.color}, transparent)`
        }}
      />

      {/* Date badge and title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <span 
            className="text-[9px] font-semibold px-3.5 py-1 rounded-full border bg-neutral-950/5 dark:bg-neutral-950/40 mb-2 inline-block font-mono"
            style={{ 
              color: edu.color,
              borderColor: `rgba(${edu.color === 'var(--color-highlight)' ? '0, 229, 255' : edu.color === 'var(--color-primary-accent)' ? '124, 58, 237' : '59, 130, 246'}, 0.2)`
            }}
          >
            {edu.year}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-typography)] leading-snug">
            {edu.degree}
          </h3>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0 self-start sm:self-auto">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Score:</span>
          <span 
            className="text-lg md:text-xl font-bold font-mono"
            style={{ color: edu.color }}
          >
            {edu.score}
          </span>
        </div>
      </div>

      {/* Institution */}
      <h4 className="text-sm font-semibold text-neutral-400 flex items-center mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mr-2 shrink-0" />
        {edu.institution}
      </h4>

      {/* Details Description */}
      <p className="text-[13px] md:text-[14px] text-[var(--color-secondary-text)] leading-relaxed mb-6 group-hover/card:text-[var(--color-secondary-text)] transition-colors duration-300 font-light">
        {edu.description}
      </p>

      {/* Skill Badges */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-glass)]">
        {edu.skills.map((skill, sIdx) => (
          <span 
            key={sIdx} 
            className="text-[9px] px-2.5 py-1 rounded-lg bg-neutral-950/5 dark:bg-neutral-950/40 border border-[var(--color-glass)] text-[var(--color-secondary-text)] font-semibold font-mono transition-colors duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// Subcomponent: Timeline Marker / Circle Node
function TimelineMarker({ edu }: { edu: typeof education[0] }) {
  return (
    <motion.div 
      initial={{ scale: 0.7, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
    >
      <div 
        className="absolute w-12 h-12 rounded-full opacity-0 group-hover:opacity-10 group-hover:animate-ping duration-1000 transition-all pointer-events-none"
        style={{ backgroundColor: edu.color }}
      />

      <div 
        className="absolute w-10 h-10 rounded-full border border-[var(--color-glass)] bg-neutral-100 dark:bg-neutral-900/90 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-neutral-500 shadow-md group-hover:scale-105"
        style={{
          boxShadow: `0 0 10px rgba(0,0,0,0.1)`
        }}
      >
        <div 
          className="w-7.5 h-7.5 rounded-full bg-[var(--color-primary-bg)] dark:bg-neutral-950 flex items-center justify-center transition-all duration-300"
          style={{
            boxShadow: `inset 0 0 6px rgba(0,0,0,0.05)`
          }}
        >
          {edu.icon}
        </div>
      </div>
    </motion.div>
  );
}
