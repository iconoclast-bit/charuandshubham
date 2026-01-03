import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import weddingbgImg from '@/assets/weddingbg.png';

const HeroSection = () => {
  const titleText = "The Wedding Celebration of";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${weddingbgImg}')`,
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-cream/80" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-gold/30" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-gold/30" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block mb-8"
        >
          <span className="px-6 py-2 bg-gradient-gold text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full shadow-gold">
            10 - 12 February 2026
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-lg md:text-xl text-muted-foreground mb-4 italic"
        >
          {titleText}
        </motion.p>

        {/* Main Title with animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-gold mb-6 leading-tight drop-shadow-lg whitespace-nowrap"
        >
          Charu & Shubham
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="w-48 h-0.5 bg-gradient-gold mx-auto mb-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="font-heading text-xl md:text-2xl text-foreground/80 italic"
        >
          Together with their families invite you to celebrate their union
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-sm text-muted-foreground tracking-wider uppercase">
          Scroll to Begin
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
