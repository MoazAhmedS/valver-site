
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const products = [
  {
    id: 1,
    name: "Classic Blazer",
    price: "$299",
    image: `${import.meta.env.BASE_URL}uploads/fabb82a8-d5e3-4208-878b-90ee1150e514.png`,
    category: "Outerwear"
  },
  {
    id: 2,
    name: "Premium Shirt",
    price: "$129",
    image: `${import.meta.env.BASE_URL}uploads/2c3ec1f0-b898-4836-98b4-50ae23f083e7.png`,
    category: "Shirts"
  },
  {
    id: 3,
    name: "Tailored Trousers",
    price: "$189",
    image: `${import.meta.env.BASE_URL}uploads/0e6f0cb5-91c2-49d9-84d6-43e3742b70fe.png`,
    category: "Bottoms"
  },
  {
    id: 4,
    name: "Designer Suit",
    price: "$599",
    image: `${import.meta.env.BASE_URL}uploads/155e1b16-a705-459e-94e9-c7747213138d.png`,
    category: "Suits"
  },
];

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.2 
  });

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

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
      y: 50,
      scale: 0.9
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

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-playfair text-black mb-4">
            Featured
            <br />
            <span className="italic">Collection</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of premium menswear designed for the discerning gentleman.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="rounded-full p-2 text-black border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="rounded-full p-2 text-black border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <ChevronRight size={20} />
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className={`transform transition-all duration-500 ${
                  index === currentIndex ? "scale-105" : "scale-100"
                }`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <Link 
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 block"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <h3 className="text-xl font-semibold text-black mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-black">{product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
