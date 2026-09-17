import * as React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

const fileSchema = z
  .instanceof(File, { message: "Image is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, "Image must be under 5MB")
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only JPG, PNG or WEBP images are allowed"
  );

const schema = z.object({
  serviceFor: z.string().min(1, "Service type is required"),
  name: z.string().trim().min(1, "Name is required"),
  phone: z.string().trim().min(10, "Valid phone number required"),
  email: z.string().trim().email("Valid email required"),
  address: z.string().trim().min(10, "Address is required"),
  cnic: z.string().trim().min(13, "Valid CNIC required"),
  cnicFront: fileSchema,
  cnicBack: fileSchema,
  plan: z.string().min(1, "Please select a plan"),
  equipmentPolicies: z.array(z.string()).min(1, "Please accept at least one policy"),
  additionalRouter: z.string().min(1, "Please select an option"),
  supportPolicy: z.string().min(1, "Please accept support policy"),
});

type NewConnectionFormData = z.infer<typeof schema>;

const selectStyle =
  "w-full rounded-md border border-input bg-white text-black px-3 py-2 text-sm shadow-sm focus:outline-none";

const EQUIPMENT_POLICIES = [
  "Company offers first 5 days checking and equipment replacement for free. After it 60% will be returned",
  "Rs. 3000 shall be charged in case of POE unit malfunction",
  "Rs. 4500 shall be charged in case of Router malfunction. (Single Bandwidth Router)",
  "Rs. 500 shall be charged in case of Adapter malfunction",
  "Rs. 90/meter shall be charged in case of Lan Cable malfunction",
  "All equipment remains the property of the company; it must be returned in working condition upon service discontinuation",
];

// Change this to whatever bucket name you create in Supabase Storage
const CNIC_BUCKET = "cnic-images";

async function uploadCnicImage(file: File, label: "front" | "back") {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${label}.${ext}`;

  const { error } = await supabase.storage.from(CNIC_BUCKET).upload(path, file);
  if (error) throw error;

  const { data } = supabase.storage.from(CNIC_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function FileDropInput({
  value,
  onChange,
  label,
}: {
  value?: File;
  onChange: (file?: File) => void;
  label: string;
}) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  return (
    <div className="space-y-1">
      <label className="block font-semibold">{label} *</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="border border-dashed border-input rounded-md p-4 text-center cursor-pointer text-sm hover:bg-muted/40"
      >
        {preview ? (
          <img src={preview} alt={label} className="mx-auto max-h-40 rounded-md object-contain" />
        ) : (
          <span className="text-muted-foreground">Click to upload {label.toLowerCase()}</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0])}
      />
    </div>
  );
}

export default function NewConnectionForm() {
  const { toast } = useToast();

  const form = useForm<NewConnectionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceFor: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      cnic: "",
      cnicFront: undefined,
      cnicBack: undefined,
      plan: "",
      equipmentPolicies: [...EQUIPMENT_POLICIES],
      additionalRouter: "",
      supportPolicy: "",
    },
  });

  const onSubmit = async (data: NewConnectionFormData) => {
    try {
      const [cnicFrontUrl, cnicBackUrl] = await Promise.all([
        uploadCnicImage(data.cnicFront, "front"),
        uploadCnicImage(data.cnicBack, "back"),
      ]);

      const { error } = await supabase.from("new_connection_requests").insert([
        {
          service_for: data.serviceFor,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          cnic: data.cnic,
          cnic_front_url: cnicFrontUrl,
          cnic_back_url: cnicBackUrl,
          plan: data.plan,
          equipment_policies: data.equipmentPolicies.join(", "),
          additional_router: data.additionalRouter,
          support_policy: data.supportPolicy,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your request has been submitted successfully!",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">New Connection Form</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fill out the form below to request a new internet connection.
            </p>
          </div>

          <Card className="p-8 max-w-4xl mx-auto glass">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Service For */}
                <Controller
                  name="serviceFor"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold">I want service for *</label>
                      <select {...field} className={selectStyle}>
                        <option value="">Select</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Shop">Shop</option>
                        <option value="Other">Other</option>
                      </select>
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold">Name *</label>
                      <Input placeholder="Your name" {...field} />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold">Phone Number *</label>
                      <Input placeholder="Your phone number" type="tel" {...field} />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold">Email *</label>
                      <Input placeholder="Your email" type="email" {...field} />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Address */}
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold">Address *</label>
                      <Textarea placeholder="Your complete address" rows={3} {...field} />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* CNIC */}
                <Controller
                  name="cnic"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold">CNIC Number *</label>
                      <Input placeholder="xxxxx-xxxxxxx-x" maxLength={15} {...field} />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* CNIC Front Image */}
                <Controller
                  name="cnicFront"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <FileDropInput
                        label="CNIC Front Image"
                        value={field.value}
                        onChange={(file) => field.onChange(file)}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* CNIC Back Image */}
                <Controller
                  name="cnicBack"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <FileDropInput
                        label="CNIC Back Image"
                        value={field.value}
                        onChange={(file) => field.onChange(file)}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Plan */}
                <Controller
                  name="plan"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold">Subscription Plan *</label>
                      <select {...field} className={selectStyle}>
                        <option value="">Select a plan</option>
                        <option value="Rs. 22000 For Packages 6Mbps upto 16Mbps">
                          Rs. 22,000 for 6 to 16 Mbps
                        </option>
                        <option value="Rs. 35000 For Packages 20Mbps upto 50Mbps">
                          Rs. 38,000 for 20 to 50 Mbps
                        </option>
                        <option value="FTTH">FTTH</option>
                        <option value="Own Equipments">Own Equipments</option>
                      </select>
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Equipment Policies */}
                <Controller
                  name="equipmentPolicies"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold mb-3">
                        Equipment Replacement and Warranty Policies *
                      </label>
                      {EQUIPMENT_POLICIES.map((policy) => (
                        <label key={policy} className="flex items-start text-sm mt-2 cursor-pointer">
                          <input
                            type="checkbox"
                            value={policy}
                            checked={field.value?.includes(policy)}
                            onChange={(e) => {
                              const updatedValue = e.target.checked
                                ? [...field.value, policy]
                                : field.value.filter((v) => v !== policy);
                              field.onChange(updatedValue);
                            }}
                            className="mr-2 mt-1"
                          />
                          <span>{policy}</span>
                        </label>
                      ))}
                      {fieldState.error && (
                        <p className="text-sm text-destructive mt-2">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Additional Router */}
                <Controller
                  name="additionalRouter"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold">Do you need additional router? *</label>
                      <select {...field} className={selectStyle}>
                        <option value="">Select</option>
                        <option value="Yes, I need. Rs, 4500/- (Single Bandwidth Router) for additional Router / Lan Cable Deployment">
                          Yes, Rs 4,500 extra for router and cable
                        </option>
                        <option value="No, I don't need">No</option>
                      </select>
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Support Policy */}
                <Controller
                  name="supportPolicy"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <label className="block font-semibold">Support Policy *</label>
                      <select {...field} className={selectStyle}>
                        <option value="">Select</option>
                        <option value="Friday is off and 10Am to 8PM are official visit hours, I agree to pay Rs. 300 in case of emergency complaint after visit hours.">
                          I agree — Friday off, 10AM–8PM official hours. Rs. 300 for after-hours emergency.
                        </option>
                      </select>
                      {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full gradient-primary hover:opacity-90"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>

              </form>
            </FormProvider>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}