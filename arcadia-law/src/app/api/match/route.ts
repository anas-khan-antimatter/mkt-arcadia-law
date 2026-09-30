import { NextRequest, NextResponse } from "next/server";

interface MatchRequest {
  answers: Record<string, string>;
}

interface MatchResponse {
  recommendedTeam: string;
  recommendedAttorney: string;
  practiceArea: string;
  confidence: number;
  nextSteps: string[];
  alternativeTeam?: string;
}

// Scoring logic for attorney matching
const practiceWeights: Record<string, (answers: Record<string, string>) => number> = {
  "Corporate Law": (a) => {
    let score = 0;
    if (a.primaryNeed === "entity-formation" || a.primaryNeed === "governance" || a.primaryNeed === "fundraising") score += 30;
    if (a.entityType === "startup" || a.entityType === "public" || a.entityType === "private") score += 20;
    if (a.urgency === "planning") score += 15;
    return score;
  },
  "Mergers & Acquisitions": (a) => {
    let score = 0;
    if (a.primaryNeed === "ma-transaction" || a.primaryNeed === "due-diligence") score += 35;
    if (a.entityType === "private" || a.entityType === "pe-backed") score += 20;
    return score;
  },
  "Intellectual Property": (a) => {
    let score = 0;
    if (a.primaryNeed === "patent" || a.primaryNeed === "trademark" || a.primaryNeed === "ip-portfolio") score += 35;
    if (a.industry === "technology" || a.industry === "healthcare") score += 15;
    return score;
  },
  "Commercial Litigation": (a) => {
    let score = 0;
    if (a.primaryNeed === "dispute" || a.primaryNeed === "investigation" || a.primaryNeed === "regulatory") score += 35;
    if (a.urgency === "imminent" || a.urgency === "filed") score += 20;
    return score;
  },
  "Real Estate": (a) => {
    let score = 0;
    if (a.primaryNeed === "acquisition" || a.primaryNeed === "development" || a.primaryNeed === "leasing") score += 35;
    if (a.industry === "real-estate" || a.industry === "hospitality") score += 15;
    return score;
  },
  "Employment & Labor": (a) => {
    let score = 0;
    if (a.primaryNeed === "employment" || a.primaryNeed === "executive-comp") score += 35;
    if (a.entityType === "startup" || a.entityType === "private") score += 10;
    return score;
  },
};

const attorneyMap: Record<string, { name: string; practice: string }> = {
  "Corporate Law": { name: "Aisha Khan", practice: "Corporate Law" },
  "Mergers & Acquisitions": { name: "Aisha Khan & James Carter", practice: "Mergers & Acquisitions" },
  "Intellectual Property": { name: "Elena Vasquez", practice: "Intellectual Property" },
  "Commercial Litigation": { name: "David Okonkwo", practice: "Commercial Litigation" },
  "Real Estate": { name: "Michael Torres", practice: "Real Estate" },
  "Employment & Labor": { name: "Sarah Park", practice: "Employment & Labor" },
};

export async function POST(request: NextRequest) {
  const body: MatchRequest = await request.json();

  if (!body.answers || Object.keys(body.answers).length === 0) {
    return NextResponse.json(
      { error: "answers are required" },
      { status: 400 }
    );
  }

  // Score each practice area
  const scores = Object.entries(practiceWeights).map(([practice, scorer]) => ({
    practice,
    score: scorer(body.answers),
  }));

  scores.sort((a, b) => b.score - a.score);

  const topPractice = scores[0].practice;
  const secondPractice = scores.length > 1 ? scores[1].practice : undefined;
  const confidence = Math.min(100, Math.round((scores[0].score / 50) * 100));
  const secondConfidence = secondPractice
    ? Math.min(100, Math.round((scores[1].score / 50) * 100))
    : 0;

  const attorney = attorneyMap[topPractice];

  const response: MatchResponse = {
    recommendedTeam: attorney.practice,
    recommendedAttorney: attorney.name,
    practiceArea: attorney.practice,
    confidence,
    nextSteps: [
      `Your matter appears to align with our ${attorney.practice} practice, led by ${attorney.name}.`,
      "Would you like to schedule a free 30-minute consultation?",
      "During the call, we will confirm the fit and outline next steps.",
    ],
    alternativeTeam:
      secondPractice && secondConfidence >= 50
        ? secondPractice
        : undefined,
  };

  return NextResponse.json(response, { status: 200 });
}