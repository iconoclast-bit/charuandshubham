import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const RSVPButton = () => {
  const phoneNumber = "919023021642"; // +91 9023021642 without + and spaces
  const whatsappMessage = encodeURIComponent(
    "Hi Charu & Shubham! I would love to attend your wedding. - [Name]"
  );
  // WhatsApp link with phone number and pre-filled message
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  
  // Alternative: Direct phone call link (uncomment if preferred)
  // const phoneLink = `tel:+91${phoneNumber}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 2.5 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-3 bg-gradient-gold text-primary-foreground font-body font-semibold rounded-full shadow-gold animate-pulse-glow cursor-pointer"
    >
      <Send className="w-5 h-5" />
      <span>Send RSVP</span>
    </motion.a>
  );
};

export default RSVPButton;
