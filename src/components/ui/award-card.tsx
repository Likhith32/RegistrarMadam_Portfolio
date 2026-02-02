import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface AwardCardProps {
  title: string;
  organization: string;
  year: string;
  description?: string;
  className?: string;
}

export function AwardCard({
  title,
  organization,
  year,
  description,
  className,
}: AwardCardProps) {
  return (
    <div
      className={cn(
        "card-institutional p-6 group hover:border-accent/30",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-sm bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
          <Award size={24} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-serif text-lg font-semibold text-primary">
              {title}
            </h3>
            <span className="text-sm font-medium text-accent whitespace-nowrap">
              {year}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">{organization}</p>
          {description && (
            <p className="text-foreground/70 text-sm mt-3 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
