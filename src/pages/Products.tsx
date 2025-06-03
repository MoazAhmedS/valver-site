
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string;
  category: string;
}

const defaultProducts = [
  {
    id: 1,
    name: "Classic Blazer",
    price: 299,
    image: "uploads/fabb82a8-d5e3-4208-878b-90ee1150e514.png",
    category: "Outerwear"
  },
  {
    id: 2,
    name: "Premium Shirt",
    price: 129,
    image: "uploads/2c3ec1f0-b898-4836-98b4-50ae23f083e7.png",
    category: "Shirts"
  },
  {
    id: 3,
    name: "Tailored Trousers",
    price: 189,
    image: "uploads/0e6f0cb5-91c2-49d9-84d6-43e3742b70fe.png",
    category: "Bottoms"
  },
  {
    id: 4,
    name: "Designer Suit",
    price: 599,
    image: "uploads/155e1b16-a705-459e-94e9-c7747213138d.png",
    category: "Suits"
  },
  {
    id: 5,
    name: "Casual Jacket",
    price: 249,
    image: "uploads/2c97c5bf-a49d-45cb-896e-e53ee41bcd61.png",
    category: "Outerwear"
  },
  {
    id: 6,
    name: "Dress Shirt",
    price: 159,
    image: "uploads/55070205-e7ce-4130-a3b3-97cba7bf70e2.png",
    category: "Shirts"
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('admin-products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
        setProducts(defaultProducts);
      }
    }
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map(product => product.category)))];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold font-playfair text-black mb-4">
              Our
              <br />
              <span className="italic">Collection</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of premium menswear designed for the modern gentleman.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-black text-white" : "border-black text-black hover:bg-black hover:text-white"}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <h3 className="text-xl font-semibold text-black mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-black mb-4">${product.price}</p>
                  <Button className="w-full bg-black hover:bg-gray-800">
                    View Details
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
