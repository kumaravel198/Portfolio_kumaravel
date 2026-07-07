import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiFileText, FiStar } from 'react-icons/fi';

const certifications = [
  { title: "Web Development", issuer: "TechForge" },
  { title: "Basics of Cloud Computing", issuer: "ANP Softech" }
];

const achievements = [
  { title: "Smart India Hackathon Team Lead", description: "SIH Finalist" },
  { title: "SIH Finalist", description: "ICT Academy" },
  { title: "Bootcamp Teaching Member", description: "Mentored peers in technical skills" },
  { title: "Support Developer", description: "Intent startup support developer" }
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Certifications */}
        <div>
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Certifications
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-[1px] bg-[var(--color-primary-accent)]"
            />
          </div>
          
          <div className="space-y-6">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * idx }}
                className="group flex items-center p-6 bg-[var(--color-cards)] border border-[var(--color-glass)] rounded-2xl hover:border-[var(--color-highlight)] transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary-bg)] border border-[var(--color-glass)] flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                  <FiFileText className="text-[var(--color-secondary-text)] group-hover:text-[var(--color-highlight)] transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-white text-[var(--color-secondary-text)] transition-colors">{cert.title}</h3>
                  <p className="text-sm font-mono text-[var(--color-primary-accent)] mt-1">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Achievements
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-16 h-[1px] bg-[var(--color-highlight)]"
            />
          </div>
          
          <div className="space-y-6">
            {achievements.map((achievement, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + (0.2 * idx) }}
                className="group relative p-8 bg-gradient-to-br from-[var(--color-cards)] to-[var(--color-primary-bg)] border border-[var(--color-glass)] rounded-2xl overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 text-[var(--color-glass)] group-hover:text-[rgba(0,229,255,0.05)] transition-colors duration-500">
                  <FiStar size={120} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[var(--color-highlight)] mb-2">{achievement.title}</h3>
                  <p className="text-[var(--color-secondary-text)] tracking-widest uppercase text-sm">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
