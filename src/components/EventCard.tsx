import { motion, useInView } from 'framer-motion';
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
  swapLayout?: boolean;
}

const EventCard = ({ 
  event, 
  backgroundImage, 
  foregroundImage, 
  video,
  index, 
  effect = 'none',
  totalCards,
  swapLayout = false,
}: EventCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  const hasVisualContent = video || foregroundImage;

  return (
    <div 
      ref={ref}
      className="sticky top-0 min-h-screen w-full"
      style={{ 
        zIndex: index + 1,
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative min-h-screen w-full overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        {/* Effects */}
        {effect === 'marigold' && <MarigoldShower isActive={isInView} />}
        {effect === 'fireworks' && <FireworksEffect isActive={isInView} />}

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
          {/* Card Content */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto w-full"
          >
            {/* Event Number Badge */}
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 bg-gold/20 backdrop-blur-sm border border-gold/30 text-cream font-body text-xs tracking-widest uppercase rounded-full">
                Event {index + 1} of {totalCards}
              </span>
            </div>

            {/* Layout: Swapped for Sagai/Sangeet and Phoolon ki Haldi */}
            <div className={`flex flex-col ${swapLayout && hasVisualContent ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-center gap-8 lg:gap-12`}>
              
              {/* Text Content Side */}
              <div className={`flex-1 ${hasVisualContent ? 'text-center lg:text-left' : 'text-center'}`}>
                {/* Event Name */}
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="font-display text-4xl md:text-6xl lg:text-7xl text-cream mb-6 drop-shadow-lg"
                >
                  {event.name}
                </motion.h2>

                {/* Event Details */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {/* Date & Time */}
                  <div className={`flex flex-wrap items-center gap-6 ${hasVisualContent ? 'justify-center lg:justify-start' : 'justify-center'}`}>
                    <div className="flex items-center gap-2 text-cream/90">
                      <Calendar className="w-5 h-5 text-gold" />
                      <span className="font-heading text-lg">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-cream/90">
                      <Clock className="w-5 h-5 text-gold" />
                      <span className="font-heading text-lg">{event.time}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className={`flex items-center gap-2 text-cream/80 ${hasVisualContent ? 'justify-center lg:justify-start' : 'justify-center'}`}>
                    <MapPin className="w-5 h-5 text-gold" />
                    <span className="font-body text-base">{event.location}</span>
                  </div>

                  {/* Note */}
                  {event.note && (
                    <div className={hasVisualContent ? 'lg:text-left' : ''}>
                      <span className="inline-block px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-lg text-cream font-body text-sm italic">
                        {event.note}
                      </span>
                    </div>
                  )}

                  {/* Calendar Integration */}
                  <div className={hasVisualContent ? 'lg:text-left' : ''}>
                    <CalendarButton
                      eventName={event.name}
                      date={event.date}
                      time={event.time}
                      location={event.location}
                      description={event.note}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Visual Content Side (Caricature/Video) */}
              {hasVisualContent && (
                <div className="flex-1 flex items-center justify-center">
                  {video ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border-4 border-gold/40 shadow-gold">
                        <video
                          src={video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-auto object-cover"
                          style={{ marginTop: '-10px' }}
                        />
                      </div>
                    </motion.div>
                  ) : foregroundImage && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="animate-float"
                    >
                      <img
                        src={foregroundImage}
                        alt={event.name}
                        className="mx-auto max-w-xs md:max-w-sm lg:max-w-md h-auto drop-shadow-2xl"
                      />
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gold/40" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-gold/40" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-gold/40" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gold/40" />
      </motion.div>
    </div>
  );
};

export default EventCard;
