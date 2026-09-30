"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Building,
  Scale,
  Shield,
  Gavel,
  Landmark,
  FileText as FileIcon,
} from "lucide-react";
import Link from "next/link";

interface ChecklistItem {
  label: string;
  required: boolean;
  notes: string;
}

interface ChecklistCategory {
  category: string;
  items: ChecklistItem[];
}

interface ChecklistResponse {
  checklist: ChecklistCategory[];
  totalItems: number;
  requiredItems: number;
  matterType: string;
  jurisdiction: string;
}

const matterTypes = [
  { id: "ma", label: "Mergers & Acquisitions", icon: Scale },
  { id: "litigation", label: "Litigation", icon: Gavel },
  { id: "ip", label: "Intellectual Property", icon: Shield },
  { id: "corporate", label: "Corporate", icon: Building },
  { id: "realestate", label: "Real Estate", icon: Landmark },
  { id: "employment", label: "Employment", icon: FileIcon },
  { id: "general", label: "General / Other", icon: FileText },
];

export default function ChecklistPage() {
  const [matterType, setMatterType] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [entityType, setEntityType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChecklistResponse | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleGenerate = async () => {
    if (!matterType) return;
    setLoading(true);
    try {
      const res = await fetch("/checklist/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matterType,
          jurisdiction: jurisdiction || "Delaware",
          entityType: entityType || "Corporation",
          hasExistingCounsel: "no",
          hasDocuments: [],
          parties: 2,
        }),
      });
      const data = await res.json();
      setResult(data);
      setCheckedItems(new Set());
    } catch {
      // Fallback — generate a static checklist locally
      setResult({
        matterType,
        jurisdiction: jurisdiction || "Delaware",
        totalItems: 18,
        requiredItems: 14,
        checklist: [
          {
            category: "Business & Entity Documents",
            items: [
              { label: "Certificate of Incorporation / Formation", required: true, notes: "Certified copy" },
              { label: "Bylaws / Operating Agreement", required: true, notes: "Current with amendments" },
              { label: "Board Resolutions Authorizing the Matter", required: true, notes: "All related resolutions" },
              { label: "Stock Ledger / Cap Table", required: true, notes: "Current ownership" },
            ],
          },
          {
            category: "Financial Documents",
            items: [
              { label: "Audited Financial Statements (3 years)", required: true, notes: "Most recent fiscal years" },
              { label: "Interim Financials (current YTD)", required: true, notes: "Quarterly or monthly" },
              { label: "Corporate Tax Returns (3 years)", required: true, notes: "Including extensions" },
              { label: "Material Contracts", required: true, notes: "Revenue top-10" },
            ],
          },
          {
            category: "Governance & Compliance",
            items: [
              { label: "Board Meeting Minutes (12 months)", required: true, notes: "All meetings" },
              { label: "Committee Charters", required: false, notes: "Audit, comp, governance" },
              { label: "Related Party Transactions Register", required: true, notes: "All affiliates" },
              { label: "Regulatory Licenses & Permits", required: true, notes: "All required licenses" },
            ],
          },
          {
            category: "Matter-Specific Documents",
            items: [
              { label: "Letter of Intent / Term Sheet", required: matterType === "ma", notes: "If applicable" },
              { label: "Confidentiality Agreements", required: matterType === "ma", notes: "Signed copies" },
              { label: "Complaint / Demand Letter", required: matterType === "litigation", notes: "Filed or received" },
              { label: "Patent / Trademark Filings", required: matterType === "ip", notes: "USPTO records" },
              { label: "Licensing Agreements", required: matterType === "ip", notes: "All IP licenses" },
              { label: "Employment Agreements", required: matterType === "employment", notes: "Key executive contracts" },
            ],
          },
        ],
      });
    }
    setLoading(false);
  };

  const toggleItem = (itemLabel: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemLabel)) next.delete(itemLabel);
      else next.add(itemLabel);
      return next;
    });
  };

  const progress = result ? Math.round((checkedItems.size / result.totalItems) * 100) : 0;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase">
            Client Tools
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Confidential Document Checklist
          </h1>
          <p className="mt-3 max-w-xl text-base text-zinc-400">
            Generate a custom document checklist for your legal matter. All items are confidential and protected by privilege.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          {!result ? (
            /* ─── Form ─── */
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Generate Your Checklist</CardTitle>
                <CardDescription>
                  Tell us about your matter and we&apos;ll produce a tailored document checklist organized by category.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Matter Type <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {matterTypes.map((mt) => {
                      const Icon = mt.icon;
                      return (
                        <button
                          key={mt.id}
                          type="button"
                          onClick={() => setMatterType(mt.id)}
                          className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center text-xs transition-all ${
                            matterType === mt.id
                              ? "border-amber-600 bg-amber-600/5 ring-1 ring-amber-600/30"
                              : "border-border hover:border-amber-600/40"
                          }`}
                        >
                          <Icon className="h-5 w-5 text-amber-600" />
                          <span className="font-medium">{mt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Jurisdiction / State</label>
                    <Input
                      placeholder="e.g., Delaware, New York"
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Entity Type</label>
                    <Input
                      placeholder="e.g., C-Corp, LLC, Individual"
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!matterType || loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {loading ? (
                    <>Generating checklist…</>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Confidential Checklist
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* ─── Results ─── */
            <div className="space-y-6">
              {/* Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Document Checklist</CardTitle>
                      <CardDescription>
                        {result.matterType.charAt(0).toUpperCase() + result.matterType.slice(1)} · {result.jurisdiction}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-amber-600/30 text-amber-700">
                      {result.totalItems} items · {result.requiredItems} required
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                      {checkedItems.size} / {result.totalItems} collected
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              {result.checklist.map((category) => (
                <Card key={category.category}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.items.map((item) => {
                        const isChecked = checkedItems.has(item.label);
                        return (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => toggleItem(item.label)}
                            className={`w-full text-left flex items-start gap-3 rounded-lg border p-3 transition-all ${
                              isChecked
                                ? "border-green-600/30 bg-green-600/5"
                                : "border-border hover:border-amber-600/30"
                            }`}
                          >
                            <div className={`flex h-5 w-5 shrink-0 mt-0.5 items-center justify-center rounded border ${
                              isChecked
                                ? "bg-green-600 border-green-600 text-white"
                                : "border-muted-foreground/30"
                            }`}>
                              {isChecked && <CheckCircle2 className="h-3.5 w-3.5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{item.label}</span>
                                {item.required && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                                    Required
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{item.notes}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => { setResult(null); setMatterType(""); }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  render={<Link href="/contact" />}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Schedule a Consultation
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                <AlertTriangle className="inline h-3 w-3 mr-1" />
                This is a general checklist and may not cover all documents needed for your specific matter. Your Arcadia Law attorney will provide a tailored final list.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}