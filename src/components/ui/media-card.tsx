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
        className="relative cursor-pointer overflow-hidden rounded-xl shadow-sm bg-card group break-inside-avoid"
      >
        {/* IMAGE */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* HOVER OVERLAY (DESKTOP ONLY) */}
        <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity items-end">
          <div className="p-4 text-white">
            <p className="text-xs mb-1">{source} • {date}</p>
            <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
            {description && (
              <p className="text-xs mt-2 line-clamp-2 opacity-90">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* MOBILE TEXT */}
        <div className="md:hidden p-3">
          <p className="text-xs text-muted-foreground">{source} • {date}</p>
          <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-card rounded-xl max-w-4xl w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 bg-card/80 p-2 rounded-full"
            >
              <X size={18} />
            </button>

            <img
              src={imageUrl}
              alt={title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />

            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar size={14} />
                <span>{date}</span>
                <span>•</span>
                <span>{source}</span>
              </div>

              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              {description && (
                <p className="text-sm leading-relaxed">{description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
