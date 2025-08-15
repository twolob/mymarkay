
import { useState } from "react";
import { LayoutDashboard, Package, BarChart3, Settings, Menu, X, AlertCircle, CheckCircle, Clock, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import VendorProducts from "@/components/vendor/VendorProducts";
import VendorAddProduct from "@/components/vendor/VendorAddProduct";
import VendorAnalytics from "@/components/vendor/VendorAnalytics";
import VendorSettings from "@/components/vendor/VendorSettings";

type VerificationStatus = "pending" | "verified" | "rejected";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      });
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Mock vendor data - this would come from your backend
  const vendor = {
    name: "Tech Store",
    email: "techstore@example.com",
    verificationStatus: "pending" as VerificationStatus,
    joinDate: "2024-01-15"
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "add-product", label: "Add Product", icon: Package },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getVerificationStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getVerificationStatusText = (status: VerificationStatus) => {
    switch (status) {
      case "pending":
        return "Verification Pending";
      case "verified":
        return "Verified Vendor";
      case "rejected":
        return "Verification Rejected";
    }
  };

  const getVerificationStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "verified":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const renderContent = () => {
    // If vendor is not verified, show limited access
    if (vendor.verificationStatus !== "verified") {
      return (
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getVerificationStatusColor(vendor.verificationStatus)} mb-6`}>
            {getVerificationStatusIcon(vendor.verificationStatus)}
            <span className="ml-2 font-medium">{getVerificationStatusText(vendor.verificationStatus)}</span>
          </div>
          
          {vendor.verificationStatus === "pending" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Under Review</h2>
              <p className="text-gray-600 mb-6">
                Your vendor account is currently being reviewed by our admin team. You'll receive an email once your account is approved.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Our team will review your application within 24-48 hours</li>
                  <li>• You'll receive an email notification about the decision</li>
                  <li>• Once approved, you'll have full access to vendor features</li>
                </ul>
              </div>
            </div>
          )}
          
          {vendor.verificationStatus === "rejected" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Not Approved</h2>
              <p className="text-gray-600 mb-6">
                Unfortunately, your vendor application was not approved. Please contact support for more information.
              </p>
              <Button className="bg-markay-yellow text-markay-black hover:bg-yellow-400">
                Contact Support
              </Button>
            </div>
          )}
        </div>
      );
    }

    // Show full dashboard for verified vendors
    switch (activeTab) {
      case "overview":
        return <VendorAnalytics />;
      case "products":
        return <VendorProducts />;
      case "add-product":
        return <VendorAddProduct />;
      case "analytics":
        return <VendorAnalytics />;
      case "settings":
        return <VendorSettings />;
      default:
        return <VendorAnalytics />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-markay-black text-markay-yellow transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h1 className="text-xl font-bold">Vendor Panel</h1>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-markay-yellow hover:bg-gray-800"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
          
          {/* Vendor Info */}
          {sidebarOpen && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-sm">
                <p className="font-medium">{vendor.name}</p>
                <p className="text-gray-400 text-xs">{vendor.email}</p>
              </div>
              <div className={`mt-2 inline-flex items-center px-2 py-1 rounded text-xs ${getVerificationStatusColor(vendor.verificationStatus)}`}>
                {getVerificationStatusIcon(vendor.verificationStatus)}
                <span className="ml-1">{getVerificationStatusText(vendor.verificationStatus)}</span>
              </div>
            </div>
          )}
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === item.id 
                      ? "bg-markay-yellow text-markay-black" 
                      : "text-markay-yellow hover:bg-gray-800"
                  } ${vendor.verificationStatus !== "verified" ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => vendor.verificationStatus === "verified" && setActiveTab(item.id)}
                  disabled={vendor.verificationStatus !== "verified"}
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-markay-yellow hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-markay-black capitalize">
              {vendor.verificationStatus === "verified" ? activeTab : "Account Status"}
            </h2>
            <div className="text-sm text-gray-600">
              MyMarkay Vendor Dashboard
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
