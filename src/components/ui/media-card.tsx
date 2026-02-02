import { useState } from "react";
import { Calendar, X } from "lucide-react";

export function MediaCard({
  title,
  source,
  date,
  imageUrl,
  description,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="group cursor-pointer break-inside-avoid rounded-xl overflow-hidden bg-card
                   shadow-sm hover:shadow-xl transition-all duration-500
                   hover:-translate-y-1"
      >
        {/* IMAGE AREA */}
        <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
            className="absolute inset-0 w-full h-full object-contain
                       transition-transform duration-700
                       group-hover:scale-[1.05]"
          />

          {/* HOVER OVERLAY (DESKTOP) */}
          <div
            className="hidden md:flex absolute inset-0
                       bg-gradient-to-t from-black/80 via-black/40 to-transparent
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-500
                       items-end"
          >
            <div
              className="p-4 text-white w-full
                         translate-y-4 group-hover:translate-y-0
                         transition-transform duration-500"
            >
              <p className="text-xs mb-1 opacity-90">
                {source} • {date}
              </p>
              <h3 className="text-sm font-semibold line-clamp-2">
                {title}
              </h3>
              {description && (
                <p className="text-xs mt-2 line-clamp-2 opacity-90">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE TEXT */}
        <div className="md:hidden p-3">
          <p className="text-xs text-muted-foreground">
            {source} • {date}
          </p>
          <h3 className="text-sm font-medium line-clamp-2 mt-1">
            {title}
          </h3>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm
                     flex items-center justify-center p-4
                     animate-in fade-in duration-300"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-card rounded-xl max-w-5xl w-full overflow-hidden
                       animate-in zoom-in-95 fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10
                         bg-card/80 hover:bg-card p-2 rounded-full
                         transition"
            >
              <X size={18} />
            </button>

            {/* IMAGE */}
            <div className="bg-black flex items-center justify-center max-h-[75vh]">
              <img
                src={imageUrl}
                alt={title}
                className="max-h-[75vh] max-w-full object-contain"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar size={14} />
                <span>{date}</span>
                <span>•</span>
                <span>{source}</span>
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {title}
              </h3>

              {description && (
                <p className="text-sm leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
