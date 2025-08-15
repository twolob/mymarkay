
import { useState } from "react";
import { LayoutDashboard, Package, MessageSquare, Users, Settings, Menu, X, Store, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminContacts from "@/components/admin/AdminContacts";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminVendors from "@/components/admin/AdminVendors";

const AdminDashboard = () => {
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

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "vendors", label: "Vendors", icon: Store },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "contacts", label: "Contacts", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "products":
        return <AdminProducts />;
      case "vendors":
        return <AdminVendors />;
      case "testimonials":
        return <AdminTestimonials />;
      case "contacts":
        return <AdminContacts />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-markay-black text-markay-yellow transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h1 className="text-xl font-bold">MyMarkay Admin</h1>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-markay-yellow hover:bg-gray-800"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
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
                  }`}
                  onClick={() => setActiveTab(item.id)}
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
              {activeTab}
            </h2>
            <div className="text-sm text-gray-600">
              MyMarkay Dashboard
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

export default AdminDashboard;
