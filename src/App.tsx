import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TitleChanger from "./TitleChanger";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Coverage from "./pages/Coverage";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import NewConnectionForm from "./pages/NewConnectionForm";
import AdminConnections from "./pages/AdminConnections";
import WahCantt from "./pages/Wahcantt";
import KohistanEnclave from "./pages/Kohistanenclave";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TitleChanger />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newconnectionform" element={<NewConnectionForm />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/coverage" element={<Coverage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/internet-provider-wah-cantt" element={<WahCantt />} />
          <Route path="/internet-provider-kohistan-enclave" element={<KohistanEnclave />} />
          <Route path="/admin/connections" element={<AdminConnections />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;