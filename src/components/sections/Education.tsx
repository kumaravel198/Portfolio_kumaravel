import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FiAward, FiBookOpen, FiCode } from 'react-icons/fi';

const education = [
  {
    degree: "B.Tech Information Technology",
    institution: "K.S.R College of Engineering and Technology",
    score: "CGPA 8.00",
    year: "2023–2027",
    description: "Specializing in Software Engineering, Web Development, and Advanced AI architectures. Actively building projects and participating in technical hackathons.",
    skills: ["React & Node.js", "AI & ML", "Data Structures", "Tailwind CSS"],
    icon: <FiCode className="text-[var(--color-highlight)] transition-colors duration-300 group-hover:text-white" size={20} />,
    color: "var(--color-highlight)"
  },
  {
    degree: "Higher Secondary Education",
    institution: "Sree Saravana Niketan MHSS",
    score: "74%",
    year: "2021–2023",
    description: "Focused on Mathematics, Physics, Chemistry, and Computer Science. Built a strong analytical foundation and coding fundamentals.",
    skills: ["Python", "Mathematics", "Physics"],
    icon: <FiBookOpen className="text-[var(--color-primary-accent)] transition-colors duration-300 group-hover:text-white" size={20} />,
    color: "var(--color-primary-accent)"
  },
  {
    degree: "SSLC (Secondary School Leaving Certificate)",
    institution: "Brindavan Matriculation School",
    score: "100%",
    year: "2020–2021",
    description: "Completed secondary school with a perfect 100% score, laying down a strong baseline in logical reasoning and science.",
    skills: ["Science", "Mathematics", "Logic Foundations"],
    icon: <FiAward className="text-[var(--color-secondary-accent)] transition-colors duration-300 group-hover:text-white" size={20} />,
    color: "var(--color-secondary-accent)"
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this section's position in viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Maps scroll progress to top percentage for the glowing tracker dot
  const trackerY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      id="education" 
      className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 overflow-hidden" 
      ref={containerRef}
    >
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-primary-accent)]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[var(--color-highlight)]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="mb-24 text-center relative">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary-accent)] font-semibold mb-3 block"
        >
          My Academic Path
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400"
        >
          Timeline
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-32 h-[2px] bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] mx-auto"
        />
      </div>

      {/* Timeline Layout */}
      <div className="relative mt-12">
        {/* Central timeline track - Background Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-neutral-900 -translate-x-1/2 rounded-full" />
        
        {/* Central timeline track - Active Scroll Glowing Line */}
        <motion.div 
          style={{ scaleY }}
          className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[var(--color-primary-accent)] via-[var(--color-secondary-accent)] to-[var(--color-highlight)] -translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_var(--color-highlight)]"
        />

        {/* Scroll Tracker Dot */}
        <motion.div
          style={{ top: trackerY }}
          className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[var(--color-highlight)] -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_15px_rgba(0,229,255,0.8),0_0_30px_rgba(0,229,255,0.4)] pointer-events-none"
        />

        {/* Timeline Rows */}
        <div className="space-y-20 relative">
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
      initial={{ opacity: 0, x: isRightAlign ? -40 : 40, y: 15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, type: 'spring', bounce: 0.15, delay: index * 0.1 }}
      className="relative w-[calc(100%-2.5rem)] ml-10 md:ml-0 md:w-full bg-gradient-to-b from-[var(--color-cards)] to-[var(--color-secondary-bg)] border border-[var(--color-glass)] p-8 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] group/card"
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <span 
            className="text-xs font-semibold px-3 py-1 rounded-full border bg-[var(--color-primary-bg)]/70 mb-2 inline-block font-mono"
            style={{ 
              color: edu.color,
              borderColor: `rgba(${edu.color === 'var(--color-highlight)' ? '0, 229, 255' : edu.color === 'var(--color-primary-accent)' ? '124, 58, 237' : '59, 130, 246'}, 0.2)`
            }}
          >
            {edu.year}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-typography)] group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-[var(--color-typography)] group-hover/card:to-neutral-400 transition-all duration-300">
            {edu.degree}
          </h3>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0 self-start sm:self-auto">
          <span className="text-xs uppercase tracking-wider text-neutral-500">Score:</span>
          <span 
            className="text-xl md:text-2xl font-bold font-mono"
            style={{ color: edu.color }}
          >
            {edu.score}
          </span>
        </div>
      </div>

      {/* Institution */}
      <h4 className="text-sm font-semibold text-neutral-400 flex items-center mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mr-2 shrink-0" />
        {edu.institution}
      </h4>

      {/* Details Description */}
      <p className="text-neutral-500 text-sm leading-relaxed mb-6 group-hover/card:text-neutral-400 transition-colors duration-300">
        {edu.description}
      </p>

      {/* Skill Badges */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-900/60">
        {edu.skills.map((skill, sIdx) => (
          <span 
            key={sIdx} 
            className="text-xs px-2.5 py-1 rounded-lg bg-neutral-950/80 border border-neutral-800/60 text-neutral-400 font-medium group-hover/card:border-neutral-800 transition-colors duration-300"
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
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="relative w-12 h-12 flex items-center justify-center cursor-pointer"
    >
      {/* Outer Pulse glow on row hover */}
      <div 
        className="absolute w-14 h-14 rounded-full opacity-0 group-hover:opacity-10 group-hover:animate-ping duration-1000 transition-all pointer-events-none"
        style={{ backgroundColor: edu.color }}
      />

      {/* Outer Border ring */}
      <div 
        className="absolute w-12 h-12 rounded-full border border-[var(--color-glass)] bg-[var(--color-cards)] flex items-center justify-center z-10 transition-all duration-500 group-hover:border-neutral-500 shadow-xl group-hover:scale-110"
        style={{
          boxShadow: `0 0 15px rgba(0,0,0,0.15)`
        }}
      >
        {/* Inner core */}
        <div 
          className="w-9 h-9 rounded-full bg-[var(--color-primary-bg)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--color-secondary-bg)]"
          style={{
            boxShadow: `inset 0 0 8px rgba(0,0,0,0.1)`
          }}
        >
          {edu.icon}
        </div>
      </div>
    </motion.div>
  );
}
