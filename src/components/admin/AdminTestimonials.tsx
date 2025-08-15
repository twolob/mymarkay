
import { useState } from "react";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminTestimonials = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock testimonial data
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
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-markay-black">Testimonial Management</h2>
          <p className="text-gray-600">Manage customer reviews and testimonials</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-markay-black hover:bg-gray-800 text-markay-yellow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Add Testimonial Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-markay-black">Add New Testimonial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Customer Name" />
                <Input placeholder="Location" />
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Select Rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
                <Input type="date" />
              </div>
              <Textarea placeholder="Customer review..." rows={4} />
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="bg-markay-yellow text-markay-black hover:bg-yellow-400">
                Save Testimonial
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-l-4 border-l-markay-yellow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-markay-black">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-600">{testimonial.location} • {testimonial.date}</p>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
    </div>
  );
};

export default AdminTestimonials;
