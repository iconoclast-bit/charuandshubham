import { motion } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';

interface CalendarButtonProps {
  eventName: string;
  date: string;
  time: string;
  location: string;
  description?: string;
}

const CalendarButton = ({ eventName, date, time, location, description }: CalendarButtonProps) => {
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
      href={generateGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-full text-sm text-cream font-body transition-all duration-300 mt-4"
    >
      <CalendarPlus className="w-4 h-4 text-gold" />
      <span>Add to Calendar</span>
    </motion.a>
  );
};

export default CalendarButton;
