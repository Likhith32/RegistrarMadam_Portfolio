import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience & Education", href: "/experience" },
  { label: "Achievements", href: "/achievements" },
  { label: "Publications", href: "/publications" },
    { label: "Learning Symposium", href: "/learning-symposium" },
      { label: "Scholars", href: "/scholars" },
  { label: "Media", href: "/media" },
  { label: "Contributions", href: "/education" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  /* ---------- Scroll detection ---------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- Close mobile menu on route change ---------- */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  /* ---------- Close mobile menu on ESC ---------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform no-print",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-subtle py-3 border-b border-border/40"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-wide px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col transition-opacity hover:opacity-80"
            aria-label="Go to home page"
          >
            <span className="font-serif text-lg md:text-xl font-semibold text-primary tracking-wide">
              Dr. G. Jaya Suma
            </span>
            <span className="text-xs md:text-sm text-muted-foreground tracking-wider uppercase">
             Registrar of JNTU-GV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "px-3 py-2 text-sm font-medium relative transition-colors",
                    "after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-accent",
                    "after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
                    "hover:after:scale-x-100",
                    isActive
                      ? "text-primary after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border animate-fade-in">
            <div className="flex flex-col pt-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-sm transition-colors",
                      isActive
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
