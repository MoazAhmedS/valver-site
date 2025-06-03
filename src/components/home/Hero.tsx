
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0">
        <motion.img 
          src="uploads/7a496881-829d-446b-91e5-9f4b65153623.png" 
          alt="Dark fashion portrait"
          className="w-full h-full object-cover opacity-70"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-playfair text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            BORN TO BE
            <br />
            <motion.span 
              className="italic"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            >
              HANDLED
            </motion.span>
            <br />
            WITH FLAIR
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
          >
            Discover premium men's fashion that embodies sophistication, style, and unmatched quality.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3, ease: "easeOut" }}
          >
            <Button size="lg" className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-200 hover:text-black transition-all duration-300 hover:scale-105">
              Shop Collection
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-200 hover:text-black transition-all duration-300 hover:scale-105">
              Explore Studio
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
