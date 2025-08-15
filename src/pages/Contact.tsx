
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import ContactMap from "@/components/ContactMap";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ContactHero />
      <div className="grid md:grid-cols-2 gap-0">
        <ContactForm />
        <ContactInfo />
      </div>
      <ContactMap />
      <Footer />
    </div>
  );
};

export default Contact;
