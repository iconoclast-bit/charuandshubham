import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroMandapImg from '@/assets/hero-mandap.png';
import FloatingLanterns from './FloatingLanterns';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Top gradient section with text */}
      <div className="relative flex-shrink-0 py-16 md:py-24 bg-gradient-to-b from-[#1a3a5c] via-[#2d5a7b] to-transparent z-10">
        {/* Floating Lanterns */}
        <FloatingLanterns />
        
        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          {/* Groom Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="font-display text-5xl sm:text-6xl md:text-8xl text-cream mb-2 tracking-[0.3em] uppercase drop-shadow-lg"
          >
            Charu
          </motion.h1>

          {/* Weds Text */}
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-heading text-lg md:text-2xl text-cream/80 tracking-[0.5em] uppercase mb-2"
          >
            Weds
          </motion.p>

          {/* Bride Name */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="font-display text-5xl sm:text-6xl md:text-8xl text-cream tracking-[0.3em] uppercase drop-shadow-lg"
          >
            Shubham
          </motion.h1>
        </div>
      </div>

      {/* Mandap Image Section */}
      <div className="relative flex-1 min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={heroMandapImg}
            alt="Wedding Mandap"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay at top for seamless blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2d5a7b] via-transparent to-transparent h-32" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      >
        <span className="font-body text-sm text-cream/80 tracking-wider uppercase drop-shadow-lg">
          Scroll to Begin
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-gold drop-shadow-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
