import { motion } from 'framer-motion';
import VenueMap from './VenueMap';
import { MapPin } from 'lucide-react';

const venues = [
  {
    name: "Gurjar Bhavan",
    address: "Sector 16, Faridabad, Haryana",
    mapQuery: "Gurjar Bhavan, Sector 16, Faridabad, Haryana, India"
  },
  {
    name: "Kisan Bhavan",
    address: "Sector 16, Faridabad, Haryana",
    mapQuery: "Kisan Bhavan, Sector 16, Faridabad, Haryana, India"
  },
  {
    name: "The Grand Ambience",
    address: "Faridabad-Gurgaon Road, Haryana",
    mapQuery: "The Grand Ambience, Faridabad Gurgaon Road, Haryana, India"
  }
];

const VenueSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-background to-midnight/5 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Decorative Line Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--gold)) 0, hsl(var(--gold)) 1px, transparent 0, transparent 50%)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full shadow-gold mb-6"
          >
            <MapPin className="w-8 h-8 text-primary-foreground" />
          </motion.div>

          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="block text-sm text-gold font-body tracking-[0.3em] uppercase mb-3"
          >
            Find Your Way
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl text-gold mb-4"
          >
            Venue Locations
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="font-heading text-lg text-muted-foreground italic max-w-lg mx-auto"
          >
            All the places where we'll celebrate our union
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="w-24 h-0.5 bg-gradient-gold mx-auto mt-6"
          />
        </motion.div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
            >
              <VenueMap {...venue} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueSection;