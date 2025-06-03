
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-playfair text-black mb-6">
              About
              <br />
              <span className="italic">VALVER</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are a premium menswear brand dedicated to creating sophisticated, timeless pieces 
              that embody the essence of modern masculinity and refined style.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-black mb-6">
                Our
                <br />
                <span className="italic">Story</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2014, VALVER emerged from a simple belief: that every man deserves 
                clothing that not only looks exceptional but feels extraordinary. Our journey 
                began with a small atelier and a vision to redefine menswear.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we continue to push the boundaries of design and craftsmanship, 
                creating pieces that seamlessly blend traditional tailoring with contemporary aesthetics.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=800&fit=crop" 
                alt="Our story"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-black text-center mb-12">
              Our
              <br />
              <span className="italic">Values</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-black mb-4">Quality</h3>
                <p className="text-gray-600">
                  We source only the finest materials and employ traditional craftsmanship 
                  techniques to ensure every piece meets our exacting standards.
                </p>
              </div>
              
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-black mb-4">Innovation</h3>
                <p className="text-gray-600">
                  While respecting tradition, we embrace innovation in design and technology 
                  to create clothing that meets the demands of modern life.
                </p>
              </div>
              
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-black mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to sustainable practices, from sourcing to production, 
                  ensuring our impact on the environment is minimal.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-black mb-12">
              Meet Our
              <br />
              <span className="italic">Team</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop&crop=face" 
                  alt="Team member"
                  className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-black mb-2">Alessandro Moretti</h3>
                <p className="text-gray-600">Creative Director</p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&crop=face" 
                  alt="Team member"
                  className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-black mb-2">Marcus Chen</h3>
                <p className="text-gray-600">Head of Design</p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=face" 
                  alt="Team member"
                  className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-black mb-2">Elena Rodriguez</h3>
                <p className="text-gray-600">Master Tailor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
