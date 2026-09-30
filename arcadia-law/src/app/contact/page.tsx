"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Lock,
  CheckCircle,
} from "lucide-react";

const practiceOptions = [
  "Corporate Law",
  "Mergers & Acquisitions",
  "Intellectual Property",
  "Commercial Litigation",
  "Real Estate",
  "Employment & Labor",
  "Other / Not Sure",
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    practiceArea: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <Badge className="mb-4 border-green-400/40 bg-green-600/10 text-green-400 text-xs tracking-widest uppercase">
              Message Sent
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Thank You for Reaching Out
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-zinc-400">
              Your inquiry has been received. A member of our team will
              review it and respond within one business day. For urgent
              matters, please call our office directly.
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10 text-green-600">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-2xl font-bold">What happens next?</h2>
              <ol className="mt-6 space-y-4 text-left">
                {[
                  "Your message is routed to the appropriate practice team",
                  "An attorney reviews your matter within 24 hours",
                  "We schedule a confidential consultation at your convenience",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600/10 text-amber-700 text-xs font-semibold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <Button
                variant="outline"
                className="mt-8"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase">
            Get In Touch
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-400">
            Ready to work with us? Fill out the confidential intake form
            below and an attorney will respond within one business day.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Form */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Confidential Consultation Request
                  </CardTitle>
                  <CardDescription>
                    All information submitted is treated as confidential and
                    protected by attorney-client privilege.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium"
                        >
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Jane Smith"
                          value={formState.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium"
                        >
                          Email <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="jane@company.com"
                          value={formState.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium"
                        >
                          Phone <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="(212) 555-0123"
                          value={formState.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="company"
                          className="text-sm font-medium"
                        >
                          Company / Organization
                        </label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Acme Corp"
                          value={formState.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="practiceArea"
                        className="text-sm font-medium"
                      >
                        Practice Area of Interest{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="practiceArea"
                        name="practiceArea"
                        required
                        value={formState.practiceArea}
                        onChange={handleChange}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="" disabled>
                          Select a practice area
                        </option>
                        {practiceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium"
                      >
                        Tell us about your matter{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Briefly describe your legal situation, including any relevant deadlines or parties involved..."
                        value={formState.message}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>
                        This form is protected by encryption and attorney-client
                        privilege. By submitting, you agree to our{" "}
                        <a href="/" className="underline hover:text-foreground">
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Submit Confidential Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Office Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium">New York Office</p>
                      <p className="text-sm text-muted-foreground">
                        200 Park Avenue, Suite 2500
                        <br />
                        New York, NY 10166
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        (212) 555-0900
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        info@arcadialaw.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium">Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Monday – Friday: 8:30 AM – 6:30 PM
                        <br />
                        Saturday – Sunday: By appointment
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Why Arcadia Law?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Direct partner access on every matter",
                    "Flat-fee and value billing options available",
                    "Same-day response commitment",
                    "Confidential initial consultation at no charge",
                    "Decades of combined experience across every corporate practice area",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-amber-600/30 bg-amber-50/50 dark:bg-amber-950/10">
                <CardHeader>
                  <CardTitle className="text-lg">
                    ⚠️ Urgent Matters
                  </CardTitle>
                  <CardDescription>
                    If you have a pressing legal deadline or emergency, please
                    call our office directly rather than using this form.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full border-amber-600/30 text-amber-700 hover:bg-amber-100"
                    render={<a href="tel:+12125550900" />}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call (212) 555-0900
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}