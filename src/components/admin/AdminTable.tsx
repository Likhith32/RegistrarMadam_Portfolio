import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, AlertCircle } from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
  loading?: boolean;
}

export default function AdminTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  loading = false,
}: AdminTableProps<T>) {
  if (loading) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <motion.th
                  key={String(col.key)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={styles.th}
                >
                  {col.label}
                </motion.th>
              ))}
              <motion.th
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: columns.length * 0.05 }}
                style={{ ...styles.th, textAlign: "right" }}
              >
                Actions
              </motion.th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {data.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={columns.length + 1} style={styles.emptyCell}>
                    <AlertCircle size={24} style={{ marginBottom: "8px" }} />
                    <div>No records found ✨</div>
                    <p style={styles.emptySubtext}>
                      Start by adding your first entry
                    </p>
                  </td>
                </motion.tr>
              ) : (
                data.map((row, rowIndex) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: rowIndex * 0.03 }}
                    style={styles.tr}
                    className="table-row"
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        style={styles.td}
                        data-label={col.label}
                      >
                        <span className="mobile-label">{col.label}:</span>
                        <span className="cell-content">
                          {String(row[col.key] ?? "")}
                        </span>
                      </td>
                    ))}
                    <td style={{ ...styles.td, textAlign: "right" }} data-label="Actions">
                      <div style={styles.actionButtons}>
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onEdit(row)}
                          style={{ ...styles.actionBtn, ...styles.editBtn }}
                          className="action-btn edit-btn"
                        >
                          <Edit2 size={14} />
                          <span>Edit</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onDelete(row)}
                          style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                          className="action-btn delete-btn"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Inline styles with animations */}
      <style>{keyframes}</style>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    borderRadius: "18px",
    background: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "0 30px 70px rgba(0,0,0,0.18)",
    animation: "fadeUp 0.6s ease",
    border: "1px solid rgba(255,255,255,0.35)",
    overflow: "hidden",
  },

  tableContainer: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
    fontSize: "14px",
    color: "#3b2f0b",
  },

  th: {
    padding: "16px 18px",
    textAlign: "left",
    fontWeight: 700,
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3), rgba(255,255,255,0.7))",
    backgroundSize: "200% 100%",
    animation: "headerShine 6s ease infinite",
    borderBottom: "2px solid rgba(255,255,255,0.4)",
    color: "#78350f",
  },

  tr: {
    transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
    cursor: "pointer",
  },

  td: {
    padding: "14px 18px",
    borderBottom: "1px solid rgba(255,255,255,0.25)",
    transition: "all 0.3s ease",
  },

  emptyCell: {
    padding: "48px 32px",
    textAlign: "center",
    color: "#78350f",
    fontWeight: 500,
    fontSize: "15px",
    animation: "fadeUp 0.5s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  emptySubtext: {
    fontSize: "13px",
    color: "#a16207",
    marginTop: "8px",
    opacity: 0.8,
  },

  actionButtons: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  actionBtn: {
    padding: "8px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(8px)",
  },

  editBtn: {
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    color: "#78350f",
    boxShadow: "0 8px 20px rgba(251,191,36,0.4)",
  },

  deleteBtn: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(239,68,68,0.4)",
  },

  loadingContainer: {
    padding: "48px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(251,191,36,0.2)",
    borderTopColor: "#f59e0b",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  loadingText: {
    color: "#78350f",
    fontSize: "14px",
    fontWeight: 500,
  },
};

/* ===================== KEYFRAMES ===================== */

const keyframes = `
/* Fade up animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header shine animation */
@keyframes headerShine {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Spinner animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Row hover effects */
.table-row:hover {
  transform: translateY(-3px);
}

.table-row:hover td {
  background: rgba(255,255,255,0.5);
  box-shadow: inset 0 0 0 9999px rgba(251,191,36,0.08);
}

/* Button ripple effect */
.action-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.5) 10%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.action-btn:active::after {
  opacity: 1;
}

/* Button hover effects */
.edit-btn:hover {
  box-shadow: 0 12px 30px rgba(251,191,36,0.5);
}

.delete-btn:hover {
  box-shadow: 0 12px 30px rgba(239,68,68,0.5);
}

/* Focus states for accessibility */
.action-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(251,191,36,0.5);
}

.delete-btn:focus {
  box-shadow: 0 0 0 3px rgba(239,68,68,0.5);
}

/* Mobile optimization */
@media (max-width: 768px) {
  .table-row {
    display: block;
    margin-bottom: 16px;
    border-radius: 14px;
    background: rgba(255,255,255,0.4);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    overflow: hidden;
  }

  .table-row:hover {
    transform: translateY(-2px);
  }

  thead {
    display: none;
  }

  table {
    min-width: unset !important;
  }

  td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px !important;
    border-bottom: 1px solid rgba(255,255,255,0.2) !important;
    text-align: left !important;
  }

  td:last-child {
    border-bottom: none !important;
    background: rgba(255,255,255,0.3);
  }

  .mobile-label {
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    color: #78350f;
    letter-spacing: 0.5px;
    display: block;
  }

  .cell-content {
    text-align: right;
    flex: 1;
    margin-left: 12px;
  }

  .action-buttons {
    width: 100%;
    justify-content: stretch !important;
  }

  .action-btn {
    flex: 1;
  }
}

@media (max-width: 480px) {
  .action-btn span {
    display: none;
  }

  .action-btn {
    padding: 10px 12px;
    justify-content: center;
  }
}

/* Desktop: hide mobile labels */
@media (min-width: 769px) {
  .mobile-label {
    display: none;
  }
}

/* Smooth scrolling on mobile */
.tableContainer {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(251,191,36,0.5) transparent;
}

.tableContainer::-webkit-scrollbar {
  height: 8px;
}

.tableContainer::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.2);
  border-radius: 10px;
}

.tableContainer::-webkit-scrollbar-thumb {
  background: rgba(251,191,36,0.5);
  border-radius: 10px;
}

.tableContainer::-webkit-scrollbar-thumb:hover {
  background: rgba(251,191,36,0.7);
}
`;