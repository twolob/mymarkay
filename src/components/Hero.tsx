
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-markay-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome<br />
              to <span className="text-markay-yellow">MyMarkay</span>
            </h1>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-markay-yellow text-2xl font-bold mb-4">
              Liberia's Online Marketplace for everyone
            </h2>
            <p className="text-gray-300 mb-4">
              Looking for something to buy? Tired of moving from one markay to another?
            </p>
            <p className="text-gray-300 mb-6">
              MyMarkay helps you <span className="text-markay-yellow">find and connect</span> with local sellers
              instantly —all from your smart phone, computer or even your <span className="text-markay-yellow">seleghen</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
