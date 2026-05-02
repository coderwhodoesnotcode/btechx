import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TitleChanger from "./TitleChanger"; // import it
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Coverage from "./pages/Coverage";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import NewConnectionForm from "./pages/NewConnectionForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />


<BrowserRouter>
  <TitleChanger />  {/* This automatically updates titles */}

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/newconnectionform" element={<NewConnectionForm />} />
    <Route path="/packages" element={<Packages />} />
    <Route path="/coverage" element={<Coverage />} />
    <Route path="/about" element={<About />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
