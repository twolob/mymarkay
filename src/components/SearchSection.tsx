
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
const SearchSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    window.scrollTo(0, 0);
  };

  return (
    <section className="bg-markay-yellow py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
<form
            onSubmit={handleSubmit}
            role="search"
            aria-label="Search products and services"
            className="relative flex-1 max-w-lg"
          >
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products or services"
              className="w-full h-12 pl-4 pr-12 rounded-full border-0 text-gray-900 placeholder-gray-500"
              aria-label="Search input"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-gray-100 p-2"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4 text-gray-600" />
            </Button>
          </form>

          {/* Sell Button */}
          <Button className="bg-markay-black hover:bg-gray-800 px-8 py-3 rounded-full font-bold text-lg whitespace-nowrap">
            SELL YOUR MARKAY
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
