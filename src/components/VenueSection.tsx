import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

const venues = [
  {
    name: "Gurjar Bhavan",
    address: "Sector 16, Faridabad",
    mapQuery: "Gurjar+Bhavan+Sector+16+Faridabad+Haryana+India"
  },
  {
    name: "Kisan Bhavan",
    address: "Sector 16, Faridabad",
    mapQuery: "Kisan+Bhavan+Sector+16+Faridabad+Haryana+India"
  },
  {
    name: "The Grand Ambience",
    address: "Faridabad-Gurgaon Road",
    mapQuery: "The+Grand+Ambience+Faridabad+Gurgaon+Road+Haryana+India"
  }
];

const VenueSection = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-background to-background/95 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl text-gold mb-3">
            Venue Locations
          </h2>
          <div className="w-24 h-0.5 bg-gradient-gold mx-auto" />
        </motion.div>

        {/* Elegant Venue List */}
        <div className="space-y-4">
          {venues.map((venue, index) => (
            <motion.a
              key={venue.name}
              href={`https://www.google.com/maps/search/?api=1&query=${venue.mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 10 }}
              className="group flex items-center justify-between p-4 md:p-6 bg-gold/5 hover:bg-gold/10 border border-gold/20 hover:border-gold/40 rounded-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg md:text-xl text-foreground group-hover:text-gold transition-colors">
                    {venue.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {venue.address}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
