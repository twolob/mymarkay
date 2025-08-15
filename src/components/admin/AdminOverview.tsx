import { useState } from "react";
import { Package, MessageSquare, Users, Eye, Plus, X, Star, Mail, Phone, Upload, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AdminOverview = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form state for add product
  const [productForm, setProductForm] = useState({
    title: '',
    brand: '',
    category: '',
    subtitle: '',
    description: '',
    status: 'active'
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductFormChange = (field: string, value: string) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetProductForm = () => {
    setProductForm({
      title: '',
      brand: '',
      category: '',
      subtitle: '',
      description: '',
      status: 'active'
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleAddProduct = () => {
    // Here you would typically send the form data and image to your backend
    console.log('Product Form:', productForm);
    console.log('Selected Image:', selectedImage);
    // Reset form and close modal
    resetProductForm();
    setShowAddProduct(false);
  };

  // Mock data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Excellent service and great products!",
      location: "Monrovia",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Brown",
      rating: 4,
      comment: "Very satisfied with my purchase.",
      location: "Paynesville",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Alice Cooper",
      rating: 5,
      comment: "Fast delivery and excellent quality!",
      location: "Buchanan",
      date: "2024-01-12"
    }
  ];

  const contacts = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+231-555-0123",
      subject: "Product Inquiry",
      message: "I'm interested in learning more about your smartphone collection.",
      date: "2024-01-15",
      status: "Unread"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+231-555-0456",
      subject: "Technical Support",
      message: "I need help with my recent purchase.",
      date: "2024-01-14",
      status: "Read"
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      phone: "+231-555-0789",
      subject: "General Question",
      message: "What are your business hours?",
      date: "2024-01-13",
      status: "Replied"
    }
  ];

  const stats = [
    {
      title: "Total Products",
      value: "24",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Testimonials",
      value: "12",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Contact Messages",
      value: "8",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Page Views",
      value: "1,234",
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const Modal = ({ isOpen, onClose, title, children }: any) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-markay-black">{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-markay-yellow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-markay-black">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-markay-black">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button 
              onClick={() => setShowAddProduct(true)}
              className="w-full p-3 bg-markay-yellow text-markay-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              Add New Product
            </button>
            <button 
              onClick={() => setShowTestimonials(true)}
              className="w-full p-3 bg-markay-black text-markay-yellow rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              View All Testimonials
            </button>
            <button 
              onClick={() => setShowContacts(true)}
              className="w-full p-3 border-2 border-markay-black text-markay-black rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Check Contact Messages
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-markay-black">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 border-l-2 border-markay-yellow pl-4">
                <div className="text-sm text-gray-600">2 hours ago</div>
                <div className="text-sm text-markay-black">New contact message received</div>
              </div>
              <div className="flex items-center space-x-3 p-2 border-l-2 border-markay-yellow pl-4">
                <div className="text-sm text-gray-600">1 day ago</div>
                <div className="text-sm text-markay-black">Product updated: Samsung Galaxy</div>
              </div>
              <div className="flex items-center space-x-3 p-2 border-l-2 border-markay-yellow pl-4">
                <div className="text-sm text-gray-600">3 days ago</div>
                <div className="text-sm text-markay-black">New testimonial added</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Add Product Modal */}
      <Modal 
        isOpen={showAddProduct} 
        onClose={() => {
          setShowAddProduct(false);
          resetProductForm();
        }}
        title="Add New Product"
      >
        <div className="space-y-6">
          {/* Product Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-markay-black mb-4">Product Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Product Title *
                </Label>
                <Input 
                  id="title"
                  placeholder="Enter product title"
                  value={productForm.title}
                  onChange={(e) => handleProductFormChange('title', e.target.value)}
                  className="border-2 focus:border-markay-yellow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand" className="text-sm font-medium text-gray-700">
                  Brand *
                </Label>
                <select 
                  id="brand"
                  value={productForm.brand}
                  onChange={(e) => handleProductFormChange('brand', e.target.value)}
                  className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm focus:border-markay-yellow focus:outline-none"
                >
                  <option value="">Select Brand</option>
                  <option value="samsung">Samsung</option>
                  <option value="apple">Apple</option>
                  <option value="hp">HP</option>
                  <option value="dell">Dell</option>
                  <option value="canon">Canon</option>
                  <option value="nikon">Nikon</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category *
                </Label>
                <select 
                  id="category"
                  value={productForm.category}
                  onChange={(e) => handleProductFormChange('category', e.target.value)}
                  className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm focus:border-markay-yellow focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="laptops">Laptops</option>
                  <option value="cameras">Cameras</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <select 
                  id="status"
                  value={productForm.status}
                  onChange={(e) => handleProductFormChange('status', e.target.value)}
                  className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm focus:border-markay-yellow focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="subtitle" className="text-sm font-medium text-gray-700">
                Product Subtitle
              </Label>
              <Input 
                id="subtitle"
                placeholder="Enter product subtitle"
                value={productForm.subtitle}
                onChange={(e) => handleProductFormChange('subtitle', e.target.value)}
                className="border-2 focus:border-markay-yellow"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-markay-black mb-4">Product Image</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="image-upload" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 hover:border-markay-yellow transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                  </div>
                  <input 
                    id="image-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="relative w-32 h-32 border-2 border-markay-yellow rounded-lg overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-markay-black mb-4">Product Description</h3>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea 
                id="description"
                placeholder="Enter detailed product description..."
                rows={4}
                value={productForm.description}
                onChange={(e) => handleProductFormChange('description', e.target.value)}
                className="border-2 focus:border-markay-yellow resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              onClick={handleAddProduct}
              className="bg-markay-yellow text-markay-black hover:bg-yellow-400 flex-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowAddProduct(false);
                resetProductForm();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Testimonials Modal */}
      <Modal 
        isOpen={showTestimonials} 
        onClose={() => setShowTestimonials(false)}
        title="All Testimonials"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-l-4 border-l-markay-yellow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-markay-black">{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-600">{testimonial.location} • {testimonial.date}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? 'text-markay-yellow fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                </div>
                <p className="text-gray-700">{testimonial.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Modal>

      {/* Contacts Modal */}
      <Modal 
        isOpen={showContacts} 
        onClose={() => setShowContacts(false)}
        title="Contact Messages"
      >
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className={`border-l-4 border-l-markay-yellow ${contact.status === 'Unread' ? 'bg-blue-50' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-markay-black">{contact.name}</CardTitle>
                    <p className="text-sm text-gray-600">{contact.subject}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    contact.status === 'Unread' 
                      ? 'bg-blue-100 text-blue-800'
                      : contact.status === 'Read'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {contact.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {contact.message}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Received on {contact.date}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-markay-yellow text-markay-black hover:bg-yellow-400">
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark as Read
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default AdminOverview;
