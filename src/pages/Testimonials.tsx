
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialHero from "@/components/TestimonialHero";
import TestimonialCards from "@/components/TestimonialCards";
import TestimonialStats from "@/components/TestimonialStats";

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TestimonialHero />
      <TestimonialStats />
      <TestimonialCards />
      <Footer />
    </div>
  );
};

export default Testimonials;
