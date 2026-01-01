import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./portal-modal.css";

interface PortalModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function PortalModal({
  open,
  onClose,
  title,
  children,
}: PortalModalProps) {
  const modalRoot = document.getElementById("modal-root");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !modalRoot) return null;

  return createPortal(
    <div className="portal-overlay" onClick={onClose}>
      <div
        className="portal-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="portal-header">
            <h3>{title}</h3>
            <button onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        )}

        <div className="portal-body">{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
