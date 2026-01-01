import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  open: {
    transition: {
      staggerChildren: 0.06,
    },
  },
  closed: {},
};

const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
};

const MultiYearCard = ({
  title,
  institution,
  description,
  years,
  badge,
}) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);
  const hasYears = Array.isArray(years) && years.length > 0;
  const hasMultipleYears = Array.isArray(years) && years.length > 1;
  const singleYear = hasYears && !hasMultipleYears ? years[0] : null;

  // Auto-scroll to expanded card on mobile
  useEffect(() => {
    if (open && window.innerWidth < 768) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    }
  }, [open]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4 }}
      whileTap={hasMultipleYears ? { scale: 0.98 } : undefined}
      transition={{
        layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        default: { duration: 0.5, ease: "easeOut" },
      }}
      className={cn(
        "relative rounded-xl border bg-background p-6",
        "min-h-[240px] sm:min-h-[260px]",
        "transition-colors duration-300",
        "hover:shadow-lg hover:border-accent/40",
        hasMultipleYears && "cursor-pointer",
        open
          ? "border-accent bg-accent/5 shadow-xl"
          : "shadow-sm"
      )}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-serif text-lg font-semibold text-primary leading-snug">
            {title}
          </h3>
          {badge && (
            <p className="text-sm text-accent font-medium mt-1">
              {badge}
            </p>
          )}
          {/* Show single year directly */}
          {singleYear && (
            <p className="text-sm text-accent font-medium mt-1">
              {singleYear}
            </p>
          )}
          {institution && (
            <p className="text-sm text-muted-foreground mt-1">
              {institution}
            </p>
          )}
          {hasMultipleYears && (
            <p className="text-xs text-muted-foreground/70 mt-2 hidden md:block">
              Click to view timeline
            </p>
          )}
        </div>
        
        {/* Only show chevron button if there are multiple years */}
        {hasMultipleYears && (
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Collapse timeline" : "Expand timeline"}
            className="rounded-full p-1 hover:bg-accent/10 transition-colors flex-shrink-0"
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Subtle bounce animation on mobile to hint interactivity */}
              <motion.div
                animate={!open && typeof window !== 'undefined' && window.innerWidth < 768 ? { y: [0, -3, 0] } : {}}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              >
                <ChevronDown
                  size={20}
                  className="text-muted-foreground"
                />
              </motion.div>
            </motion.div>
          </button>
        )}
      </div>

      {/* DESCRIPTION */}
      {description && (
        <p className="text-foreground/80 text-sm mt-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* EXPANDABLE YEARS - Only show for multiple years */}
      <AnimatePresence>
        {open && hasMultipleYears && (
          <motion.div
            key="years"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.45, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="overflow-hidden"
          >
            <motion.ul
              variants={containerVariants}
              initial="closed"
              animate="open"
              className="mt-4 space-y-2 pl-4 border-l-2 border-accent/40"
            >
              {years.map((year, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  ▸ {year}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MultiYearCard;