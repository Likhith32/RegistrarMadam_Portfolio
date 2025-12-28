import { cn } from "@/lib/utils";

interface TimelineItemProps {
  year: string;
  endYear?: string;
  title: string;
  institution: string;
  description?: string;
  responsibilities?: string[];
  isLast?: boolean;
}

export function TimelineItem({
  year,
  endYear,
  title,
  institution,
  description,
  responsibilities,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative pl-8 md:pl-12">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] md:left-[11px] top-6 bottom-0 w-px bg-border" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1 top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-gold" />

      <div className="pb-10">
        {/* Year badge */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-accent">
            {year}
            {endYear && ` — ${endYear}`}
          </span>
        </div>

        {/* Content card */}
        <div className="card-institutional p-6">
          <h3 className="font-serif text-xl font-semibold text-primary mb-1">
            {title}
          </h3>
          <p className="text-muted-foreground font-medium mb-3">{institution}</p>

          {description && (
            <p className="text-foreground/80 leading-relaxed mb-4">
              {description}
            </p>
          )}

          {responsibilities && responsibilities.length > 0 && (
            <ul className="space-y-2">
              {responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-foreground/70"
                >
                  <span className="text-accent mt-1.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

interface TimelineProps {
  items: TimelineItemProps[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}
