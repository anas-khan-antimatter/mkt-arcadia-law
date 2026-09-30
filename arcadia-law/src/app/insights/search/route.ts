import { NextRequest, NextResponse } from "next/server";

const articles = [
  {
    slug: "delaware-2025-corporate-law-updates",
    title: "Delaware Corporate Law Updates Every Board Should Know in 2025",
    excerpt: "Recent amendments to the Delaware General Corporation Law introduce significant changes to stockholder rights, fiduciary duties, and board practices.",
    author: "Aisha Khan",
    date: "March 15, 2025",
    readTime: "6 min read",
    category: "Corporate Law",
  },
  {
    slug: "ai-intellectual-property-strategy",
    title: "Building an IP Strategy for AI-Generated Works",
    excerpt: "As courts and the USPTO grapple with AI authorship questions, companies need proactive IP strategies.",
    author: "Elena Vasquez",
    date: "March 8, 2025",
    readTime: "8 min read",
    category: "Intellectual Property",
  },
  {
    slug: "ma-trends-2025",
    title: "M&A Outlook 2025: Key Trends Shaping Dealmaking",
    excerpt: "From regulatory shifts to valuation dynamics, the M&A landscape is evolving rapidly. Our M&A team analyzes the forces that will define transactions in the year ahead.",
    author: "Aisha Khan",
    date: "February 22, 2025",
    readTime: "10 min read",
    category: "Mergers & Acquisitions",
  },
  {
    slug: "non-compete-enforcement-2025",
    title: "Non-Compete Enforcement After the FTC Rule: What Employers Need to Know",
    excerpt: "With the FTC's non-compete rule vacated by federal courts, employers face renewed uncertainty.",
    author: "Sarah Park",
    date: "February 10, 2025",
    readTime: "5 min read",
    category: "Employment & Labor",
  },
  {
    slug: "commercial-real-estate-opportunity-zone",
    title: "Opportunity Zone Investments: Tax Strategies for Commercial Real Estate",
    excerpt: "Qualified Opportunity Funds remain a powerful vehicle for commercial real estate investors.",
    author: "Michael Torres",
    date: "January 28, 2025",
    readTime: "7 min read",
    category: "Real Estate",
  },
  {
    slug: "shareholder-litigation-trends",
    title: "Shareholder Litigation in 2025: What Corporate Counsel Should Watch",
    excerpt: "Derivative suits, M&A challenges, and Section 220 demands are on the rise.",
    author: "David Okonkwo",
    date: "January 15, 2025",
    readTime: "9 min read",
    category: "Litigation",
  },
];

const categories = ["All", "Corporate Law", "Mergers & Acquisitions", "Intellectual Property", "Litigation", "Real Estate", "Employment & Labor"];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "All";

  let filtered = articles;

  if (category !== "All") {
    filtered = filtered.filter((a) => a.category === category);
  }

  if (query) {
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.author.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    results: filtered,
    total: filtered.length,
    query,
    category,
    categories,
  });
}