import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  const faqs = [
    {
      question: "What internet speeds do you offer?",
      answer: "We offer a range of speeds from 10 Mbps to 100 Mbps to suit different needs. Our Basic package starts at 10 Mbps, perfect for browsing and email. Our Ultimate package offers 100 Mbps for power users who need maximum speed for streaming, gaming, and work.",
    },
    {
      question: "Is there a data cap on your packages?",
      answer: "No! All our packages come with unlimited data. You can stream, download, and browse as much as you want without worrying about data limits or throttling.",
    },
    {
      question: "How long does installation take?",
      answer: "Installation typically takes 2-3 hours once our technician arrives. In most cases, we can schedule installation within 2-5 business days of your order, depending on your location and our current schedule.",
    },
    {
      question: "Do I need to buy my own router?",
      answer: "It depends on your package. Our Standard, Premium, and Ultimate packages include a free router. For the Basic package, you can either use your own compatible router or rent one from us for a small monthly fee.",
    },
    {
      question: "What areas do you cover?",
      answer: "We currently provide service in Rawalpindi, Taxila, Wah Cantt, and Hassan Abdal. Use our coverage map to check if your specific address is in our service area. We're constantly expanding to new areas!",
    },
    {
      question: "Is there a contract or can I cancel anytime?",
      answer: "We offer flexible monthly plans with no long-term contracts. You can cancel anytime with just 30 days' notice. However, we do offer discounts for customers who commit to 6-month or 1-year plans.",
    },
    {
      question: "What kind of customer support do you provide?",
      answer: "We provide 24/7 customer support through multiple channels including phone, WhatsApp, and email. Our technical support team is always ready to help with any issues or questions you might have.",
    },
    {
      question: "Can I upgrade or downgrade my package?",
      answer: "Yes, absolutely! You can change your package at any time. Upgrades are processed immediately, while downgrades take effect at the start of your next billing cycle.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfer, easy paisa, jazz cash, and credit/debit cards. You can also set up automatic monthly payments for convenience.",
    },
    {
      question: "What happens if there's a service outage?",
      answer: "While we maintain a 99.9% uptime, if there's an outage, our team is immediately notified and works to resolve it as quickly as possible. You can also report issues through our 24/7 support line. We provide service credits for extended outages as per our service level agreement.",
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
              Frequently Asked
              <span className="block gradient-primary bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>

          {/* FAQ Accordion */}
          <Card className="glass p-8 max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Contact Section */}
          <Card className="glass p-8 text-center max-w-3xl mx-auto mt-12">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="px-6 py-3 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-opacity">
                  Chat on WhatsApp
                </button>
              </a>
              <a href="/contact" className="inline-block">
                <button className="px-6 py-3 rounded-lg border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.1)] transition-colors">
                  Contact Support
                </button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
