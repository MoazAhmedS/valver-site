
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Studio from "@/components/home/Studio";
import ProductSlider from "@/components/home/ProductSlider";
import Reviews from "@/components/home/Reviews";
import Gallery from "@/components/home/Gallery";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Studio />
      <ProductSlider />
      <Reviews />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
