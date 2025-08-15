
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const Header = () => {
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const brands = ["KICKS LAB", "TOO EASY", "ZIG", "BIG DRIP", "Ma Kebeh Fruits", "Town Bakery", "Meko's Chicken", "Xtra Zip Juice"];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img 
                src="/lovable-uploads/85f7bafb-7dad-4662-829f-4442a1918638.png" 
                alt="My Markay Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-markay-yellow font-medium">HOME</Link>
            <Link to="/products" className="text-gray-900 hover:text-markay-yellow font-medium">PRODUCTS</Link>
            <div 
              className="relative group"
              onMouseEnter={() => setShowCategoriesDropdown(true)}
              onMouseLeave={() => setShowCategoriesDropdown(false)}
            >
              <button className="text-gray-900 hover:text-markay-yellow font-medium flex items-center space-x-1 py-2">
                <span>CATEGORIES</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[220px] transition-all duration-200 ${showCategoriesDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="py-3">
                  {brands.map((brand, index) => (
                    <Link
                      key={brand}
                      to={`/products/${brand}`}
                      className="block px-4 py-3 text-gray-700 hover:bg-markay-yellow hover:text-black transition-all duration-150 font-medium border-b border-gray-100 last:border-b-0"
                      onClick={() => setShowCategoriesDropdown(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{brand}</span>
                        <span className="text-xs text-gray-400 group-hover:text-gray-600">#{index + 1}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/about" className="text-gray-900 hover:text-markay-yellow font-medium">ABOUT US</Link>
            <Link to="/testimonials" className="text-gray-900 hover:text-markay-yellow font-medium">TESTIMONIALS</Link>
            <Link to="/contact" className="text-gray-900 hover:text-markay-yellow font-medium">CONTACT</Link>
          </nav>

          {/* Desktop Sign Up Button */}
          <Link to="/signup">
            <Button className="hidden md:block bg-markay-black hover:bg-gray-800 px-6 py-2 rounded-full font-medium">
              SIGN UP
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-md text-gray-900 hover:text-markay-yellow"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-4">
              <Link 
                to="/" 
                className="block text-gray-900 hover:text-markay-yellow font-medium px-4"
                onClick={() => setShowMobileMenu(false)}
              >
                HOME
              </Link>
              <Link 
                to="/products" 
                className="block text-gray-900 hover:text-markay-yellow font-medium px-4"
                onClick={() => setShowMobileMenu(false)}
              >
                PRODUCTS
              </Link>
              <div className="px-4">
                <div className="text-gray-900 font-medium mb-2">CATEGORIES</div>
                <div className="pl-4 space-y-2">
                  {brands.map((brand, index) => (
                    <Link
                      key={brand}
                      to={`/products/${brand}`}
                      className="block text-gray-700 hover:text-markay-yellow text-sm py-1"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{brand}</span>
                        <span className="text-xs text-gray-400">#{index + 1}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <Link 
                to="/about" 
                className="block text-gray-900 hover:text-markay-yellow font-medium px-4"
                onClick={() => setShowMobileMenu(false)}
              >
                ABOUT US
              </Link>
              <Link 
                to="/testimonials" 
                className="block text-gray-900 hover:text-markay-yellow font-medium px-4"
                onClick={() => setShowMobileMenu(false)}
              >
                TESTIMONIALS
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-900 hover:text-markay-yellow font-medium px-4"
                onClick={() => setShowMobileMenu(false)}
              >
                CONTACT
              </Link>
              <div className="px-4 pt-2">
                <Link to="/signup">
                  <Button className="w-full bg-markay-black hover:bg-gray-800 rounded-full font-medium">
                    SIGN UP
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
