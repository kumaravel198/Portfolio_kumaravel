import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import CustomCursor from './components/layout/CustomCursor';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Services from './components/sections/Services';
import ToolsOrbit from './components/sections/ToolsOrbit';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import BackgroundTheme from './components/layout/BackgroundTheme';

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', () => {
      // Custom scroll event if needed
    });

    // Integrate with GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-primary-bg)] text-[var(--color-typography)] overflow-clip selection:bg-[var(--color-primary-accent)] selection:text-white">
      <BackgroundTheme />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <ToolsOrbit />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
