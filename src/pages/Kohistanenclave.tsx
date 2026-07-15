import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, MessageCircle, MapPin, Phone, Zap, Wifi, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const KohistanEnclave = () => {
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
        "name": "Kohistan Enclave, Wah Cantt, Pakistan",
      },
      "name": "Internet Provider in Kohistan Enclave",
      "description":
        "BTechX provides high speed fiber internet in Kohistan Enclave, Wah Cantt, with packages up to 100 Mbps.",
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const whyUs = [
    {
      icon: Zap,
      title: "High Speed Connectivity",
      desc: "Packages up to 100 Mbps, purpose-built for streaming, remote work and multi-device homes in Kohistan Enclave.",
    },
    {
      icon: Wifi,
      title: "Built for the Society",
      desc: "Network infrastructure planned around Kohistan Enclave's residential layout for consistent coverage.",
    },
    {
      icon: ShieldCheck,
      title: "Fast Local Support",
      desc: "Our Wah Cantt-based team handles installation and support requests from Kohistan Enclave quickly.",
    },
  ];

  const faqs = [
    {
      q: "Is BTechX available in Kohistan Enclave?",
      a: "Yes, BTechX offers high speed internet packages within Kohistan Enclave, part of our wider Wah Cantt coverage.",
    },
    {
      q: "What speeds can I get in Kohistan Enclave?",
      a: "Packages range from 10 Mbps up to 100 Mbps depending on your household or business needs.",
    },
    {
      q: "How do I check if my specific block in Kohistan Enclave is covered?",
      a: "Message us on WhatsApp with your block or house number and we'll confirm current coverage and installation timing.",
    },
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in a high speed internet connection in Kohistan Enclave, Wah Cantt. Can you confirm availability?"
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
              Internet Provider in
              <span className="block gradient-primary bg-clip-text text-transparent">
                Kohistan Enclave, Wah Cantt
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fast, reliable fiber-backed internet for homes and businesses in Kohistan Enclave, Wah Cantt.
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

          {/* Packages summary */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Internet Packages for Kohistan Enclave</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From everyday browsing to 4K streaming and gaming — choose the speed that fits your home.
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
            <h2 className="text-2xl font-bold mb-6 text-center">Kohistan Enclave Internet FAQs</h2>
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
            <h3 className="text-2xl font-bold mb-4">Ready to Get Connected in Kohistan Enclave?</h3>
            <p className="text-muted-foreground mb-6">
              Reach out and our team will confirm coverage for your block and arrange installation.
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

export default KohistanEnclave;