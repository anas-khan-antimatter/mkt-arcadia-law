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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  Building,
  Scale,
  Shield,
  Gavel,
  Landmark,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  Briefcase,
  Calendar,
  Send,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type MatterType =
  | "corporate"
  | "ma"
  | "ip"
  | "litigation"
  | "realestate"
  | "employment"
  | "other";

interface StepProps {
  formData: IntakeForm;
  updateFields: (fields: Partial<IntakeForm>) => void;
}

interface IntakeForm {
  matterType: MatterType | "";
  urgency: "immediate" | "weeks" | "months" | "";
  entityType: string;
  jurisdiction: string;
  summary: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

const matterTypes: { id: MatterType; label: string; icon: React.ElementType; description: string }[] = [
  { id: "corporate", label: "Corporate Formation & Governance", icon: Building, description: "Entity setup, board advisory, compliance" },
  { id: "ma", label: "Mergers & Acquisitions", icon: Scale, description: "Buy/sell-side, due diligence, deal structuring" },
  { id: "ip", label: "Intellectual Property", icon: Shield, description: "Patents, trademarks, licensing, enforcement" },
  { id: "litigation", label: "Commercial Litigation", icon: Gavel, description: "Disputes, arbitration, regulatory defense" },
  { id: "realestate", label: "Real Estate", icon: Landmark, description: "Transactions, development, leasing" },
  { id: "employment", label: "Employment & Labor", icon: FileText, description: "Contracts, compliance, disputes" },
  { id: "other", label: "Other / Not Listed", icon: AlertCircle, description: "Tell us about your specific matter" },
];

const urgencyOptions = [
  { id: "immediate", label: "Immediate (within 48 hours)", description: "Urgent deadline or filing required" },
  { id: "weeks", label: "In the next few weeks", description: "Planning ahead with moderate timeline" },
  { id: "months", label: "No immediate deadline", description: "Exploring options and gathering information" },
] as const;

function StepMatterType({ formData, updateFields }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">What type of legal matter are you facing?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select the category that best describes your situation. You can provide more detail in the next step.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {matterTypes.map((mt) => {
          const Icon = mt.icon;
          const selected = formData.matterType === mt.id;
          return (
            <button
              key={mt.id}
              type="button"
              onClick={() => updateFields({ matterType: mt.id })}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                selected
                  ? "border-amber-600 bg-amber-600/5 ring-1 ring-amber-600/30"
                  : "border-border bg-card hover:border-amber-600/40 hover:shadow-sm"
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                selected ? "bg-amber-600 text-white" : "bg-amber-600/10 text-amber-600"
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{mt.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{mt.description}</p>
              </div>
              {selected && <CheckCircle className="h-5 w-5 shrink-0 text-amber-600" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepUrgency({ formData, updateFields }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">What is the timeline for this matter?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Understanding your timeline helps us prioritize and assign the right resources.
        </p>
      </div>
      <div className="space-y-3">
        {urgencyOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => updateFields({ urgency: opt.id })}
            className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all ${
              formData.urgency === opt.id
                ? "border-amber-600 bg-amber-600/5 ring-1 ring-amber-600/30"
                : "border-border bg-card hover:border-amber-600/40 hover:shadow-sm"
            }`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              formData.urgency === opt.id ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"
            }`}>
              {opt.id === "immediate" ? <AlertCircle className="h-5 w-5" /> :
               opt.id === "weeks" ? <Calendar className="h-5 w-5" /> :
               <Calendar className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-sm font-medium">{opt.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDetails({ formData, updateFields }: StepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">Tell us about your matter</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Provide context so we can route your intake to the right attorney.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Entity / Business Type</label>
          <Input
            placeholder="e.g., C-Corp, LLC, Individual"
            value={formData.entityType}
            onChange={(e) => updateFields({ entityType: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Jurisdiction / State</label>
          <Input
            placeholder="e.g., Delaware, New York"
            value={formData.jurisdiction}
            onChange={(e) => updateFields({ jurisdiction: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Summary of the Matter</label>
        <Textarea
          rows={5}
          placeholder="Describe your legal situation. Include relevant parties, deadlines, amounts in controversy, and any actions already taken."
          value={formData.summary}
          onChange={(e) => updateFields({ summary: e.target.value })}
        />
      </div>
    </div>
  );
}

function StepContact({ formData, updateFields }: StepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">Your Contact Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          All information is confidential and protected by attorney-client privilege.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </label>
          <Input
            required
            placeholder="Jane Smith"
            value={formData.name}
            onChange={(e) => updateFields({ name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </label>
          <Input
            required
            type="email"
            placeholder="jane@company.com"
            value={formData.email}
            onChange={(e) => updateFields({ email: e.target.value })}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Phone <span className="text-destructive">*</span>
          </label>
          <Input
            required
            type="tel"
            placeholder="(212) 555-0123"
            value={formData.phone}
            onChange={(e) => updateFields({ phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Company / Organization</label>
          <Input
            placeholder="Acme Corp"
            value={formData.company}
            onChange={(e) => updateFields({ company: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Your Role</label>
        <Input
          placeholder="e.g., CEO, General Counsel, Founder"
          value={formData.role}
          onChange={(e) => updateFields({ role: e.target.value })}
        />
      </div>
    </div>
  );
}

const STEPS = [
  { title: "Matter Type", component: StepMatterType },
  { title: "Timeline", component: StepUrgency },
  { title: "Details", component: StepDetails },
  { title: "Contact", component: StepContact },
];

export default function IntakePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<IntakeForm>({
    matterType: "",
    urgency: "",
    entityType: "",
    jurisdiction: "",
    summary: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });

  const updateFields = (fields: Partial<IntakeForm>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const canProceed = () => {
    if (step === 0) return formData.matterType !== "";
    if (step === 1) return formData.urgency !== "";
    if (step === 2) return formData.summary.length >= 10;
    if (step === 3) return formData.name !== "" && formData.email !== "" && formData.phone !== "";
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <Badge className="mb-4 border-green-400/40 bg-green-600/10 text-green-400 text-xs tracking-widest uppercase">
              Intake Received
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Your Intake Has Been Submitted
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-zinc-400">
              Thank you, {formData.name}. Your matter has been categorized and routed to our {matterTypes.find(m => m.id === formData.matterType)?.label || "appropriate"} team. A partner will review and respond within one business day.
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-lg">
            <Card>
              <CardHeader>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600/10 text-green-600">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <CardTitle className="text-center mt-3">What happens next?</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {[
                    "Your intake is reviewed by a practice group lead",
                    "Conflicts check is performed",
                    "An engagement team is assigned",
                    "You receive a call or email within 24 hours",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600/10 text-amber-700 text-xs font-semibold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
              <CardFooter className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => { setStep(0); setSubmitted(false); setFormData({ matterType: "", urgency: "", entityType: "", jurisdiction: "", summary: "", name: "", email: "", phone: "", company: "", role: "" }); }}>
                  Start New Intake
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white" render={<Link href="/" />}>
                  Return Home
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  const StepComponent = STEPS[step].component;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase">
            New Matter
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Case Intake
          </h1>
          <p className="mt-3 max-w-xl text-base text-zinc-400">
            Confidential intake questionnaire to help us understand your matter and route it to the right team.
          </p>
        </div>
      </section>

      {/* Progress */}
      <section className="border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  i < step ? "bg-green-600 text-white" :
                  i === step ? "bg-amber-600 text-white" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${
                  i === step ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <StepComponent formData={formData} updateFields={updateFields} />

                <Separator className="my-6" />

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={step === 0}
                    onClick={() => setStep((s) => s - 1)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  {step < STEPS.length - 1 ? (
                    <Button
                      type="button"
                      disabled={!canProceed()}
                      onClick={() => setStep((s) => s + 1)}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!canProceed()}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Submit Intake
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            This form is confidential and protected by attorney-client privilege. Submitting does not create an attorney-client relationship.
          </p>
        </div>
      </section>
    </div>
  );
}