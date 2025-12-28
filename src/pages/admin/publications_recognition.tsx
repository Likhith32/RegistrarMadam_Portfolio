import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminForm from "@/components/admin/AdminForm";

type PublicationRecognition = {
  id: string;
  title: string;
  description: string;
  year: number;
  issued_by: string;
};

export default function PublicationsRecognitionAdmin() {
  const [data, setData] = useState<PublicationRecognition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PublicationRecognition | null>(null);

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("publications_recognition")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SAVE =================
  const handleSave = async (formData: any) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      issued_by: formData.issued_by,
      year: formData.year ? Number(formData.year) : null,
    };

    if (editing) {
      await supabase
        .from("publications_recognition")
        .update(payload)
        .eq("id", editing.id);
    } else {
      await supabase.from("publications_recognition").insert(payload);
    }

    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  // ================= DELETE =================
  const handleDelete = async (row: PublicationRecognition) => {
    if (!confirm("Remove this publication / recognition?")) return;

    await supabase
      .from("publications_recognition")
      .delete()
      .eq("id", row.id);

    fetchData();
  };

  return (
    <AdminLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Publications & Recognition</h2>
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
              {
                name: "title",
                label: "Title",
                type: "text",
                required: true,
              },
              {
                name: "issued_by",
                label: "Issued By",
                type: "text",
              },
              {
                name: "year",
                label: "Year",
                type: "text",
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
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
            { key: "issued_by", label: "Issued By" },
            { key: "year", label: "Year" },
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
