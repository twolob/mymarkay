
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { VendorFormData } from "./VendorOnboarding";

interface AgreementStepProps {
  formData: VendorFormData;
  updateFormData: (data: Partial<VendorFormData>) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting?: boolean;
}

const AgreementStep = ({ formData, updateFormData, onSubmit, onPrev, isSubmitting = false }: AgreementStepProps) => {
  const handleCheckboxChange = (field: 'agreeToTerms' | 'readPrivacyPolicy', checked: boolean) => {
    updateFormData({ [field]: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreeToTerms && formData.readPrivacyPolicy) {
      onSubmit();
    }
  };

  const isSubmitDisabled = !formData.agreeToTerms || !formData.readPrivacyPolicy || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
          <div className="bg-gray-50 border rounded-lg p-4 max-h-40 overflow-y-auto">
            <p className="text-sm text-gray-700 mb-2">
              By registering as a vendor on My Markay, you agree to:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Provide accurate and truthful information about your business</li>
              <li>Maintain the quality and authenticity of products/services listed</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Pay applicable fees and commissions as per the fee structure</li>
              <li>Respond to customer inquiries in a timely manner</li>
              <li>Honor all orders and maintain inventory accuracy</li>
              <li>Follow platform policies regarding shipping and returns</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Policy</h3>
          <div className="bg-gray-50 border rounded-lg p-4 max-h-40 overflow-y-auto">
            <p className="text-sm text-gray-700 mb-2">
              Our Privacy Policy covers:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>How we collect and use your personal information</li>
              <li>Data sharing practices with third parties</li>
              <li>Security measures to protect your information</li>
              <li>Your rights regarding your personal data</li>
              <li>Cookie usage and tracking technologies</li>
              <li>Contact information for privacy-related inquiries</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleCheckboxChange('agreeToTerms', checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-relaxed">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 underline">
              Terms & Conditions
            </a>{" "}
            and understand my obligations as a vendor on the My Markay platform.
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="readPrivacyPolicy"
            checked={formData.readPrivacyPolicy}
            onCheckedChange={(checked) => handleCheckboxChange('readPrivacyPolicy', checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="readPrivacyPolicy" className="text-sm text-gray-700 leading-relaxed">
            I have read and accept the{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 underline">
              Privacy Policy
            </a>{" "}
            and consent to the collection and processing of my personal data.
          </Label>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>1. Your application will be reviewed by our team</li>
          <li>2. Document verification process (24-48 hours)</li>
          <li>3. Account activation email will be sent</li>
          <li>4. You can start listing your products/services</li>
        </ul>
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
          disabled={isSubmitDisabled}
          className="bg-markay-yellow hover:bg-yellow-400 text-black font-semibold px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Registering..." : "Complete Registration"}
        </Button>
      </div>
    </form>
  );
};

export default AgreementStep;
