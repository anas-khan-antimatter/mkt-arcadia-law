import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Linkedin, Mail, Phone } from "lucide-react";
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
      <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase">
            Our Team
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Attorneys
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-400">
            Every member of our team is a senior attorney with deep expertise
            and a commitment to responsive, business-minded counsel. You
            work directly with the person handling your matter.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {attorneys.map((attorney) => (
              <Card
                key={attorney.name}
                className="flex flex-col transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-3 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600/15 text-amber-700 font-bold text-lg">
                      {attorney.initials}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {attorney.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {attorney.role}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="w-fit text-xs font-medium"
                  >
                    {attorney.practice}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {attorney.bio}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border space-y-1">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Education:
                      </span>{" "}
                      {attorney.education}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Admissions:
                      </span>{" "}
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
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Find the right attorney for your matter
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Tell us about your legal need and we&apos;ll connect you with the
            best person on our team.
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/contact">
                Get Matched With an Attorney
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}