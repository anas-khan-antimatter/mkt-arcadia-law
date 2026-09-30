"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Search,
  Loader2,
  Tag,
  X,
} from "lucide-react";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const ALL_CATEGORIES = [
  "All",
  "Corporate Law",
  "Mergers & Acquisitions",
  "Intellectual Property",
  "Litigation",
  "Real Estate",
  "Employment & Labor",
];

export default function InsightsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (category !== "All") params.set("category", category);
      const res = await fetch(`/insights/search?${params.toString()}`);
      const data = await res.json();
      setArticles(data.results);
      setTotal(data.total);
    } catch {
      // Fallback: use static data
      setArticles([]);
      setTotal(0);
    }
    setLoading(false);
  }, [query, category]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

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

      {/* Search + Filters */}
      <section className="border-b border-border bg-muted/20 py-4">
        <div className="container mx-auto px-4 md:px-6 space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search insights…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-8"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  category === cat
                    ? "bg-amber-600 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat !== "All" && <Tag className="h-3 w-3" />}
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          {!loading && (
            <p className="text-xs text-muted-foreground">
              {total} {total === 1 ? "result" : "results"}
              {query && <> for &ldquo;{query}&rdquo;</>}
              {category !== "All" && <> in {category}</>}
            </p>
          )}
        </div>
      </section>

      {/* Articles list */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
              <span className="ml-3 text-sm text-muted-foreground">Searching insights…</span>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-10 w-10 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium">No insights found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try a different search term or category.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setQuery(""); setCategory("All"); }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
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
          )}
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
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
              render={<Link href="/contact" />}
            >
              Subscribe to Our Newsletter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}