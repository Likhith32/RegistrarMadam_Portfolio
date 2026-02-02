export function ScholarSkeleton() {
  return (
    <div className="p-6 bg-card rounded-lg border border-border animate-pulse">
      {/* Name */}
      <div className="h-5 w-1/3 bg-muted rounded mb-3" />

      {/* Meta line (roll / dept / year) */}
      <div className="h-4 w-1/2 bg-muted rounded mb-4" />

      {/* Title lines */}
      <div className="h-4 w-full bg-muted rounded mb-2" />
      <div className="h-4 w-11/12 bg-muted rounded mb-2" />
      <div className="h-4 w-4/5 bg-muted rounded" />
    </div>
  );
}
