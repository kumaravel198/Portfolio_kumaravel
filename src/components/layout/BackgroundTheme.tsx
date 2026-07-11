import React from 'react';

const BackgroundTheme: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Figma Canvas Dotted Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] transition-opacity duration-300"
        style={{
          backgroundImage: 'radial-gradient(var(--color-typography) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ----------------------------------------------------
         Ambient Soft Glow Blobs (Provides premium color glow)
         ---------------------------------------------------- */}
      {/* Top Hero Glow (Cyan/Purple/Blue Studio Light) */}
      <div className="absolute top-[-5%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-cyan-400/10 blur-[130px] animate-float-slow" />
      
      {/* About/Skills Glow */}
      <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-purple-500/8 via-cyan-400/8 to-indigo-500/5 blur-[150px] animate-float-reverse" />
      
      {/* Projects Glow */}
      <div className="absolute top-[42%] left-[-15%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-cyan-400/10 via-indigo-600/8 to-purple-500/5 blur-[140px] animate-float-slow" />
      
      {/* Experience/Education Glow */}
      <div className="absolute top-[68%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-purple-600/8 via-rose-500/5 to-indigo-500/8 blur-[130px] animate-float-reverse" />
      
      {/* Contact Glow */}
      <div className="absolute top-[85%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-500/12 via-cyan-400/8 to-purple-500/5 blur-[120px] animate-float-slow" />
    </div>
  );
};

export default BackgroundTheme;
