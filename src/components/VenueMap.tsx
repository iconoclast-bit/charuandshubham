import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

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
      className="bg-background/50 backdrop-blur-sm border border-gold/20 rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-300"
    >
      {/* Map Embed */}
      <div className="relative h-48 bg-muted">
        <iframe
          src={`https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${name}`}
          className="grayscale-[30%] contrast-[1.1]"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent" />
      </div>

      {/* Venue Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-heading text-lg text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-lg text-sm text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Map
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-gold text-primary-foreground rounded-lg text-sm font-medium transition-transform hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default VenueMap;
