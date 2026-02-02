import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminForm from "@/components/admin/AdminForm";

type AcademicGovernance = {
  id: string;
  title: string;
  institution: string;
  badge: string;
  years: string;
  description: string;
};

export default function AcademicGovernanceAdmin() {
  const [data, setData] = useState<AcademicGovernance[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AcademicGovernance | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("academic_governance")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (formData: any) => {
    if (editing) {
      await supabase
        .from("academic_governance")
        .update(formData)
        .eq("id", editing.id);
    } else {
      await supabase.from("academic_governance").insert(formData);
    }

    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  const handleDelete = async (row: AcademicGovernance) => {
    if (!confirm("Remove this academic governance entry?")) return;

    await supabase
      .from("academic_governance")
      .delete()
      .eq("id", row.id);

    fetchData();
  };

  return (
    <AdminLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Academic Governance</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Entry
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white p-4 border rounded">
          <AdminForm
            fields={[
              { name: "title", label: "Title", type: "text", required: true },
              { name: "institution", label: "Institution", type: "text" },
              { name: "badge", label: "Badge / Designation", type: "text" },
              { name: "years", label: "Years", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
            ]}
            initialData={editing || {}}
            submitLabel={editing ? "Update Entry" : "Add Entry"}
            onCancel={() => setShowForm(false)}
            onSubmit={handleSave}
          />
        </div>
      )}

      {!loading && (
        <AdminTable
          columns={[
            { key: "title", label: "Title" },
            { key: "institution", label: "Institution" },
            { key: "years", label: "Years" },
          ]}
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
