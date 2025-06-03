
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  {
    id: 1,
    src: `${import.meta.env.BASE_URL}uploads/20250403_164252_IMG_2265.jpg`,
    alt: "Portrait in black and white"
  },
  {
    id: 2,
    src: `${import.meta.env.BASE_URL}uploads/20250403_164216_IMG_2262.jpg`,
    alt: "Elegant turtleneck portrait"
  },
  {
    id: 3,
    src: `${import.meta.env.BASE_URL}uploads/20250403_164355_IMG_2270.jpg`,
    alt: "Profile portrait"
  },
  {
    id: 4,
    src: `${import.meta.env.BASE_URL}uploads/20250403_164111_IMG_2247.jpg`,
    alt: "Dramatic lighting portrait"
  },
  {
    id: 5,
    src: `${import.meta.env.BASE_URL}uploads/20250403_164045_IMG_2253.jpg`,
    alt: "Classic shirt portrait"
  },
  {
    id: 6,
    src: `${import.meta.env.BASE_URL}uploads/20250403_143007_IMG_2248.jpg`,
    alt: "Artistic portrait"
  }
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.2 
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-playfair text-white mb-4">
            Style
            <br />
            <span className="italic">Gallery</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our visual journey through fashion, style, and craftsmanship.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`overflow-hidden rounded-lg group cursor-pointer ${
                index % 3 === 0 ? "sm:row-span-2" : ""
              }`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
