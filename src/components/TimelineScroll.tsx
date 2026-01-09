import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import EventCard from './EventCard';

interface Event {
  name: string;
  date: string;
  time: string;
  location: string;
  note?: string;
  asset?: string;
  assets?: string[]; // Support for multiple foreground images
  video?: string;
  bg: string;
  effect?: 'marigold' | 'fireworks' | 'none';
}

interface TimelineScrollProps {
  events: Event[];
}

const TimelineScroll = ({ events }: TimelineScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  // FILTER LOGIC:
  // 1. Remove "Mehandi"
  // 2. Remove "Haldi" (BUT keep "Phoolon ki Haldi")
  const visibleEvents = events.filter(event => {
    const name = event.name.toLowerCase();
    
    // If it's Mehandi, hide it
    if (name.includes('mehandi')) return false;
    
    // If it's Haldi (but NOT Phoolon ki Haldi), hide it
    if (name.includes('haldi') && !name.includes('phoolon')) return false;
    
    // Show everything else (Tilak, Sangeet, Wedding, Phoolon ki Haldi)
    return true;
  });

  return (
    <section 
      ref={containerRef} 
      className="relative m-0 p-0"
      style={{ 
        margin: 0, 
        padding: 0,
      }}
    >
      {/* Event Cards - Continuous Scroll */}
      <div className="relative" style={{ margin: 0, padding: 0 }}>
        {visibleEvents.map((event) => {
          // CRITICAL: Find the REAL index from the original list
          // This ensures your animation logic (index === 3, index === 4) works perfectly
          // even though some previous pages are hidden.
          const originalIndex = events.indexOf(event);
          
          // Use the loop index for refs (0, 1, 2...)
          const loopIndex = visibleEvents.indexOf(event);

          // Track scroll progress for this specific event section
          const eventRef = useRef<HTMLDivElement>(null);
          
          // Store ref for IntersectionObserver
          if (!eventRefs.current[loopIndex]) {
            eventRefs.current[loopIndex] = null;
          }

          const { scrollYProgress } = useScroll({
            target: eventRef,
            offset: ["start end", "end start"]
          });

          return (
            <div
              key={event.name}
              ref={(el) => {
                eventRef.current = el;
                eventRefs.current[loopIndex] = el;
              }}
              className="relative"
              style={{
                minHeight: '100vh',
                height: '100vh',
                zIndex: loopIndex + 1,
                margin: 0,
                padding: 0,
              }}
            >
              <EventCard
                event={event}
                backgroundImage={event.bg}
                foregroundImage={event.asset}
                foregroundImages={event.assets}
                video={event.video}
                
                // IMPORTANT: Passing the original index keeps your styling intact
                index={originalIndex}
                
                effect={event.effect}
                totalCards={visibleEvents.length} // Shows "1 of 4" correctly based on visible count
                scrollProgress={scrollYProgress}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TimelineScroll;