import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, MessageCircle, MapPin, Phone, Zap, Wifi, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const WahCantt = () => {
  // Inject Service structured data for local SEO (no react-helmet in this project)
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "High Speed Internet Service Provider",
      "provider": {
        "@type": "Organization",
        "name": "BTechX",
        "telephone": "+92-318-0979715",
      },
      "areaServed": {
        "@type": "Place",
        "name": "Wah Cantt, Pakistan",
      },
      "name": "High Speed Internet Provider in Wah Cantt",
      "description":
        "BTechX provides high speed fiber internet in Wah Cantt including Mall Road, Lalarukh, POF Colony and the Commercial Area.",
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const localAreas = ["Mall Road", "Lalarukh", "POF Colony", "Commercial Area", "Wah Model Town", "Kohistan Enclave"];

  const whyUs = [
    {
      icon: Zap,
      title: "Fiber-Backed Speeds",
      desc: "Up to 100 Mbps download speeds, built for streaming, gaming and remote work in Wah Cantt homes and offices.",
    },
    {
      icon: Wifi,
      title: "Reliable Local Network",
      desc: "Dedicated infrastructure covering Wah Cantt's residential and commercial zones with minimal downtime.",
    },
    {
      icon: ShieldCheck,
      title: "Local Support Team",
      desc: "Technicians based near Wah Cantt for fast installation and same-area support response.",
    },
  ];

  const faqs = [
    {
      q: "Does BTechX provide internet in Wah Cantt?",
      a: "Yes, BTechX offers high speed internet packages across Wah Cantt, including Mall Road, Lalarukh, POF Colony, Commercial Area and Kohistan Enclave.",
    },
    {
      q: "What is the fastest internet package available in Wah Cantt?",
      a: "Our Ultimate package offers up to 100 Mbps, ideal for households and businesses with multiple connected devices.",
    },
    {
      q: "How fast can I get connected in Wah Cantt?",
      a: "Installation timelines depend on current coverage in your specific street or block. Contact us on WhatsApp and we'll confirm availability and scheduling right away.",
    },
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I'm looking for a high speed internet connection in Wah Cantt. Can you share package details and availability?"
    );
    window.open(`https://wa.me/923180979715?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              High Speed Internet Provider
              <span className="block gradient-primary bg-clip-text text-transparent">
                in Wah Cantt
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Reliable fiber-backed internet for homes and businesses across Wah Cantt — Mall Road,
              Lalarukh, POF Colony, Commercial Area and nearby societies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="gradient-primary hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Check Availability on WhatsApp
              </Button>
              <Link to="/coverage">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Full Coverage Map
                </Button>
              </Link>
            </div>
          </div>

          {/* Why Us */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {whyUs.map((item, i) => (
              <Card key={i} className="glass p-6 hover-scale">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>

          {/* Local areas covered */}
          <Card className="glass p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Areas We Cover in Wah Cantt</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {localAreas.map((area, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {area}
                </span>
              ))}
            </div>
          </Card>

          {/* Packages summary */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Internet Packages for Wah Cantt Residents</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From light browsing to 4K streaming and gaming — pick a speed that fits your household or office.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 max-w-3xl mx-auto">
            {[
              { name: "Standard", speed: "25 Mbps" },
              { name: "Ultimate", speed: "100 Mbps" },
            ].map((pkg, i) => (
              <Card key={i} className="glass p-6 text-center hover-scale">
                <h3 className="text-lg font-semibold mb-1">{pkg.name}</h3>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  {pkg.speed}
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mb-16">
            <Link to="/packages">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                See All Packages & Pricing
              </Button>
            </Link>
          </div>

          {/* FAQ */}
          <Card className="glass p-8 max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Wah Cantt Internet FAQs</h2>
            <div className="space-y-6">
              {faqs.map((item, i) => (
                <div key={i}>
                  <h3 className="font-semibold flex items-start gap-2 mb-1">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {item.q}
                  </h3>
                  <p className="text-sm text-muted-foreground ml-7">{item.a}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <Card className="glass p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Connected in Wah Cantt?</h3>
            <p className="text-muted-foreground mb-6">
              Get in touch and our team will confirm coverage on your street and set up installation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleWhatsApp} className="gradient-primary hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
              <Link to="/newconnectionform">
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Request New Connection
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WahCantt;