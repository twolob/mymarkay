
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VendorFormData } from "./VendorOnboarding";

interface AccountInformationStepProps {
  formData: VendorFormData;
  updateFormData: (data: Partial<VendorFormData>) => void;
  onNext: () => void;
}

const AccountInformationStep = ({ formData, updateFormData, onNext }: AccountInformationStepProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation here if needed
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div>
        <Label htmlFor="fullName" className="text-gray-700 font-medium">
          Full Name (Authorized Representative) *
        </Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-gray-700 font-medium">
          Email Address *
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">This will be used for login</p>
      </div>

      <div>
        <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">
          Phone Number *
        </Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">For contact and OTP verification</p>
      </div>

      <div>
        <Label htmlFor="password" className="text-gray-700 font-medium">
          Password *
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
          Confirm Password *
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
      </div>

      <div className="flex justify-end pt-4">
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

export default AccountInformationStep;
