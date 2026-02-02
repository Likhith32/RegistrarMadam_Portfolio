import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { supabase } from "@/lib/supabase";

// JSON fallback
import workshopsAttendedJSON from "@/data/workshops_attended.json";
import workshopsOrganizedJSON from "@/data/workshops_organized.json";

const LearningSymposiumPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [workshopsAttended, setWorkshopsAttended] = useState<string[]>([]);
  const [workshopsOrganized, setWorkshopsOrganized] = useState<string[]>([]);

  const isSupabaseEnabled =
    !!import.meta.env.VITE_SUPABASE_URL &&
    !!import.meta.env.VITE_SUPABASE_ANON_KEY &&
    !!supabase;

  useEffect(() => {
    const fetchWorkshops = async () => {
      setIsLoading(true);

      try {
        if (!isSupabaseEnabled) throw new Error("Supabase not configured");

        const { data: attendedData } = await supabase
          .from("workshops_attended")
          .select("description, year")
          .order("year", { ascending: false });

        const { data: organizedData } = await supabase
          .from("workshops_organized")
          .select("description, year")
          .order("year", { ascending: false });

        setWorkshopsAttended(
          (attendedData || []).map(w =>
            w.year ? `${w.description} (${w.year})` : w.description
          )
        );

        setWorkshopsOrganized(
          (organizedData || []).map(w =>
            w.year ? `${w.description} (${w.year})` : w.description
          )
        );
      } catch {
        setWorkshopsAttended(
          workshopsAttendedJSON.map((w: any) =>
            w.year ? `${w.description} (${w.year})` : w.description
          )
        );
        setWorkshopsOrganized(
          workshopsOrganizedJSON.map((w: any) =>
            w.year ? `${w.description} (${w.year})` : w.description
          )
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, [isSupabaseEnabled]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="container-wide px-6 lg:px-12">
          <SectionHeading
            title="Learning Symposium"
            subtitle="Professional development and academic service"
          />

          <div className="grid lg:grid-cols-2 gap-12 mt-14">
            {/* Workshops Attended */}
            <div className="animate-fade-in-up">
              <h3 className="font-serif text-2xl font-bold text-primary mb-6 relative inline-block">
                Workshops / Seminars Attended
                <span className="absolute -bottom-2 left-0 h-0.5 w-1/3 bg-accent rounded-full" />
              </h3>

              {isLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : (
                <div className="space-y-4">
                  {workshopsAttended.map((item, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden
                                 p-5 bg-card rounded-xl border border-border
                                 shadow-sm
                                 transition-all duration-500 ease-out
                                 hover:-translate-y-1 hover:shadow-lg hover:border-accent
                                 animate-fade-in-up"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      {/* Accent bar */}
                      <span className="absolute left-0 top-0 h-full w-1 bg-accent/70
                                       scale-y-0 origin-top
                                       group-hover:scale-y-100
                                       transition-transform duration-500" />

                      <div className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-accent
                                         group-hover:scale-150
                                         transition-transform duration-300" />

                        <p className="text-sm leading-relaxed text-foreground/80
                                      group-hover:text-foreground transition-colors max-w-prose">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Workshops Organized */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="font-serif text-2xl font-bold text-primary mb-6 relative inline-block">
                Workshops / Conferences Organized
                <span className="absolute -bottom-2 left-0 h-0.5 w-1/3 bg-accent rounded-full" />
              </h3>

              {isLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : (
                <div className="space-y-4">
                  {workshopsOrganized.map((item, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden
                                 p-5 bg-card rounded-xl border border-border
                                 shadow-sm
                                 transition-all duration-500 ease-out
                                 hover:-translate-y-1 hover:shadow-lg hover:border-accent
                                 animate-fade-in-up"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <span className="absolute left-0 top-0 h-full w-1 bg-accent/70
                                       scale-y-0 origin-top
                                       group-hover:scale-y-100
                                       transition-transform duration-500" />

                      <div className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-accent
                                         group-hover:scale-150
                                         transition-transform duration-300" />

                        <p className="text-sm leading-relaxed text-foreground/80
                                      group-hover:text-foreground transition-colors max-w-prose">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearningSymposiumPage;
