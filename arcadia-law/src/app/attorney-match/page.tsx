"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  RefreshCw,
  User,
  Building,
  Scale,
  Gavel,
} from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  label: string;
  options: { value: string; label: string; icon?: typeof Building }[];
}

const questions: Question[] = [
  {
    id: "primaryNeed",
    label: "What is the primary legal need?",
    options: [
      { value: "entity-formation", label: "Entity formation, governance, or fundraising" },
      { value: "ma-transaction", label: "M&A transaction or due diligence" },
      { value: "patent", label: "Patent, trademark, or IP protection" },
      { value: "dispute", label: "Dispute, litigation, or regulatory defense" },
      { value: "acquisition", label: "Real estate acquisition or development" },
      { value: "employment", label: "Employment agreement or compliance" },
    ],
  },
  {
    id: "entityType",
    label: "Which best describes your organization?",
    options: [
      { value: "startup", label: "Startup / Early-stage" },
      { value: "private", label: "Privately held / Family-owned" },
      { value: "public", label: "Publicly traded" },
      { value: "pe-backed", label: "Private equity / Venture backed" },
      { value: "nonprofit", label: "Nonprofit / Government" },
      { value: "individual", label: "Individual / Not applicable" },
    ],
  },
  {
    id: "industry",
    label: "What industry do you operate in?",
    options: [
      { value: "technology", label: "Technology / Software" },
      { value: "healthcare", label: "Healthcare / Life Sciences" },
      { value: "finance", label: "Financial Services / Fintech" },
      { value: "real-estate", label: "Real Estate / Construction" },
      { value: "manufacturing", label: "Manufacturing / Industrials" },
      { value: "other", label: "Other / Multiple industries" },
    ],
  },
  {
    id: "urgency",
    label: "What is your timeline?",
    options: [
      { value: "planning", label: "Planning ahead — no immediate deadline" },
      { value: "soon", label: "Need to act within the next month" },
      { value: "imminent", label: "Urgent — need counsel this week" },
      { value: "filed", label: "Already in litigation / filing deadline imminent" },
    ],
  },
  {
    id: "budget",
    label: "What is your preferred fee structure?",
    options: [
      { value: "flat", label: "Flat fee / Fixed scope" },
      { value: "retainer", label: "Monthly retainer for ongoing counsel" },
      { value: "hourly", label: "Hourly billing" },
      { value: "contingency", label: "Contingency / Outcome-based" },
    ],
  },
  {
    id: "referral",
    label: "How did you hear about Arcadia Law?",
    options: [
      { value: "referral", label: "Referral from client or colleague" },
      { value: "search", label: "Online search or website" },
      { value: "event", label: "Industry event or publication" },
      { value: "prior", label: "Prior client" },
      { value: "other", label: "Other" },
    ],
  },
];

interface MatchResult {
  recommendedTeam: string;
  recommendedAttorney: string;
  practiceArea: string;
  confidence: number;
  nextSteps: string[];
  alternativeTeam?: string;
}

export default function AttorneyMatchPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const answer = (value: string) => {
    const q = questions[currentQ];
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      submitQuiz(updated);
    }
  };

  const submitQuiz = async (ans: Record<string, string>) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: ans }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Match failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
    setError("");
  };

  // Result view
  if (result) {
    return (
      <div className="flex flex-col">
        <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-16 md:py-20">
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent mb-6">
              <User className="h-8 w-8" />
            </div>
            <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
              Match Complete
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Your Recommended Team
            </h1>
            <p className="mt-3 max-w-lg mx-auto text-white/55 font-mono text-[15px]">
              Based on your responses, we recommend the following practice group.
            </p>
          </div>
        </section>
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <Card className="border-accent/20">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                  <Scale className="h-10 w-10" />
                </div>
                <Badge className="border-accent/30 text-accent text-[11px] tracking-[0.2em] uppercase font-mono mx-auto w-fit mb-2">
                  {result.confidence}% Match
                </Badge>
                <CardTitle className="text-2xl text-primary">
                  {result.recommendedTeam}
                </CardTitle>
                <CardDescription className="text-base font-mono text-[14px]">
                  Primary contact: <span className="text-accent font-semibold">{result.recommendedAttorney}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {result.alternativeTeam && (
                  <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm text-muted-foreground font-mono text-[13px]">
                    Also consider: <span className="text-primary font-semibold">{result.alternativeTeam}</span>
                  </div>
                )}
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
                    className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                    render={<Link href="/intake" />}
                  >
                    Begin Intake <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={reset}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="flex flex-col">
        <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] py-40">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-accent/30 border-t-accent" />
            <p className="mt-6 text-white/55 font-mono text-[15px]">Analyzing your responses...</p>
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
            Attorney Matching
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Attorney Match Quiz
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/55 font-mono text-[15px]">
            Answer six quick questions and we&apos;ll recommend the right
            practice team and attorney for your matter. No personal
            information required.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    i < currentQ ? "bg-accent" : i === currentQ ? "bg-accent/50" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Question {currentQ + 1} of {questions.length}</span>
              <span>{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive font-mono">
              {error}
            </div>
          )}

          {/* Current question */}
          <Card key={questions[currentQ].id} className="border-border animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-primary font-mono text-[16px]">
                {questions[currentQ].label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {questions[currentQ].options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => answer(opt.value)}
                    className="flex items-center gap-3 rounded-xl border border-border p-4 text-left transition-all hover:border-accent/30 hover:bg-accent/5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-primary">{opt.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back button */}
          <div className="mt-4">
            {currentQ > 0 && (
              <Button
                variant="ghost"
                onClick={() => setCurrentQ(currentQ - 1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous Question
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}