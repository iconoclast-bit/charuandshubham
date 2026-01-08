import { motion, useMotionValue, useSpring, MotionValue, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { CalendarPlus } from 'lucide-react';

interface CalendarButtonProps {
  eventName: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  buttonBlur?: MotionValue<number>;
}

const CalendarButton = ({ eventName, date, time, location, description, buttonBlur }: CalendarButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [blurValue, setBlurValue] = useState(12); // Default blur
  
  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Update blur value if buttonBlur prop is provided
  if (buttonBlur) {
    useMotionValueEvent(buttonBlur, "change", (latest) => {
      setBlurValue(latest);
    });
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    x.set(distanceX * 0.15);
    y.set(distanceY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  const generateGoogleCalendarUrl = () => {
    // Parse date and time to create proper format
    // Example: "12th Feb 2026" + "6:00 PM" -> Google Calendar format
    const dateMatch = date.match(/(\d+)\w*\s+(\w+)\s+(\d+)/);
    const timeMatch = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    
    if (!dateMatch || !timeMatch) return '#';

    const day = dateMatch[1].padStart(2, '0');
    const monthName = dateMatch[2];
    const year = dateMatch[3];
    
    const months: Record<string, string> = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
      'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    
    const month = months[monthName] || '01';
    
    let hours = parseInt(timeMatch[1]);
    const minutes = timeMatch[2];
    const period = timeMatch[3].toUpperCase();
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const hoursStr = hours.toString().padStart(2, '0');
    
    // Create start and end times (2 hour duration)
    const startDate = `${year}${month}${day}T${hoursStr}${minutes}00`;
    const endHours = (hours + 2).toString().padStart(2, '0');
    const endDate = `${year}${month}${day}T${endHours}${minutes}00`;
    
    const eventDetails = {
      text: `${eventName} - Charu & Shubham's Wedding`,
      dates: `${startDate}/${endDate}`,
      details: description || `You're invited to ${eventName} as part of Charu & Shubham's wedding celebration!`,
      location: location,
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventDetails.text,
      dates: eventDetails.dates,
      details: eventDetails.details,
      location: eventDetails.location,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <motion.a
      ref={ref}
      href={generateGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
        backdropFilter: `blur(${blurValue}px)`,
        WebkitBackdropFilter: `blur(${blurValue}px)`,
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 10px 30px rgba(212, 175, 55, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-gold/20 via-gold/15 to-gold/20 hover:from-gold/30 hover:via-gold/25 hover:to-gold/30 border border-gold/40 rounded-full text-xs text-cream font-body transition-all duration-300 mt-4 shadow-lg hover:shadow-gold relative overflow-hidden group"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <CalendarPlus className="w-2 h-2 text-gold" />
      </motion.div>
      <span className="relative z-10 font-medium">Add to Calendar</span>
    </motion.a>
  );
};

export default CalendarButton;
