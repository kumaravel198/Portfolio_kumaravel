import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  "Video Editing",
  "Full Stack Development",
  "Web Development",
  "Portfolio Design",
  "Automation Solutions",
  "Dashboard Development",
  "Data Analytics",
  "AI Integration"
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Capabilities
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-[1px] bg-[var(--color-primary-accent)] mx-auto"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {services.map((service, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * idx }}
            className="group relative h-40 md:h-48 flex items-center justify-center p-6 bg-[var(--color-cards)] border border-[var(--color-glass)] rounded-2xl hover:border-[var(--color-primary-accent)] transition-colors duration-500 cursor-default overflow-hidden"
          >
            {/* Animated Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-accent)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 translate-y-full group-hover:translate-y-0" />
            
            <h3 className="text-center font-bold text-lg md:text-xl text-[var(--color-secondary-text)] group-hover:text-white transition-colors relative z-10">
              {service}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
