import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const articles: Record<string, {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
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

**Private equity activity.** Sponsors sitting on record levels of dry capital are under pressure to deploy. We anticipate a significant increase in PE-led buyouts, add-on acquisitions, and take-privates.

**Cross-border considerations.** Geopolitical tensions continue to shape dealmaking, with CFIUS and foreign investment review regimes expanding their reach. Early engagement with regulatory counsel has become a competitive advantage.

## Sector Spotlight: Technology & Healthcare

Technology dealmaking is being driven by AI infrastructure demands and portfolio rationalization by large tech companies. In healthcare, consolidation continues as providers seek scale and vertical integration.

## Practical Guidance for Boards

1. **Begin antitrust diligence early.** Don't wait for the signing to identify regulatory hurdles.
2. **Stress-test valuation models.** Base-case, upside, and regulatory-challenged scenarios are essential.
3. **Prepare integration plans pre-signing.** The most successful acquirers have integration teams standing by.
4. **Engage CFIUS counsel proactively.** Even domestic deals can have foreign ownership sensitivities.

---

*This content is for informational purposes only and does not constitute legal advice.*
    `.trim(),
  },
  "non-compete-enforcement-2025": {
    title: "Non-Compete Enforcement After the FTC Rule: What Employers Need to Know",
    author: "Sarah Park",
    date: "February 10, 2025",
    readTime: "5 min read",
    category: "Employment & Labor",
    content: `
## The Current State

The FTC's proposed rule banning most non-compete agreements was vacated by a federal district court in August 2024, leaving employers in a familiar state of uncertainty. However, the landscape has shifted in several important ways.

## State-Level Developments

**California.** Non-competes remain unenforceable under Business and Professions Code Section 16600. Recent legislation has also restricted the use of non-compete clauses in employment agreements entered into outside of California.

**New York.** The proposed ban on non-competes has stalled but remains active. Governor Hochul has indicated support for a more limited measure focused on low- and middle-wage workers.

**Illinois.** The Illinois Freedom to Work Act now restricts non-competes for employees earning less than $75,000 per year and requires at least two weeks of consideration for new agreements.

**Massachusetts.** Garden leave provisions remain required: employers must pay 50% of the employee's salary during the non-compete period.

## Best Practices for Employers

1. **Audit existing agreements.** Identify which agreements are enforceable under current state law.
2. **Consider alternatives.** Non-disclosure agreements, client non-solicitation, and employee non-solicitation agreements are generally more enforceable.
3. **Tailor agreements by role and compensation level.** Blanket policies are increasingly difficult to defend.
4. **Provide independent consideration.** In many states, continued employment alone is not sufficient.
5. **Monitor state-level developments.** At least 15 states have active legislation addressing non-compete enforceability.

---

*This content is for informational purposes only and does not constitute legal advice.*
    `.trim(),
  },
  "commercial-real-estate-opportunity-zone": {
    title: "Opportunity Zone Investments: Tax Strategies for Commercial Real Estate",
    author: "Michael Torres",
    date: "January 28, 2025",
    readTime: "7 min read",
    category: "Real Estate",
    content: `
## Overview

Qualified Opportunity Zones (QOZs) continue to offer compelling tax incentives for commercial real estate investors, despite shifting political winds. The program, established by the Tax Cuts and Jobs Act of 2017, allows investors to defer and potentially exclude capital gains by investing in designated low-income communities through Qualified Opportunity Funds (QOFs).

## Current IRS Guidance

The IRS has issued final regulations providing clarity on several key issues:

**Substantial improvement.** To qualify for the tax benefits, a QOF must substantially improve any property that is not originally "qualified opportunity zone business property." The substantial improvement test requires that additions to basis exceed the adjusted basis of the property within 30 months.

**Original use.** Property must be "original use" within the QOZ or the QOF must substantially improve it. Original use begins when the property is first placed in service for a purpose consistent with the QOF's trade or business.

**Working capital safe harbor.** The 31-month working capital safe harbor provides flexibility for QOFs to deploy capital into active projects.

## Structuring Considerations

- **Fund structure.** Most QOZ investments are structured as multi-member LLCs or limited partnerships.
- **Exit strategies.** The 10-year exclusion for gains on the QOZ investment itself is a powerful benefit for long-term holders.
- **Compliance requirements.** Annual Form 8996 filing is required for QOFs; investors need Form 8997.

---

*This content is for informational purposes only and does not constitute legal advice.*
    `.trim(),
  },
  "shareholder-litigation-trends": {
    title: "Shareholder Litigation in 2025: What Corporate Counsel Should Watch",
    author: "David Okonkwo",
    date: "January 15, 2025",
    readTime: "9 min read",
    category: "Litigation",
    content: `
## The Rising Tide

Shareholder litigation continues to evolve in 2025, with several emerging trends that corporate counsel and boards should monitor closely.

## Key Trends

**M&A litigation.** While the volume of M&A-related lawsuits has declined from its 2018 peak, plaintiffs have become more sophisticated in their approach. Disclosure-only settlements are increasingly rare, with courts demanding more concrete benefits for stockholders.

**Section 220 demands.** Books and records demands under Delaware Section 220 have surged as a prelude to derivative litigation. Companies must have robust response protocols in place.

**ESG-related litigation.** Shareholder activism around environmental, social, and governance issues has expanded from proxy contests into the courtroom, with derivative suits alleging breach of fiduciary duty for inadequate ESG risk oversight.

**SPAC litigation.** As the SPAC market has contracted, litigation against SPAC sponsors, targets, and their advisors has increased, focusing on disclosure failures and material misstatements.

## Proactive Measures

1. **Regular D&O insurance review.** Ensure coverage is adequate for evolving litigation risks.
2. **Board education.** Directors should understand the expanding scope of oversight duties.
3. **Document retention.** Robust document retention policies are essential for defending against Section 220 demands.
4. **Pre-signing M&A planning.** Anticipate litigation risk in transaction structuring.

---

*This content is for informational purposes only and does not constitute legal advice.*
    `.trim(),
  },
  "private-credit-regulation-2025": {
    title: "Private Credit Regulation: What Borrowers Should Know in 2025",
    author: "Aisha Khan",
    date: "December 18, 2024",
    readTime: "7 min read",
    category: "Corporate Law",
    content: `
## Market Context

The private credit market has surpassed $2 trillion in assets under management, attracting increased regulatory scrutiny from the SEC, Federal Reserve, and Treasury Department. For corporate borrowers, this evolving regulatory landscape presents both opportunities and challenges.

## Regulatory Developments

**SEC Private Fund Adviser Rules.** While the SEC's comprehensive private fund adviser rule was vacated by the Fifth Circuit, the agency continues to pursue targeted rulemaking focused on disclosure and reporting requirements.

**Leverage limits.** The Federal Reserve and Treasury Department have signaled interest in imposing leverage limits on private credit funds, which could affect loan pricing and availability.

**Interconnectedness concerns.** Regulators are examining the potential systemic risk posed by private credit's growing role in the economy, particularly through direct lending and fund financing arrangements.

**Transparency initiatives.** The SEC has proposed enhanced reporting requirements for private funds, including more detailed information on portfolio company exposure and risk management practices.

## What Borrowers Should Do

1. **Review borrower-friendly provisions.** Increased regulatory pressure on lenders may create opportunities for more balanced documentation.
2. **Monitor covenant flexibility.** As regulations evolve, ensure your credit agreements maintain appropriate flexibility.
3. **Diversify lender relationships.** Regulatory changes that impact one lender category may not affect others equally.
4. **Plan for increased documentation requirements.** Expect more detailed reporting and compliance obligations.

---

*This content is for informational purposes only and does not constitute legal advice.*
    `.trim(),
  },
  "data-privacy-compliance": {
    title: "Data Privacy Compliance: State Law Patchwork in 2025",
    author: "Elena Vasquez",
    date: "December 5, 2024",
    readTime: "6 min read",
    category: "Intellectual Property",
    content: `
## The Patchwork

With 15 states now having comprehensive privacy laws in effect and several more scheduled to take effect in 2025, companies face an increasingly complex compliance landscape. Unlike the EU's GDPR, the U.S. approach is fragmented, with each state adopting its own definitions, requirements, and enforcement mechanisms.

## Key State Laws

**California (CCPA/CPRA).** Remains the most comprehensive and aggressive state privacy law. Key requirements include: broad consumer rights, opt-out for data sales and sharing, contractual requirements for service providers, and robust enforcement by the California Privacy Protection Agency.

**Texas.** The Texas Data Privacy and Security Act applies to entities that process data and meet certain threshold requirements. Notice, consent, and consumer rights provisions are similar to other state laws but with Texas-specific variations.

**Virginia.** The Virginia Consumer Data Protection Act follows a familiar framework but has more limited applicability than California or Texas.

**Colorado.** The Colorado Privacy Act includes unique provisions around profiling and appeals processes.

## Recommended Actions

1. **Create a state-specific compliance map.** Identify which laws apply to your business.
2. **Implement universal privacy controls.** A single consent management platform that adapts to each state's requirements is essential.
3. **Review vendor agreements.** Ensure data processing agreements cover each applicable state law.
4. **Prepare for enforcement.** State attorneys general are increasingly active in privacy enforcement.

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
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-16 md:py-20">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
            {article.category}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl max-w-3xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50 font-mono">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <article className="prose prose-lg prose-slate max-w-none
            prose-headings:text-primary prose-headings:font-semibold prose-headings:tracking-tight
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-mono prose-p:text-[15px]
            prose-li:text-muted-foreground prose-li:font-mono prose-li:text-[15px]
            prose-strong:text-primary prose-strong:font-semibold
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-hr:border-border
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-ul:space-y-2
          ">
            {article.content.split('\n').map((line, i) => {
              // Parse markdown content to HTML-like rendering
              // Bold
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-semibold text-primary">{line.replace(/\*\*/g, '')}</p>;
              }
              // Heading
              if (line.startsWith('## ')) {
                const text = line.replace('## ', '');
                return <h2 key={i}>{text}</h2>;
              }
              if (line.startsWith('### ')) {
                const text = line.replace('### ', '');
                return <h3 key={i}>{text}</h3>;
              }
              // List item
              if (line.startsWith('- ')) {
                return <li key={i} className="text-muted-foreground font-mono">{line.replace('- ', '')}</li>;
              }
              if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
                return <li key={i} className="text-muted-foreground font-mono">{line.replace(/^\d+\.\s/, '')}</li>;
              }
              // Horizontal rule
              if (line.startsWith('---')) {
                return <hr key={i} className="border-border my-8" />;
              }
              // Empty line
              if (!line.trim()) {
                return <div key={i} className="h-2" />;
              }
              // Regular paragraph
              return <p key={i} className="text-muted-foreground font-mono text-[15px] leading-relaxed">{line}</p>;
            })}
          </article>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl border border-accent/20 bg-accent/5">
              <p className="text-sm text-muted-foreground font-mono text-[13px]">
                This content is for informational purposes only and does not constitute legal advice.
                For advice specific to your situation, please{" "}
                <Link href="/contact" className="text-accent underline hover:text-accent/80">
                  contact us
                </Link>
                .
              </p>
              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                render={<Link href="/insights" />}
              >
                <ArrowRight className="mr-2 h-4 w-4" /> Back to Insights
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}