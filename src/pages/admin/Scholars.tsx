import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminForm from "@/components/admin/AdminForm";

type ScholarType = "btech" | "mtech" | "phd";

const TABLE_MAP: Record<ScholarType, string> = {
  btech: "btech_scholars",
  mtech: "mtech_scholars",
  phd: "phd_scholars_awarded",
};

export default function ScholarsAdmin() {
  const [type, setType] = useState<ScholarType>("btech");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  /* ---------------- FETCH ---------------- */
  const fetchData = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from(TABLE_MAP[type])
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  /* ---------------- SAVE ---------------- */
  const handleSave = async (formData: any) => {
    if (editing) {
      await supabase
        .from(TABLE_MAP[type])
        .update(formData)
        .eq("id", editing.id);
    } else {
      await supabase.from(TABLE_MAP[type]).insert(formData);
    }

    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (row: any) => {
    if (!confirm("Delete this scholar?")) return;
    await supabase.from(TABLE_MAP[type]).delete().eq("id", row.id);
    fetchData();
  };

  /* ---------------- FIELDS BY TYPE ---------------- */
  const fieldsByType: Record<ScholarType, any[]> = {
    btech: [
      { name: "student_name", label: "Student Name", type: "text", required: true },
      { name: "roll_number", label: "Roll Number", type: "text" },
      { name: "project_title", label: "Project Title", type: "text" },
      { name: "department", label: "Department", type: "text" },
      { name: "academic_year", label: "Academic Year", type: "text" },
      { name: "guide_name", label: "Guide Name", type: "text" },
    ],
    mtech: [
      { name: "student_name", label: "Student Name", type: "text", required: true },
      { name: "roll_number", label: "Roll Number", type: "text" },
      { name: "thesis_title", label: "Thesis Title", type: "text" },
      { name: "department", label: "Department", type: "text" },
      { name: "academic_year", label: "Academic Year", type: "text" },
      { name: "guide_name", label: "Guide Name", type: "text" },
    ],
    phd: [
      { name: "scholar_name", label: "Scholar Name", type: "text", required: true },
      { name: "roll_number", label: "Roll Number", type: "text" },
      { name: "thesis_title", label: "Thesis Title", type: "text" },
      { name: "department", label: "Department", type: "text" },
      { name: "university", label: "University", type: "text" },
      { name: "awarded_year", label: "Awarded Year", type: "text" },
    ],
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columnsByType: Record<ScholarType, any[]> = {
    btech: [
      { key: "student_name", label: "Name" },
      { key: "project_title", label: "Project" },
      { key: "academic_year", label: "Year" },
    ],
    mtech: [
      { key: "student_name", label: "Name" },
      { key: "thesis_title", label: "Thesis" },
      { key: "academic_year", label: "Year" },
    ],
    phd: [
      { key: "scholar_name", label: "Name" },
      { key: "thesis_title", label: "Thesis" },
      { key: "awarded_year", label: "Awarded" },
    ],
  };

  return (
    <AdminLayout>
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Scholars</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Scholar
        </button>
      </div>

      {/* ---------- TABS ---------- */}
      <div className="flex gap-3 mb-6">
        {(["btech", "mtech", "phd"] as ScholarType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              type === t
                ? "bg-primary text-white"
                : "bg-white border hover:bg-accent/20"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ---------- FORM ---------- */}
      {showForm && (
        <div className="mb-6 bg-white p-4 border rounded">
          <AdminForm
            fields={fieldsByType[type]}
            initialData={editing || {}}
            submitLabel={editing ? "Update Scholar" : "Add Scholar"}
            onCancel={() => setShowForm(false)}
            onSubmit={handleSave}
          />
        </div>
      )}

      {/* ---------- TABLE ---------- */}
      {!loading && (
        <AdminTable
          columns={columnsByType[type]}
          data={data}
          onEdit={(row) => {
            setEditing(row);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
}
