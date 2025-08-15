
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VendorFormData } from "./VendorOnboarding";

interface BusinessInformationStepProps {
  formData: VendorFormData;
  updateFormData: (data: Partial<VendorFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const BusinessInformationStep = ({ formData, updateFormData, onNext, onPrev }: BusinessInformationStepProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSelectChange = (value: string) => {
    updateFormData({ businessType: value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div>
        <Label htmlFor="businessName" className="text-gray-700 font-medium">
          Business/Store Name *
        </Label>
        <Input
          id="businessName"
          name="businessName"
          type="text"
          placeholder="Enter your business name"
          value={formData.businessName}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label className="text-gray-700 font-medium">
          Business Type *
        </Label>
        <Select value={formData.businessType} onValueChange={handleSelectChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
            <SelectItem value="corporation">Corporation</SelectItem>
            <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
            <SelectItem value="cooperative">Cooperative</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="businessRegNumber" className="text-gray-700 font-medium">
          Business Registration Number / Tax ID *
        </Label>
        <Input
          id="businessRegNumber"
          name="businessRegNumber"
          type="text"
          placeholder="Enter registration number or tax ID"
          value={formData.businessRegNumber}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Business Address</h3>
        
        <div>
          <Label htmlFor="streetAddress" className="text-gray-700 font-medium">
            Street Address *
          </Label>
          <Input
            id="streetAddress"
            name="streetAddress"
            type="text"
            placeholder="Enter street address"
            value={formData.streetAddress}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-gray-700 font-medium">
              City *
            </Label>
            <Input
              id="city"
              name="city"
              type="text"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="state" className="text-gray-700 font-medium">
              State *
            </Label>
            <Input
              id="state"
              name="state"
              type="text"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="postalCode" className="text-gray-700 font-medium">
              Postal Code *
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="Enter postal code"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-gray-700 font-medium">
              Country *
            </Label>
            <Input
              id="country"
              name="country"
              type="text"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="px-8"
        >
          Previous
        </Button>
        <Button
          type="submit"
          className="bg-markay-yellow hover:bg-yellow-400 text-black font-semibold px-8"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
};

export default BusinessInformationStep;
