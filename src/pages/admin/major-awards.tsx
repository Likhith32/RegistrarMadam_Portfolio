import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminForm from "@/components/admin/AdminForm";

type MajorAward = {
  id: string;
  title: string;
  institution: string;
  badge: string;
  years: string;
  description: string;
};

export default function MajorAwardsAdmin() {
  const [data, setData] = useState<MajorAward[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<MajorAward | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("major_awards")
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
        .from("major_awards")
        .update(formData)
        .eq("id", editing.id);
    } else {
      await supabase.from("major_awards").insert(formData);
    }

    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  const handleDelete = async (row: MajorAward) => {
    const ok = confirm("Are you sure you want to remove this award?");
    if (!ok) return;

    await supabase.from("major_awards").delete().eq("id", row.id);
    fetchData();
  };

  return (
    <AdminLayout>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Major Awards</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Add Award
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded border bg-white p-4">
          <AdminForm
            fields={[
              { name: "title", label: "Award Title", type: "text", required: true },
              {
                name: "institution",
                label: "Institution",
                type: "text",
              },
              { name: "badge", label: "Badge / Category", type: "text" },
              { name: "years", label: "Year(s)", type: "text" },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
            ]}
            initialData={editing || {}}
            submitLabel={editing ? "Update Award" : "Add Award"}
            onCancel={() => setShowForm(false)}
            onSubmit={handleSave}
          />
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminTable
          columns={[
            { key: "title", label: "Title" },
            { key: "institution", label: "Institution" },
            { key: "years", label: "Year(s)" },
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
