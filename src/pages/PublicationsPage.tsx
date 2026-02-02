import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { PublicationCard } from "@/components/ui/publication-card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award } from "lucide-react";
import { supabase } from "@/lib/supabase";

// JSON fallback imports
import journalsJSON from "@/data/journals.json";
import internationalConferencesJSON from "@/data/international_conferences.json";
import invitedTalksJSON from "@/data/invited_talks.json";

const PublicationsPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // State for Supabase data
  const [journals, setJournals] = useState<any[]>([]);
  const [internationalConferences, setInternationalConferences] = useState<any[]>([]);
  const [invitedTalks, setInvitedTalks] = useState<any[]>([]);
  

  // Check if Supabase is available (production-safe)
  const isSupabaseEnabled =
    !!import.meta.env.VITE_SUPABASE_URL &&
    !!import.meta.env.VITE_SUPABASE_ANON_KEY &&
    !!supabase;

  // Fetch data from Supabase with JSON fallback
  useEffect(() => {
    const fetchPublicationsData = async () => {
      setIsLoading(true);

      try {
        // Check if Supabase is enabled
        if (!isSupabaseEnabled) {
          throw new Error("Supabase not configured");
        }

        // Fetch journals - WITH year FIELD
        const { data: journalsData, error: journalsError } = await supabase
          .from("journals")
          .select("title, journal, authors, year, link")
          .order("year", { ascending: false, nullsFirst: false });
        if (journalsError) throw journalsError;

        // Fetch international conferences - SORTED BY YEAR
        const { data: conferencesData, error: conferencesError } = await supabase
          .from("international_conferences")
          .select("title, authors, venue, year, link")
          .order("year", { ascending: false });
        if (conferencesError) throw conferencesError;

        // Fetch invited talks - FIXED: using invited_talks (not invited_talks_sorted)
        const { data: talksData, error: talksError } = await supabase
  .from("invited_talks")
  .select("title, event, date, speaker, created_at")
  .order("created_at", { ascending: false });

        if (talksError) throw talksError;

        // Fetch workshops attended
        

        console.log("Journals Data:", journalsData);
        console.log("International Conferences Data:", conferencesData);
        console.log("Invited Talks Data:", talksData);
        

        // Set state from Supabase
        setJournals(journalsData || []);
        setInternationalConferences(conferencesData || []);
        setInvitedTalks(talksData || []);
        
        // Transform workshops data to strings with year if available
     
      } catch (error) {
        console.warn("Supabase failed → loading publications from JSON");

        // ✅ FALLBACK TO LOCAL JSON
        setJournals(journalsJSON || []);
        setInternationalConferences(internationalConferencesJSON || []);
        setInvitedTalks(invitedTalksJSON || []);

        
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicationsData();
  }, [isSupabaseEnabled]);

  // Transform data to match PublicationCard interface and sort by year (newest first)
  const allPublications = [
    ...journals.map(j => ({
      title: j.title,
      journal: j.journal,
      year: j.year?.toString() || "",
      type: "journal" as const,
      authors: j.authors,
      link: j.link,
    })),
    ...internationalConferences.map(c => ({
      title: c.title,
      journal: c.venue,
      year: c.year?.toString() || "",
      type: "conference" as const,
      authors: c.authors,
      link: c.link,
    })),
    ...invitedTalks.map(t => ({
      title: t.title,
      journal: t.event,
      year: t.sort_year?.toString() || t.year?.toString() || t.date || "",
      type: "talk" as const,
      authors: t.speaker || "Jaya G. Suma",
    })),
  ].sort((a, b) => {
    // Extract year numbers for comparison
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    // Sort in descending order (newest first: 2025, 2024, 2023, etc.)
    return yearB - yearA;
  });

  const filteredPublications =
    activeFilter === "all"
      ? allPublications
      : allPublications.filter((pub) => pub.type === activeFilter);

  const filters = [
    { id: "all", label: "All Publications" },
    { id: "journal", label: "Journals" },
    { id: "conference", label: "International Conferences" },
    { id: "talk", label: "Invited Talks" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-cream-dark via-cream/40 to-background overflow-hidden">
        {/* Subtle Grid Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Decorative Blur Elements for Depth */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container-wide px-6 lg:px-12 text-center relative z-10">
          {/* Main Title with Fade-In Animation */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Research & Publications
          </h1>

          {/* Gold Accent Underline */}
          <div className="mx-auto h-1 w-24 bg-accent rounded-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150" />

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            Academic contributions in Machine Learning, IoT, and Computer Science
          </p>
        </div>
      </section>

      {/* Publication Stats */}
      <section className="py-12 bg-primary">
        <div className="container-wide px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { number: journals.length.toString(), label: "Journal Articles", icon: BookOpen },
              { number: internationalConferences.length.toString(), label: "Conference Papers", icon: Users },
              { number: invitedTalks.length.toString(), label: "Invited Talks", icon: Award },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="text-center transform transition-all duration-500 hover:scale-110 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-primary-foreground/70 mx-auto mb-3" />
                  <p className="font-serif text-3xl font-bold text-primary-foreground mb-1">
                    {isLoading ? "..." : item.number}
                  </p>
                  <p className="text-primary-foreground/70 text-sm">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="section-padding">
        <div className="container-wide px-6 lg:px-12">
          <SectionHeading
            title="Publications"
            subtitle="Research papers in SCOPUS-indexed journals and international conferences"
          />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "institutional" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="transition-all duration-300 hover:scale-105"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Publications Grid */}
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading publications...
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPublications.map((publication, index) => (
                <PublicationCard key={index} {...publication} />
              ))}
            </div>
          )}

          {!isLoading && filteredPublications.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No publications found for the selected filter.
            </p>
          )}
        </div>
      </section>


      {/* Research Interests - HARDCODED */}
      <section className="section-padding">
        <div className="container-narrow px-6 lg:px-12">
          <SectionHeading
            title="Research Interests"
            subtitle="Areas of scholarly focus and ongoing research"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Machine Learning & Deep Learning", emoji: "🤖" },
              { name: "Internet of Things (IoT)", emoji: "🌐" },
              { name: "Data Mining & Big Data Analytics", emoji: "📊" },
              { name: "Vehicular Ad-hoc Networks (VANETs)", emoji: "🚗" },
              { name: "Pattern Recognition & Image Processing", emoji: "🖼️" },
              { name: "Artificial Intelligence Applications", emoji: "🧠" },
              { name: "Disaster Management Systems", emoji: "🆘" },
              { name: "Healthcare Informatics", emoji: "🏥" },
            ].map((interest, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                  {interest.emoji}
                </span>
                <span className="text-foreground/80 group-hover:text-foreground transition-colors font-medium">
                  {interest.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublicationsPage;
