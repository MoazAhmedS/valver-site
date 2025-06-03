
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Studio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "0px",
    amount: 0.3 
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gray-955">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold font-playfair text-white mb-6"
              variants={itemVariants}
            >
              Our Creative
              <br />
              <span className="italic">Studio</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Where craftsmanship meets innovation. Our studio is the heart of VALVER, 
              where every piece is meticulously designed and crafted to perfection. 
              We believe in creating timeless pieces that speak to the modern gentleman.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                <p className="text-gray-400">Unique Designs</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-white mb-2">10+</h3>
                <p className="text-gray-400">Years Experience</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-white mb-2">100%</h3>
                <p className="text-gray-400">Quality Assured</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
                <p className="text-gray-400">Customer Support</p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={imageVariants}>
            <img 
              src={`${import.meta.env.BASE_URL}uploads/20250403_164131_IMG_2257.JPG`} 
              alt="Studio workspace"
              className="w-full h-[600px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Studio;
