import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Shield,
  FileText,
  Building,
  Gavel,
  Landmark,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const practices = [
  {
    id: "corporate",
    icon: Building,
    title: "Corporate Law",
    summary:
      "Full-service corporate counsel from formation through exit, with a focus on governance, compliance, and strategic growth.",
    details: [
      "Entity formation and structuring (C-corps, S-corps, LLCs, partnerships)",
      "Corporate governance and board advisory",
      "Securities law compliance and private placements",
      "Venture capital and private equity transactions",
      "Corporate restructuring and dissolution",
      "Ongoing general counsel services",
    ],
  },
  {
    id: "ma",
    icon: Scale,
    title: "Mergers & Acquisitions",
    summary:
      "Strategic M&A advisory across industries, guiding clients through every phase of the transaction lifecycle.",
    details: [
      "Buy-side and sell-side representation",
      "Due diligence and risk assessment",
      "Valuation analysis and deal structuring",
      "Negotiation and documentation",
      "Regulatory approvals and antitrust review",
      "Post-merger integration",
    ],
  },
  {
    id: "ip",
    icon: Shield,
    title: "Intellectual Property",
    summary:
      "Protecting and maximizing the value of intangible assets in an increasingly competitive and digital marketplace.",
    details: [
      "Patent prosecution and portfolio management",
      "Trademark registration and enforcement",
      "Copyright registration and licensing",
      "Trade secret protection programs",
      "IP litigation and dispute resolution",
      "Technology licensing and SaaS agreements",
    ],
  },
  {
    id: "litigation",
    icon: Gavel,
    title: "Commercial Litigation",
    summary:
      "Strategic, high-stakes dispute resolution in federal and state courts, arbitrations, and regulatory proceedings.",
    details: [
      "Breach of contract and business torts",
      "Securities and shareholder litigation",
      "Class action defense",
      "Regulatory defense and investigations",
      "Alternative dispute resolution and mediation",
      "Appellate practice",
    ],
  },
  {
    id: "real-estate",
    icon: Landmark,
    title: "Real Estate",
    summary:
      "Commercial real estate counsel for developers, investors, and occupiers navigating complex transactions and regulations.",
    details: [
      "Commercial acquisition and disposition",
      "Financing and joint ventures",
      "Development and land-use permitting",
      "Leasing (office, retail, industrial)",
      "Environmental due diligence",
      "Property tax appeals and abatements",
    ],
  },
  {
    id: "employment",
    icon: FileText,
    title: "Employment & Labor",
    summary:
      "Proactive employment law counsel designed to minimize risk while supporting growth and organizational culture.",
    details: [
      "Employment agreements and handbooks",
      "Executive compensation and equity plans",
      "Wage and hour compliance",
      "Workplace investigations",
      "Separation and severance agreements",
      "Non-compete and restrictive covenant disputes",
    ],
  },
];

export default function PracticeAreasPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-16 md:py-24">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
            What We Do
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Practice Areas
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/55 font-mono text-[15px]">
            Focused, sophisticated legal services across every major area of
            corporate law. Each practice is led by partners with deep
            industry expertise.
          </p>
        </div>
      </section>

      {/* Practice detail accordion */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {practices.map((practice) => {
              const Icon = practice.icon;
              return (
                <AccordionItem
                  key={practice.id}
                  value={practice.id}
                  className="rounded-xl border border-border bg-card px-6"
                >
                  <AccordionTrigger className="py-6 hover:no-underline">
                    <div className="flex items-start gap-4 text-left">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          {practice.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground font-mono text-[13px]">
                          {practice.summary}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="ml-14 border-l-2 border-accent/30 pl-6">
                      <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground font-mono">
                        Representative Services
                      </h4>
                      <ul className="space-y-2">
                        {practice.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[oklch(0.12_0.03_255)] py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Not sure which practice fits your needs?
          </h2>
          <p className="mt-3 text-white/55 max-w-lg mx-auto font-mono text-[15px]">
            Take our 6-question match quiz and we&apos;ll recommend the right
            team for your matter. No charge, no pressure.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
              render={<Link href="/attorney-match" />}
            >
              Take the Match Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white/70 hover:text-white hover:bg-white/5"
              render={<Link href="/intake" />}
            >
              Begin Matter Intake
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}