
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
}

const ProductCard = ({ image, title, category }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate(`/products/${title}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square rounded-xl overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-bold text-lg text-center mb-1">{title}</h3>
      <p className="text-gray-600 text-center mb-4">{category}</p>
      <Button 
        onClick={handleShopNow}
        className="w-full bg-markay-black hover:bg-gray-800 rounded-full font-bold"
      >
        SHOP NOW
      </Button>
    </div>
  );
};

export default ProductCard;
