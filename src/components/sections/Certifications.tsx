import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiStar, FiFileText } from 'react-icons/fi';

const certifications = [
  { title: "Web Development Specialist", issuer: "TechForge", date: "2025" },
  { title: "Basics of Cloud Computing", issuer: "ANP Softech", date: "2025" }
];

const achievements = [
  { title: "Smart India Hackathon Team Lead", description: "SIH Finalist - Led an engineering team to design and build product prototypes." },
  { title: "Hackathon Finalist Mentor", description: "ICT Academy - Mentored peers on prototyping and frontend design patterns." },
  { title: "Bootcamp Teaching Member", description: "Mentored 50+ students in front-end design and React systems." },
  { title: "Support Developer", description: "Intent Startup - Designed visual graphics assets and UI elements." }
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-28 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Certifications Column */}
        <div className="space-y-10">
          <div className="mb-8">
            <span className="text-xs font-mono text-[var(--color-primary-accent)] tracking-[0.25em] uppercase mb-3 block font-bold">
              [ VERIFIED CREDENTIALS ]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-typography)]">
              Certifications
            </h2>
            <div className="w-16 h-[1.5px] bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)] mt-4" />
          </div>
          
          <div className="space-y-5">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center p-6 bg-[var(--color-cards)] border border-[var(--color-glass)] rounded-[24px] hover:border-[var(--color-primary-accent)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-500 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-neutral-950/60 border border-[var(--color-glass)] flex items-center justify-center mr-6 group-hover:scale-110 group-hover:border-[var(--color-primary-accent)] transition-all duration-300 shadow-md">
                  <FiFileText className="text-[var(--color-secondary-text)] group-hover:text-[var(--color-primary-accent)] transition-colors duration-300" size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[var(--color-typography)] transition-colors duration-300">{cert.title}</h3>
                    <span className="text-[10px] font-mono text-neutral-500">{cert.date}</span>
                  </div>
                  <p className="text-xs font-semibold font-mono text-[var(--color-highlight)] mt-1">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Column */}
        <div className="space-y-10">
          <div className="mb-8">
            <span className="text-xs font-mono text-[var(--color-highlight)] tracking-[0.25em] uppercase mb-3 block font-bold">
              [ MILESTONES & HONORS ]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-typography)]">
              Achievements
            </h2>
            <div className="w-16 h-[1.5px] bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-primary-accent)] mt-4" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {achievements.map((achievement, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + (0.12 * idx), ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 bg-[var(--color-cards)] border border-[var(--color-glass)] rounded-[28px] overflow-hidden hover:border-[var(--color-highlight)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-500"
              >
                {/* Embedded watermark badge */}
                <div className="absolute -right-6 -top-6 text-[var(--color-glass)] group-hover:text-[rgba(255,0,85,0.03)] group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                  <FiAward size={90} />
                </div>
                
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="space-y-2.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-950/40 border border-[var(--color-glass)] flex items-center justify-center shadow-inner group-hover:border-[var(--color-highlight)] transition-colors">
                      <FiStar className="text-[var(--color-highlight)]" size={14} />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[var(--color-highlight)] transition-colors duration-300 leading-snug">{achievement.title}</h3>
                  </div>
                  <p className="text-neutral-500 text-xs font-light mt-4 leading-relaxed group-hover:text-neutral-400 transition-colors duration-300">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
