
import { useState } from "react";
import { Search, Check, X, Eye, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const AdminVendors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Mock vendor data - would come from API
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "KICKS LAB",
      email: "kicks.lab@mymarkay.com",
      phone: "+232 76 123 456",
      status: "verified",
      joinDate: "2024-01-15",
      productsCount: 23,
      totalSales: "Le 45,600,000",
      avatar: "KL"
    },
    {
      id: 2,
      name: "Tech Store SL",
      email: "info@techstoresl.com",
      phone: "+232 77 987 654",
      status: "pending",
      joinDate: "2024-02-10",
      productsCount: 8,
      totalSales: "Le 12,300,000",
      avatar: "TS"
    },
    {
      id: 3,
      name: "Fashion Hub",
      email: "contact@fashionhub.sl",
      phone: "+232 78 456 789",
      status: "rejected",
      joinDate: "2024-01-28",
      productsCount: 0,
      totalSales: "Le 0",
      avatar: "FH"
    },
  ]);

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (vendorId: number, newStatus: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
    ));
    
    const vendor = vendors.find(v => v.id === vendorId);
    toast({
      title: "Vendor Status Updated",
      description: `${vendor?.name} has been ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = vendors.filter(v => v.status === 'pending').length;
  const verifiedCount = vendors.filter(v => v.status === 'verified').length;
  const rejectedCount = vendors.filter(v => v.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold text-markay-black">{vendors.length}</p>
              </div>
              <Eye className="w-8 h-8 text-markay-yellow" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
              </div>
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Search className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <X className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-markay-black">Vendor Management</h2>
          <p className="text-gray-600">Approve, verify or manage vendor applications</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-markay-black">All Vendors</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Vendor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-markay-yellow rounded-full flex items-center justify-center">
                        <span className="text-markay-black font-bold text-sm">{vendor.avatar}</span>
                      </div>
                      <div>
                        <div className="font-medium text-markay-black">{vendor.name}</div>
                        <div className="text-sm text-gray-500">Joined {vendor.joinDate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-1" />
                        {vendor.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-3 h-3 mr-1" />
                        {vendor.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-markay-black font-medium">{vendor.productsCount}</TableCell>
                  <TableCell className="text-markay-black font-medium">{vendor.totalSales}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {vendor.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleStatusChange(vendor.id, 'verified')}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleStatusChange(vendor.id, 'rejected')}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {vendor.status === 'verified' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleStatusChange(vendor.id, 'rejected')}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                      {vendor.status === 'rejected' && (
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleStatusChange(vendor.id, 'verified')}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVendors;
