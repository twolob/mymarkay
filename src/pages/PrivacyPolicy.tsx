import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-markay-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-markay-black mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                My Markay ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-markay-black mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-markay-black mb-2">Personal Information</h3>
                  <p className="text-gray-700">
                    We may collect personal information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                    <li>Name and contact information (email, phone number, address)</li>
                    <li>Business information for vendors</li>
                    <li>Account credentials</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-markay-black mb-2">Automatically Collected Information</h3>
                  <p className="text-gray-700">
                    We automatically collect certain information when you visit our website, including:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Usage data and analytics</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-markay-black mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process transactions and communications</li>
                <li>Improve our website and user experience</li>
                <li>Send important updates and promotional materials</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-markay-black mb-4">Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To service providers who assist in our operations</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights and security</li>
                <li>In connection with business transfers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-markay-black mb-4">Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-markay-black mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with regulatory authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-markay-black mb-4">Cookies</h2>
              <p className="text-gray-700">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-markay-black mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-markay-black mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-markay-yellow p-6 rounded-lg">
                <p className="text-markay-black"><strong>Email:</strong> mymarkaylbr@gmail.com</p>
                <p className="text-markay-black"><strong>Phone:</strong> 0770-494 401 | 0770-630 322 | 0881-470 247</p>
                <p className="text-markay-black"><strong>Address:</strong> Paynesville City, Monrovia Liberia</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;