import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TitleChanger() {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Home | BTechX",
      "/newconnectionform": "Fill this form for your Internet Subscription | BTechX",
      "/packages": "Packages | BTechX",
      "/coverage": "Coverage Area | BTechX",
      "/about": "About Us | BTechX",
      "/faq": "Frequently Asked Questions | BTechX",
      "/contact": "Contact Us | BTechX",
      "/internet-provider-wah-cantt": "High Speed Internet Provider in Wah Cantt | Fiber Packages – BTechX",
      "/internet-provider-kohistan-enclave": "Internet Provider in Kohistan Enclave, Wah Cantt | BTechX",
      "/admin/connections": "Admin | BTechX",
    };

    const descriptions: Record<string, string> = {
      "/internet-provider-wah-cantt":
        "BTechX offers high speed fiber internet in Wah Cantt, covering Mall Road, Lalarukh, POF Colony, Commercial Area and Kohistan Enclave. Packages up to 100 Mbps.",
      "/internet-provider-kohistan-enclave":
        "BTechX provides high speed internet in Kohistan Enclave, Wah Cantt, with packages up to 100 Mbps and local installation support.",
    };

    document.title = titles[pathname] || "Page Not Found | BTechX";

    if (descriptions[pathname]) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", descriptions[pathname]);
    }
  }, [pathname]);

  return null;
}