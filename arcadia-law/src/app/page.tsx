import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Scale,
  Shield,
  FileText,
  Building,
  Gavel,
  Landmark,
} from "lucide-react";

const practiceAreas = [
  {
    title: "Corporate Law",
    description:
      "Entity formation, governance, compliance, and strategic counsel for businesses at every stage.",
    icon: Building,
  },
  {
    title: "Mergers & Acquisitions",
    description:
      "End-to-end M&A advisory from due diligence and valuation to negotiation and closing.",
    icon: Scale,
  },
  {
    title: "Intellectual Property",
    description:
      "Patents, trademarks, copyrights, and trade secret protection in a rapidly evolving digital landscape.",
    icon: Shield,
  },
  {
    title: "Commercial Litigation",
    description:
      "Aggressive yet strategic representation in complex business disputes and regulatory proceedings.",
    icon: Gavel,
  },
  {
    title: "Real Estate",
    description:
      "Commercial transactions, development, leasing, and land-use for developers and investors.",
    icon: Landmark,
  },
  {
    title: "Employment & Labor",
    description:
      "Workplace policies, executive contracts, compliance, and dispute resolution for employers.",
    icon: FileText,
  },
];

const stats = [
  { label: "Years of Experience", value: "35+" },
  { label: "Attorneys", value: "28" },
  { label: "Cases Won", value: "98%" },
  { label: "Clients Served", value: "1,200+" },
];

const testimonials = [
  {
    quote:
      "Arcadia Law handled our cross-border acquisition with precision and cultural awareness that no other firm could match.",
    author: "Sarah Chen",
    role: "CEO, Meridian Global",
  },
  {
    quote:
      "When our IP portfolio needed urgent restructuring, Arcadia delivered a complete strategy in under three weeks.",
    author: "James Mitchell",
    role: "General Counsel, NovaTech",
  },
  {
    quote:
      "They don't just explain the law — they understand our business. That makes all the difference.",
    author: "Priya Patel",
    role: "Founder, Apex Ventures",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-24 md:px-6 md:py-32 lg:py-40 relative z-10">
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="mb-6 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase"
            >
              Trusted Corporate Counsel
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Law that moves as{" "}
              <span className="text-amber-500">fast as business</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-400 leading-relaxed">
              Arcadia Law is a modern corporate firm built for the pace of
              today&apos;s economy. We combine sharp legal strategy with real
              business instincts — no stuffiness, no delays, just results.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white"
                render={<Link href="/contact" />}
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                render={<Link href="/practice-areas" />}
              >
                Explore Practice Areas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="border-y border-border bg-muted/40">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Practice Areas ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Practice Areas
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Focused expertise across the full spectrum of corporate law. Each
              practice is led by partners who are recognized leaders in their
              field.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => {
              const Icon = area.icon;
              return (
                <Card
                  key={area.title}
                  className="group transition-all hover:shadow-lg hover:border-amber-600/30"
                >
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600/10 text-amber-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{area.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {area.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" render={<Link href="/practice-areas" />}>
              View All Practice Areas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── About / Differentiator ─── */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-amber-600/30 text-amber-700 text-xs tracking-widest uppercase"
              >
                Why Arcadia Law
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Modern counsel for a <span className="text-amber-600">complex world</span>.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Traditional law firms move slowly. Arcadia Law was built
                differently. Our lean team of senior attorneys uses modern
                tools and clear communication to deliver exceptional results
                on timelines that make sense for your business.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Direct partner access on every matter",
                  "Transparent flat-fee and value billing",
                  "Same-day responses to client inquiries",
                  "Deep industry knowledge across tech, finance & real estate",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-amber-600 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-transparent rounded-2xl" />
                <div className="rounded-2xl border border-border bg-card p-8">
                  <p className="text-lg font-medium italic text-muted-foreground">
                    &ldquo;At Arcadia, we don&apos;t just give legal advice —
                    we help you make better business decisions. Every
                    recommendation is grounded in commercial reality.&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-600/20 flex items-center justify-center text-amber-700 font-semibold text-sm">
                      AK
                    </div>
                    <div>
                      <p className="text-sm font-medium">Aisha Khan</p>
                      <p className="text-xs text-muted-foreground">
                        Managing Partner, Arcadia Law
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re proud of the relationships we build and the results we
              deliver.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.author} className="border-border/60">
                <CardHeader>
                  <div className="mb-2 text-amber-600">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {t.quote}
                  </CardDescription>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-gradient-to-r from-zinc-900 to-slate-900 py-20">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to work with a firm that moves at your speed?
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-xl mx-auto">
            Schedule a confidential consultation. No obligation. No
            legalese. Just straight talk about your legal needs.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/contact">
                Schedule a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}