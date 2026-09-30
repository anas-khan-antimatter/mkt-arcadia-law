import { NextRequest, NextResponse } from "next/server";

interface ConflictRequest {
  opposingPartyName: string;
  matterType?: string;
  clientCompany?: string;
}

interface ConflictResponse {
  status: "clear" | "potential_conflict" | "conflict_found";
  details: string;
  similarParties?: string[];
}

// Mock conflict database
const conflictDatabase = [
  { name: "Smith Industries", relatedMatters: ["M&A advisory (2023)", "IP licensing dispute (2024)"] },
  { name: "Acme Global", relatedMatters: ["Corporate restructuring (2022)", "Securities compliance (2024)"] },
  { name: "Pinnacle Corp", relatedMatters: ["Patent litigation (2023)"] },
  { name: "Meridian Group", relatedMatters: ["Cross-border acquisition (2024)"] },
  { name: "NovaTech", relatedMatters: ["IP portfolio review (2025)"] },
];

export async function POST(request: NextRequest) {
  const body: ConflictRequest = await request.json();

  if (!body.opposingPartyName || body.opposingPartyName.trim().length < 2) {
    return NextResponse.json(
      { error: "opposingPartyName is required (min 2 characters)" },
      { status: 400 }
    );
  }

  const name = body.opposingPartyName.toLowerCase();

  // Check for exact or partial matches in conflict database
  const matches = conflictDatabase.filter((entry) =>
    name.includes(entry.name.toLowerCase()) || entry.name.toLowerCase().includes(name) ||
    name.split(" ").some((word) => word.length > 3 && entry.name.toLowerCase().includes(word))
  );

  if (matches.length > 0) {
    return NextResponse.json(
      {
        status: "potential_conflict",
        details: `Potential conflict detected. ${matches[0].name} has been represented by Arcadia Law in: ${matches[0].relatedMatters.join(", ")}. Our conflicts team will review and contact you.`,
        similarParties: matches.map((m) => m.name),
      } satisfies ConflictResponse,
      { status: 200 }
    );
  }

  // Check for common name collision
  const commonNames = ["johnson", "miller", "anderson", "williams", "brown", "davis"];
  const nameWords = name.split(" ");
  const hasCommonName = nameWords.some((w) => commonNames.includes(w));

  if (hasCommonName) {
    return NextResponse.json(
      {
        status: "potential_conflict",
        details: "Name collision detected with common surname. Our conflicts team will perform a detailed search to confirm no conflict exists.",
        similarParties: [],
      } satisfies ConflictResponse,
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      status: "clear",
      details: "No conflicts detected. Your matter can proceed.",
    } satisfies ConflictResponse,
    { status: 200 }
  );
}