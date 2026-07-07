import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPlayCircle } from 'react-icons/fi';

const videos = [
  { title: "Portfolio Reel", category: "Showcase", img: "/images/portfolio_reel.jpg" },
  { title: "Commercial Edit", category: "Commercial Videos", img: "/images/commercial_edit.jpg" },
  { title: "Short Film Timeline", category: "Short Films", img: "/images/short_film.png" },
  { title: "Color Grading breakdown", category: "Color Grading", img: "/images/color_grading.jpg" },
  { title: "AI Generated Concept", category: "AI Generated Videos", img: "/images/ai_concept.jpg" },
  { title: "YouTube Vlog", category: "YouTube Editing", img: "/images/youtube_vlog.jpg" },
  { title: "Instagram Reel", category: "Instagram Reels", img: "/images/instagram_reel.jpg" },
  { title: "Motion Titles", category: "Motion Graphics", img: "/images/motion_titles.jpg" }
];

export default function VideoShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative z-10" id="video-showcase">
      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Editing Suite
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-[1px] bg-[var(--color-primary-accent)]" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {videos.map((video, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-[var(--color-cards)] cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_var(--color-primary-accent)] transition-all duration-500"
          >
            <img 
              src={video.img} 
              alt={video.title} 
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                <FiPlayCircle size={32} />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 text-xs font-mono bg-[var(--color-primary-accent)] text-white rounded-full mb-3 inline-block">
                {video.category}
              </span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-highlight)] transition-colors">
                {video.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
