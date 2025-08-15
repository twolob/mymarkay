
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { VendorFormData } from "./VendorOnboarding";

interface VerificationStepProps {
  formData: VendorFormData;
  updateFormData: (data: Partial<VendorFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const VerificationStep = ({ formData, updateFormData, onNext, onPrev }: VerificationStepProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'governmentId' | 'businessLicense') => {
    const file = e.target.files?.[0] || null;
    updateFormData({ [fieldName]: file });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div className="space-y-6">
        <div>
          <Label className="text-gray-700 font-medium">
            Government-issued ID *
          </Label>
          <p className="text-sm text-gray-500 mb-3">
            Upload a clear photo of your government-issued ID (passport, driver's license, or national ID)
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <Label htmlFor="governmentId" className="cursor-pointer">
                <span className="text-markay-yellow hover:text-yellow-600 font-medium">
                  Click to upload
                </span>
                <span className="text-gray-500"> or drag and drop</span>
              </Label>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
            <Input
              id="governmentId"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, 'governmentId')}
              className="hidden"
              required
            />
            {formData.governmentId && (
              <p className="mt-2 text-sm text-green-600">
                ✓ {formData.governmentId.name}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label className="text-gray-700 font-medium">
            Business License or Registration Document *
          </Label>
          <p className="text-sm text-gray-500 mb-3">
            Upload your business license, certificate of incorporation, or business registration document
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <Label htmlFor="businessLicense" className="cursor-pointer">
                <span className="text-markay-yellow hover:text-yellow-600 font-medium">
                  Click to upload
                </span>
                <span className="text-gray-500"> or drag and drop</span>
              </Label>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
            <Input
              id="businessLicense"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, 'businessLicense')}
              className="hidden"
              required
            />
            {formData.businessLicense && (
              <p className="mt-2 text-sm text-green-600">
                ✓ {formData.businessLicense.name}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Document Verification Process</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Documents will be reviewed within 24-48 hours</li>
          <li>• You'll receive an email notification once verification is complete</li>
          <li>• Ensure all documents are clear and legible</li>
          <li>• Personal information must match across all documents</li>
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
          className="bg-markay-yellow hover:bg-yellow-400 text-black font-semibold px-8"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
};

export default VerificationStep;
