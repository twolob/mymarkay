
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AccountInformationStep from "./AccountInformationStep";
import BusinessInformationStep from "./BusinessInformationStep";
import VerificationStep from "./VerificationStep";
import AgreementStep from "./AgreementStep";

export interface VendorFormData {
  // Account Information
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  
  // Business Information
  businessName: string;
  businessType: string;
  businessRegNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  
  // Verification
  governmentId: File | null;
  businessLicense: File | null;
  
  // Agreement
  agreeToTerms: boolean;
  readPrivacyPolicy: boolean;
}

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<VendorFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    businessRegNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    governmentId: null,
    businessLicense: null,
    agreeToTerms: false,
    readPrivacyPolicy: false,
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (data: Partial<VendorFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Step 1: Create user account in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (authError) {
        console.error("Error creating user:", authError);
        toast.error(`Registration failed: ${authError.message}`);
        return;
      }

      if (!authData.user) {
        toast.error("Failed to create user account");
        return;
      }

      const userId = authData.user.id;

      // Step 2: Create vendor role for the user
      try {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: 'vendor'
          });

        if (roleError) {
          console.error("Error creating vendor role:", roleError);
          // Continue with vendor creation even if role assignment fails
        }
      } catch (roleErr) {
        console.error("Error creating vendor role:", roleErr);
        // Continue with vendor creation even if role assignment fails
      }

      // Step 3: Create vendor profile
      const vendorData = {
        user_id: userId,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        business_name: formData.businessName,
        business_type: formData.businessType,
        registration_number: formData.businessRegNumber,
        address_street: formData.streetAddress,
        address_city: formData.city,
        address_state: formData.state,
        address_postal_code: formData.postalCode,
        address_country: formData.country,
        agree_to_terms: formData.agreeToTerms,
        read_privacy_policy: formData.readPrivacyPolicy,
        status: 'pending',
        is_verified: false,
        is_active: true
      };

      const { error: vendorError } = await supabase
        .from('vendors')
        .insert(vendorData);

      if (vendorError) {
        console.error("Registration error:", vendorError);
        toast.error(`Vendor registration failed: ${vendorError.message}`);
        return;
      }

      toast.success("Registration successful! Please check your email to verify your account.");
      navigate('/login');
      
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountInformationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <BusinessInformationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <VerificationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <AgreementStep
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onPrev={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Account Information";
      case 2:
        return "Business Information";
      case 3:
        return "Verification & Documents";
      case 4:
        return "Terms & Agreement";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <img 
          src="/lovable-uploads/85f7bafb-7dad-4662-829f-4442a1918638.png" 
          alt="My Markay Logo" 
          className="h-16 w-auto mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Vendor Registration
        </h2>
        <p className="text-gray-600">
          Step {currentStep} of {totalSteps}: {getStepTitle()}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="w-full" />
      </div>

      {/* Step Content */}
      {renderStep()}
    </div>
  );
};

export default VendorOnboarding;
