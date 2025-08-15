
import { ChevronDown } from "lucide-react";

interface BrandDropdownProps {
  brand: string;
}

const BrandDropdown = ({ brand }: BrandDropdownProps) => {
  return (
    <div className="relative">
      <div className="bg-black text-markay-yellow px-6 py-3 rounded-lg flex items-center space-x-2 min-w-[200px] justify-between">
        <span className="font-bold">{brand}</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
};

export default BrandDropdown;
