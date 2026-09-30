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
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Scale,
  Building,
  TrendingUp,
  Shield,
  Gavel,
  Landmark,
  FileText,
  Send,
  Lock,
} from "lucide-react";
import Link from "next/link";

type MatterType =
  | "corporate-formation"
  | "ma-transaction"
  | "ip-protection"
  | "litigation-dispute"
  | "real-estate-deal"
  | "employment-matter"
  | "other";

const matterTypes: { value: MatterType; label: string; icon: typeof Building; description: string }[] = [
  { value: "corporate-formation", label: "Corporate Formation & Governance", icon: Building, description: "Entity formation, board advisory, securities compliance" },
  { value: "ma-transaction", label: "Mergers & Acquisitions", icon: TrendingUp, description: "Buy-side, sell-side, due diligence, deal structuring" },
  { value: "ip-protection", label: "Intellectual Property", icon: Shield, description: "Patents, trademarks, copyrights, trade secrets" },
  { value: "litigation-dispute", label: "Commercial Litigation", icon: Gavel, description: "Contract disputes, securities, regulatory defense" },
  { value: "real-estate-deal", label: "Real Estate", icon: Landmark, description: "Acquisitions, development, leasing, financing" },
  { value: "employment-matter", label: "Employment & Labor", icon: FileText, description: "Agreements, compliance, investigations, disputes" },
  { value: "other", label: "Other / Not Listed", icon: Scale, description: "General inquiry — we'll route you appropriately" },
];

const steps = [
  { id: "matter-type", label: "Matter Type" },
  { id: "priority", label: "Timeline" },
  { id: "contact", label: "Contact" },
  { id: "details", label: "Details" },
  { id: "review", label: "Review" },
];

interface IntakeFormData {
  matterType: MatterType | "";
  priority: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  opposingParty: string;
  matterDescription: string;
  deadline: string;
  referralSource: string;
}

const defaultForm: IntakeFormData = {
  matterType: "",
  priority: "standard",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  companyName: "",
  opposingParty: "",
  matterDescription: "",
  deadline: "",
  referralSource: "",
};

export default function IntakePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<IntakeFormData>(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    intakeId: string;
    status: string;
    routedTo: string;
    estimatedResponseTime: string;
    nextSteps: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const update = (field: keyof IntakeFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 0) return !!form.matterType;
    if (step === 1) return !!form.priority;
    if (step === 2) return !!form.clientName && !!form.clientEmail && !!form.clientPhone;
    if (step === 3) return !!form.matterDescription;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matterType: form.matterType,
          priority: form.priority,
          clientName: form.clientName,
          clientEmail: form.clientEmail,
          clientPhone: form.clientPhone,
          companyName: form.companyName || undefined,
          opposingParty: form.opposingParty || undefined,
          matterDescription: form.matterDescription,
          deadline: form.deadline || undefined,
          referralSource: form.referralSource || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  // After successful submission
  if (result) {
    return (
      <div className="flex flex-col">
        <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-20">
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent mb-6">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
              Intake Submitted
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Matter Initiated
            </h1>
            <p className="mt-3 max-w-lg mx-auto text-white/55 font-mono text-[15px]">
              Reference number: <span className="text-accent font-bold">{result.intakeId}</span>
            </p>
          </div>
        </section>
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary">What happens next</CardTitle>
                <CardDescription className="font-mono text-[13px]">
                  Routed to: <span className="text-accent font-semibold">{result.routedTo}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="font-mono text-[13px] uppercase tracking-wider">Estimated Response</span>
                  </div>
                  <p className="text-lg font-semibold text-primary">{result.estimatedResponseTime}</p>
                </div>
                <ol className="space-y-3">
                  {result.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-semibold font-mono">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    render={<Link href="/" />}
                  >
                    Return Home
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { setResult(null); setStep(0); setForm(defaultForm); }}
                  >
                    New Intake
                  </Button>
                </div>
              </CardContent>
            </Card>
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
            Confidential
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Matter Intake
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/55 font-mono text-[15px]">
            Submit the details of your legal matter. All information is
            treated as confidential and protected by attorney-client privilege.
          </p>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-mono font-bold transition-all ${
                      i < step
                        ? "bg-accent text-accent-foreground"
                        : i === step
                        ? "bg-accent/20 text-accent border border-accent/40"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`h-px w-12 md:w-20 transition-all ${
                        i < step ? "bg-accent" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((s, i) => (
                <span
                  key={s.id}
                  className={`text-[10px] font-mono uppercase tracking-wider ${
                    i === step ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Step content */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                {step === 0 && "Select Your Matter Type"}
                {step === 1 && "Timeline & Priority"}
                {step === 2 && "Your Contact Information"}
                {step === 3 && "Matter Details"}
                {step === 4 && "Review & Submit"}
              </CardTitle>
              <CardDescription className="font-mono text-[13px]">
                {step === 0 && "Choose the category that best describes your legal need."}
                {step === 1 && "How urgent is your matter?"}
                {step === 2 && "How should we reach you?"}
                {step === 3 && "Describe your matter in detail so we can prepare."}
                {step === 4 && "Please verify all information before submitting."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {matterTypes.map((mt) => {
                    const Icon = mt.icon;
                    const selected = form.matterType === mt.value;
                    return (
                      <button
                        key={mt.value}
                        type="button"
                        onClick={() => update("matterType", mt.value)}
                        className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                          selected
                            ? "border-accent/50 bg-accent/5 ring-1 ring-accent/30"
                            : "border-border hover:border-accent/20 hover:bg-muted/50"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            selected ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary">{mt.label}</p>
                          <p className="text-xs text-muted-foreground font-mono mt-0.5">{mt.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  {[
                    { value: "standard", label: "Standard", description: "No fixed deadline — standard review process", icon: Scale },
                    { value: "expedited", label: "Expedited", description: "Action needed within 2-3 weeks", icon: TrendingUp },
                    { value: "emergency", label: "Emergency", description: "Immediate attention required — filing deadline imminent", icon: Gavel },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("priority", opt.value)}
                      className={`flex items-start gap-3 w-full rounded-xl border p-4 text-left transition-all ${
                        form.priority === opt.value
                          ? "border-accent/50 bg-accent/5 ring-1 ring-accent/30"
                          : "border-border hover:border-accent/20 hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          form.priority === opt.value ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <opt.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">{opt.label}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">{opt.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="clientName" className="text-sm font-medium text-primary">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="clientName"
                        placeholder="Jane Smith"
                        value={form.clientName}
                        onChange={(e) => update("clientName", e.target.value)}
                        className="font-mono text-[14px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="clientEmail" className="text-sm font-medium text-primary">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="clientEmail"
                        type="email"
                        placeholder="jane@company.com"
                        value={form.clientEmail}
                        onChange={(e) => update("clientEmail", e.target.value)}
                        className="font-mono text-[14px]"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="clientPhone" className="text-sm font-medium text-primary">
                        Phone <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="clientPhone"
                        type="tel"
                        placeholder="(212) 555-0900"
                        value={form.clientPhone}
                        onChange={(e) => update("clientPhone", e.target.value)}
                        className="font-mono text-[14px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="text-sm font-medium text-primary">
                        Company / Organization
                      </label>
                      <Input
                        id="companyName"
                        placeholder="Acme Corp"
                        value={form.companyName}
                        onChange={(e) => update("companyName", e.target.value)}
                        className="font-mono text-[14px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="matterDescription" className="text-sm font-medium text-primary">
                      Describe Your Matter <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="matterDescription"
                      rows={6}
                      placeholder="Please describe your legal situation in detail, including relevant parties, key facts, and any deadlines or court dates..."
                      value={form.matterDescription}
                      onChange={(e) => update("matterDescription", e.target.value)}
                      className="font-mono text-[14px]"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="opposingParty" className="text-sm font-medium text-primary">
                        Opposing Party (if any)
                      </label>
                      <Input
                        id="opposingParty"
                        placeholder="Name of opposing party or entity"
                        value={form.opposingParty}
                        onChange={(e) => update("opposingParty", e.target.value)}
                        className="font-mono text-[14px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="deadline" className="text-sm font-medium text-primary">
                        Relevant Deadline
                      </label>
                      <Input
                        id="deadline"
                        type="date"
                        value={form.deadline}
                        onChange={(e) => update("deadline", e.target.value)}
                        className="font-mono text-[14px]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="referralSource" className="text-sm font-medium text-primary">
                      How did you hear about us?
                    </label>
                    <Input
                      id="referralSource"
                      placeholder="e.g., Google, colleague, prior client"
                      value={form.referralSource}
                      onChange={(e) => update("referralSource", e.target.value)}
                      className="font-mono text-[14px]"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Matter Type</p>
                        <p className="text-sm font-semibold text-primary mt-0.5">
                          {matterTypes.find((m) => m.value === form.matterType)?.label || form.matterType}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Priority</p>
                        <p className="text-sm font-semibold text-primary mt-0.5 capitalize">{form.priority}</p>
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Name</p>
                        <p className="text-sm text-primary mt-0.5">{form.clientName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email</p>
                        <p className="text-sm text-primary mt-0.5">{form.clientEmail}</p>
                      </div>
                    </div>
                    {form.opposingParty && (
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Opposing Party</p>
                        <p className="text-sm text-primary mt-0.5">{form.opposingParty}</p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive font-mono">
                      {error}
                    </div>
                  )}

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
                    disabled={submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Confidential Intake
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {step < 4 && (
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={!canProceed()}
                    onClick={() => setStep((s) => Math.min(4, s + 1))}
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}