
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const topProducts = [
    {
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      title: "KICKS LAB",
      category: "Athletic Shoes"
    },
    {
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      title: "TOO EASY",
      category: "Clothing"
    },
    {
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
      title: "ZIG",
      category: "Clothing"
    },
    {
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      title: "BIG DRIP",
      category: "Casual Shoes"
    }
  ];

  const bottomProducts = [
    {
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
      title: "Ma Kebeh Fruits",
      category: "Food"
    },
    {
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
      title: "Town Bakery",
      category: "Fast Food"
    },
    {
      image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400&h=400&fit=crop",
      title: "Meko's Chicken",
      category: "Fast Food"
    },
    {
      image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&h=400&fit=crop",
      title: "Xtra Zip Juice",
      category: "Drinks"
    }
  ];

  return (
    <section className="bg-markay-yellow py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topProducts.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
              category={product.category}
            />
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomProducts.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
