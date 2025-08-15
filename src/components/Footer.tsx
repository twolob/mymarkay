
import { Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-markay-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Logo and Contact */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              MY<span className="text-markay-yellow">MARKAY</span>
            </h2>
            <p className="text-gray-300 mb-2">Put your markay here leh lay people see ay!</p>
            <p className="text-gray-300 mb-6">Paynesville City, Monrovia Liberia</p>
            
            <div className="space-y-2">
              <p className="text-gray-300">mymarkaylbr@gmail.com</p>
              <p className="text-markay-yellow">0770-494 401 | 0770-630 322 | 0881-470 247</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-6">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
                <Instagram className="h-4 w-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
                <Facebook className="h-4 w-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
                <Youtube className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-300 ml-2">My Markay LBR</span>
            </div>
          </div>

          {/* Right Side - Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">QUICK LINKS</h3>
            <div className="space-y-3">
              <a href="/" className="block text-gray-300 hover:text-markay-yellow transition-colors">Home</a>
              <a href="/products" className="block text-gray-300 hover:text-markay-yellow transition-colors">Products</a>
              <a href="/products" className="block text-gray-300 hover:text-markay-yellow transition-colors">Categories</a>
              <a href="/about" className="block text-gray-300 hover:text-markay-yellow transition-colors">About Us</a>
              <a href="/testimonials" className="block text-gray-300 hover:text-markay-yellow transition-colors">Testimonials</a>
              <a href="/faq" className="block text-gray-300 hover:text-markay-yellow transition-colors">FAQs</a>
              <a href="/privacy-policy" className="block text-gray-300 hover:text-markay-yellow transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-400">© 2025 My Markay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
