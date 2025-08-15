
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brandProducts, BrandName } from "@/data/productData";

const ProductDetailPage = () => {
  const { brand, productId } = useParams();
  
  const currentBrandProducts = brandProducts[brand as BrandName] || [];
  const product = currentBrandProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="bg-markay-yellow min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to={`/products/${brand}`} className="inline-flex items-center text-black hover:text-gray-700 mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to {brand}
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black mb-4">Product Not Found</h1>
              <p className="text-gray-700">The product you're looking for doesn't exist.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-markay-yellow min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to={`/products/${brand}`} className="inline-flex items-center text-black hover:text-gray-700 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to {brand}
          </Link>

          {/* Product Detail */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Product Image */}
              <div className="aspect-square lg:aspect-auto">
                <img
                  src={product.image}
                  alt={product.subtitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-12">
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">{brand}</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">{product.subtitle}</h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl lg:text-3xl font-bold text-markay-black">{product.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-8 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-black mb-4">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-markay-black rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-black mb-4">Contact Information</h3>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-5 h-5 mr-3" />
                      <span>+232 XX XXX XXXX</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-3" />
                      <span>Freetown, Sierra Leone</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-3" />
                      <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
                    </div>
                  </div>

                  <Button className="w-full bg-markay-black hover:bg-gray-800 rounded-full font-bold text-lg py-3">
                    <Phone className="w-5 h-5 mr-2" />
                    CALL NOW TO ORDER
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
