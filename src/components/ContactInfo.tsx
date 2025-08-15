
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["0770-494 401", "0770-630 322", "0881-470 247"],
      description: "Call us anytime during business hours"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["mymarkaylbr@gmail.com"],
      description: "Send us an email and we'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Paynesville City", "Monrovia, Liberia"],
      description: "Visit our office for in-person assistance"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat - Sun: 9:00 AM - 4:00 PM"],
      description: "We're here when you need us"
    }
  ];

  return (
    <section className="bg-markay-black text-white py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Contact <span className="text-markay-yellow">Information</span>
          </h2>
          <p className="text-gray-300">
            Multiple ways to reach us. Choose what works best for you.
          </p>
        </div>

        <div className="space-y-8">
          {contactDetails.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-markay-yellow p-3 rounded-full">
                  <IconComponent className="w-6 h-6 text-markay-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-markay-yellow mb-2">
                    {item.title}
                  </h3>
                  {item.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-white mb-1">
                      {detail}
                    </p>
                  ))}
                  <p className="text-gray-400 text-sm mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="text-lg font-bold text-markay-yellow mb-4">
            Follow Us on Social Media
          </h3>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-markay-yellow hover:text-markay-black transition-colors cursor-pointer">
              <Instagram className="h-5 w-5" />
            </div>
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-markay-yellow hover:text-markay-black transition-colors cursor-pointer">
              <Facebook className="h-5 w-5" />
            </div>
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-markay-yellow hover:text-markay-black transition-colors cursor-pointer">
              <Youtube className="h-5 w-5" />
            </div>
            <span className="text-gray-300 ml-2">@MyMarkayLBR</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
