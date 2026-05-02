import { Link } from "react-router-dom";
import { Wifi, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Wifi className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">BTechX</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Providing high-speed internet to Rawalpindi, Taxila, Wah Cantt, and Hassan Abdal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/packages" className="text-muted-foreground hover:text-primary transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/coverage" className="text-muted-foreground hover:text-primary transition-colors">
                  Coverage Map
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Speed Test
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
{/* Contact Info */}
<div>
  <h3 className="font-semibold text-foreground mb-4">Contact</h3>
  <ul className="space-y-3">
    <li className="flex items-start space-x-3">
      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
      <span className="text-muted-foreground text-sm">
        Rawalpindi, Pakistan
      </span>
    </li>
    <li className="flex items-center space-x-3">
      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
      <span className="text-muted-foreground text-sm">+92 318 0979715</span>
    </li>
    <li className="flex items-center space-x-3">
      <Mail className="w-5 h-5 text-primary flex-shrink-0" />
      <span className="text-muted-foreground text-sm">info@btechx.net</span>
    </li>
    <li className="flex items-center space-x-3">
      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
      <span className="text-muted-foreground text-sm">051 4255735</span>
    </li>
  </ul>
</div>

        </div>

        <div className="border-t border-border mt-12 pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} BTechX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
