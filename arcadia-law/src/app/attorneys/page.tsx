import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Mail, Phone, Scale } from "lucide-react";
import Link from "next/link";

const attorneys = [
  {
    name: "Aisha Khan",
    role: "Managing Partner",
    practice: "Corporate Law, M&A",
    initials: "AK",
    bio: "Aisha founded Arcadia Law with a vision for modern, client-first corporate counsel. With over 20 years of experience, she has led some of the most complex cross-border transactions in the firm's history. She is recognized as a leading corporate lawyer by Chambers and Partners and Super Lawyers.",
    education: "J.D., Harvard Law School; B.A., University of Chicago",
    admissions: "New York, California, D.C.",
  },
  {
    name: "David Okonkwo",
    role: "Partner",
    practice: "Commercial Litigation",
    initials: "DO",
    bio: "David brings 18 years of courtroom and arbitration experience to every engagement. He has secured landmark victories for Fortune 500 clients and emerging companies alike, with a particular focus on securities litigation and regulatory defense. He is a Fellow of the American College of Trial Lawyers.",
    education: "J.D., Yale Law School; B.A., Princeton University",
    admissions: "New York, Massachusetts, S.D.N.Y., E.D.N.Y.",
  },
  {
    name: "Elena Vasquez",
    role: "Partner",
    practice: "Intellectual Property",
    initials: "EV",
    bio: "Elena leads the firm's IP practice, advising clients ranging from early-stage startups to multinational corporations. Her background in electrical engineering gives her a unique edge in patent prosecution and technology licensing matters. She speaks frequently on AI and intellectual property.",
    education: "J.D., Stanford Law School; M.S., MIT; B.S., UCLA",
    admissions: "New York, California, U.S. Patent & Trademark Office",
  },
  {
    name: "Michael Torres",
    role: "Partner",
    practice: "Real Estate",
    initials: "MT",
    bio: "Michael has structured over $5 billion in commercial real estate transactions across office, retail, industrial, and hospitality sectors. His deep understanding of finance and development allows him to craft creative solutions for complex real estate challenges.",
    education: "J.D., Columbia Law School; B.S., University of Pennsylvania",
    admissions: "New York, New Jersey, Connecticut",
  },
  {
    name: "Sarah Park",
    role: "Senior Associate",
    practice: "Employment & Labor",
    initials: "SP",
    bio: "Sarah advises employers on all aspects of the employment relationship, from executive compensation and equity plans to wage-and-hour compliance and workplace investigations. She is a certified mediator and a frequent contributor to employment law publications.",
    education: "J.D., NYU School of Law; B.A., Cornell University",
    admissions: "New York",
  },
  {
    name: "James Carter",
    role: "Senior Associate",
    practice: "Corporate Law, M&A",
    initials: "JC",
    bio: "James works closely with Aisha Khan on M&A transactions and corporate governance matters. He has particular expertise in venture capital financings, SaaS agreements, and technology company representation. Before law, he spent five years as a software engineer.",
    education: "J.D., University of Michigan Law School; B.S., Georgia Tech",
    admissions: "New York, Delaware",
  },
];

export default function AttorneysPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-16 md:py-24">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
            Our Team
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Attorneys
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/55 font-mono text-[15px]">
            Every attorney at Arcadia Law is a leader in their field. We
            maintain a deliberately small, partner-heavy team so that every
            client receives direct access to senior counsel.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {attorneys.map((attorney) => (
              <Card
                key={attorney.name}
                className="border-border group hover:border-accent/30 transition-all"
              >
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:bg-accent transition-colors">
                    <span className="text-xl font-bold font-mono">
                      {attorney.initials}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-primary">
                    {attorney.name}
                  </CardTitle>
                  <CardDescription className="font-mono text-[13px]">
                    {attorney.role}
                  </CardDescription>
                  <Badge
                    variant="outline"
                    className="w-fit mt-1 border-accent/20 text-accent text-[10px] tracking-[0.15em] uppercase font-mono"
                  >
                    {attorney.practice}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed font-mono text-[13px]">
                    {attorney.bio}
                  </p>
                  <div className="border-t border-border pt-3 space-y-1.5">
                    <p className="text-xs text-muted-foreground font-mono">
                      <span className="text-primary font-semibold">Education: </span>
                      {attorney.education}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      <span className="text-primary font-semibold">Admissions: </span>
                      {attorney.admissions}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[oklch(0.12_0.03_255)] py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Not sure who to contact?
          </h2>
          <p className="mt-3 text-white/55 max-w-lg mx-auto font-mono text-[15px]">
            Take our attorney match quiz and we&apos;ll recommend the right
            team for your specific legal matter.
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