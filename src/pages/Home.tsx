import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Shield, Headphones, TrendingUp, MapPin, Wifi } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing speeds up to 100 Mbps for seamless streaming and gaming",
    },
    {
      icon: Shield,
      title: "Reliable Connection",
      description: "99.9% uptime guarantee with enterprise-grade infrastructure",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our expert team is always ready to assist you whenever you need help",
    },
    {
      icon: TrendingUp,
      title: "Unlimited Data",
      description: "No caps, no throttling - enjoy unlimited internet access",
    },
  ];

  const serviceAreas = [
    "Rawalpindi",
    "Taxila",
    "Wah Cantt",
    "Hassan Abdal",
    "Attock",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-radial opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="glow-text">Experience</span> the Future of
              <span className="block gradient-primary bg-clip-text text-transparent">
                Internet Connectivity
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              High-speed fiber internet for homes and businesses across Rawalpindi region. 
              Stream, game, and work without limits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages">
                <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity glow-box text-lg px-8">
                  View Packages
                </Button>
              </Link>
              <Link to="/newconnectionform">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8">
                  New Connection Form
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-primary bg-clip-text text-transparent">BTechX</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We deliver more than just internet - we provide a complete digital experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass p-6 hover-scale cursor-pointer group"
              >
                <div className="mb-4 relative">
                  <feature.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-primary bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete suite of digital and technology services for homes and businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🌐", title: "Internet Services", desc: "High-speed fiber-optic connectivity with unlimited data and 99.9% uptime." },
              { icon: "💻", title: "Web Development", desc: "Modern, responsive and custom websites for your business or personal brand." },
              { icon: "📞", title: "Telephony", desc: "Crystal-clear VoIP and telephony solutions for seamless communication." },
              { icon: "📱", title: "Digital Marketing", desc: "Boost your online presence with strategic marketing campaigns." },
              { icon: "🏠", title: "Smart Home", desc: "Home automation for lighting, security, climate control and entertainment." },
              { icon: "📺", title: "HD-TV / IPTV", desc: "Hundreds of HD channels, on-demand content and smooth streaming." },
              { icon: "📹", title: "CCTV", desc: "Professional surveillance systems with remote monitoring and HD recording." },
              { icon: "👤", title: "Biometric Attendance", desc: "Fingerprint and facial recognition systems for accurate attendance tracking." },
              { icon: "🔧", title: "System Integration", desc: "Unify multiple systems for more efficient business operations." },
              { icon: "☁️", title: "Cloud Services", desc: "Secure cloud hosting, storage and computing with scalable infrastructure." },
              { icon: "⚙️", title: "Software Solutions", desc: "Custom software and enterprise solutions tailored to your needs." },
              { icon: "💬", title: "Corporate SMS", desc: "Bulk SMS for marketing, notifications and customer engagement." },
            ].map((service, idx) => (
              <Card key={idx} className="glass p-6 hover-scale cursor-pointer group">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-primary bg-clip-text text-transparent">Coverage</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Serving multiple cities with expanding coverage
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {serviceAreas.map((area, index) => (
              <div
                key={index}
                className="glass p-6 rounded-xl text-center hover-scale cursor-pointer"
              >
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">{area}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/coverage">
              <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity">
                View Interactive Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Customer Reviews</h2>

          <div
            style={{ width: "100%", height: "600px" }}
            dangerouslySetInnerHTML={{
              __html: `
                <iframe 
                  src="https://widgets.sociablekit.com/google-reviews/iframe/25626395" 
                  frameborder="0" 
                  width="100%" 
                  height="100%"
                  style="border:0;"
                ></iframe>
              `,
            }}
          ></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-radial opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="glass p-12 text-center max-w-4xl mx-auto glow-box">
            <Wifi className="w-16 h-16 text-primary mx-auto mb-6 glow-text" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Get Connected?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers enjoying high-speed internet. 
              Get started today with our flexible packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages">
                <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8">
                  Explore Packages
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8">
                  Contact Support
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

export default Home;
