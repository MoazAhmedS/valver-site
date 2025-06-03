
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface ProductData {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  features: string[];
  category: string;
  stock?: number;
  image?: string;
}

const defaultProductData: Record<string, ProductData> = {
  "1": {
    id: 1,
    name: "Classic Blazer",
    price: 299,
    description: "A timeless classic blazer crafted from premium wool blend. Perfect for both formal occasions and smart-casual styling. Features a tailored fit with natural shoulder construction and functional buttonholes.",
    images: [
      `${import.meta.env.BASE_URL}uploads/fabb82a8-d5e3-4208-878b-90ee1150e514.png`,
      `${import.meta.env.BASE_URL}uploads/2c3ec1f0-b898-4836-98b4-50ae23f083e7.png`,
      `${import.meta.env.BASE_URL}uploads/0e6f0cb5-91c2-49d9-84d6-43e3742b70fe.png`
    ],
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["Premium wool blend", "Tailored fit", "Natural shoulder", "Functional buttons"],
    category: "Outerwear"
  },
  "2": {
    id: 2,
    name: "Premium Shirt",
    price: 129,
    description: "Luxuriously soft cotton shirt with impeccable tailoring. Features mother-of-pearl buttons and French seams for durability and elegance.",
    images: [
      `${import.meta.env.BASE_URL}uploads/2c3ec1f0-b898-4836-98b4-50ae23f083e7.png`,
      `${import.meta.env.BASE_URL}uploads/fabb82a8-d5e3-4208-878b-90ee1150e514.png`
    ],
    colors: ["White", "Light Blue", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    features: ["100% Cotton", "Mother-of-pearl buttons", "French seams", "Non-iron finish"],
    category: "Shirts"
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductData | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    // First try to load from admin products
    const storedProducts = localStorage.getItem('admin-products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        const foundProduct = parsedProducts.find((p: any) => p.id.toString() === id);
        
        if (foundProduct) {
          // Convert admin product format to product detail format
          const convertedProduct: ProductData = {
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
            description: foundProduct.description || "Premium quality item crafted with attention to detail.",
            images: foundProduct.image ? [foundProduct.image] : [`${import.meta.env.BASE_URL}uploads/fabb82a8-d5e3-4208-878b-90ee1150e514.png`],
            colors: foundProduct.colors || ["Black", "Navy", "Gray"],
            sizes: foundProduct.sizes || ["S", "M", "L", "XL"],
            features: ["Premium quality", "Expert craftsmanship", "Modern design", "Comfortable fit"],
            category: foundProduct.category,
            stock: foundProduct.stock
          };
          setProduct(convertedProduct);
          return;
        }
      } catch (error) {
        console.error('Error loading product from localStorage:', error);
      }
    }

    // Fallback to default product data
    const defaultProduct = defaultProductData[id];
    if (defaultProduct) {
      setProduct(defaultProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size");
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-black" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold font-playfair mb-4">{product.name}</h1>
              <p className="text-2xl font-bold mb-6">${product.price}</p>
              
              <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-black hover:bg-gray-800"
                  size="lg"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart  className=" text-black" size={20} />
                </Button>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stock Information */}
              {product.stock !== undefined && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Stock: <span className="font-semibold">{product.stock} items available</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
