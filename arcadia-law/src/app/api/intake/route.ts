import { NextRequest, NextResponse } from "next/server";

type MatterType =
  | "corporate-formation"
  | "ma-transaction"
  | "ip-protection"
  | "litigation-dispute"
  | "real-estate-deal"
  | "employment-matter"
  | "other";

type Priority = "standard" | "expedited" | "emergency";

interface IntakePayload {
  matterType: MatterType;
  priority: Priority;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName?: string;
  opposingParty?: string;
  matterDescription: string;
  deadline?: string;
  referralSource?: string;
}

interface IntakeResponse {
  intakeId: string;
  status: "received" | "conflict_check_required" | "routed";
  routedTo: string;
  estimatedResponseTime: string;
  nextSteps: string[];
}

const matterRouting: Record<MatterType, { team: string; practice: string; response: string }> = {
  "corporate-formation": { team: "Corporate Practice — Aisha Khan", practice: "Corporate Law", response: "1 business day" },
  "ma-transaction": { team: "M&A Practice — Aisha Khan & James Carter", practice: "Mergers & Acquisitions", response: "4 hours" },
  "ip-protection": { team: "IP Practice — Elena Vasquez", practice: "Intellectual Property", response: "1 business day" },
  "litigation-dispute": { team: "Litigation Practice — David Okonkwo", practice: "Commercial Litigation", response: "4 hours" },
  "real-estate-deal": { team: "Real Estate Practice — Michael Torres", practice: "Real Estate", response: "1 business day" },
  "employment-matter": { team: "Employment Practice — Sarah Park", practice: "Employment & Labor", response: "1 business day" },
  other: { team: "General Intake — Aisha Khan", practice: "General Corporate", response: "2 business days" },
};

export async function POST(request: NextRequest) {
  const body: IntakePayload = await request.json();

  // Validate required fields
  if (!body.matterType || !body.clientName || !body.clientEmail) {
    return NextResponse.json(
      { error: "Missing required fields: matterType, clientName, clientEmail" },
      { status: 400 }
    );
  }

  const routing = matterRouting[body.matterType] || matterRouting.other;

  // Simulate conflict check outcome
  const conflictFlags = body.opposingParty
    ? ["Smith Industries", "Acme Global", "Pinnacle Corp"].some((name) =>
        body.opposingParty.toLowerCase().includes(name.toLowerCase())
      )
    : false;

  const intakeId = `ARC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const response: IntakeResponse = {
    intakeId,
    status: conflictFlags ? "conflict_check_required" : "received",
    routedTo: routing.team,
    estimatedResponseTime: routing.response,
    nextSteps: conflictFlags
      ? [
          "Potential conflict flagged — our conflicts team will review within 24 hours.",
          "You will be contacted once the conflict check is complete.",
          "If clear, we will schedule an introductory call with the appropriate team.",
        ]
      : [
          `Your matter has been routed to ${routing.team}.`,
          "An attorney will review and reach out within the stated response time.",
          "We will schedule a confidential consultation to discuss next steps.",
        ],
  };

  return NextResponse.json(response, { status: 200 });
}