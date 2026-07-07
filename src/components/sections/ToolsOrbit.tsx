import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaPython, FaReact, FaHtml5, FaCss3Alt, FaJs, 
  FaDatabase, FaGithub, FaLaptopCode, FaChartBar,
  FaFileExcel
} from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';

const orbitTools = [
  { icon: FaPython, color: "#3776AB", name: "Python" },
  { icon: FaReact, color: "#61DAFB", name: "React" },
  { icon: FaHtml5, color: "#E34F26", name: "HTML5" },
  { icon: FaCss3Alt, color: "#1572B6", name: "CSS3" },
  { icon: FaJs, color: "#F7DF1E", name: "JavaScript" },
  { icon: FaDatabase, color: "#4479A1", name: "SQL" },
  { icon: FaGithub, color: "#FFFFFF", name: "GitHub" },
  { icon: FaLaptopCode, color: "#007ACC", name: "VS Code" },
  { icon: FaChartBar, color: "#F2C811", name: "Power BI" },
  { icon: FaFileExcel, color: "#217346", name: "Excel" },
  { icon: FiCpu, color: "#FF6D5A", name: "n8n" }
];

type AnimationState = 'idle' | 'suction' | 'waiting' | 'exploding' | 'sunBlast';

export default function ToolsOrbit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [isHoveringAny, setIsHoveringAny] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');

  const handleBlackHoleClick = () => {
    if (animationState !== 'idle') return;
    
    setAnimationState('suction');
    
    // Suction takes 1.5s, then wait 2s inside
    setTimeout(() => {
      setAnimationState('waiting');
      
      setTimeout(() => {
        setAnimationState('exploding');
        
        // Explosion takes about 1s
        setTimeout(() => {
          setAnimationState('sunBlast');
          
          // Sun blast lasts 2 seconds
          setTimeout(() => {
            setAnimationState('idle');
          }, 2000);
          
        }, 1000); // 1s explosion
        
      }, 2000); // 2s wait
      
    }, 1500); // 1.5s suction
  };

  return (
    <section id="tools" className="py-24 px-6 relative z-10 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-[var(--color-primary-accent)] font-semibold mb-3 block"
        >
          My Toolbox
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400"
        >
          Tech Ecosystem
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-[1px] bg-[var(--color-primary-accent)] mx-auto"
        />
      </div>

      <div className="relative w-full max-w-[800px] aspect-square mx-auto flex justify-center items-center">
        
        {/* Explosion Flash Effect */}
        {animationState === 'exploding' && (
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 10, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute z-10 w-32 h-32 bg-white rounded-full pointer-events-none blur-3xl"
          />
        )}

        {/* Center Black Hole Text */}
        <motion.div 
          onClick={handleBlackHoleClick}
          animate={{
            scale: animationState === 'suction' ? 0.8 : animationState === 'waiting' ? [0.8, 0.9, 0.8] : animationState === 'exploding' ? 1.5 : 1,
            boxShadow: animationState === 'exploding' 
              ? '0 0 100px 40px rgba(124,58,237,0.8)' 
              : animationState === 'sunBlast'
              ? [
                  '0 0 40px 10px rgba(255,100,0,0.8)', 
                  '0 0 80px 20px rgba(255,200,0,1)', 
                  '0 0 60px 15px rgba(255,50,0,0.9)', 
                  '0 0 120px 30px rgba(255,255,255,1)',
                  '0 0 50px 10px rgba(255,150,0,0.8)'
                ]
              : animationState === 'waiting'
              ? '0 0 50px 20px rgba(124,58,237,0.5)'
              : '0 0 30px rgba(124,58,237,0.2)',
            backgroundColor: animationState === 'sunBlast' 
              ? ['#ff5500', '#ffcc00', '#ff2200', '#ffffff', '#ff8800'] 
              : 'var(--color-primary-bg)',
            borderColor: animationState === 'sunBlast' 
              ? ['#ff5500', '#ffcc00', '#ff2200', '#ffffff', '#ff8800'] 
              : 'rgba(255,255,255,0.1)'
          }}
          transition={{
            scale: {
              repeat: animationState === 'waiting' ? Infinity : 0,
              duration: animationState === 'waiting' ? 0.3 : 0.5,
              type: animationState === 'exploding' ? "spring" : "tween",
              stiffness: 200,
              damping: 10
            },
            boxShadow: { 
              duration: animationState === 'sunBlast' ? 2 : 0.5,
              times: animationState === 'sunBlast' ? [0, 0.25, 0.5, 0.75, 1] : undefined
            },
            backgroundColor: { 
              duration: animationState === 'sunBlast' ? 2 : 0.5,
              times: animationState === 'sunBlast' ? [0, 0.25, 0.5, 0.75, 1] : undefined
            },
            borderColor: { 
              duration: animationState === 'sunBlast' ? 2 : 0.5,
              times: animationState === 'sunBlast' ? [0, 0.25, 0.5, 0.75, 1] : undefined
            }
          }}
          className="group absolute z-20 w-32 h-32 md:w-48 md:h-48 rounded-full border flex items-center justify-center cursor-pointer hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] hover:border-[var(--color-primary-accent)] transition-colors duration-500"
        >
          <div className="flex flex-col items-center justify-center space-y-2 text-center pointer-events-none select-none">
            <FiCpu className="text-3xl md:text-4xl text-[var(--color-primary-accent)] group-hover:text-[var(--color-highlight)] group-hover:scale-110 transition-all duration-500 animate-pulse" />
            <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-300 group-hover:text-white transition-colors duration-300 uppercase">
              Tech Stack
            </span>
          </div>
        </motion.div>

        {/* Orbit Rings (Pulled in during suction) */}
        <motion.div 
          animate={{ scale: animationState === 'suction' || animationState === 'waiting' ? 0 : 1 }}
          transition={{ duration: animationState === 'suction' ? 1.5 : 1, type: "spring", bounce: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="absolute w-[60%] h-[60%] rounded-full border border-[var(--color-glass)] opacity-50" />
          <div className="absolute w-[80%] h-[80%] rounded-full border border-[var(--color-soft-divider)] opacity-30" />
          <div className="absolute w-full h-full rounded-full border border-[var(--color-glass)] opacity-20" />
        </motion.div>

        {/* Orbiting Icons */}
        <motion.div 
          className="absolute inset-0"
          animate={{ rotate: animationState === 'suction' ? 1080 : animationState === 'waiting' ? 1440 : 360 }}
          transition={{ 
            duration: animationState === 'suction' ? 1.5 : animationState === 'waiting' ? 2 : 60, 
            repeat: animationState === 'idle' ? Infinity : 0, 
            ease: animationState === 'suction' ? "easeIn" : "linear" 
          }}
        >
          {orbitTools.map((tool, index) => {
            const angle = (index / orbitTools.length) * 360;
            const radiusPercent = index % 2 === 0 ? '30%' : '40%';
            const isAbsorbed = animationState === 'suction' || animationState === 'waiting';
            
            return (
              <div 
                key={index}
                className="absolute inset-0"
                style={{ 
                  transform: `rotate(${angle}deg)` 
                }}
              >
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2"
                  initial={{ top: `calc(50% - ${radiusPercent})` }}
                  animate={{ 
                    top: isAbsorbed ? '50%' : `calc(50% - ${radiusPercent})`,
                    scale: isAbsorbed ? 0 : 1,
                    opacity: isAbsorbed ? 0 : 1
                  }}
                  transition={{
                    top: {
                      duration: isAbsorbed ? 1.5 : 1.2,
                      ease: isAbsorbed ? "circIn" : "easeOut",
                      type: isAbsorbed ? "tween" : "spring",
                      stiffness: isAbsorbed ? undefined : 100,
                      damping: isAbsorbed ? undefined : 12
                    },
                    scale: { duration: isAbsorbed ? 1.5 : 0.5 },
                    opacity: { duration: isAbsorbed ? 1.5 : 0.5 }
                  }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 md:w-16 md:h-16 -mt-6 md:-mt-8 rounded-full bg-[var(--color-cards)] border flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-125"
                    style={{
                      boxShadow: isHoveringAny ? `0 0 35px ${tool.color}` : '0 0 15px rgba(0,0,0,0.5)',
                      borderColor: isHoveringAny ? tool.color : 'var(--color-glass)'
                    }}
                    onMouseEnter={() => setIsHoveringAny(true)}
                    onMouseLeave={() => setIsHoveringAny(false)}
                  >
                    <tool.icon 
                      size={24} 
                      style={{ color: tool.color }} 
                      className={isHoveringAny ? "drop-shadow-[0_0_15px_currentColor] transition-all duration-300" : "transition-all duration-300"} 
                    />
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
