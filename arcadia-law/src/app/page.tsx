import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Gavel,
  FileText,
  Scale,
  Shield,
  Building,
  Landmark,
  Search,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const practiceAreas = [
  {
    title: "Corporate Law",
    description: "Entity formation, governance, compliance, and strategic counsel for businesses at every stage.",
    icon: Building,
    href: "/practice-areas#corporate",
  },
  {
    title: "Mergers & Acquisitions",
    description: "End-to-end M&A advisory — due diligence, valuation, negotiation, and closing.",
    icon: TrendingUp,
    href: "/practice-areas#ma",
  },
  {
    title: "Intellectual Property",
    description: "Patents, trademarks, copyrights, and trade secret protection in the digital age.",
    icon: Shield,
    href: "/practice-areas#ip",
  },
  {
    title: "Commercial Litigation",
    description: "Strategic dispute resolution in federal and state courts, arbitration, and regulatory proceedings.",
    icon: Gavel,
    href: "/practice-areas#litigation",
  },
  {
    title: "Real Estate",
    description: "Commercial transactions, development, leasing, and land-use counsel.",
    icon: Landmark,
    href: "/practice-areas#real-estate",
  },
  {
    title: "Employment & Labor",
    description: "Workplace policy, executive contracts, compliance, and dispute resolution.",
    icon: FileText,
    href: "/practice-areas#employment",
  },
];

const metrics = [
  { label: "Years Experience", value: "35+" },
  { label: "Attorneys on Staff", value: "28" },
  { label: "Matters Closed (2024)", value: "470+" },
  { label: "Client Retention Rate", value: "94%" },
];

const capabilities = [
  "Direct partner engagement on every matter — no handoffs to junior associates",
  "Transparent flat-fee and value-based billing structures",
  "Same-day initial response to client inquiries",
  "Cross-practice teams assembled for each client's specific needs",
  "Secure client portal for document sharing and case updates",
  "Multi-jurisdictional capability across all 50 states and 20+ countries",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ─── HERO — data room seriousness ─── */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-28 md:px-6 md:py-36 lg:py-44 relative z-10">
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="mb-6 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono"
            >
              Corporate Counsel · Established 2002
            </Badge>
            <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-tight text-white leading-[1.05]">
              Law that works{" "}
              <span className="text-accent">on your terms</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/55 leading-relaxed font-mono text-[15px]">
              Arcadia Law delivers precise corporate counsel without the
              overhead of a traditional firm. Partner-led teams, transparent
              pricing, and a relentless focus on outcomes.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20"
                render={<Link href="/intake" />}
              >
                Start a Matter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white"
                render={<Link href="/practice-areas" />}
              >
                Explore Practices
              </Button>
            </div>
          </div>
          {/* Technical corner accent */}
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/3 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* ─── Metrics bar ─── */}
      <section className="border-y border-border bg-[oklch(0.95_0.005_240)]">
        <div className="container mx-auto px-4 py-10 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl font-mono tabular-nums">
                  {m.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground font-mono text-[13px] uppercase tracking-wider">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Practice Areas ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-14">
            <Badge variant="outline" className="mb-4 border-accent/30 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
              Core Practices
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-primary">
              Full-spectrum corporate counsel
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl font-mono text-[15px]">
              Six practice groups, each led by a partner with deep industry knowledge.
            </p>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-3">
            {practiceAreas.map((area) => {
              const Icon = area.icon;
              return (
                <Link
                  key={area.title}
                  href={area.href}
                  className="group relative bg-card p-8 transition-all hover:bg-accent/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded border border-border bg-muted text-accent group-hover:bg-accent/10 group-hover:border-accent/30 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-primary group-hover:text-accent transition-colors">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-mono text-[13px]">
                    {area.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity font-mono uppercase tracking-wider">
                    View Practice <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Differentiators ─── */}
      <section className="bg-[oklch(0.12_0.03_255)] py-20 md:py-28 scan-line">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-start gap-14 md:grid-cols-2">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-accent/30 text-accent text-[11px] tracking-[0.2em] uppercase font-mono"
              >
                How We Operate
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Built for the way <span className="text-accent">business works</span>.
              </h2>
              <p className="mt-4 text-white/55 leading-relaxed font-mono text-[15px]">
                Traditional firms run on billable hours and leverage models.
                Arcadia runs on outcomes, transparency, and direct access to
                the attorneys who know your business.
              </p>
              <ul className="mt-8 space-y-3">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm text-white/65 font-mono text-[13px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/5 rounded-2xl blur-xl" />
                <div className="relative rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      AK
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Aisha Khan</p>
                      <p className="text-xs text-white/40 font-mono">Founder & Managing Partner</p>
                    </div>
                  </div>
                  <p className="text-base text-white/70 leading-relaxed italic">
                    &ldquo;At Arcadia, we don&apos;t just give legal advice — we
                    help you make better business decisions. Every
                    recommendation starts with a question: what does success
                    look like for you?&rdquo;
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex gap-2 text-xs text-white/30 font-mono">
                      <span>Harvard Law</span>
                      <span>·</span>
                      <span>28 yrs experience</span>
                      <span>·</span>
                      <span>Chambers-ranked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Toolset / Digital Services ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-14 text-center">
            <Badge variant="outline" className="mb-4 border-accent/30 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
              Client Tools
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-primary">
              Services designed for efficiency
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto font-mono text-[15px]">
              Digital tools that streamline intake, discovery, and case
              management — no friction, no delays.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded border border-border bg-muted text-accent">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">Attorney Match Quiz</h3>
              <p className="mt-2 text-sm text-muted-foreground font-mono text-[13px]">
                Answer 6 questions and we&apos;ll recommend the right practice team for your matter.
              </p>
              <Link
                href="/attorney-match"
                className="mt-4 inline-flex items-center gap-1 text-xs text-accent font-mono uppercase tracking-wider hover:text-accent/80 transition-colors"
              >
                Take the Quiz <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded border border-border bg-muted text-accent">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">Document Checklist Generator</h3>
              <p className="mt-2 text-sm text-muted-foreground font-mono text-[13px]">
                Generate a confidential document checklist tailored to your matter type — no login required.
              </p>
              <Link
                href="/checklist"
                className="mt-4 inline-flex items-center gap-1 text-xs text-accent font-mono uppercase tracking-wider hover:text-accent/80 transition-colors"
              >
                Generate Checklist <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded border border-border bg-muted text-accent">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">Case Intake Wizard</h3>
              <p className="mt-2 text-sm text-muted-foreground font-mono text-[13px]">
                Confidential matter intake with intelligent branching based on practice area.
              </p>
              <Link
                href="/intake"
                className="mt-4 inline-flex items-center gap-1 text-xs text-accent font-mono uppercase tracking-wider hover:text-accent/80 transition-colors"
              >
                Start Intake <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center md:px-6">
          <Badge
            variant="outline"
            className="mb-4 border-white/20 text-white/60 text-[11px] tracking-[0.2em] uppercase font-mono"
          >
            Ready to Proceed
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Your matter. Your timeline. Our expertise.
          </h2>
          <p className="mt-4 text-base text-white/60 max-w-xl mx-auto font-mono text-[15px]">
            Schedule a confidential consultation or begin your intake
            online. We respond within one business day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20"
              render={<Link href="/intake" />}
            >
              Begin Intake <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              render={<Link href="/contact" />}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}