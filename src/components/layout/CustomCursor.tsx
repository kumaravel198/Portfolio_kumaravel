import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Spring for the outer glow (smooth organic follow)
  const glowX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const glowY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isFirstMove = useRef(true);

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      if (isFirstMove.current) {
        // Jump the motion values and springs instantly to the first mouse coordinates
        mouseX.jump(e.clientX);
        mouseY.jump(e.clientY);
        glowX.jump(e.clientX);
        glowY.jump(e.clientY);
        isFirstMove.current = false;
        setIsVisible(true);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('magnetic') ||
        target.closest('.magnetic') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      isFirstMove.current = true; // reset for next entry
    };

    const handleMouseEnterWindow = (e: MouseEvent) => {
      mouseX.jump(e.clientX);
      mouseY.jump(e.clientY);
      glowX.jump(e.clientX);
      glowY.jump(e.clientY);
      isFirstMove.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [mouseX, mouseY, glowX, glowY]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden transition-opacity duration-200"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Figma Pointer + Name Tag (Zero position lag, follows hardware mouse instantly) */}
      <motion.div
        className="absolute top-0 left-0 flex items-start"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {/* Figma Cursor Arrow (SVG) */}
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 18 18" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-[var(--color-primary-accent)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          style={{ color: isHovered ? 'var(--color-highlight)' : 'var(--color-primary-accent)' }}
        >
          <path 
            d="M5.65376 12.3963L2.10265 2.10265L12.3963 5.65376L7.90483 7.90483L5.65376 12.3963Z" 
            fill="currentColor"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* User Name Badge Tag */}
        <motion.div 
          className="ml-3 mt-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold text-white whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.25)] flex items-center gap-1.5 border border-white/10"
          animate={{
            backgroundColor: isHovered ? 'var(--color-highlight)' : 'var(--color-primary-accent)',
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>Kumaravel</span>
          <span className="opacity-60 text-[8px] uppercase tracking-wider">
            {isHovered ? 'Click' : 'Designer'}
          </span>
        </motion.div>
      </motion.div>

      {/* Floating Pointer Trail Glow (Spring follow for smooth organic look) */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 rounded-full border border-[var(--color-primary-accent)] pointer-events-none opacity-30 blur-[2px]"
        style={{
          borderColor: isHovered ? 'var(--color-highlight)' : 'var(--color-primary-accent)',
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150, mass: 0.5 }}
      />
    </div>
  );
}
