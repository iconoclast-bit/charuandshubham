import { motion, useTransform, MotionValue, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import MarigoldShower from './MarigoldShower';
import FireworksEffect from './FireworksEffect';
import CalendarButton from './CalendarButton';

interface Event {
  name: string;
  date: string;
  time: string;
  location: string;
  note?: string;
  asset?: string;
  video?: string;
}

interface EventCardProps {
  event: Event;
  backgroundImage: string;
  foregroundImage?: string;
  foregroundImages?: string[];
  video?: string;
  index: number;
  effect?: 'marigold' | 'fireworks' | 'none';
  totalCards: number;
  scrollProgress: MotionValue<number>;
}

const EventCard = ({ 
  event, 
  backgroundImage, 
  foregroundImage, 
  foregroundImages,
  video,
  index, 
  effect = 'none',
  totalCards,
  scrollProgress
}: EventCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Background parallax
  const backgroundY = useTransform(scrollProgress, [0, 1], ["0%", "5%"]);
  const backgroundScale = useTransform(scrollProgress, [0, 0.5, 1], [0.95, 1, 1.02]);
  
  // Content parallax
  const contentOpacity = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [0, 0, 1, 1, 0.8]);
  const contentY = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [60, 30, 0, -80, -150]);
  
  // Foreground parallax
  const foregroundOpacity = useTransform(scrollProgress, [0, 0.15, 0.35, 0.8, 1], [0, 0, 1, 1, 0.8]);
  const foregroundY = useTransform(scrollProgress, [0, 0.15, 0.35, 0.8, 1], [100, 60, 0, -100, -180]);
  const foregroundScale = useTransform(scrollProgress, [0, 0.15, 0.35, 0.8, 1], [0.8, 0.9, 1, 1, 0.95]);
  
  // Title parallax - minimal movement for problem pages (3, 4) to stay readable
  const titleOpacity = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [0, 0, 1, 1, 0.9]);
  const titleY = (index === 3 || index === 4)
    ? useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [30, 15, 0, 0, 0]) // Minimal movement - stay in place
    : useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [70, 35, 0, -90, -170]);
  
  // Details parallax - minimal for problem pages
  const detailsOpacity = useTransform(scrollProgress, [0, 0.25, 0.45, 0.8, 1], [0, 0, 1, 1, 0.9]);
  const detailsY = (index === 3 || index === 4)
    ? useTransform(scrollProgress, [0, 0.25, 0.45, 0.8, 1], [30, 15, 0, 0, 0]) // Minimal movement
    : useTransform(scrollProgress, [0, 0.25, 0.45, 0.8, 1], [60, 30, 0, -70, -140]);
  
  // Event number parallax
  const eventNumberOpacity = useTransform(scrollProgress, [0, 0.1, 0.3, 0.8, 1], [0, 0, 1, 1, 0.8]);
  const eventNumberY = useTransform(scrollProgress, [0, 0.1, 0.3, 0.8, 1], [30, 15, 0, -40, -80]);
  
  // Decorative elements
  const decorativeOpacity = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [0, 0, 0.6, 0.6, 0.3]);
  const decorativeY = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [0, 0, 0, -30, -60]);

  // Button blur
  const buttonBlur = useTransform(scrollProgress, [0, 0.5, 0.6, 1], [12, 12, 40, 40]);
  const [currentButtonBlur, setCurrentButtonBlur] = useState(12);

  useMotionValueEvent(buttonBlur, "change", (latest) => {
    setCurrentButtonBlur(latest);
  });

  // Render event content based on page type
  const renderTextContent = () => {
    const isPhoolon = index === 3;
    const isWedding = index === 4;
    const needsBackgroundCard = isPhoolon || isWedding;

    return (
      <div className={`relative ${needsBackgroundCard ? 'p-4 sm:p-6' : ''}`}>
        {/* Background card for readability on problem pages */}
        {needsBackgroundCard && (
          <div 
            className={`absolute inset-0 rounded-2xl shadow-xl ${
              isPhoolon 
                ? 'bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 border border-blue-200/60' 
                : 'bg-gradient-to-br from-cream/95 via-ivory/92 to-cream/95 border border-gold/40'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          />
        )}

        {/* Event Name */}
        <motion.h2
          className={`relative z-10 font-display mb-3 sm:mb-4 font-bold text-xl sm:text-2xl md:text-3xl ${
            isPhoolon 
              ? 'text-blue-900' 
              : isWedding 
                ? 'text-burgundy' 
                : ''
          }`}
          style={{
            opacity: titleOpacity,
            y: titleY,
            textShadow: needsBackgroundCard 
              ? 'none' 
              : '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)',
            ...(!needsBackgroundCard && {
              background: 'linear-gradient(135deg, rgba(252, 248, 240, 1) 0%, rgba(252, 248, 240, 0.95) 50%, rgba(212, 175, 55, 0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }),
          }}
        >
          {event.name.split(' ').map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: wordIndex * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Event Details */}
        <motion.div
          className="relative z-10 space-y-3 sm:space-y-4 mt-3 sm:mt-4"
          style={{ opacity: detailsOpacity, y: detailsY }}
        >
          {/* Date & Time */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <motion.div 
              className={`flex items-center gap-1.5 sm:gap-2 rounded-full border shadow-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm ${
                isPhoolon 
                  ? 'bg-blue-100/90 border-blue-300/70 text-blue-800' 
                  : isWedding
                    ? 'bg-gold/25 border-gold/50 text-burgundy'
                    : 'text-cream bg-black/40 border-gold/40'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <Calendar className={`w-3 h-3 sm:w-4 sm:h-4 ${isPhoolon ? 'text-blue-600' : 'text-gold'}`} />
              <span className="font-heading font-semibold">{event.date}</span>
            </motion.div>
            <motion.div 
              className={`flex items-center gap-1.5 sm:gap-2 rounded-full border shadow-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm ${
                isPhoolon 
                  ? 'bg-blue-100/90 border-blue-300/70 text-blue-800' 
                  : isWedding
                    ? 'bg-gold/25 border-gold/50 text-burgundy'
                    : 'text-cream bg-black/40 border-gold/40'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <Clock className={`w-3 h-3 sm:w-4 sm:h-4 ${isPhoolon ? 'text-blue-600' : 'text-gold'}`} />
              <span className="font-heading font-semibold">{event.time}</span>
            </motion.div>
          </div>

          {/* Location */}
          <motion.div 
            className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 ${
              isPhoolon 
                ? 'bg-blue-50/90 text-blue-800 border border-blue-200/60' 
                : isWedding
                  ? 'bg-cream/90 text-burgundy border border-gold/40'
                  : 'text-cream bg-black/40 border border-gold/30'
            }`}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <MapPin className={`w-3 h-3 sm:w-4 sm:h-4 ${isPhoolon ? 'text-blue-600' : 'text-gold'}`} />
            <span className="font-body text-xs sm:text-sm font-medium">{event.location}</span>
          </motion.div>

          {/* Note */}
          {event.note && (
            <motion.div 
              className="mt-3"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <span className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-body text-xs sm:text-sm italic shadow-md ${
                isPhoolon 
                  ? 'bg-blue-100/90 border border-blue-300/60 text-blue-800'
                  : isWedding
                    ? 'bg-gold/20 border border-gold/50 text-burgundy'
                    : 'bg-gold/25 border border-gold/40 text-cream'
              }`}>
                {event.note}
              </span>
            </motion.div>
          )}

          {/* Calendar Button */}
          <div className="mt-3 sm:mt-4">
            <CalendarButton
              eventName={event.name}
              date={event.date}
              time={event.time}
              location={event.location}
              description={event.note}
              buttonBlur={buttonBlur}
            />
          </div>
        </motion.div>
      </div>
    );
  };

  const renderMedia = () => {
    if (video) {
      return (
        <motion.div
          className="mt-6 sm:mt-8"
          style={{ opacity: foregroundOpacity, y: foregroundY, scale: foregroundScale }}
        >
          <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border-4 border-gold/40 shadow-gold">
            <video src={video} autoPlay muted loop playsInline className="w-full h-auto" />
          </div>
        </motion.div>
      );
    }

    if (foregroundImages && foregroundImages.length > 0) {
      return (
        <motion.div
          className="mt-6 sm:mt-8 flex items-center justify-center gap-4 md:gap-6 flex-wrap"
          style={{ opacity: foregroundOpacity, y: foregroundY, scale: foregroundScale }}
        >
          {foregroundImages.map((img, imgIndex) => (
            <motion.img
              key={imgIndex}
              src={img}
              alt={`${event.name} ${imgIndex + 1}`}
              className="max-w-[140px] sm:max-w-[160px] md:max-w-[180px] h-auto drop-shadow-2xl"
              animate={{
                y: [0, -20, 0],
                rotate: [0, imgIndex % 2 === 0 ? 1.5 : -1.5, imgIndex % 2 === 0 ? -1.5 : 1.5, 0],
              }}
              transition={{
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: imgIndex * 0.3 },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: imgIndex * 0.2 + 0.2 },
              }}
            />
          ))}
        </motion.div>
      );
    }

    if (foregroundImage) {
      return (
        <motion.div
          className="mt-6 sm:mt-8"
          style={{ opacity: foregroundOpacity, y: foregroundY, scale: foregroundScale }}
        >
          <motion.img
            src={foregroundImage}
            alt={event.name}
            className="mx-auto max-w-xs md:max-w-sm h-auto drop-shadow-2xl"
            animate={{ y: [0, -20, 0], rotate: [0, 1.5, -1.5, 0] }}
            transition={{
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
            }}
          />
        </motion.div>
      );
    }

    return null;
  };

  // Determine layout order based on index
  const isTextFirst = index === 2 || index === 3 || index === 4;

  return (
    <div 
      ref={ref}
      className="h-screen w-full m-0 p-0"
      style={{ zIndex: index + 1, margin: 0, padding: 0, height: '100vh', minHeight: '100vh' }}
    >
      <div className="relative h-full w-full overflow-hidden m-0 p-0" style={{ margin: 0, padding: 0, height: '100%' }}>
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            y: backgroundY,
            scale: backgroundScale,
            width: '100%',
            height: '100%',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        {/* Decorative Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-gold/10 blur-3xl"
          style={{ opacity: decorativeOpacity, y: decorativeY }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-burgundy/10 blur-3xl"
          style={{ opacity: decorativeOpacity, y: decorativeY }}
        />
        
        {/* Effects */}
        {effect === 'marigold' && <MarigoldShower isActive={true} />}
        {effect === 'fireworks' && <FireworksEffect isActive={true} />}

        {/* Event Number */}
        <motion.div
          className="absolute top-6 right-6 z-20"
          style={{ opacity: eventNumberOpacity, y: eventNumberY }}
        >
          <span className="text-cream/70 font-body text-sm md:text-base tracking-[0.3em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-light">
            Event {index + 1} of {totalCards}
          </span>
        </motion.div>

        {/* Content Container */}
        <motion.div 
          className={`relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 ${
            index === 2 ? 'pt-64' : index === 3 ? 'pt-16 sm:pt-24' : index === 4 ? 'pt-12 sm:pt-16' : 'pt-16'
          }`}
          style={{ y: contentY, opacity: contentOpacity, minHeight: '100%' }}
        >
          <div className="max-w-2xl mx-auto text-center">
            {isTextFirst ? (
              <>
                {renderTextContent()}
                {renderMedia()}
              </>
            ) : (
              <>
                {renderMedia()}
                {renderTextContent()}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventCard;
