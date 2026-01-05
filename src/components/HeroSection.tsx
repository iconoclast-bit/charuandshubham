import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import weddingbgImg from '@/assets/weddingbg.png';

const HeroSection = () => {
  const titleText = "The Wedding Celebration of";

  const brideFamily = {
    title: "Bride's Family",
    parents: "Mr. Jai Prakash & Mrs. Sweta Srivastava",
    sibling: "Brother: Ayush Srivastava",
  };

  const groomFamily = {
    title: "Groom's Family",
    parents: "Mr. Rajeev Bhushan & Mrs. Abha Srivastava",
    sibling: "Sister: Mrs. Shubhangi Srivastava",
  };

  const FamilyCard = ({ family, delay }: { family: typeof brideFamily; delay: number }) => (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className="text-center p-6 bg-cream/30 backdrop-blur-md rounded-xl border border-gold/20"
    >
      <h3 className="font-display text-2xl text-gold mb-3">{family.title}</h3>
      <p className="font-heading text-base text-foreground/90 mb-1">{family.parents}</p>
      <p className="font-body text-sm text-muted-foreground">{family.sibling}</p>
    </motion.div>
  );

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
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
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-16 pb-32">
        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block mb-6"
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
          className="font-heading text-lg md:text-xl text-muted-foreground mb-3 italic"
        >
          {titleText}
        </motion.p>

        {/* Main Title with animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-gold mb-4 leading-tight drop-shadow-lg whitespace-nowrap"
        >
          Charu & Shubham
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="w-48 h-0.5 bg-gradient-gold mx-auto mb-4"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="font-heading text-lg md:text-xl text-foreground/80 italic mb-10"
        >
          Together with their families invite you to celebrate their union
        </motion.p>

        {/* Family Credits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-8"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-12 h-0.5 bg-gradient-gold" />
            <Heart className="w-5 h-5 text-gold fill-gold" />
            <div className="w-12 h-0.5 bg-gradient-gold" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <FamilyCard family={brideFamily} delay={2.4} />
            <FamilyCard family={groomFamily} delay={2.6} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
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
