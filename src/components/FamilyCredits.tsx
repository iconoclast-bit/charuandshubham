import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FamilyCredits = () => {
  const brideFamily = {
    title: "Bride's Family",
    parents: "Mr. Jai Prakash & Mrs. Sweta Srivastava",
    sibling: "Brother: Ayush Srivastava",
  };

  const groomFamily = {
    title: "Groom's Family",
    parents: "Mr. Rajeev Bhushan & Mrs. Abha Srivastava",
    sibling: "Sister: Mrs. Shubhangi Srivastava",
  };

  const FamilyCard = ({ family, delay }: { family: typeof brideFamily; delay: number }) => (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-2xl border border-gold/20 shadow-elegant"
    >
      <h3 className="font-display text-3xl text-gold mb-4">{family.title}</h3>
      <p className="font-heading text-lg text-foreground mb-2">{family.parents}</p>
      <p className="font-body text-muted-foreground">{family.sibling}</p>
    </motion.div>
  );

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-5xl md:text-6xl text-gradient-gold mb-4">
            Our Families
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-0.5 bg-gradient-gold" />
            <Heart className="w-6 h-6 text-gold fill-gold" />
            <div className="w-16 h-0.5 bg-gradient-gold" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <FamilyCard family={brideFamily} delay={0.2} />
          <FamilyCard family={groomFamily} delay={0.4} />
        </div>
      </div>
    </section>
  );
};

export default FamilyCredits;
