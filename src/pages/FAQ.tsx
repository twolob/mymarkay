import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is My Markay?",
      answer: "My Markay is a premier online marketplace in Liberia where you can discover and connect with local vendors offering quality products and services. We help you find what you need while supporting local businesses."
    },
    {
      question: "How do I place an order?",
      answer: "Browse our products, find what you need, and use the 'CALL NOW' button to contact the vendor directly. Our vendors will assist you with pricing, availability, and ordering details."
    },
    {
      question: "How can I become a vendor on My Markay?",
      answer: "Click on 'SIGN UP' and complete our vendor onboarding process. You'll need to provide business information, verification documents, and agree to our terms and conditions."
    },
    {
      question: "Is there a fee to use My Markay?",
      answer: "Browsing and contacting vendors is free for customers. For vendors, we have various partnership plans available. Contact us for detailed pricing information."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us at mymarkaylbr@gmail.com or call us at 0770-494 401, 0770-630 322, or 0881-470 247. We're here to help with any questions or concerns."
    },
    {
      question: "What types of products and services are available?",
      answer: "We feature a wide variety of products and services from local Liberian vendors, including electronics, clothing, food items, home goods, professional services, and much more."
    },
    {
      question: "How do I search for specific products?",
      answer: "Use our search bar on the homepage to find products by name, category, or description. You can also browse by vendor brand or explore all products on our Products page."
    },
    {
      question: "Are the vendors verified?",
      answer: "Yes, all vendors go through our verification process including business registration checks and document verification to ensure authenticity and quality."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-markay-black mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about My Markay, our services, and how to get started.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="hover:no-underline px-6 py-4 text-left font-semibold text-markay-black">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact Section */}
          <div className="mt-16 text-center bg-markay-yellow p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-markay-black mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-700 mb-6">
              Can't find the answer you're looking for? Please reach out to our customer support team.
            </p>
            <div className="space-y-2">
              <p className="text-markay-black font-semibold">Email: mymarkaylbr@gmail.com</p>
              <p className="text-markay-black font-semibold">Phone: 0770-494 401 | 0770-630 322 | 0881-470 247</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;