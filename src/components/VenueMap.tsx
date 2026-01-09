import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface VenueMapProps {
  name: string;
  address: string;
  mapQuery: string;
}

const VenueMap = ({ name, address, mapQuery }: VenueMapProps) => {
  const encodedQuery = encodeURIComponent(mapQuery);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 hover:border-gold/50 transition-all duration-500 overflow-hidden"
    >
      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-burgundy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-burgundy/10 to-transparent rounded-tr-full" />

      {/* Icon with Animated Ring */}
      <div className="relative mb-4">
        <motion.div 
          className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          <MapPin className="w-7 h-7 text-primary-foreground" />
        </motion.div>
        <motion.div
          className="absolute inset-0 w-14 h-14 rounded-full border-2 border-gold/40"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Venue Info */}
      <div className="relative z-10 mb-5">
        <h4 className="font-heading text-xl text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
          {name}
        </h4>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">
          {address}
        </p>
      </div>

      {/* Action Buttons - Modern Style */}
      <div className="relative z-10 flex gap-3">
        <motion.a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-background/60 hover:bg-background border border-gold/20 hover:border-gold/40 rounded-xl text-sm text-foreground font-medium transition-all duration-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink className="w-4 h-4 text-gold" />
          View
        </motion.a>
        <motion.a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-gold text-primary-foreground rounded-xl text-sm font-medium shadow-gold transition-all duration-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Navigation className="w-4 h-4" />
          Navigate
        </motion.a>
      </div>
    </motion.div>
  );
};

export default VenueMap;