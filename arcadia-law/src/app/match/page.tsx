"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Users,
  Building,
  Scale,
  Clock,
  Gavel,
  FileText,
  RefreshCw,
  Award,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";

/* ─── Questions ─── */
interface Question {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: "matterType",
    question: "What type of legal matter do you need help with?",
    options: [
      { value: "corporate", label: "Corporate / Governance" },
      { value: "ma", label: "Mergers & Acquisitions" },
      { value: "ip", label: "Intellectual Property" },
      { value: "litigation", label: "Litigation / Disputes" },
      { value: "realestate", label: "Real Estate" },
      { value: "employment", label: "Employment / Labor" },
    ],
  },
  {
    id: "industry",
    question: "Which industry best describes your business?",
    options: [
      { value: "technology", label: "Technology / SaaS" },
      { value: "finance", label: "Finance / Insurance" },
      { value: "healthcare", label: "Healthcare / Biotech" },
      { value: "realestate", label: "Real Estate / Construction" },
      { value: "energy", label: "Energy / Manufacturing" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "companyStage",
    question: "What stage is your company in?",
    options: [
      { value: "startup", label: "Startup / Early Stage" },
      { value: "growth", label: "Growth / Series A-C" },
      { value: "large", label: "Established / Enterprise" },
      { value: "individual", label: "Individual / Not a company" },
    ],
  },
  {
    id: "urgency",
    question: "How urgent is this matter?",
    options: [
      { value: "immediate", label: "Immediate (within days)" },
      { value: "weeks", label: "Within a few weeks" },
      { value: "months", label: "Exploring options" },
    ],
  },
  {
    id: "preferLitigation",
    question: "Is this matter likely to involve litigation or court proceedings?",
    options: [
      { value: "yes", label: "Yes, litigation is expected or underway" },
      { value: "no", label: "No, we prefer to avoid litigation" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "preferTransaction",
    question: "Is this a transactional matter (contract, deal, filing)?",
    options: [
      { value: "yes", label: "Yes — a transaction, agreement, or filing" },
      { value: "no", label: "No — advice, opinion, or strategy" },
      { value: "both", label: "Both — it's a complex situation" },
    ],
  },
];

interface Recommendation {
  id: string;
  name: string;
  role: string;
  score: number;
  matchReasons: string[];
  bio: string;
}

export default function MatchPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(false);

  const currentQ = questions[step];

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const canSubmit = Object.keys(answers).length === questions.length;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/match/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch {
      // Fallback: deterministic recommendation
      setRecommendations([
        {
          id: "aisha-khan",
          name: "Aisha Khan",
          role: "Managing Partner",
          score: 85,
          matchReasons: ["Best overall match for corporate and M&A matters", "20+ years of experience"],
          bio: "Aisha leads complex cross-border transactions and corporate governance matters.",
        },
        {
          id: "david-okonkwo",
          name: "David Okonkwo",
          role: "Partner",
          score: 72,
          matchReasons: ["Experienced in litigation and dispute resolution", "Trial-tested advocate"],
          bio: "David focuses on high-stakes commercial litigation and securities defense.",
        },
        {
          id: "james-carter",
          name: "James Carter",
          role: "Senior Associate",
          score: 65,
          matchReasons: ["Deep experience with startups and venture capital", "Technology transactions specialist"],
          bio: "James works on M&A, venture financings, and technology transactions.",
        },
      ]);
    }
    setLoading(false);
  };

  /* ─── Results ─── */
  if (recommendations) {
    return (
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <Badge className="mb-4 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase">
              Your Match Results
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Recommended Attorneys
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-zinc-400">
              Based on your responses, here are the attorneys best suited to handle your matter.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-6">
              {recommendations.map((rec, i) => (
                <Card key={rec.id} className={`border-l-4 ${i === 0 ? "border-l-amber-600" : "border-l-muted"}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${
                          i === 0 ? "bg-amber-600 text-white" : "bg-amber-600/10 text-amber-700"
                        } font-bold text-lg`}>
                          {rec.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{rec.name}</CardTitle>
                          <CardDescription>{rec.role}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        {i === 0 && <Award className="h-4 w-4 text-amber-600" />}
                        <span className={i === 0 ? "text-amber-600" : "text-muted-foreground"}>
                          {i === 0 ? "Best Match" : `Match Score: ${rec.score}%`}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{rec.bio}</p>
                    <div className="mt-4 space-y-2">
                      {rec.matchReasons.map((reason, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                          <span className="text-muted-foreground">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3 border-t border-border pt-4">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white" render={<Link href="/contact" />}>
                      Schedule Consultation
                    </Button>
                    <Button size="sm" variant="outline" render={<Link href="/attorneys" />}>
                      Full Profile
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" onClick={() => { setRecommendations(null); setStep(0); setAnswers({}); }}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ─── Quiz ─── */
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase">
            Find Your Team
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Attorney Match Quiz
          </h1>
          <p className="mt-3 max-w-xl text-base text-zinc-400">
            Answer a few quick questions and we&apos;ll recommend the Arcadia Law attorney best suited for your matter.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-lg">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Question {step + 1} of {questions.length}</span>
              <span>{Math.round(((step) / questions.length) * 100)}% complete</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-600 transition-all"
                style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current question */}
          <Card>
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2 text-xs border-amber-600/30 text-amber-700">
                {currentQ.id === "matterType" ? "Legal Need" :
                 currentQ.id === "industry" ? "Industry" :
                 currentQ.id === "companyStage" ? "Company" :
                 currentQ.id === "urgency" ? "Timeline" :
                 currentQ.id === "preferLitigation" ? "Approach" :
                 "Preference"}
              </Badge>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleAnswer(opt.value)}
                  className={`w-full text-left rounded-lg border p-3 text-sm transition-all hover:border-amber-600/40 ${
                    answers[currentQ.id] === opt.value
                      ? "border-amber-600 bg-amber-600/5 ring-1 ring-amber-600/30"
                      : "border-border bg-card"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              {step === questions.length - 1 && (
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleSubmit}
                  disabled={!canSubmit || loading}
                >
                  {loading ? "Matching..." : "See My Matches"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>

          {step < questions.length - 1 && (
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Select an option to continue. You can use Back to change previous answers.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}