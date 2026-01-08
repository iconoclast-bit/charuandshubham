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
  foregroundImages?: string[]; // Support for multiple foreground images
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

  // Detect mobile viewport for responsive positioning
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Background parallax - moves very slowly to create strong parallax effect
  // Background moves only 5% while content moves much faster
  const backgroundY = useTransform(scrollProgress, [0, 1], ["0%", "5%"]);
  const backgroundScale = useTransform(scrollProgress, [0, 0.5, 1], [0.95, 1, 1.02]);
  
  // Content parallax - moves significantly faster than background (negative Y = moves up faster)
  // Elements fade in when section is 20% visible, fully visible at 40%
  // Increased speed: content moves -80px to -120px while background moves only 5%
  const contentOpacity = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [0, 0, 1, 1, 0.8]);
  const contentY = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [60, 30, 0, -80, -150]);
  
  // Foreground image fade-in with faster parallax
  // Foreground elements move even faster than content
  const foregroundOpacity = useTransform(scrollProgress, [0, 0.15, 0.35, 0.8, 1], [0, 0, 1, 1, 0.8]);
  const foregroundY = useTransform(scrollProgress, [0, 0.15, 0.35, 0.8, 1], [100, 60, 0, -100, -180]);
  const foregroundScale = useTransform(scrollProgress, [0, 0.15, 0.35, 0.8, 1], [0.8, 0.9, 1, 1, 0.95]);
  
  // Event name fade-in with faster parallax
  // For Wedding (index 4), title moves to upper position when fully scrolled
  // Responsive positioning for mobile devices - uses viewport-based calculation
  const titleOpacity = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [0, 0, 1, 1, 0.8]);
  const titleY = index === 4
    ? isMobile
      ? useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [70, 35, 0, -50, "-25vh"]) // Mobile: uses viewport height for consistent alignment
      : useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [70, 35, 0, -120, -280]) // Desktop: moves higher to match image position
    : useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [70, 35, 0, -90, -170]); // Other pages: original
  
  // Details fade-in (slightly delayed) with faster parallax
  const detailsOpacity = useTransform(scrollProgress, [0, 0.25, 0.45, 0.8, 1], [0, 0, 1, 1, 0.8]);
  const detailsY = useTransform(scrollProgress, [0, 0.25, 0.45, 0.8, 1], [60, 30, 0, -70, -140]);
  
  // Event number fade-in with parallax
  const eventNumberOpacity = useTransform(scrollProgress, [0, 0.1, 0.3, 0.8, 1], [0, 0, 1, 1, 0.8]);
  const eventNumberY = useTransform(scrollProgress, [0, 0.1, 0.3, 0.8, 1], [30, 15, 0, -40, -80]);
  
  // Decorative elements with parallax
  const decorativeOpacity = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [0, 0, 0.6, 0.6, 0.3]);
  const decorativeY = useTransform(scrollProgress, [0, 0.2, 0.4, 0.8, 1], [0, 0, 0, -30, -60]);

  // Button blur - increases when scrollProgress > 60% for better readability
  const buttonBlur = useTransform(scrollProgress, [0, 0.5, 0.6, 1], [12, 12, 40, 40]);
  const [currentButtonBlur, setCurrentButtonBlur] = useState(12);

  useMotionValueEvent(buttonBlur, "change", (latest) => {
    setCurrentButtonBlur(latest);
  });

  return (
    <div 
      ref={ref}
      className="h-screen w-full m-0 p-0"
      style={{ 
        zIndex: index + 1,
        margin: 0,
        padding: 0,
        height: '100vh',
        minHeight: '100vh',
      }}
    >
      <div className="relative h-full w-full overflow-hidden m-0 p-0" style={{ margin: 0, padding: 0, height: '100%' }}>
        {/* Background Image - Full Size */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            y: backgroundY,
            scale: backgroundScale,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
        />
        
        {/* Gradient Overlay - Subtle for readability */}
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        {/* Floating Decorative Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-gold/10 blur-3xl"
          style={{
            opacity: decorativeOpacity,
            y: decorativeY,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-burgundy/10 blur-3xl"
          style={{
            opacity: decorativeOpacity,
            y: decorativeY,
          }}
        />
        
        {/* Effects */}
        {effect === 'marigold' && <MarigoldShower isActive={true} />}
        {effect === 'fireworks' && <FireworksEffect isActive={true} />}

        {/* Event Number - Blended on background */}
        <motion.div
          className="absolute top-6 right-6 z-20"
          style={{ 
            opacity: eventNumberOpacity,
            y: eventNumberY,
          }}
        >
          <span className="text-cream/70 font-body text-sm md:text-base tracking-[0.3em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-light">
            Event {index + 1} of {totalCards}
          </span>
        </motion.div>

        {/* Content Container - Scroll-triggered fade-in */}
        <motion.div 
          className={`relative z-10 h-full flex flex-col items-center justify-center px-6 ${index === 2 ? 'pt-64' : index === 3 ? 'pt-44' : 'pt-16'}`}
          style={{
            y: contentY,
            opacity: contentOpacity,
            minHeight: '100%',
          }}
        >
          {/* Card Content */}
          <div className="max-w-2xl mx-auto text-center">
            {/* For events with text first layout (index 2, 3, 4), show text first, then video/image */}
            {(index === 2 || index === 3 || index === 4) ? (
              <>
                {/* Event Name - Scroll-triggered fade-in with enhanced styling */}
            <motion.h2
              className={`font-display mb-4 font-bold ${index === 3 ? 'text-lg sm:text-xl md:text-2xl' : 'text-xl sm:text-2xl md:text-3xl'}`}
                style={{
                opacity: titleOpacity,
                y: titleY,
                textShadow: index === 3 
                  ? '0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)'
                  : '0 2px 10px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.5)',
                ...(index === 4 
                  ? { color: 'hsl(350, 65%, 35%)' }
                  : index === 3
                    ? { color: '#1a365d' } // Deep navy blue for Phoolon ki Haldi - high contrast on pastel
                    : {
                        background: 'linear-gradient(135deg, rgba(252, 248, 240, 1) 0%, rgba(252, 248, 240, 0.95) 50%, rgba(212, 175, 55, 0.8) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }
                ),
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
                  style={{ 
                    display: 'inline-block',
                    marginRight: '0.25em',
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* Event Details - Scroll-triggered fade-in */}
            <motion.div
              className={`space-y-4 ${index === 3 ? 'mt-4' : 'mt-8'}`}
              style={{
                opacity: detailsOpacity,
                y: detailsY,
              }}
            >
              {/* Date & Time with Glassmorphism and Enhanced Animations */}
              <div className={`flex flex-wrap items-center justify-center ${index === 3 ? 'gap-2 sm:gap-3' : 'gap-3 sm:gap-6'}`}>
                <motion.div 
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-full border shadow-lg ${
                    index === 3 
                      ? 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white/80 border-blue-300/50 text-blue-900' 
                      : 'px-2.5 py-1.5 text-xs sm:text-sm text-cream/90 bg-gradient-to-br from-background/30 via-background/25 to-background/30 border-gold/30'
                  }`}
                  style={{
                    backdropFilter: `blur(${currentButtonBlur}px)`,
                    WebkitBackdropFilter: `blur(${currentButtonBlur}px)`,
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -3,
                    boxShadow: index === 3 ? "0 10px 30px rgba(59, 130, 246, 0.3)" : "0 10px 30px rgba(212, 175, 55, 0.3)",
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Calendar className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${index === 3 ? 'text-blue-600' : 'text-gold'}`} />
                  </motion.div>
                  <span className="font-heading font-medium">{event.date}</span>
                </motion.div>
                <motion.div 
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-full border shadow-lg ${
                    index === 3 
                      ? 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white/80 border-blue-300/50 text-blue-900' 
                      : 'px-2.5 py-1.5 text-xs sm:text-sm text-cream/90 bg-gradient-to-br from-background/30 via-background/25 to-background/30 border-gold/30'
                  }`}
                  style={{
                    backdropFilter: `blur(${currentButtonBlur}px)`,
                    WebkitBackdropFilter: `blur(${currentButtonBlur}px)`,
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -3,
                    boxShadow: index === 3 ? "0 10px 30px rgba(59, 130, 246, 0.3)" : "0 10px 30px rgba(212, 175, 55, 0.3)",
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${index === 3 ? 'text-blue-600' : 'text-gold'}`} />
                  </motion.div>
                  <span className="font-heading font-medium">{event.time}</span>
                </motion.div>
              </div>

              {/* Location with Enhanced Styling */}
              <motion.div 
                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-full ${
                  index === 3 
                    ? 'px-3 py-1.5 sm:px-4 sm:py-2 bg-white/70 text-blue-900 border border-blue-200/50' 
                    : 'px-2 py-1 text-cream/90 bg-background/10'
                }`}
                style={{
                  backdropFilter: `blur(${currentButtonBlur}px)`,
                  WebkitBackdropFilter: `blur(${currentButtonBlur}px)`,
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: index === 3 ? "rgba(255, 255, 255, 0.85)" : "rgba(252, 248, 240, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${index === 3 ? 'text-blue-600' : 'text-gold'}`} />
                </motion.div>
                <span className={`font-body text-xs sm:text-sm font-medium`}>{event.location}</span>
              </motion.div>

              {/* Note with Glassmorphism */}
              {event.note && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  style={{
                    backdropFilter: `blur(${currentButtonBlur}px)`,
                    WebkitBackdropFilter: `blur(${currentButtonBlur}px)`,
                  }}
                >
                  <span className="inline-block px-4 py-2 bg-gradient-to-br from-gold/25 via-gold/20 to-gold/25 border border-gold/40 rounded-lg text-cream font-body text-sm italic shadow-lg hover:shadow-gold transition-all duration-300">
                    {event.note}
                  </span>
                </motion.div>
              )}

              {/* Calendar Integration */}
              <div className={index === 3 ? 'scale-90' : ''}>
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

                {/* Foreground Image or Video - After text for events 2, 3, 4 */}
                {video ? (
                  <motion.div
                    className={index === 4 ? "mt-20" : "mt-8"}
                    style={{
                      opacity: foregroundOpacity,
                      y: foregroundY,
                      scale: foregroundScale,
                    }}
                  >
                    <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border-4 border-gold/40 shadow-gold">
                      <video
                        src={video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto"
                      />
          </div>
        </motion.div>
                ) : foregroundImages && foregroundImages.length > 0 ? (
                  <motion.div
                    className="mt-8 flex items-center justify-center gap-4 md:gap-6 flex-wrap"
                    style={{
                      opacity: foregroundOpacity,
                      y: foregroundY,
                      scale: foregroundScale,
                    }}
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
                          y: {
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: imgIndex * 0.3,
                          },
                          rotate: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: imgIndex * 0.2 + 0.2,
                          },
                        }}
                      />
                    ))}
                  </motion.div>
                ) : foregroundImage && (
                  <motion.div
                    className="mt-8"
                    style={{
                      opacity: foregroundOpacity,
                      y: foregroundY,
                      scale: foregroundScale,
                    }}
                  >
                    <motion.img
                      src={foregroundImage}
                      alt={event.name}
                      className="mx-auto max-w-xs md:max-w-sm h-auto drop-shadow-2xl"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 1.5, -1.5, 0],
                      }}
                      transition={{
                        y: {
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        rotate: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2,
                        },
                      }}
                    />
                  </motion.div>
                )}
              </>
            ) : (
              <>
                {/* Foreground Image or Video - Scroll-triggered fade-in */}
                {video ? (
        <motion.div 
                    className="mb-8"
                    style={{
                      opacity: foregroundOpacity,
                      y: foregroundY,
                      scale: foregroundScale,
                    }}
                  >
                    <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border-4 border-gold/40 shadow-gold">
                      <video
                        src={video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto"
                      />
                    </div>
                  </motion.div>
                ) : foregroundImages && foregroundImages.length > 0 && index !== 0 ? (
                  // Multiple foreground images (caricatures) - side by side (not for index 0)
        <motion.div 
                    className="mb-8 flex items-center justify-center gap-4 md:gap-6 flex-wrap"
                    style={{
                      opacity: foregroundOpacity,
                      y: foregroundY,
                      scale: foregroundScale,
                    }}
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
                          y: {
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: imgIndex * 0.3,
                          },
                          rotate: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: imgIndex * 0.2 + 0.2,
                          },
                        }}
                      />
                    ))}
                  </motion.div>
                ) : foregroundImage && index !== 0 && (
                  // Single foreground image
        <motion.div 
                    className="mb-8"
                    style={{
                      opacity: foregroundOpacity,
                      y: foregroundY,
                      scale: foregroundScale,
                    }}
                  >
                    <motion.img
                      src={foregroundImage}
                      alt={event.name}
                      className="mx-auto max-w-xs md:max-w-sm h-auto drop-shadow-2xl"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 1.5, -1.5, 0],
                      }}
                      transition={{
                        y: {
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        rotate: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2,
                        },
                      }}
                    />
                  </motion.div>
                )}

                {/* Event Name - Scroll-triggered fade-in with enhanced styling */}
                <motion.h2
                  className={`font-display mb-4 font-bold ${index === 0 ? 'text-xl sm:text-2xl md:text-3xl' : 'text-xl sm:text-2xl md:text-3xl'}`}
                  style={{
                    opacity: titleOpacity,
                    y: titleY,
                    textShadow: index === 0 
                      ? '0 2px 10px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7), 0 0 50px rgba(0,0,0,0.5)'
                      : '0 2px 10px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.5)',
                    ...(index === 4 
                      ? { color: 'hsl(350, 65%, 35%)' }
                      : index === 0
                        ? { color: '#fcf8f0' } // Pure cream white for Haldi - maximum contrast
                        : {
                            background: 'linear-gradient(135deg, rgba(252, 248, 240, 1) 0%, rgba(252, 248, 240, 0.95) 50%, rgba(212, 175, 55, 0.8) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }
                    ),
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
                      style={{ 
                        display: 'inline-block',
                        marginRight: '0.25em',
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h2>

                {/* Event Details - Scroll-triggered fade-in */}
                <motion.div
                  className={`space-y-4 ${index === 3 ? 'mt-4' : 'mt-8'}`}
                  style={{
                    opacity: detailsOpacity,
                    y: detailsY,
                  }}
                >
                  {/* Date & Time with Glassmorphism and Enhanced Animations */}
                  <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-6`}>
                    <motion.div 
                      className={`flex items-center gap-1.5 sm:gap-2 rounded-full border shadow-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm ${
                        index === 0 
                          ? 'bg-black/40 border-gold/40 text-cream' 
                          : 'text-cream/90 bg-gradient-to-br from-background/30 via-background/25 to-background/30 border-gold/30'
                      }`}
                      style={{
                        backdropFilter: `blur(${currentButtonBlur}px)`,
                        WebkitBackdropFilter: `blur(${currentButtonBlur}px)`,
                      }}
                      whileHover={{ 
                        scale: 1.08, 
                        y: -3,
                        boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)",
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Calendar className="text-gold w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </motion.div>
                      <span className="font-heading font-medium">{event.date}</span>
                    </motion.div>
                    <motion.div 
                      className={`flex items-center gap-1.5 sm:gap-2 rounded-full border shadow-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm ${
                        index === 0 
                          ? 'bg-black/40 border-gold/40 text-cream' 
                          : 'text-cream/90 bg-gradient-to-br from-background/30 via-background/25 to-background/30 border-gold/30'
                      }`}
                      style={{
                        backdropFilter: `blur(${currentButtonBlur}px)`,
                        WebkitBackdropFilter: `blur(${currentButtonBlur}px)`,
                      }}
                      whileHover={{ 
                        scale: 1.08, 
                        y: -3,
                        boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)",
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Clock className="text-gold w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </motion.div>
                      <span className="font-heading font-medium">{event.time}</span>
                    </motion.div>
                  </div>

                  {/* Location with Enhanced Styling */}
                  <motion.div 
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 ${
                      index === 0 
                        ? 'bg-black/40 text-cream border border-gold/30' 
                        : 'text-cream/90 bg-background/10'
                    }`}
                    style={{
                      backdropFilter: `blur(${currentButtonBlur}px)`,
                      WebkitBackdropFilter: `blur(${currentButtonBlur}px)`,
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: index === 0 ? "rgba(0, 0, 0, 0.5)" : "rgba(252, 248, 240, 0.15)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <MapPin className="text-gold w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </motion.div>
                    <span className="font-body text-xs sm:text-sm font-medium">{event.location}</span>
                  </motion.div>

                  {/* Note with Glassmorphism */}
                  {event.note && (
        <motion.div 
                      className="mt-4"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      style={{
                        backdropFilter: `blur(${currentButtonBlur}px)`,
                        WebkitBackdropFilter: `blur(${currentButtonBlur}px)`,
                      }}
                    >
                      <span className="inline-block px-2 py-1 bg-gradient-to-br from-gold/25 via-gold/20 to-gold/25 border border-gold/40 rounded-lg text-cream font-body text-xs italic shadow-lg hover:shadow-gold transition-all duration-300">
                        {event.note}
                      </span>
                    </motion.div>
                  )}

                  {/* Calendar Integration */}
                  <div className={index === 3 ? 'scale-90' : ''}>
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
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventCard;