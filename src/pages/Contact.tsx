import * as React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ----------------
// Validation Schema
// ----------------
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email").min(1, "Email is required"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ----------------
// Component
// ----------------
const Contact = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    // ---- Prevent dummy/spam data ----
    const dummyNames = ["test", "dummy", "abc"];
    const dummyEmails = ["example.com", "test.com"];
    if (
      dummyNames.some((d) => data.name.toLowerCase().includes(d)) ||
      dummyEmails.some((d) => data.email.toLowerCase().includes(d))
    ) {
      toast({ title: "Invalid Data", description: "Please enter real information." });
      return;
    }

    // ---- Google Form "formResponse" URL ----
    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSeB2UpdVGGS3ISfY5QcdIHYdQcSJrW280XzwZAdtDUJP8-eqQ/formResponse";

    const formData = new FormData();
    formData.append("entry.1786162090", data.name);     // Name
    formData.append("entry.1241981933", data.email);    // Email
    formData.append("entry.865533440", data.phone ?? ""); // Phone
    formData.append("entry.1716786685", data.message);  // Message

    try {
      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      toast({ title: "Message Sent!", description: "We'll get back to you soon." });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to send message." });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Reach out to us and we’ll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="glass p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {["name", "email", "phone", "message"].map((field) => (
                    <Controller
                      key={field}
                      name={field as any}
                      control={form.control}
                      render={({ field: controllerField, fieldState }) => (
                        <div className="space-y-1">
                          <label className="block font-medium">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          {field === "message" ? (
                            <Textarea placeholder={`Your ${field}`} {...controllerField} />
                          ) : (
                            <Input placeholder={`Your ${field}`} {...controllerField} />
                          )}
                          {fieldState.error && (
                            <p className="text-sm text-destructive">{fieldState.error.message}</p>
                          )}
                        </div>
                      )}
                    />
                  ))}
                  <Button
                    type="submit"
                    className="w-full gradient-primary hover:opacity-90"
                    disabled={form.formState.isSubmitting}
                  >
                    Send Message
                  </Button>
                </form>
              </FormProvider>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
