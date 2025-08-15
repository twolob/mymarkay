import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VendorOnboarding from "@/components/vendor/VendorOnboarding";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Upper Half - Background Image with Content */}
        <div 
          className="h-[40vh] bg-black bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url('/lovable-uploads/1385246d-fb9d-4298-b4d8-ffaa5bba7537.png')`
          }}
        >
          {/* Header Text */}
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-markay-yellow mb-4">
              BECOME A VENDOR
            </h1>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Join My Markay's vendor network and start selling your products to customers worldwide. 
              Complete the registration process to get started.
            </p>
          </div>
        </div>

        {/* Lower Half - Yellow Background with Form */}
        <div className="min-h-[60vh] bg-markay-yellow flex items-start justify-center px-4 py-12 md:py-16">
          <VendorOnboarding />
        </div>
      </div>

      {/* Existing account link */}
      <div className="bg-markay-yellow text-center pb-8">
        <p className="text-gray-800">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Login here
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
