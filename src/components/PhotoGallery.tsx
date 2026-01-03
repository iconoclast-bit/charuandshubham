import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, X } from 'lucide-react';

// Elegant placeholder images with romantic themes
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop",
    alt: "Couple moment",
    span: "col-span-1 row-span-2"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop",
    alt: "Wedding celebration",
    span: "col-span-1 row-span-1"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop",
    alt: "Love story",
    span: "col-span-1 row-span-1"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&h=600&fit=crop",
    alt: "Together forever",
    span: "col-span-1 row-span-1"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=800&fit=crop",
    alt: "Indian wedding",
    span: "col-span-1 row-span-2"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
    alt: "Beautiful couple",
    span: "col-span-1 row-span-1"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop",
    alt: "Wedding rings",
    span: "col-span-1 row-span-1"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=400&fit=crop",
    alt: "Romantic moment",
    span: "col-span-2 row-span-1"
  }
];

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
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
            Our Memories
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-gold mb-4">
            Photo Gallery
          </h2>
          <p className="font-heading text-lg text-muted-foreground italic max-w-lg mx-auto">
            A glimpse into our journey of love
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${image.span}`}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Heart Icon */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/50 rounded-xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-gold/50" />
            <Heart className="w-6 h-6 text-gold fill-gold/30" />
            <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </motion.div>
      )}
    </section>
  );
};

export default PhotoGallery;
