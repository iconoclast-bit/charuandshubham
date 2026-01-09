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
        {events.map((event, index) => {
          // Track scroll progress for this specific event section
          const eventRef = useRef<HTMLDivElement>(null);
          
          // Store ref for IntersectionObserver
          if (!eventRefs.current[index]) {
            eventRefs.current[index] = null;
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
                eventRefs.current[index] = el;
              }}
              className="relative"
              style={{
                minHeight: '100vh',
                height: '100vh',
                zIndex: index + 1,
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
                index={index}
                effect={event.effect}
                totalCards={events.length}
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
