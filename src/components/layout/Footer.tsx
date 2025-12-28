import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground no-print">
      <div className="container-wide px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-semibold mb-4">
              Dr.G.Jayasuma
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Senior Registrar with over three decades of distinguished service
              in academic administration, governance, and institutional
              leadership at premier educational institutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Experience", href: "/experience" },
                { label: "Publications", href: "/publications" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  Office of the Registrar
                  <br />
                  JNTU-GV Gurajada University
                  <br />
                  Vizianagaram, India - 535003
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:registrar@jntugv.edu.in"
                  className="text-primary-foreground/80 text-sm hover:text-accent transition-colors"
                >
                  registrar@jntugv.edu.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  +91 11 2345 6789
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} Dr.G.Jayasuma. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              Office of the Registrar, JNTU-GV GURAJADA UNIVERSITY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
