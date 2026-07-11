import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, animate } from 'framer-motion';

const highlights = [
  "Final Year IT Student",
  "Problem Solver",
  "Creative Designer",
  "Design Systems Architect",
  "Performance Optimizer"
];

const stats = [
  { label: "CGPA Score", value: "8.00", suffix: "" },
  { label: "Selected Works", value: "2", suffix: "+" },
  { label: "Internships", value: "3", suffix: "" },
  { label: "Accredited Certs", value: "2", suffix: "" },
  { label: "Academic Cycle", value: "2023", suffix: "–27" }
];

function StatCounter({ value, label, suffix }: { value: string, label: string, suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) {
      setCount(value);
      return;
    }

    const isDecimal = value.includes('.');
    const decimalPlaces = isDecimal ? value.split('.')[1].length : 0;
    
    const controls = animate(0, numericValue, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // premium cubic-bezier ease out
      onUpdate: (latest) => {
        setCount(latest.toFixed(decimalPlaces));
      }
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div 
      ref={ref}
      className="flex flex-col items-start p-6 md:p-8 bg-neutral-900/5 dark:bg-neutral-950/20 backdrop-blur-md border border-[var(--color-glass)] rounded-[24px] hover:border-[var(--color-primary-accent)]/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group select-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)]/5 to-[var(--color-highlight)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <h4 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-400 font-mono tracking-tighter">
        {count}{suffix}
      </h4>
      <p className="text-[var(--color-secondary-text)] text-[9px] mt-2.5 uppercase tracking-[0.25em] font-semibold">{label}</p>
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
    <section id="about" className="py-36 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & Storytelling (Takes 7 columns on desktop) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15 } }
          }}
          initial="hidden"
          animate={controls}
          className="lg:col-span-7 space-y-8"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-4">
            <span className="text-xs font-mono text-[var(--color-highlight)] tracking-[0.25em] uppercase block font-bold">
              [ CHAPTER 01 : THE VISION ]
            </span>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-400">
              More than just code.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)]">Crafting experiences.</span>
            </h3>
            <p className="text-[15px] md:text-[16px] text-[var(--color-secondary-text)] leading-relaxed font-light max-w-xl">
              Motivated and adaptable final-year B.Tech Information Technology student with strong knowledge in programming, web development, automation, and data analysis. Passionate about building innovative digital products, solving real-world problems, and continuously learning emerging technologies.
            </p>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.98 }, visible: { opacity: 1, scale: 1 } }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {highlights.map((highlight, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 text-[11px] font-semibold rounded-full bg-[var(--color-glass)] border border-[var(--color-soft-divider)] hover:border-[var(--color-highlight)]/55 hover:text-[var(--color-highlight)] hover:shadow-[0_4px_12px_rgba(255,0,85,0.05)] transition-all duration-300 cursor-default select-none font-mono"
              >
                {highlight}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Stats Grid (Takes 5 columns on desktop) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } }
          }}
          initial="hidden"
          animate={controls}
          className="lg:col-span-5 grid grid-cols-2 gap-4"
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
