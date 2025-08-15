
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brandProducts } from "@/data/productData";

const Products = () => {
  // Generate all products from all brands dynamically
  const allProducts = Object.entries(brandProducts).flatMap(([brandName, products]) =>
    products.map(product => ({
      ...product,
      brand: brandName
    }))
  );

  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const filteredProducts = query
    ? allProducts.filter((p) => {
        const haystack = `${p.title} ${p.subtitle} ${p.description ?? ""} ${(p.features || []).join(" ")} ${p.brand}`.toLowerCase();
        return haystack.includes(query);
      })
    : allProducts;

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black">ALL PRODUCTS</h1>
            <p className="text-gray-700 mt-2">Showing {filteredProducts.length} products from all brands</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={`${product.brand}-${product.id}`} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link to={`/products/${product.brand}/${product.id}`} className="block">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.subtitle}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-center mb-1">{product.title}</h3>
                  <p className="text-gray-600 text-center mb-2">{product.subtitle}</p>
                  <p className="text-sm text-gray-500 text-center mb-4">{product.brand}</p>
                </Link>
                <Button className="w-full bg-markay-black hover:bg-gray-800 rounded-full font-bold">
                  CALL NOW
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
