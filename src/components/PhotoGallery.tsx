import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import pg1Img from '@/assets/pg1.jpeg';
import pg2Img from '@/assets/pg2.jpeg';
import pg3Img from '@/assets/pg3.jpeg';
import pg4Img from '@/assets/pg4.jpeg';
import pg5Img from '@/assets/pg5.jpeg';
import pg6Img from '@/assets/pg6.jpeg';
import logoImg from '@/assets/logo.png';

// Gallery images using pg1-6
const galleryImages = [
  {
    id: 1,
    src: pg1Img,
    alt: "Wedding memory 1",
  },
  {
    id: 2,
    src: pg2Img,
    alt: "Wedding memory 2",
  },
  {
    id: 3,
    src: pg3Img,
    alt: "Wedding memory 3",
  },
  {
    id: 4,
    src: pg4Img,
    alt: "Wedding memory 4",
  },
  {
    id: 5,
    src: pg5Img,
    alt: "Wedding memory 5",
  },
  {
    id: 6,
    src: pg6Img,
    alt: "Wedding memory 6",
  }
];

const PhotoGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Background parallax - moves slower
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  // Content parallax - moves faster than background
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // Auto-rotate gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getPrevIndex = () => (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  const getNextIndex = () => (currentIndex + 1) % galleryImages.length;

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 bg-background overflow-hidden">
      {/* Decorative Background - Moves slower */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
        style={{ y: contentY }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 sm:px-4 sm:py-1 bg-gold/10 border border-gold/30 rounded-full text-xs sm:text-sm text-gold font-body tracking-wider uppercase mb-3 sm:mb-4"
          >
            Our Memories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold mb-3 sm:mb-4"
          >
            Photo Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="font-heading text-sm sm:text-base md:text-lg text-muted-foreground italic max-w-lg mx-auto px-4"
          >
            A glimpse into our journey of love
          </motion.p>
        </motion.div>

        {/* Carousel Gallery - Matching Image Design */}
        <div className="relative w-full flex items-center justify-center mb-6 sm:mb-8">
          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl flex items-center justify-center gap-2 sm:gap-4">
            {/* Previous Image Preview (Left) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`prev-${getPrevIndex()}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.4, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative flex-shrink-0 w-[15%] sm:w-[18%] md:w-[20%] aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
                onClick={goToPrevious}
              >
                <img
                  src={galleryImages[getPrevIndex()].src}
                  alt={galleryImages[getPrevIndex()].alt}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30 flex items-center justify-center text-gold z-10"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Main Image (Center) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex-shrink-0 w-[70%] sm:w-[64%] md:w-[60%] aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
                onClick={() => setSelectedImage(galleryImages[currentIndex].src)}
              >
                <img
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Heart Icon - Bottom Left */}
                <motion.div
                  className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gold fill-none stroke-2" />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Next Image Preview (Right) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`next-${getNextIndex()}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.4, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative flex-shrink-0 w-[15%] sm:w-[18%] md:w-[20%] aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
                onClick={goToNext}
              >
                <img
                  src={galleryImages[getNextIndex()].src}
                  alt={galleryImages[getNextIndex()].alt}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30 flex items-center justify-center text-gold z-10"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {galleryImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 touch-manipulation ${
                index === currentIndex
                  ? 'bg-gold'
                  : 'bg-gold/30 hover:bg-gold/50'
              }`}
              style={{
                width: index === currentIndex ? '32px' : '8px',
                height: '8px',
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Decorative Element with Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-3 mb-8"
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
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gold transition-colors z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedImage}
              alt="Gallery preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
