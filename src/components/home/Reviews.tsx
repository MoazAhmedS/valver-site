
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const reviews = [
  {
    id: 1,
    name: "Alexander Chen",
    role: "Executive",
    content: "The quality is exceptional. Every piece I've purchased from VALVER has exceeded my expectations. The attention to detail is remarkable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Entrepreneur", 
    content: "VALVER understands modern menswear. Their pieces are timeless yet contemporary, perfect for both business and casual occasions.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "David Thompson",
    role: "Creative Director",
    content: "The craftsmanship is unparalleled. VALVER has become my go-to brand for sophisticated, well-tailored clothing that makes a statement.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop&crop=face"
  }
];

const Reviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
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
      y: 50,
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

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-playfair text-black mb-4">
            What Our
            <br />
            <span className="italic">Customers Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their VALVER experience.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reviews.map((review) => (
            <motion.div 
              key={review.id} 
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="flex items-center mb-6"
                variants={itemVariants}
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-black">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex mb-4"
                variants={itemVariants}
              >
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </motion.div>
              
              <motion.p 
                className="text-gray-700 leading-relaxed italic"
                variants={itemVariants}
              >
                "{review.content}"
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
