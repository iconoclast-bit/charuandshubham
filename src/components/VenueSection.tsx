import { motion } from 'framer-motion';
import VenueMap from './VenueMap';

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
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-gold/10 border border-gold/30 rounded-full text-sm text-gold font-body tracking-wider uppercase mb-4">
            Find Your Way
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-gold mb-4">
            Venue Locations
          </h2>
          <p className="font-heading text-lg text-muted-foreground italic max-w-lg mx-auto">
            All the places where we'll celebrate our union
          </p>
        </motion.div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
