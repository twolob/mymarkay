
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, Users, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-markay-yellow min-h-screen">
        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-markay-black mb-6">
                About <span className="text-white">MyMarkay</span>
              </h1>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
                Put your markay here leh lay people see ay! We're connecting Liberia's vibrant marketplace 
                culture with modern technology to help local businesses thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-markay-black mb-6">Our Story</h2>
                <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                  MyMarkay was born from the bustling markets of Liberia, where entrepreneurs 
                  have been building dreams one sale at a time. We understand the challenges 
                  of moving from markay to markay, searching for what you need.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Our platform bridges the gap between traditional market culture and digital 
                  convenience, making it easier for customers to find local sellers and for 
                  businesses to reach their community.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Liberian landscape" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 text-center italic">
                  "From Paynesville to Red Light, we're bringing the markay to your fingertips"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-markay-black text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                <div className="w-16 h-16 bg-markay-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-markay-yellow" />
                </div>
                <h3 className="text-2xl font-bold text-markay-black mb-4">Community First</h3>
                <p className="text-gray-700 leading-relaxed">
                  We believe in supporting local businesses and strengthening our communities 
                  by connecting neighbors with neighborhood entrepreneurs.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                <div className="w-16 h-16 bg-markay-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-markay-yellow" />
                </div>
                <h3 className="text-2xl font-bold text-markay-black mb-4">Accessibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  Whether you're using a smartphone, computer, or even your "seleghen," 
                  MyMarkay works for everyone, everywhere.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                <div className="w-16 h-16 bg-markay-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-markay-yellow" />
                </div>
                <h3 className="text-2xl font-bold text-markay-black mb-4">Authentic Liberian</h3>
                <p className="text-gray-700 leading-relaxed">
                  We celebrate our Liberian heritage and the entrepreneurial spirit 
                  that makes our markets vibrant and unique.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-markay-black rounded-2xl p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Have questions? Want to join our marketplace? We'd love to hear from you!
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="flex items-center justify-center space-x-3 text-white">
                  <Phone className="w-6 h-6 text-markay-yellow" />
                  <span className="text-lg">0770-494 401</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-white">
                  <Mail className="w-6 h-6 text-markay-yellow" />
                  <span className="text-lg">mymarkaylbr@gmail.com</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-white">
                  <MapPin className="w-6 h-6 text-markay-yellow" />
                  <span className="text-lg">Paynesville City</span>
                </div>
              </div>
              
              <Button className="bg-markay-yellow hover:bg-yellow-500 text-markay-black font-bold text-lg px-8 py-3 rounded-full">
                Contact Us Today
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
