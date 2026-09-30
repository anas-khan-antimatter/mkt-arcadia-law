import { NextRequest, NextResponse } from "next/server";

interface ChecklistRequest {
  matterType: string;
  jurisdiction: string;
  entityType: string;
  hasExistingCounsel: string;
  hasDocuments: string[];
  parties: number;
}

interface ChecklistItem {
  category: string;
  items: { label: string; required: boolean; notes: string }[];
}

function generateChecklist(req: ChecklistRequest): ChecklistItem[] {
  const checklist: ChecklistItem[] = [];

  // ─── Identity & Business Docs (always required) ───
  checklist.push({
    category: "Business & Entity Documents",
    items: [
      { label: "Certificate of Incorporation / Formation", required: true, notes: "Certified copy from Secretary of State" },
      { label: "Bylaws / Operating Agreement", required: true, notes: "Current version with all amendments" },
      { label: "Certificate of Good Standing", required: true, notes: "From jurisdiction of formation, dated within 60 days" },
      { label: "Board Resolutions and Consents", required: true, notes: "All resolutions authorizing the matter" },
      { label: "Stock Ledger / Cap Table", required: req.entityType !== "individual", notes: "Current ownership record" },
      { label: "Annual Reports and Filings", required: false, notes: "Last 3 years if available" },
    ],
  });

  // ─── Financial Documents ───
  checklist.push({
    category: "Financial Documents",
    items: [
      { label: "Audited Financial Statements", required: true, notes: "Last 3 fiscal years" },
      { label: "Interim Financials (current year)", required: true, notes: "Quarterly or monthly YTD" },
      { label: "Tax Returns (Corporate)", required: true, notes: "Last 3 years including extensions" },
      { label: "Debt Schedule and Loan Agreements", required: true, notes: "All outstanding debt" },
      { label: "Material Contracts (top 10 by revenue)", required: true, notes: "Including amendments" },
      { label: "Insurance Policies", required: false, notes: "D&O, E&O, general liability" },
    ],
  });

  // ─── Matter-Specific Documents ───
  const matterSpecific: ChecklistItem = {
    category: "Matter-Specific Documents",
    items: [],
  };

  if (req.matterType === "ma") {
    matterSpecific.items = [
      { label: "Letter of Intent / Term Sheet", required: true, notes: "Signed or draft" },
      { label: "Confidentiality Agreement (signed)", required: true, notes: "All counterparties" },
      { label: "Target Company Due Diligence Request", required: true, notes: "Organized by workstream" },
      { label: "Representation and Warranty Insurance Quote", required: false, notes: "If applicable" },
      { label: "Regulatory Filing Status", required: false, notes: "HSR, CFIUS, or other" },
    ];
  } else if (req.matterType === "litigation") {
    matterSpecific.items = [
      { label: "Complaint / Petition / Demand Letter", required: true, notes: "Filed or received" },
      { label: "All Correspondence with Opposing Party", required: true, notes: "Chronological order" },
      { label: "Preservation / Hold Notice", required: true, notes: "Proof of issuance" },
      { label: "Key Documents and Communications", required: true, notes: "Organized by custodian" },
      { label: "Insurance Policies (notice of claim)", required: true, notes: "All potentially applicable" },
      { label: "Privilege Log", required: false, notes: "If documents withheld" },
    ];
  } else if (req.matterType === "ip") {
    matterSpecific.items = [
      { label: "Patent / Trademark Filings", required: true, notes: "All applications and registrations" },
      { label: "Office Actions and Responses", required: true, notes: "From USPTO or foreign offices" },
      { label: "Assignment / Chain of Title Documents", required: true, notes: "Complete chain" },
      { label: "License Agreements", required: true, notes: "Inbound and outbound" },
      { label: "Infringement Analysis or Prior Art", required: false, notes: "If available" },
      { label: "Trade Secret Documentation", required: false, notes: "Protection protocols" },
    ];
  } else {
    matterSpecific.items = [
      { label: "Existing Agreements and Contracts", required: true, notes: "All relevant documents" },
      { label: "Correspondence with Other Parties", required: true, notes: "Organized chronologically" },
      { label: "Regulatory Filings and Permits", required: true, notes: "If applicable to your matter" },
      { label: "Internal Policies and Procedures", required: false, notes: "Governance documents" },
      { label: "Organizational Chart", required: false, notes: "Showing structure and reporting" },
    ];
  }
  checklist.push(matterSpecific);

  // ─── Governance & Compliance ───
  checklist.push({
    category: "Governance & Compliance",
    items: [
      { label: "Board Meeting Minutes", required: true, notes: "Last 12 months" },
      { label: "Committee Charters", required: true, notes: "Audit, compensation, governance" },
      { label: "Code of Conduct / Ethics Policy", required: false, notes: "Current version" },
      { label: "Related Party Transaction Register", required: true, notes: "All transactions with affiliates" },
      { label: "Regulatory Licenses and Permits", required: true, notes: "All business licenses" },
      { label: "Privacy Policy and Data Maps", required: false, notes: "GDPR/CCPA compliance" },
    ],
  });

  return checklist;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChecklistRequest = await request.json();

    if (!body.matterType) {
      return NextResponse.json({ error: "Matter type is required" }, { status: 400 });
    }

    const checklist = generateChecklist(body);

    return NextResponse.json({
      checklist,
      totalItems: checklist.reduce((sum, cat) => sum + cat.items.length, 0),
      requiredItems: checklist.reduce((sum, cat) => sum + cat.items.filter((i) => i.required).length, 0),
      matterType: body.matterType,
      jurisdiction: body.jurisdiction || "Not specified",
      generatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}