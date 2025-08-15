import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase, supabaseMinimal } from "@/integrations/supabase/client";
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

  // Test connection to Supabase
  const testConnection = async () => {
    try {
      // Try with main client first
      const { data, error } = await supabase.auth.getSession();
      console.log("Supabase connection test:", { data, error });
      return !error;
    } catch (error) {
      console.error("Main client connection test failed:", error);
      try {
        // Try with minimal client as fallback
        const { data: minimalData, error: minimalError } = await supabaseMinimal.auth.getSession();
        console.log("Minimal client connection test:", { data: minimalData, error: minimalError });
        return !minimalError;
      } catch (minimalErr) {
        console.error("Minimal client also failed:", minimalErr);
        return false;
      }
    }
  };

  // Choose the right client based on environment
  const getSupabaseClient = () => {
    try {
      // Test if localStorage is available
      if (typeof localStorage !== 'undefined') {
        return supabase;
      }
    } catch (e) {
      console.log("localStorage not available, using minimal client");
    }
    return supabaseMinimal;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // First test the connection
      const connectionOk = await testConnection();
      if (!connectionOk) {
        toast.error("Unable to connect to the server. Please check your internet connection and try again.");
        return;
      }

      // Validate form data before submission
      if (!formData.email || !formData.password) {
        toast.error("Email and password are required");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (!formData.agreeToTerms) {
        toast.error("You must agree to the terms and conditions");
        return;
      }

      console.log("Attempting to create user with email:", formData.email);

      // Get the appropriate client for this environment
      const client = getSupabaseClient();

      // Create user account in Supabase Auth with vendor metadata
      const { data: authData, error: authError } = await client.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            is_vendor: true,
            phone_number: formData.phoneNumber,
            business_name: formData.businessName,
            business_type: formData.businessType,
            business_reg_number: formData.businessRegNumber,
            street_address: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
            agree_to_terms: formData.agreeToTerms,
            read_privacy_policy: formData.readPrivacyPolicy,
          }
        }
      });

      if (authError) {
        console.error("Supabase Auth Error:", authError);
        
        // Handle specific error types
        if (authError.message.includes("Failed to fetch")) {
          toast.error("Network error: Unable to reach the server. Please check your connection and try again.");
        } else if (authError.message.includes("Email already registered")) {
          toast.error("An account with this email already exists. Please use a different email or try logging in.");
        } else if (authError.message.includes("Password")) {
          toast.error("Password does not meet requirements. Please ensure it's at least 6 characters long.");
        } else {
          toast.error(`Registration failed: ${authError.message}`);
        }
        return;
      }

      if (!authData.user) {
        toast.error("Failed to create user account. Please try again.");
        return;
      }

      console.log("User created successfully:", authData.user.id);

      // Vendor role and profile creation is now handled server-side by the trigger
      toast.success("Registration successful! Please check your email to verify your account.");
      navigate('/login');
      
    } catch (error) {
      console.error("Unexpected error during registration:", error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        toast.error("Network connection failed. Please check your internet connection and try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
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