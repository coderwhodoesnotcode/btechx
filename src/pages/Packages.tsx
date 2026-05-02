import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, MessageCircle, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Packages = () => {
  const packages = [
    {
      name: "Basic",
      speed: "10 Mbps",
      features: [
        "Perfect for browsing and email",
        "Stream SD videos smoothly",
        "Connect 2-3 devices",
        "24/7 customer support",
        // "Free installation",
      ],
      popular: false,
    },
    {
      name: "Standard",
      speed: "25 Mbps",
      features: [
        "Ideal for HD streaming",
        "Online gaming ready",
        "Connect 5-7 devices",
        "Priority support",
        // "Free installation & router",
      ],
      popular: true,
    },
    {
      name: "Premium",
      speed: "50 Mbps",
      features: [
        "4K streaming on multiple devices",
        "Zero lag gaming",
        "Connect 10+ devices",
        "VIP support line",
        // "Free mesh WiFi system",
      ],
      popular: false,
    },
    {
      name: "Ultimate",
      speed: "100 Mbps",
      features: [
        "Maximum speed for power users",
        "Unlimited simultaneous streaming",
        // "Perfect for home offices",
        "Dedicated account manager",
        "Premium hardware included",
      ],
      popular: false,
    },
  ];

  const handleWhatsApp = (packageName: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${packageName} package. Can you provide more details?`);
    window.open(`https://wa.me/923180979715?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Choose Your Perfect
              <span className="block gradient-primary bg-clip-text text-transparent">
                Internet Package
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fast, reliable, and affordable internet for every need. All packages include unlimited data.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`glass p-6 hover-scale relative ${
                  pkg.popular ? "border-primary glow-box" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="gradient-primary px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                    {pkg.speed}
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">Download Speed</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <Button
                    onClick={() => handleWhatsApp(pkg.name)}
                    className="w-full gradient-primary hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </Button>
                  <Link to="/coverage" className="block">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                      <MapPin className="w-4 h-4 mr-2" />
                      Check Coverage
                    </Button>
                  </Link>
                  <Link to="/contact" className="block">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Request Callback
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="glass p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6">
              Looking for a business package or need higher speeds? Contact us for customized solutions 
              tailored to your specific requirements.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity">
                Contact Sales Team
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
