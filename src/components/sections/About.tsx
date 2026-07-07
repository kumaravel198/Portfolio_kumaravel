import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const highlights = [
  "Problem Solver",
  "Creative Thinker",
  "Fast Learner",
  "Technology Explorer",
  "Detail Oriented"
];

const stats = [
  { label: "CGPA", value: "8.00", suffix: "" },
  { label: "Projects", value: "2", suffix: "+" },
  { label: "Internships", value: "3", suffix: "" },
  { label: "Certifications", value: "2", suffix: "" },
  { label: "Timeline", value: "2023", suffix: "-27" }
];

function StatCounter({ value, label, suffix }: { value: string, label: string, suffix: string }) {
  // Simple fade-up for stat counter for now
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[var(--color-cards)] border border-[var(--color-glass)] rounded-2xl hover:border-[var(--color-primary-accent)] transition-colors duration-300">
      <h4 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-secondary-text)]">
        {value}{suffix}
      </h4>
      <p className="text-[var(--color-secondary-text)] text-sm mt-2 uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Text & Storytelling */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
          }}
          initial="hidden"
          animate={controls}
          className="space-y-8"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h2 className="text-sm font-mono text-[var(--color-highlight)] tracking-widest uppercase mb-4">
              [ Chapter 01 ]
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              More than just code.<br />
              <span className="text-[var(--color-secondary-text)]">Crafting experiences.</span>
            </h3>
            <p className="text-lg text-[var(--color-secondary-text)] leading-relaxed">
              Motivated and adaptable B.Tech Information Technology student with strong knowledge in programming, web development, automation, and data analysis. Passionate about building innovative digital products, solving real-world problems, and continuously learning emerging technologies.
            </p>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex flex-wrap gap-3"
          >
            {highlights.map((highlight, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 text-sm rounded-full bg-[var(--color-glass)] border border-[var(--color-soft-divider)] hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)] transition-colors cursor-default"
              >
                {highlight}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Stats Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } }
          }}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 gap-4 md:gap-6"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className={idx === stats.length - 1 ? "col-span-2" : "col-span-1"}>
              <StatCounter {...stat} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
