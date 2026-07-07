import React from 'react';

const BackgroundTheme: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* ----------------------------------------------------
         Ambient Soft Glow Blobs (Provides base color glow)
         ---------------------------------------------------- */}
      {/* Top Hero Glow */}
      <div className="absolute top-[2%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#4f46e5]/10 to-[#06b6d4]/5 blur-[120px]" />
      
      {/* About/Skills Glow */}
      <div className="absolute top-[22%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#ff0055]/5 to-[#4f46e5]/8 blur-[150px]" />
      
      {/* Projects Glow */}
      <div className="absolute top-[45%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#06b6d4]/6 to-[#4f46e5]/8 blur-[140px]" />
      
      {/* Experience/Education Glow */}
      <div className="absolute top-[70%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#ff0055]/5 to-[#06b6d4]/8 blur-[130px]" />
      
      {/* Contact Glow */}
      <div className="absolute top-[88%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-[#4f46e5]/8 to-[#ff0055]/5 blur-[120px]" />
    </div>
  );
};

export default BackgroundTheme;
