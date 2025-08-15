
import { useState } from "react";
import { Save, Globe, Users, Bell, Shield, Palette, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "MyMarkay",
    siteDescription: "Your trusted electronics marketplace",
    contactEmail: "contact@mymarkay.com",
    phone: "+1 (555) 123-4567",
    address: "123 Electronics Street, Tech City, TC 12345",
    enableNotifications: true,
    enableUserRegistration: true,
    maintenanceMode: false,
    enableAnalytics: true,
    maxProductsPerPage: 12,
    enableReviews: true,
    autoApproveTestimonials: false,
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Updated",
      description: `${section} settings have been saved successfully.`,
    });
  };

  const handleInputChange = (key: string, value: string | boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-markay-black">Settings</h2>
        <Button className="bg-markay-yellow text-markay-black hover:bg-yellow-400">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-markay-black">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxProducts">Products Per Page</Label>
                  <Input
                    id="maxProducts"
                    type="number"
                    value={settings.maxProductsPerPage}
                    onChange={(e) => handleInputChange('maxProductsPerPage', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={2}
                />
              </div>
              <Button 
                onClick={() => handleSave('General')}
                className="bg-markay-yellow text-markay-black hover:bg-yellow-400"
              >
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="text-markay-black">User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">User Registration</Label>
                  <p className="text-sm text-gray-600">Allow new users to register on the site</p>
                </div>
                <Switch
                  checked={settings.enableUserRegistration}
                  onCheckedChange={(checked) => handleInputChange('enableUserRegistration', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Reviews</Label>
                  <p className="text-sm text-gray-600">Allow users to leave product reviews</p>
                </div>
                <Switch
                  checked={settings.enableReviews}
                  onCheckedChange={(checked) => handleInputChange('enableReviews', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-approve Testimonials</Label>
                  <p className="text-sm text-gray-600">Automatically approve new testimonials</p>
                </div>
                <Switch
                  checked={settings.autoApproveTestimonials}
                  onCheckedChange={(checked) => handleInputChange('autoApproveTestimonials', checked)}
                />
              </div>
              <Button 
                onClick={() => handleSave('User')}
                className="bg-markay-yellow text-markay-black hover:bg-yellow-400"
              >
                Save User Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-markay-black">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send email notifications for important events</p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleInputChange('enableNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Analytics Tracking</Label>
                  <p className="text-sm text-gray-600">Enable website analytics and tracking</p>
                </div>
                <Switch
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) => handleInputChange('enableAnalytics', checked)}
                />
              </div>
              <Button 
                onClick={() => handleSave('Notification')}
                className="bg-markay-yellow text-markay-black hover:bg-yellow-400"
              >
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-markay-black">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
              </div>
              <Button 
                onClick={() => handleSave('Security')}
                className="bg-markay-yellow text-markay-black hover:bg-yellow-400"
              >
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="text-markay-black">Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Color (Yellow)</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-markay-yellow rounded border"></div>
                    <Input value="#F59E0B" readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color (Black)</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-markay-black rounded border"></div>
                    <Input value="#1F2937" readOnly />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Color customization is currently limited to maintain brand consistency.
                </p>
              </div>
              <Button 
                onClick={() => handleSave('Appearance')}
                className="bg-markay-yellow text-markay-black hover:bg-yellow-400"
              >
                Save Appearance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="text-markay-black">System Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Put the website in maintenance mode</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                />
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-markay-black mb-2">Database Status</h4>
                  <p className="text-sm text-green-600">✓ Connected and healthy</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-markay-black mb-2">Cache Status</h4>
                  <p className="text-sm text-green-600">✓ Operational</p>
                </div>
              </div>
              <Button 
                onClick={() => handleSave('System')}
                className="bg-markay-yellow text-markay-black hover:bg-yellow-400"
              >
                Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
