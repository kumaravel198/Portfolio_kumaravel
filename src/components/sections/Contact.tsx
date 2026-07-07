import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiDownload, FiLinkedin, FiGithub, FiMail, FiPhone } from 'react-icons/fi';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info & Links */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-[var(--color-secondary-text)]">
              Let's create <br/> something epic.
            </h2>
            <p className="text-xl text-[var(--color-secondary-text)] max-w-md">
              Available for freelance opportunities and full-time roles. Let's discuss your next big project.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <a href="mailto:kumaravel.kv198@gmail.com" className="magnetic flex items-center space-x-4 text-xl hover:text-[var(--color-highlight)] transition-colors w-max">
              <span className="w-12 h-12 rounded-full border border-[var(--color-glass)] flex items-center justify-center bg-[var(--color-cards)]">
                <FiMail />
              </span>
              <span>kumaravel.kv198@gmail.com</span>
            </a>
            
            <a href="tel:+916380499804" className="magnetic flex items-center space-x-4 text-xl hover:text-[var(--color-highlight)] transition-colors w-max">
              <span className="w-12 h-12 rounded-full border border-[var(--color-glass)] flex items-center justify-center bg-[var(--color-cards)]">
                <FiPhone />
              </span>
              <span>+91 63804 99804</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-4 pt-8">
            <a 
              href="https://linkedin.com/in/kumaravel-k-3904192a8" 
              target="_blank" 
              rel="noreferrer" 
              className="magnetic flex items-center space-x-2 px-6 py-3 bg-[var(--color-cards)] border border-[var(--color-glass)] rounded-full hover:bg-[var(--color-secondary-bg)] transition-colors cursor-pointer"
            >
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com/kumaravel198" 
              target="_blank" 
              rel="noreferrer" 
              className="magnetic flex items-center space-x-2 px-6 py-3 bg-[var(--color-cards)] border border-[var(--color-glass)] rounded-full hover:bg-[var(--color-secondary-bg)] transition-colors cursor-pointer"
            >
              <FiGithub />
              <span>GitHub</span>
            </a>
            <a 
              href="/resume.pdf" 
              download="Kumaravel_K_Resume.pdf" 
              className="magnetic flex items-center space-x-2 px-6 py-3 bg-[var(--color-primary-accent)] text-white rounded-full hover:opacity-90 transition-all cursor-pointer shadow-md"
            >
              <FiDownload />
              <span>Resume</span>
            </a>
          </div>
        </motion.div>

        {/* Contact Form / Success State */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[var(--color-cards)] border border-[var(--color-glass)] p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[400px]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)]" />
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-typography)]">Message Sent!</h3>
              <p className="text-[var(--color-secondary-text)] max-w-sm">
                Thank you for reaching out, Kumaravel. Your message has been received, and I will get back to you as soon as possible!
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="magnetic px-6 py-2 border border-[var(--color-glass)] text-[var(--color-typography)] rounded-full hover:bg-[var(--color-secondary-bg)] transition-colors text-sm font-semibold cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[var(--color-cards)] border border-[var(--color-glass)] p-8 md:p-12 rounded-3xl space-y-8 relative overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)]" />
              
              <div className="relative group">
                <input type="text" id="name" required className="w-full bg-transparent border-b border-[var(--color-glass)] py-4 outline-none focus:border-[var(--color-primary-accent)] transition-colors peer placeholder-transparent text-[var(--color-typography)]" placeholder="Name" />
                <label htmlFor="name" className="absolute left-0 top-4 text-[var(--color-secondary-text)] text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--color-primary-accent)] peer-valid:-top-4 peer-valid:text-xs">
                  Your Name
                </label>
              </div>

              <div className="relative group">
                <input type="email" id="email" required className="w-full bg-transparent border-b border-[var(--color-glass)] py-4 outline-none focus:border-[var(--color-primary-accent)] transition-colors peer placeholder-transparent text-[var(--color-typography)]" placeholder="Email" />
                <label htmlFor="email" className="absolute left-0 top-4 text-[var(--color-secondary-text)] text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--color-primary-accent)] peer-valid:-top-4 peer-valid:text-xs">
                  Your Email
                </label>
              </div>

              <div className="relative group">
                <textarea id="message" required rows={4} className="w-full bg-transparent border-b border-[var(--color-glass)] py-4 outline-none focus:border-[var(--color-primary-accent)] transition-colors peer placeholder-transparent resize-none text-[var(--color-typography)]" placeholder="Message" />
                <label htmlFor="message" className="absolute left-0 top-4 text-[var(--color-secondary-text)] text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--color-primary-accent)] peer-valid:-top-4 peer-valid:text-xs">
                  Your Message
                </label>
              </div>

              <button type="submit" className="magnetic w-full py-4 bg-[var(--color-typography)] text-[var(--color-primary-bg)] font-bold rounded-full flex items-center justify-center space-x-2 hover:opacity-90 transition-all duration-300 mt-8 cursor-pointer shadow-lg">
                <span>Send Message</span>
                <FiSend />
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
