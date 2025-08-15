
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandDropdown from "@/components/BrandDropdown";
import BrandProductGrid from "@/components/BrandProductGrid";
import { brandProducts, BrandName } from "@/data/productData";

const ProductPage = () => {
  const { brand } = useParams();
  
  const currentProducts = brandProducts[brand as BrandName] || [];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-markay-yellow min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-black hover:text-gray-700 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">PRODUCT CATEGORY</h1>
            
            {/* Brand Dropdown */}
            <BrandDropdown brand={brand || ""} />
          </div>

          {/* Products Grid */}
          <BrandProductGrid products={currentProducts} brand={brand || ""} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
