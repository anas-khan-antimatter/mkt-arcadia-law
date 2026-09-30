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
import Link from "next/link";

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
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col">
        <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-16 md:py-20">
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent mb-6">
              <CheckCircle className="h-8 w-8" />
            </div>
            <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
              Message Sent
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Thank You for Reaching Out
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-white/55 font-mono text-[15px]">
              Your inquiry has been received. A member of our team will
              review it and respond within one business day. For urgent
              matters, please call our office directly.
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-md">
            <h2 className="text-2xl font-bold text-primary">What happens next?</h2>
            <ol className="mt-6 space-y-4 text-left max-w-sm mx-auto">
              {[
                "Your message is routed to the appropriate practice team",
                "An attorney reviews your matter within 24 hours",
                "We schedule a confidential consultation at your convenience",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-semibold font-mono">
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
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-16 md:py-20">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
            Get In Touch
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/55 font-mono text-[15px]">
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
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Confidential Consultation Request
                  </CardTitle>
                  <CardDescription className="font-mono text-[13px]">
                    All information submitted is treated as confidential and
                    protected by attorney-client privilege.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-primary">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Jane Smith"
                          value={formState.name}
                          onChange={handleChange}
                          className="font-mono text-[14px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-primary">
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
                          className="font-mono text-[14px]"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-primary">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(212) 555-0900"
                          value={formState.phone}
                          onChange={handleChange}
                          className="font-mono text-[14px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-primary">
                          Company
                        </label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Acme Corp"
                          value={formState.company}
                          onChange={handleChange}
                          className="font-mono text-[14px]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="practiceArea" className="text-sm font-medium text-primary">
                        Practice Area of Interest
                      </label>
                      <select
                        id="practiceArea"
                        name="practiceArea"
                        value={formState.practiceArea}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-[14px] focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="">Select a practice area...</option>
                        {practiceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-primary">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Please describe your legal matter or question..."
                        value={formState.message}
                        onChange={handleChange}
                        className="font-mono text-[14px]"
                      />
                    </div>
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span className="font-mono text-[12px]">
                        This submission is protected. By submitting, you agree to our{" "}
                        <a href="/" className="text-accent underline hover:text-accent/80">Privacy Policy</a>.
                      </span>
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Office</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="font-mono text-[13px]">
                      200 Park Avenue, Suite 2500<br />
                      New York, NY 10166
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-5 w-5 shrink-0 text-accent" />
                    <span className="font-mono text-[13px]">(212) 555-0900</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-5 w-5 shrink-0 text-accent" />
                    <span className="font-mono text-[13px]">info@arcadialaw.com</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div className="font-mono text-[13px]">
                      <p>Monday – Friday: 8:30 AM – 6:30 PM</p>
                      <p>Saturday: By appointment only</p>
                      <p>Sunday: Closed</p>
                      <p className="mt-2 text-accent">24/7 urgent response available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-base text-primary font-mono text-[14px]">
                    Looking to start a new matter?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground font-mono text-[13px]">
                    Our online intake wizard is the fastest way to get started.
                  </p>
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                    render={<Link href="/intake" />}
                  >
                    Begin Matter Intake
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