import { NextRequest, NextResponse } from "next/server";

// Attorney profiles for matching
const attorneys = [
  {
    id: "aisha-khan",
    name: "Aisha Khan",
    role: "Managing Partner",
    specialties: ["corporate", "ma", "governance"],
    industries: ["technology", "finance", "healthcare"],
    experience: "20+ years",
    bio: "Aisha leads complex cross-border M&A and corporate governance matters. Best for large transactions, corporate structuring, and board advisory.",
  },
  {
    id: "david-okonkwo",
    name: "David Okonkwo",
    role: "Partner",
    specialties: ["litigation", "securities", "regulatory"],
    industries: ["finance", "energy", "pharmaceutical"],
    experience: "18+ years",
    bio: "David focuses on high-stakes commercial litigation and securities defense. Best for disputes, regulatory investigations, and trial work.",
  },
  {
    id: "elena-vasquez",
    name: "Elena Vasquez",
    role: "Partner",
    specialties: ["ip", "patent", "licensing", "technology"],
    industries: ["technology", "biotech", "manufacturing"],
    experience: "15+ years",
    bio: "Elena leads IP strategy, patent prosecution, and technology licensing. Best for protecting innovations and building IP portfolios.",
  },
  {
    id: "michael-torres",
    name: "Michael Torres",
    role: "Partner",
    specialties: ["realestate", "development", "finance"],
    industries: ["realestate", "construction", "hospitality"],
    experience: "20+ years",
    bio: "Michael handles complex commercial real estate transactions and development projects. Best for acquisitions, leasing, and joint ventures.",
  },
  {
    id: "sarah-park",
    name: "Sarah Park",
    role: "Senior Associate",
    specialties: ["employment", "compensation", "compliance"],
    industries: ["technology", "finance", "healthcare"],
    experience: "8+ years",
    bio: "Sarah advises on employment law, executive compensation, and workplace compliance. Best for employment agreements, investigations, and policy design.",
  },
  {
    id: "james-carter",
    name: "James Carter",
    role: "Senior Associate",
    specialties: ["corporate", "ma", "venture", "saas"],
    industries: ["technology", "startup", "finance"],
    experience: "9+ years",
    bio: "James works on M&A, venture capital financings, and technology transactions. Best for startups, VC deals, and SaaS agreements.",
  },
];

interface QuizAnswers {
  matterType: string;
  industry: string;
  companyStage: string;
  urgency: string;
  preferLitigation: string;
  preferTransaction: string;
}

function scoreAttorneys(answers: QuizAnswers) {
  const scored = attorneys.map((attorney) => {
    let score = 0;
    const matchReasons: string[] = [];

    // Matter type specialty match
    if (attorney.specialties.includes(answers.matterType)) {
      score += 30;
      matchReasons.push(`Specializes in ${answers.matterType} matters`);
    }

    // Industry match
    if (attorney.industries.includes(answers.industry)) {
      score += 20;
      matchReasons.push(`Deep experience in ${answers.industry} industry`);
    }

    // Company stage
    if (answers.companyStage === "startup" && attorney.specialties.includes("venture")) {
      score += 15;
      matchReasons.push("Experienced with startup and venture-stage companies");
    }
    if (answers.companyStage === "large" && attorney.specialties.includes("governance")) {
      score += 10;
    }

    // Litigation vs transaction preference
    if (answers.preferLitigation === "yes" && attorney.specialties.includes("litigation")) {
      score += 20;
      matchReasons.push("Primary focus on litigation and dispute resolution");
    }
    if (answers.preferTransaction === "yes" && (attorney.specialties.includes("ma") || attorney.specialties.includes("corporate"))) {
      score += 15;
      matchReasons.push("Extensive transactional experience");
    }

    // Urgency bonus — more experienced for urgent matters
    if (answers.urgency === "immediate" && attorney.experience.includes("20")) {
      score += 10;
      matchReasons.push("Senior partner available for urgent engagement");
    }

    return { ...attorney, score, matchReasons };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}

export async function POST(request: NextRequest) {
  try {
    const body: QuizAnswers = await request.json();

    if (!body.matterType) {
      return NextResponse.json({ error: "Matter type is required" }, { status: 400 });
    }

    const recommendations = scoreAttorneys(body);

    return NextResponse.json({
      recommendations,
      quizSummary: {
        matterType: body.matterType,
        industry: body.industry || "general",
        companyStage: body.companyStage || "established",
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}