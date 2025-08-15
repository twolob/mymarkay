
import { useState } from "react";
import { Save, Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const VendorSettings = () => {
  const { toast } = useToast();
  const [vendorInfo, setVendorInfo] = useState({
    brandName: "KICKS LAB",
    email: "kicks.lab@mymarkay.com",
    phone: "0770-494-401",
    address: "Paynesville City, Monrovia",
    description: "Premium sneaker retailer specializing in authentic athletic footwear and streetwear.",
    website: "www.kickslab.lr",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVendorInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: "Your vendor profile has been successfully updated.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Brand Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-markay-black">Brand Profile</CardTitle>
          <p className="text-gray-600">Manage your brand information and store details</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Brand Logo */}
          <div>
            <label className="block text-sm font-medium text-markay-black mb-2">
              Brand Logo
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-markay-yellow rounded-lg flex items-center justify-center">
                <span className="text-markay-black font-bold text-2xl">KL</span>
              </div>
              <div>
                <Button variant="outline" className="mb-2">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Logo
                </Button>
                <p className="text-xs text-gray-500">Recommended: 200x200px, PNG or JPG</p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-markay-black mb-2">
                Brand Name
              </label>
              <Input
                name="brandName"
                value={vendorInfo.brandName}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-markay-yellow"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-markay-black mb-2">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                value={vendorInfo.email}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-markay-yellow"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-markay-black mb-2">
                Phone Number
              </label>
              <Input
                name="phone"
                value={vendorInfo.phone}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-markay-yellow"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-markay-black mb-2">
                Website
              </label>
              <Input
                name="website"
                value={vendorInfo.website}
                onChange={handleInputChange}
                placeholder="www.yourbrand.com"
                className="border-gray-300 focus:border-markay-yellow"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-markay-black mb-2">
              Business Address
            </label>
            <Input
              name="address"
              value={vendorInfo.address}
              onChange={handleInputChange}
              className="border-gray-300 focus:border-markay-yellow"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-markay-black mb-2">
              Brand Description
            </label>
            <textarea
              name="description"
              value={vendorInfo.description}
              onChange={handleInputChange}
              rows={4}
              className="flex w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm focus:border-markay-yellow focus:outline-none resize-none"
              placeholder="Tell customers about your brand..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Store Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-markay-black">Store Settings</CardTitle>
          <p className="text-gray-600">Configure your store preferences</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-markay-black">Store Visibility</h4>
              <p className="text-sm text-gray-500">Make your store visible to customers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-markay-yellow"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-markay-black">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive email alerts for new orders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-markay-yellow"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-markay-black">Auto-Approve Reviews</h4>
              <p className="text-sm text-gray-500">Automatically approve customer reviews</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-markay-yellow"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-markay-yellow text-markay-black hover:bg-yellow-400"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default VendorSettings;
