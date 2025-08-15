
import { MapPin } from "lucide-react";

const ContactMap = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-markay-black mb-4">
            Find Us on the Map
          </h2>
          <p className="text-gray-600">
            Located in the heart of Paynesville City, Monrovia
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-markay-yellow p-6 text-center">
            <h3 className="text-xl font-bold text-markay-black mb-2">
              MyMarkay Office Location
            </h3>
            <p className="text-gray-800">
              Paynesville City, Monrovia, Liberia
            </p>
            <p className="text-gray-700 mt-2">
              Near the main road, easy to find and accessible by taxi or walking
            </p>
          </div>
          
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-medium">Interactive Map Coming Soon</p>
              <p className="text-sm">Contact us for detailed directions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
