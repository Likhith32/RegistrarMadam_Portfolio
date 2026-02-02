import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScholarSkeleton } from "@/components/ui/ScholarSkeleton";
import { supabase } from "@/lib/supabase";
import scholarsJSON from "@/data/scholars.json";
import { cn } from "@/lib/utils";

type ScholarType = "btech" | "mtech" | "phd";

interface Scholar {
  name: string;
  roll: string;
  title: string;
  dept: string;
  year: string;
  type: ScholarType;
}

export default function ScholarsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | ScholarType>("all");
  const [search, setSearch] = useState("");
  const [scholars, setScholars] = useState<Scholar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSupabaseEnabled =
    !!import.meta.env.VITE_SUPABASE_URL &&
    !!import.meta.env.VITE_SUPABASE_ANON_KEY &&
    !!supabase;

  useEffect(() => {
    const fetchScholars = async () => {
      setIsLoading(true);
      try {
        if (!isSupabaseEnabled) throw new Error("Supabase not configured");

        const { data, error } = await supabase
          .from("scholars")
          .select("name, roll, title, dept, year, type")
          .order("year", { ascending: false });

        if (error) throw error;

        setScholars(data || []);
      } catch (err) {
        console.warn("Supabase failed → loading scholars from JSON");
        setScholars(scholarsJSON as Scholar[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScholars();
  }, [isSupabaseEnabled]);

  // Enhanced filtering with search
  const filtered = scholars.filter((s) => {
    const matchesFilter = activeFilter === "all" || s.type === activeFilter;
    const matchesSearch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="section-padding">
        <div className="container-wide px-6 lg:px-12">
          <SectionHeading
            title="Scholars"
            subtitle="B.Tech, M.Tech and Ph.D scholars mentored"
          />

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search by name, roll number, or thesis title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-2/3 lg:w-1/2 px-5 py-3 rounded-xl border border-border bg-background 
                         focus:ring-2 focus:ring-primary focus:border-primary outline-none 
                         transition-all duration-300 text-sm placeholder:text-muted-foreground"
            />
          </div>

          {/* Premium Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(["all", "btech", "mtech", "phd"] as const).map((f) => {
              const count =
                f === "all"
                  ? scholars.length
                  : scholars.filter((s) => s.type === f).length;

              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2",
                    "border transition-all duration-300",
                    activeFilter === f
                      ? "bg-primary text-primary-foreground shadow-lg scale-105 border-primary"
                      : "bg-background hover:bg-accent/20 border-border hover:border-accent"
                  )}
                >
                  {f.toUpperCase()}
                  <span className="text-xs opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Scholar Cards */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ScholarSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((s, i) => (
                <div
                  key={`${s.roll}-${i}`}
                  className={cn(
                    "relative p-6 bg-card rounded-xl border border-border",
                    "transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-xl hover:border-primary",
                    "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Left Accent Bar */}
                  <span className="absolute left-0 top-6 h-12 w-1 bg-primary rounded-r" />

                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary">
                        {s.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {s.roll} • {s.dept} • {s.year}
                      </p>
                    </div>

                    {/* Type Badge */}
                    <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent font-medium whitespace-nowrap">
                      {s.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Thesis Title */}
                  <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                    {s.title}
                  </p>
                </div>
              ))
            ) : (
              // Enhanced Empty State
              <div className="text-center py-20 text-muted-foreground">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <svg
                    className="w-8 h-8 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium text-foreground">
                  No scholars found
                </p>
                <p className="text-sm mt-2">
                  Try adjusting your filters or search keywords
                </p>
              </div>
            )}
          </div>

          {/* Results Summary */}
          {!isLoading && filtered.length > 0 && (
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Showing {filtered.length} of {scholars.length} scholars
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}