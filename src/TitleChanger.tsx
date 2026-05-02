import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TitleChanger() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Centralized list of titles for each route
    const titles: Record<string, string> = {
      "/": "Home | BTechX",
      "/newconnectionform": "Fill this form for your Internet Subscription | BTechX",
      "/packages": "Packages | BTechX",
      "/coverage": "Coverage Area | BTechX",
      "/about": "About Us | BTechX",
      "/faq": "Frequently Asked Questions | BTechX",
      "/contact": "Contact Us | BTechX",
    };

    // Select title based on current URL
    document.title = titles[pathname] || "Page Not Found | BTechX";
  }, [pathname]);

  // This component does not render anything on screen
  return null;
}
