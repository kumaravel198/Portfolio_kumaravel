import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiDownload, FiLinkedin, FiGithub, FiMail, FiPhone } from 'react-icons/fi';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE" || accessKey.trim() === "") {
      setError("Please configure your Web3Forms Access Key in the .env file.");
      setIsSubmitting(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append("access_key", accessKey);
    formData.append("subject", "New Contact Form Submission - Portfolio");
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormValues({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || "Form submission failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Web3Forms submission error:", err);
      setError(err.message || "Failed to send message. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-36 px-6 md:px-12 max-w-7xl mx-auto relative z-10" ref={ref}>
      
      {/* Background ambient lighting glows specific to Contact */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--color-primary-accent)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Contact Info & Links (Takes 5 columns on desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-10"
        >
          <div className="space-y-4">
            <span className="text-xs font-mono text-[var(--color-highlight)] tracking-[0.25em] uppercase block font-bold">
              [ GET IN TOUCH ]
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-typography)] to-neutral-400 leading-tight">
              Let's create <br/> something epic.
            </h2>
            <p className="text-[15px] md:text-[16px] text-[var(--color-secondary-text)] font-light leading-relaxed max-w-md">
              Available for freelance design contracts, design systems development, and full-time engineering roles.
            </p>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            <a 
              href="mailto:kumaravel.kv198@gmail.com" 
              className="magnetic flex items-center space-x-4 text-base hover:text-[var(--color-primary-accent)] transition-colors group w-max"
            >
              <span className="w-11 h-11 rounded-2xl border border-[var(--color-glass)] flex items-center justify-center bg-neutral-900/5 dark:bg-neutral-950/20 group-hover:border-[var(--color-primary-accent)]/30 group-hover:bg-[var(--color-glass)] transition-all duration-300 shadow-sm">
                <FiMail size={16} />
              </span>
              <span className="font-light tracking-wide text-sm">kumaravel.kv198@gmail.com</span>
            </a>
            
            <a 
              href="tel:+916380499804" 
              className="magnetic flex items-center space-x-4 text-base hover:text-[var(--color-primary-accent)] transition-colors group w-max"
            >
              <span className="w-11 h-11 rounded-2xl border border-[var(--color-glass)] flex items-center justify-center bg-neutral-900/5 dark:bg-neutral-950/20 group-hover:border-[var(--color-primary-accent)]/30 group-hover:bg-[var(--color-glass)] transition-all duration-300 shadow-sm">
                <FiPhone size={16} />
              </span>
              <span className="font-light tracking-wide text-sm">+91 63804 99804</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-4">
            <a 
              href="https://linkedin.com/in/kumaravel-k-3904192a8" 
              target="_blank" 
              rel="noreferrer" 
              className="magnetic flex items-center space-x-2 px-5 py-2.5 bg-neutral-900/5 dark:bg-neutral-950/20 border border-[var(--color-glass)] rounded-full hover:bg-neutral-950/5 dark:hover:bg-white/5 hover:border-neutral-400 dark:hover:border-neutral-700 hover:scale-[1.03] transition-all duration-300 cursor-pointer text-[11px] font-semibold"
            >
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com/kumaravel198" 
              target="_blank" 
              rel="noreferrer" 
              className="magnetic flex items-center space-x-2 px-5 py-2.5 bg-neutral-900/5 dark:bg-neutral-950/20 border border-[var(--color-glass)] rounded-full hover:bg-neutral-950/5 dark:hover:bg-white/5 hover:border-neutral-400 dark:hover:border-neutral-700 hover:scale-[1.03] transition-all duration-300 cursor-pointer text-[11px] font-semibold"
            >
              <FiGithub />
              <span>GitHub</span>
            </a>
            <a 
              href="/resume.pdf" 
              download="Kumaravel_K_Resume.pdf" 
              className="magnetic flex items-center space-x-2 px-5 py-2.5 bg-[var(--color-primary-accent)] text-white rounded-full hover:opacity-90 hover:scale-[1.03] transition-all cursor-pointer shadow-[0_8px_15px_-3px_rgba(79,70,229,0.3)] text-[11px] font-semibold"
            >
              <FiDownload />
              <span>Get Resume</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Contact Form / Success State (Takes 7 columns on desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative"
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-neutral-900/5 dark:bg-neutral-950/20 border border-[var(--color-glass)] p-8 md:p-12 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center space-y-5 h-full min-h-[420px] backdrop-blur-xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-highlight)]" />
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center text-xl shadow-md">
                ✓
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-typography)]">Message Sent!</h3>
              <p className="text-[var(--color-secondary-text)] max-w-sm font-light text-xs md:text-sm leading-relaxed">
                Thank you for reaching out! Your message has been received, and I will get back to you as soon as possible.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="magnetic px-5 py-2.5 border border-[var(--color-glass)] hover:border-neutral-500 text-[var(--color-typography)] rounded-full hover:bg-neutral-950/5 dark:hover:bg-white/5 transition-all duration-300 text-[11px] font-semibold cursor-pointer shadow-sm"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="bg-neutral-900/5 dark:bg-neutral-950/20 border border-[var(--color-glass)] p-8 md:p-12 rounded-[32px] space-y-7 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--color-primary-accent)] via-[var(--color-secondary-accent)] to-[var(--color-highlight)]" />
              
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[11px] text-center font-mono">
                  {error}
                </div>
              )}

              {/* Name Input */}
              <div className="relative group flex flex-col">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={formValues.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4.5 outline-none transition-colors text-[var(--color-typography)] text-[13px] md:text-sm font-light z-10" 
                  placeholder=" " 
                />
                <label 
                  htmlFor="name" 
                  className={`absolute left-0 transition-all duration-300 pointer-events-none text-[13px] md:text-sm font-light ${
                    focusedField === 'name' || formValues.name.trim() !== ''
                      ? '-top-2 text-[9px] text-[var(--color-primary-accent)] font-bold tracking-wider uppercase'
                      : 'top-4 text-[var(--color-secondary-text)]'
                  }`}
                >
                  Your Name
                </label>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-glass)]" />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--color-primary-accent)] origin-center z-20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Email Input */}
              <div className="relative group flex flex-col">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={formValues.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4.5 outline-none transition-colors text-[var(--color-typography)] text-[13px] md:text-sm font-light z-10" 
                  placeholder=" " 
                />
                <label 
                  htmlFor="email" 
                  className={`absolute left-0 transition-all duration-300 pointer-events-none text-[13px] md:text-sm font-light ${
                    focusedField === 'email' || formValues.email.trim() !== ''
                      ? '-top-2 text-[9px] text-[var(--color-primary-accent)] font-bold tracking-wider uppercase'
                      : 'top-4 text-[var(--color-secondary-text)]'
                  }`}
                >
                  Your Email
                </label>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-glass)]" />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--color-primary-accent)] origin-center z-20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Message Input */}
              <div className="relative group flex flex-col">
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={4} 
                  value={formValues.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4.5 outline-none transition-colors resize-none text-[var(--color-typography)] text-[13px] md:text-sm font-light z-10" 
                  placeholder=" " 
                />
                <label 
                  htmlFor="message" 
                  className={`absolute left-0 transition-all duration-300 pointer-events-none text-[13px] md:text-sm font-light ${
                    focusedField === 'message' || formValues.message.trim() !== ''
                      ? '-top-2 text-[9px] text-[var(--color-primary-accent)] font-bold tracking-wider uppercase'
                      : 'top-4 text-[var(--color-secondary-text)]'
                  }`}
                >
                  Your Message
                </label>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-glass)]" />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--color-primary-accent)] origin-center z-20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="magnetic w-full py-4 bg-[var(--color-typography)] text-[var(--color-primary-bg)] font-bold rounded-full flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform duration-300 mt-6 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-xs"
              >
                <span>{isSubmitting ? "Sending Connection..." : "Initiate Flow"}</span>
                <FiSend className={isSubmitting ? "animate-pulse" : ""} />
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
