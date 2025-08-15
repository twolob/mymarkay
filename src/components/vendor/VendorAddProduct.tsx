
import { useState } from "react";
import { Upload, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const VendorAddProduct = () => {
  const { toast } = useToast();
  const [productImages, setProductImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    features: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - productImages.length);
      setProductImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || productImages.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and add at least one image.",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally submit to your API
    toast({
      title: "Product Added Successfully!",
      description: "Your product has been added and is pending review.",
    });

    // Reset form
    setFormData({
      title: "",
      subtitle: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      features: "",
    });
    setProductImages([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-markay-black">Add New Product</CardTitle>
          <p className="text-gray-600">Fill in the details to add a new product to your store</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Images */}
            <div>
              <label className="block text-sm font-medium text-markay-black mb-2">
                Product Images <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {productImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {productImages.length < 5 && (
                  <label className="w-full h-24 border-2 border-dashed border-markay-yellow rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-yellow-50 transition-colors">
                    <Camera className="w-6 h-6 text-markay-yellow mb-1" />
                    <span className="text-xs text-markay-black">Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">Upload up to 5 images. First image will be the main product image.</p>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-markay-black mb-2">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Air Force 1"
                  className="border-gray-300 focus:border-markay-yellow"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-markay-black mb-2">
                  Subtitle
                </label>
                <Input
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Classic White"
                  className="border-gray-300 focus:border-markay-yellow"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-markay-black mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <Input
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Le 850,000"
                  className="border-gray-300 focus:border-markay-yellow"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-markay-black mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm focus:border-markay-yellow focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="sneakers">Sneakers</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="food">Food & Beverages</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-markay-black mb-2">
                  Stock Quantity
                </label>
                <Input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="15"
                  className="border-gray-300 focus:border-markay-yellow"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-markay-black mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your product in detail..."
                className="flex w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm focus:border-markay-yellow focus:outline-none resize-none"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-markay-black mb-2">
                Key Features
              </label>
              <Input
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="Premium Leather, Air Cushioning, Rubber Outsole (separate with commas)"
                className="border-gray-300 focus:border-markay-yellow"
              />
              <p className="text-xs text-gray-500 mt-1">Separate features with commas</p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="submit"
                className="bg-markay-yellow text-markay-black hover:bg-yellow-400 flex-1"
              >
                Add Product
              </Button>
              <Button 
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setFormData({
                    title: "",
                    subtitle: "",
                    price: "",
                    description: "",
                    category: "",
                    stock: "",
                    features: "",
                  });
                  setProductImages([]);
                }}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorAddProduct;
