import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    slug: "delaware-2025-corporate-law-updates",
    title: "Delaware Corporate Law Updates Every Board Should Know in 2025",
    excerpt:
      "Recent amendments to the Delaware General Corporation Law introduce significant changes to stockholder rights, fiduciary duties, and board practices. Here's what every director and officer needs to understand.",
    author: "Aisha Khan",
    date: "March 15, 2025",
    readTime: "6 min read",
    category: "Corporate Law",
  },
  {
    slug: "ai-intellectual-property-strategy",
    title: "Building an IP Strategy for AI-Generated Works",
    excerpt:
      "As courts and the USPTO grapple with AI authorship questions, companies need proactive IP strategies. We break down the current legal landscape and offer practical steps to protect your AI investments.",
    author: "Elena Vasquez",
    date: "March 8, 2025",
    readTime: "8 min read",
    category: "Intellectual Property",
  },
  {
    slug: "ma-trends-2025",
    title: "M&A Outlook 2025: Key Trends Shaping Dealmaking",
    excerpt:
      "From regulatory shifts to valuation dynamics, the M&A landscape is evolving rapidly. Our M&A team analyzes the forces that will define transactions in the year ahead.",
    author: "Aisha Khan",
    date: "February 22, 2025",
    readTime: "10 min read",
    category: "Mergers & Acquisitions",
  },
  {
    slug: "non-compete-enforcement-2025",
    title: "Non-Compete Enforcement After the FTC Rule: What Employers Need to Know",
    excerpt:
      "With the FTC's non-compete rule vacated by federal courts, employers face renewed uncertainty. We outline the current enforcement landscape and best practices for protecting legitimate business interests.",
    author: "Sarah Park",
    date: "February 10, 2025",
    readTime: "5 min read",
    category: "Employment & Labor",
  },
  {
    slug: "commercial-real-estate-opportunity-zone",
    title: "Opportunity Zone Investments: Tax Strategies for Commercial Real Estate",
    excerpt:
      "Qualified Opportunity Funds remain a powerful vehicle for commercial real estate investors. We walk through the latest IRS guidance, structuring options, and common pitfalls to avoid.",
    author: "Michael Torres",
    date: "January 28, 2025",
    readTime: "7 min read",
    category: "Real Estate",
  },
  {
    slug: "shareholder-litigation-trends",
    title: "Shareholder Litigation in 2025: What Corporate Counsel Should Watch",
    excerpt:
      "Derivative suits, M&A challenges, and Section 220 demands are on the rise. Our litigation team reviews emerging trends and proactive steps to reduce exposure.",
    author: "David Okonkwo",
    date: "January 15, 2025",
    readTime: "9 min read",
    category: "Litigation",
  },
];

export default function InsightsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase">
            News & Resources
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Insights
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-400">
            Analysis, updates, and practical guidance from the attorneys at
            Arcadia Law. We help you stay ahead of legal developments that
            affect your business.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="border-b border-border bg-muted/20 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-2">
            {[
              "All",
              "Corporate Law",
              "Mergers & Acquisitions",
              "Intellectual Property",
              "Litigation",
              "Real Estate",
              "Employment & Labor",
            ].map((cat) => (
              <Badge
                key={cat}
                variant={cat === "All" ? "default" : "secondary"}
                className="cursor-pointer text-xs"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Articles list */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card
                key={article.slug}
                className="flex flex-col transition-all hover:shadow-lg hover:border-amber-600/30"
              >
                <CardHeader>
                  <Badge
                    variant="outline"
                    className="w-fit mb-2 text-xs border-amber-600/30 text-amber-700"
                  >
                    {article.category}
                  </Badge>
                  <CardTitle className="text-lg leading-snug">
                    <Link
                      href={`/insights/${article.slug}`}
                      className="hover:text-amber-600 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto border-t border-border pt-4">
                  <div className="flex w-full flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Want to receive these insights in your inbox?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Subscribe to the Arcadia Law newsletter for monthly updates on
            corporate law developments and firm news.
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/contact">
                Subscribe to Our Newsletter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}