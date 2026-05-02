import { Card } from "@/components/ui/card";
import { Users, Target, Award, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly upgrading our infrastructure to provide the best technology",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our top priority, always",
    },
    {
      icon: Target,
      title: "Reliability",
      description: "99.9% uptime guarantee with enterprise-grade infrastructure",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Award-winning service recognized by industry leaders",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About
              <span className="block gradient-primary bg-clip-text text-transparent">
                BTechX
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Leading internet service provider in the Rawalpindi region
            </p>
          </div>

          {/* Story Section */}
          <Card className="glass p-8 md:p-12 mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded with a vision to bridge the digital divide, BTechX has been serving the 
                Rawalpindi region with high-speed, reliable internet connectivity since our inception. 
                What started as a small local operation has grown into a trusted name in internet services.
              </p>
              <p>
                We understand that internet connectivity is not just a luxury—it's a necessity for modern 
                life. Whether you're streaming your favorite shows, working from home, or running a business, 
                reliable internet is crucial. That's why we've invested heavily in fiber optic infrastructure 
                to deliver the fastest, most stable connections possible.
              </p>
              <p>
                Today, we proudly serve thousands of homes and businesses across Rawalpindi, Taxila, 
                Wah Cantt, and Hassan Abdal, and we're continuously expanding to reach even more communities.
              </p>
            </div>
          </Card>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
            <Card className="glass p-8 hover-scale">
              <h3 className="text-2xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                Our Mission
              </h3>
              <p className="text-muted-foreground">
                To provide fast, reliable, and affordable internet connectivity to every home and 
                business in our service areas, enabling digital transformation and growth.
              </p>
            </Card>

            <Card className="glass p-8 hover-scale">
              <h3 className="text-2xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                Our Vision
              </h3>
              <p className="text-muted-foreground">
                To be the leading internet service provider in Pakistan, known for innovation, 
                customer satisfaction, and contribution to digital empowerment of communities.
              </p>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="glass p-6 hover-scale text-center">
                  <div className="mb-4 relative inline-block">
                    <value.icon className="w-12 h-12 text-primary mx-auto" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <Card className="glass p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  4
                </div>
                <p className="text-muted-foreground">Cities Covered</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <p className="text-muted-foreground">Uptime</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <p className="text-muted-foreground">Support</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
