
const TestimonialStats = () => {
  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50+", label: "Local Vendors" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <section className="bg-markay-yellow py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-markay-black mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-medium text-gray-700">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialStats;
