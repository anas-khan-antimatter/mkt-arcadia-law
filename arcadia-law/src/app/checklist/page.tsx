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
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Download,
  RefreshCw,
  Printer,
} from "lucide-react";

const matterChecklists: Record<string, { category: string; items: string[] }[]> = {
  "corporate-formation": [
    {
      category: "Entity Documents",
      items: [
        "Certificate of Incorporation / Articles of Organization",
        "Bylaws or Operating Agreement",
        "Corporate Minutes — Organizational Meeting",
        "Stock Ledger and Certificate Template",
        "EIN Confirmation Letter (IRS)",
        "S-Corp Election Form 2553 (if applicable)",
        "State Business License and Permits",
      ],
    },
    {
      category: "Governance & Compliance",
      items: [
        "Board of Directors / Managers List",
        "Officer Resolutions and Appointments",
        "Annual Report Filing Calendar",
        "Registered Agent Agreement",
        "Shareholder / Member Register",
        "Conflict of Interest Policy",
      ],
    },
    {
      category: "Financial & Banking",
      items: [
        "Corporate Bank Account Resolution",
        "Signature Authority Designations",
        "Capital Contribution Records",
        "Financing Agreements (if applicable)",
        "Insurance Certificates (D&O, E&O, General Liability)",
        "Audit Committee Charter (if applicable)",
      ],
    },
  ],
  "ma-transaction": [
    {
      category: "Buy-Side Due Diligence",
      items: [
        "Executed Letter of Intent / Term Sheet",
        "Target Company Organizational Documents",
        "Financial Statements (last 3 years)",
        "Material Contracts Review",
        "Intellectual Property Portfolio Summary",
        "Litigation History & Pending Claims",
      ],
    },
    {
      category: "Transaction Documents",
      items: [
        "Stock Purchase Agreement or Asset Purchase Agreement",
        "Disclosure Schedules",
        "Representation & Warranty Insurance Policy (if applicable)",
        "Escrow Agreement",
        "Non-Competition and Non-Solicitation Agreements",
        "Transition Services Agreement",
      ],
    },
    {
      category: "Post-Closing",
      items: [
        "Closing Statement and Funds Flow Memo",
        "Amended Organizational Documents",
        "Updated Ownership / Cap Table",
        "Post-Closing Integration Plan",
        "Regulatory Filings (HSR, CFIUS, Foreign Investment)",
        "Tax Allocation Agreement (Section 338(h)(10) election if applicable)",
      ],
    },
  ],
  "ip-protection": [
    {
      category: "Patent Portfolio",
      items: [
        "List of Inventions with Disclosure Dates",
        "Patent Search Results (prior art)",
        "Provisional or Non-Provisional Patent Applications",
        "Patent Assignment Agreements from Inventors",
        "Office Action Responses",
        "Maintenance Fee Payment Schedule",
      ],
    },
    {
      category: "Trademark & Branding",
      items: [
        "Trademark Search Report (USPTO)",
        "Trademark Application Filings",
        "Proof of Use in Commerce Specimens",
        "Domain Name Registrations",
        "Social Media Handle Registrations",
        "Trademark License Agreements",
      ],
    },
    {
      category: "Trade Secrets & Confidentiality",
      items: [
        "Confidentiality / NDA Agreements (Employee & Third-Party)",
        "Trade Secret Identification Inventory",
        "Access Restriction Policies",
        "Data Security and Encryption Standards",
        "Employee IP Assignment Agreements",
        "Exit Interview / Decommissioning Checklist",
      ],
    },
  ],
  "litigation-dispute": [
    {
      category: "Pre-Filing",
      items: [
        "Client Engagement Letter and Fee Agreement",
        "Preservation Letter (Litigation Hold)",
        "Key Documents and Communications Collection",
        "Relevant Contracts and Correspondence",
        "Witness List and Contact Information",
        "Statute of Limitations Analysis",
      ],
    },
    {
      category: "Pleading & Motions",
      items: [
        "Complaint or Counterclaim Draft",
        "Answer and Affirmative Defenses",
        "Motions to Dismiss or Summary Judgment",
        "Discovery Plan and Proposed Scheduling Order",
        "Initial Disclosures (FRCP 26)",
        "Privilege Log",
      ],
    },
    {
      category: "Trial & Resolution",
      items: [
        "Jury Instructions and Verdict Form (if applicable)",
        "Exhibit and Witness Lists",
        "Trial Brief and Motions in Limine",
        "Settlement Authority and Mediation Brief",
        "Proposed Judgment or Consent Decree",
        "Bill of Costs and Fee Application",
      ],
    },
  ],
  "real-estate-deal": [
    {
      category: "Pre-Acquisition",
      items: [
        "Letter of Intent / Offer Letter",
        "Property Survey and Title Report",
        "Phase I Environmental Assessment",
        "Zoning and Land Use Verification",
        "Property Condition Report",
        "Estoppel Certificates (Leased Properties)",
      ],
    },
    {
      category: "Transaction Documents",
      items: [
        "Purchase and Sale Agreement",
        "Deed and Transfer Tax Documents",
        "Financing / Loan Commitment Letter",
        "Promissory Note and Security Instrument",
        "Assignment of Leases and Contracts",
        "Title Insurance Policy Binder",
      ],
    },
    {
      category: "Post-Closing",
      items: [
        "Recorded Deed and Title Policy",
        "Closing Statement (HUD-1 or ALTA)",
        "Updated Property Tax Records",
        "Insurance Policies (Property, Liability)",
        "Property Management Agreement (if applicable)",
        "Compliance Certificates (Environmental, Accessibility)",
      ],
    },
  ],
  "employment-matter": [
    {
      category: "Hiring & Onboarding",
      items: [
        "Employment Offer Letter and At-Will Acknowledgment",
        "Employee Handbook Acknowledgment",
        "Non-Disclosure and Invention Assignment Agreement",
        "I-9 Employment Eligibility Verification",
        "W-4 Tax Withholding Form",
        "Benefits Enrollment and ERISA Notices",
      ],
    },
    {
      category: "Ongoing Compliance",
      items: [
        "Wage and Hour Classification Audit (Exempt vs Non-Exempt)",
        "Overtime Policy and Approval Process",
        "Paid Leave Policy (FMLA, State, Local)",
        "Anti-Harassment and Discrimination Training Records",
        "Employee Performance Reviews and Documentation",
        "Accommodation Requests (ADA/ADAAA)",
      ],
    },
    {
      category: "Separation",
      items: [
        "Separation Agreement and General Release",
        "Final Paycheck Compliance (State Deadlines)",
        "COBRA Notification and Election Forms",
        "Return of Company Property Checklist",
        "Restrictive Covenant Reminder Letter",
        "Exit Interview Summary",
      ],
    },
  ],
  other: [
    {
      category: "General Intake",
      items: [
        "Summary of legal issue and desired outcome",
        "Relevant documents and correspondence",
        "Deadlines or time-sensitive commitments",
        "All parties involved (names, entities, roles)",
        "Prior legal representation history",
        "Budget and fee structure preference",
      ],
    },
  ],
};

const matterTypeLabels: Record<string, string> = {
  "corporate-formation": "Corporate Formation & Governance",
  "ma-transaction": "Mergers & Acquisitions",
  "ip-protection": "Intellectual Property",
  "litigation-dispute": "Commercial Litigation",
  "real-estate-deal": "Real Estate",
  "employment-matter": "Employment & Labor",
  other: "Other / General",
};

const matterTypes = Object.keys(matterChecklists);

export default function ChecklistPage() {
  const [selectedType, setSelectedType] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (selectedType) setGenerated(true);
  };

  const reset = () => {
    setSelectedType("");
    setGenerated(false);
  };

  const checklist = selectedType ? matterChecklists[selectedType] : [];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-16 md:py-20">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
            Client Tool
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Document Checklist Generator
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/55 font-mono text-[15px]">
            Generate a confidential document checklist tailored to your type
            of legal matter. Prepare in advance and save time.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          {!generated ? (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  Select Your Matter Type
                </CardTitle>
                <CardDescription className="font-mono text-[13px]">
                  Choose the category that best describes your legal need to
                  receive a tailored checklist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {matterTypes.map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                          isSelected
                            ? "border-accent/50 bg-accent/5 ring-1 ring-accent/30"
                            : "border-border hover:border-accent/20 hover:bg-muted/50"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            isSelected ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-primary">
                          {matterTypeLabels[type]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <Button
                  size="lg"
                  className="mt-8 w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                  disabled={!selectedType}
                  onClick={handleGenerate}
                >
                  Generate Checklist <FileText className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono mb-2">
                    Confidential
                  </Badge>
                  <h2 className="text-2xl font-bold text-primary">
                    {matterTypeLabels[selectedType]} — Document Checklist
                  </h2>
                  <p className="text-sm text-muted-foreground font-mono text-[13px] mt-1">
                    Use this checklist to gather materials before your initial consultation.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.print()}>
                    <Printer className="mr-2 h-4 w-4" /> Print
                  </Button>
                  <Button variant="outline" size="sm" onClick={reset}>
                    <RefreshCw className="mr-2 h-4 w-4" /> New
                  </Button>
                </div>
              </div>

              {checklist.map((section) => (
                <Card key={section.category} className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-primary font-mono text-[14px] uppercase tracking-wider">
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span className="font-mono text-[13px]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-base text-primary font-mono text-[14px]">
                    Confidentiality Notice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-mono text-[13px]">
                    This checklist is provided as a confidential preparatory tool.
                    Documents you prepare using this list are subject to
                    attorney-client privilege once your representation
                    commences. We recommend storing all materials in a secure,
                    encrypted location.
                  </p>
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                render={<Link href="/intake" />}
              >
                Begin Intake <FileText className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}