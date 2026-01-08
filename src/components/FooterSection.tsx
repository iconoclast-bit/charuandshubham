import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import { Heart, Sparkles } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="relative py-20 px-6 bg-midnight overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-burgundy blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Countdown Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-gold" />
            <h3 className="font-body text-sm text-cream/70 uppercase tracking-widest">
              Counting Down To
            </h3>
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-8">
            The Big Day
          </h2>
          <CountdownTimer />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-48 h-0.5 bg-gradient-gold mx-auto mb-12"
        />

        {/* Final Message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="font-heading text-xl text-cream/80 italic mb-6">
            "Two souls, one heart, forever as one"
          </p>
          <div className="flex items-center justify-center gap-2 text-cream/60">
            <span className="font-body text-sm">Made with</span>
            <Heart className="w-4 h-4 text-burgundy-light fill-burgundy-light" />
            <span className="font-body text-sm">for #SHURU</span>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 font-body text-xs text-cream/40"
        >
          © 2026 Shubham & Charu Wedding
        </motion.p>
      </div>
    </footer>
  );
};

export default FooterSection;
