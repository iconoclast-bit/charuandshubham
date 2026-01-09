import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import herobgImg from '@/assets/Herobg.png';
import logoImg from '@/assets/logo.png';
import heroElementImg from '@/assets/heroElement.png';
import FloatingLanterns from './FloatingLanterns';

// Letter-by-letter reveal component
const AnimatedText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const letters = text.split('');
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [1,1, 0]);

  const titleText = "The Wedding Celebration of";

  const brideFamily = {
    title: "Bride's Family",
    parents: "Mr. Jai Prakash & Mrs. Sweta Srivastava",
    sibling: "Brother: Ayush Srivastava",
  };

  const groomFamily = {
    title: "Groom's Family",
    parents: "Mr. Rajeev Bhushan & Mrs. Abha Srivastava",
    sibling: "Sister: Mrs. Shubhangi Srivastava & \nBrother-in-law: Mr. Siddhant Gupta",
  };

  const FamilyCard = ({ family, delay }: { family: typeof brideFamily; delay: number }) => (
    <motion.div
      initial={{ y: 30, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="text-center p-6 bg-gradient-to-br from-cream/40 via-cream/30 to-cream/20 backdrop-blur-xl rounded-xl border border-gold/30 shadow-lg hover:shadow-gold transition-all duration-300"
    >
      <motion.h3 
        className="font-display text-2xl text-gold mb-3"
        whileHover={{ scale: 1.05 }}
      >
        {family.title}
      </motion.h3>
      <p className="font-heading text-base text-foreground/90 mb-1">{family.parents}</p>

      {/* Added 'whitespace-pre-line' here */}
      <p className="font-body text-sm text-muted-foreground whitespace-pre-line">
        {family.sibling}
      </p>
    </motion.div>
    
  );

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-twilight"
    >
      {/* Animated Background with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${herobgImg}')`,
          filter: 'blur(4px)',
          y: backgroundY,
          scale: backgroundScale,
        }}
      />
      
      {/* Animated Gradient overlay with moving gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cream/85 via-cream/80 to-cream/75"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 1],
            [
              'linear-gradient(135deg, rgba(252, 248, 240, 0.85) 0%, rgba(252, 248, 240, 0.80) 50%, rgba(252, 248, 240, 0.75) 100%)',
              'linear-gradient(135deg, rgba(252, 248, 240, 0.75) 0%, rgba(252, 248, 240, 0.70) 50%, rgba(252, 248, 240, 0.65) 100%)'
            ]
          )
        }}
      />
      
      {/* Floating Particles Effect */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gold/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            x: [null, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Floating Lanterns Animation */}
      <FloatingLanterns />

      {/* Animated Decorative corner borders with hover effect */}
      <motion.div 
        className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-gold/30"
        whileHover={{ scale: 1.1, borderColor: "rgba(212, 175, 55, 0.6)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 border-r-2 border-t-2 border-gold/30"
        whileHover={{ scale: 1.1, borderColor: "rgba(212, 175, 55, 0.6)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-gold/30"
        whileHover={{ scale: 1.1, borderColor: "rgba(212, 175, 55, 0.6)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-32 h-32 border-l-2 border-b-2 border-gold/30"
        whileHover={{ scale: 1.1, borderColor: "rgba(212, 175, 55, 0.6)" }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Hero Element Image - Top Center */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-8 left-[40%] -translate-x-1/2 z-20"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <motion.img
          src={heroElementImg}
          alt="Hero Element"
          className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content with Parallax */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pb-32 pt-48"
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        {/* Date Badge with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-block mb-6"
        >
          <span className="px-6 py-2 bg-gradient-to-r from-gold/90 via-gold/80 to-gold/90 backdrop-blur-xl text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full shadow-gold border border-gold/30">
            11 - 12 February 2026
          </span>
        </motion.div>

        {/* Subtitle with letter animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-xl md:text-2xl text-foreground/70 mb-3 italic"
        >
          <AnimatedText text={titleText} delay={0.5} />
        </motion.p>

        {/* Main Title with letter-by-letter reveal and 3D effect */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 leading-tight drop-shadow-lg whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, hsl(42, 78%, 50%) 0%, hsl(45, 80%, 65%) 50%, hsl(42, 78%, 50%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transform: 'perspective(1000px) rotateX(5deg)',
          }}
        >
          <AnimatedText text="Shubham & Charu" delay={0.8} />
        </motion.h1>

        {/* Decorative line with animated gradient */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-48 h-0.5 mx-auto mb-4 relative overflow-hidden rounded-full"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-gold"
            animate={{
              backgroundPosition: ['0%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              background: 'linear-gradient(90deg, hsl(38, 75%, 40%) 0%, hsl(42, 78%, 50%) 50%, hsl(45, 80%, 65%) 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        </motion.div>

        {/* Tagline with word-by-word reveal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="font-heading text-lg md:text-xl text-foreground/80 italic mb-10"
        >
          <span className="block">
            <AnimatedText text="Together with their families" delay={1.8} />
          </span>
          
          {/* Line 2 (Delay calculated: 1.8s + time for first line animation) */}
          <span className="block">
            <AnimatedText text="invite you to celebrate their union" delay={2.5} />
          </span>
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
            <div className="w-24 h-1 bg-gradient-gold" />
            <motion.img
              src={logoImg}
              alt="Logo"
              className="w-24 h-24 object-contain"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="w-24 h-1 bg-gradient-gold" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <FamilyCard family={groomFamily} delay={2.6} />
            <FamilyCard family={brideFamily} delay={2.4} />
            
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll indicator with magnetic effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        whileHover={{ scale: 1.1 }}
      >
        <motion.span 
          className="font-body text-sm text-muted-foreground tracking-wider uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to Begin
        </motion.span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="w-6 h-6 text-gold group-hover:text-gold/80 transition-colors" />
        </motion.div>
        {/* Animated pulse ring */}
        <motion.div
          className="absolute bottom-0 w-12 h-12 border-2 border-gold/30 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
