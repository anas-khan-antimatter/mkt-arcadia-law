import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const articles = {
  "delaware-2025-corporate-law-updates": {
    title: "Delaware Corporate Law Updates Every Board Should Know in 2025",
    author: "Aisha Khan",
    date: "March 15, 2025",
    readTime: "6 min read",
    category: "Corporate Law",
    content: `
## The Landscape

Delaware continues to be the dominant jurisdiction for corporate incorporation in the United States, with more than two-thirds of Fortune 500 companies calling Delaware home. Recent amendments to the Delaware General Corporation Law (DGCL) introduce important changes that boards, officers, and their counsel need to understand.

## Key Amendments

**Stockholder Rights.** New provisions clarify the scope of stockholder inspection rights under Section 220, addressing uncertainty created by recent Court of Chancery decisions. The amendments make clear that books and records requests must be specific and related to a proper purpose, while also expanding access to certain board-level communications.

**Fiduciary Duties.** The Delaware Supreme Court has continued to refine the application of the business judgment rule, particularly in the context of controlling stockholder transactions. Boards should expect heightened scrutiny of process when a controlling stockholder is on both sides of a transaction.

**Board Practices.** Amendments to Section 141 address the use of board committees and delegation of authority, providing greater flexibility for boards to structure their operations efficiently.

## What Boards Should Do

1. **Review Section 220 preparedness.** Ensure your company has protocols in place to respond to stockholder inspection demands.
2. **Document decision-making.** Process matters. Boards should continue to meticulously document the decision-making process, especially for transformative transactions.
3. **Update committee charters.** Take advantage of the expanded flexibility around committee delegation.

## Looking Ahead

Delaware's franchise tax structure and its sophisticated Chancery Court will continue to make it the preferred jurisdiction for incorporation. But boards cannot afford to be complacent. The bar for procedural rigor continues to rise.

---

*This content is for informational purposes only and does not constitute legal advice.*
    `.trim(),
  },
  "ai-intellectual-property-strategy": {
    title: "Building an IP Strategy for AI-Generated Works",
    author: "Elena Vasquez",
    date: "March 8, 2025",
    readTime: "8 min read",
    category: "Intellectual Property",
    content: `
## The AI Authorship Question

As generative AI tools become ubiquitous in business operations, a fundamental legal question remains unresolved: who owns the output? The U.S. Copyright Office has taken the position that works created entirely by AI without human authorship are not eligible for copyright protection. But the reality is rarely that simple.

## The Current Framework

**Human authorship requirement.** Copyright law requires a human author. The Copyright Office's March 2023 guidance and subsequent policy statements make clear that purely AI-generated works cannot be copyrighted. However, works that involve sufficient human creative input or selection remain eligible.

**Patent landscape.** The USPTO has similarly held that AI cannot be listed as an inventor on patent applications. But AI-assisted inventions are patentable if a human made a significant contribution to the conception of the invention.

**Trade secrets.** For many companies, trade secret protection may be the most appropriate framework for protecting AI models and training data, provided reasonable secrecy measures are in place.

## Practical Strategy

### For AI-Generated Content
- Document human creative input and modification of AI outputs
- Maintain clear records of prompts, selection criteria, and edits
- Consider contractual protections with AI tool providers

### For AI Tools and Models
- Implement trade secret protection programs
- Secure patent protection for novel AI inventions
- Review open-source compliance obligations

### For Licensing
- Review all AI tool terms of service carefully
- Negotiate ownership and IP indemnification provisions
- Establish internal AI use policies

## The Road Ahead

Congress is considering legislation that would address AI authorship more comprehensively. Until then, companies should take a proactive, multi-layered approach to protecting their AI-related intellectual property.

---

*This content is for informational purposes only and does not constitute legal advice.*
    `.trim(),
  },
  "ma-trends-2025": {
    title: "M&A Outlook 2025: Key Trends Shaping Dealmaking",
    author: "Aisha Khan",
    date: "February 22, 2025",
    readTime: "10 min read",
    category: "Mergers & Acquisitions",
    content: `
## A Resurgent Market

After a subdued 2023 and an uneven 2024, the M&A market is showing clear signs of a rebound in 2025. Lower interest rates, a more predictable regulatory environment, and pent-up demand are converging to create favorable conditions for dealmaking.

## Key Trends

**Regulatory environment.** The new administration's antitrust enforcement approach has introduced greater predictability. While scrutiny of large horizontal mergers remains high, we are seeing a more constructive dialogue with regulators on vertical and conglomerate deals.

**Valuation dynamics.** The gap between buyer and seller expectations continues to narrow. With interest rates stabilizing and financing availability improving, we expect more deals to close at fair valuations rather than being held up by pricing disagreements.

**Private equity activity.** Sponsors sitting on record levels of dry capital are under pressure to deploy. We anticipate a significant increase in PE-led buyouts, add-on acquisitions, and — importantly — exits as the IPO market remains selective.

**Cross-border deals.** Despite geopolitical tensions, cross-border M&A is rebounding. Middle Eastern sovereign wealth funds and Asian strategic buyers are particularly active in North American and European markets.

## Structuring Considerations

- **Earn-outs and contingent value rights** are becoming more common to bridge valuation gaps
- **Representation and warranty insurance** continues to gain adoption, reducing escrow requirements
- **ESG-linked consideration structures** are emerging in certain sectors

---

*This content is for informational purposes only and does not constitute legal advice.*
    `.trim(),
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles];
  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <Badge className="mb-4 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase">
            {article.category}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-sm sm:prose-base prose-zinc dark:prose-invert max-w-none">
            {article.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-semibold mt-8 mb-3">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-semibold mt-6 mb-2">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <strong key={i} className="block font-semibold mt-4 mb-1">
                    {line.replace(/^\*\*|\*\*$/g, "")}
                  </strong>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="text-muted-foreground ml-4">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.startsWith("1. ")) {
                return (
                  <li key={i} className="text-muted-foreground ml-4 list-decimal">
                    {line.replace(/^\d+\.\s*/, "")}
                  </li>
                );
              }
              if (line.startsWith("---")) {
                return <hr key={i} className="my-8 border-border" />;
              }
              if (line.trim() === "") {
                return <div key={i} className="h-2" />;
              }
              return (
                <p key={i} className="text-muted-foreground leading-relaxed mb-3">
                  {line}
                </p>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/insights"
              className="text-sm text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Back to all Insights
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Have questions about how this affects your business?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Our attorneys are available for a confidential conversation about
            your specific situation.
          </p>
          <div className="mt-6">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
              render={<Link href="/contact" />}
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}