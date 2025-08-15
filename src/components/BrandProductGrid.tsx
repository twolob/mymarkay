
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/productData";

interface BrandProductGridProps {
  products: Product[];
  brand: string;
}

const BrandProductGrid = ({ products, brand }: BrandProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div key={index} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link to={`/products/${brand}/${product.id}`} className="block">
            <div className="aspect-square rounded-xl overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-bold text-lg text-center mb-1">{product.title}</h3>
            <p className="text-gray-600 text-center mb-4">{product.subtitle}</p>
          </Link>
          <Button className="w-full bg-markay-black hover:bg-gray-800 rounded-full font-bold">
            CALL NOW
          </Button>
        </div>
      ))}
    </div>
  );
};

export default BrandProductGrid;
