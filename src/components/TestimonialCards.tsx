
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialCards = () => {
  const testimonials = [
    {
      name: "Fatima Kollie",
      location: "Paynesville",
      rating: 5,
      text: "MyMarkay made it so easy to find fresh fruits from Ma Kebeh Fruits right from my phone. No more walking from markay to markay!",
      product: "Fresh Fruits"
    },
    {
      name: "James Tamba",
      location: "Sinkor",
      rating: 5,
      text: "I love the KICKS LAB sneakers I found on MyMarkay. The quality is exactly what I expected and delivery was fast.",
      product: "KICKS LAB Sneakers"
    },
    {
      name: "Grace Williams",
      location: "Congo Town",
      rating: 5,
      text: "Town Bakery's bread through MyMarkay is always fresh. It's like having the bakery right in my neighborhood!",
      product: "Fresh Bread"
    },
    {
      name: "Mohammed Kamara",
      location: "New Kru Town",
      rating: 5,
      text: "Meko's Chicken is my go-to for family dinners. MyMarkay makes ordering so convenient, and the food is always delicious.",
      product: "Grilled Chicken"
    },
    {
      name: "Sarah Johnson",
      location: "Caldwell",
      rating: 5,
      text: "The TOO EASY collection on MyMarkay has the best streetwear. I've bought three shirts already and love them all!",
      product: "TOO EASY Apparel"
    },
    {
      name: "Abraham Doe",
      location: "Red Light",
      rating: 5,
      text: "Xtra Zip Juice has the freshest juices in Monrovia. MyMarkay made it easy to discover and order from them.",
      product: "Fresh Juices"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-markay-black mb-4">
            Real Stories from Real Customers
          </h2>
          <p className="text-xl text-gray-600">
            See why thousands of Liberians trust MyMarkay for their shopping needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-markay-yellow text-markay-yellow" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="font-bold text-markay-black">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {testimonial.location}
                  </div>
                  <div className="text-sm font-medium text-markay-yellow">
                    Purchased: {testimonial.product}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCards;
