import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
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
  video?: string;
  index: number;
  effect?: 'marigold' | 'fireworks' | 'none';
  totalCards: number;
}

const EventCard = ({ 
  event, 
  backgroundImage, 
  foregroundImage, 
  video,
  index, 
  effect = 'none',
  totalCards 
}: EventCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Background moves slower (parallax depth)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  
  // Content fades and moves
  const contentY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Foreground image parallax (moves opposite direction for depth)
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const foregroundRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  
  // Decorative elements parallax
  const decorativeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const decorativeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={ref}
      className="sticky top-0 min-h-screen w-full"
      style={{ 
        zIndex: index + 1,
      }}
    >
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            y: backgroundY,
            scale: backgroundScale,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        {/* Floating Decorative Orbs with Parallax */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-gold/10 blur-3xl"
          style={{
            scale: decorativeScale,
            opacity: decorativeOpacity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-burgundy/10 blur-3xl"
          style={{
            scale: decorativeScale,
            opacity: decorativeOpacity,
          }}
        />
        
        {/* Effects */}
        {effect === 'marigold' && <MarigoldShower isActive={true} />}
        {effect === 'fireworks' && <FireworksEffect isActive={true} />}

        {/* Content Container with Parallax */}
        <motion.div 
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16"
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
        >
          {/* Card Content */}
          <div className="max-w-2xl mx-auto text-center">
            {/* Event Number Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-1.5 bg-gold/20 backdrop-blur-md border border-gold/40 text-cream font-body text-xs tracking-widest uppercase rounded-full shadow-lg">
                Event {index + 1} of {totalCards}
              </span>
            </motion.div>

            {/* Foreground Image or Video with Enhanced Parallax */}
            {video ? (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
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
            ) : foregroundImage && (
              <motion.div
                className="mb-8"
                style={{
                  y: foregroundY,
                  rotate: foregroundRotate,
                }}
              >
                <motion.img
                  initial={{ scale: 0.7, opacity: 0, y: 50 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  viewport={{ once: true }}
                  src={foregroundImage}
                  alt={event.name}
                  className="mx-auto max-w-xs md:max-w-sm h-auto drop-shadow-2xl"
                />
              </motion.div>
            )}

            {/* Event Name with Stagger */}
            <motion.h2
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1, 
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl text-cream mb-4 drop-shadow-lg"
            >
              {event.name}
            </motion.h2>

            {/* Event Details */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.9, 
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="space-y-4 mt-8"
            >
              {/* Date & Time */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                <motion.div 
                  className="flex items-center gap-2 text-cream/90 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="w-5 h-5 text-gold" />
                  <span className="font-heading text-lg">{event.date}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-cream/90 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock className="w-5 h-5 text-gold" />
                  <span className="font-heading text-lg">{event.time}</span>
                </motion.div>
              </div>

              {/* Location */}
              <motion.div 
                className="flex items-center justify-center gap-2 text-cream/80"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="w-5 h-5 text-gold" />
                <span className="font-body text-base">{event.location}</span>
              </motion.div>

              {/* Note */}
              {event.note && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-block px-4 py-2 bg-gold/20 backdrop-blur-md border border-gold/30 rounded-lg text-cream font-body text-sm italic shadow-lg">
                    {event.note}
                  </span>
                </motion.div>
              )}

              {/* Calendar Integration */}
              <CalendarButton
                eventName={event.name}
                date={event.date}
                time={event.time}
                location={event.location}
                description={event.note}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Corners with Parallax */}
        <motion.div 
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gold/40"
          style={{ opacity: decorativeOpacity, scale: decorativeScale }}
        />
        <motion.div 
          className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-gold/40"
          style={{ opacity: decorativeOpacity, scale: decorativeScale }}
        />
        <motion.div 
          className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-gold/40"
          style={{ opacity: decorativeOpacity, scale: decorativeScale }}
        />
        <motion.div 
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gold/40"
          style={{ opacity: decorativeOpacity, scale: decorativeScale }}
        />
      </div>
    </div>
  );
};

export default EventCard;