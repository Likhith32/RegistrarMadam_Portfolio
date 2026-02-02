import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminForm from "@/components/admin/AdminForm";

type WorkshopOrganized = {
  id: string;
  description: string;
  year: number;
};

export default function WorkshopsOrganizedAdmin() {
  const [data, setData] = useState<WorkshopOrganized[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<WorkshopOrganized | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("workshops_organized")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (formData: any) => {
    const payload = {
      description: formData.description,
      year: formData.year ? Number(formData.year) : null,
    };

    if (editing) {
      await supabase
        .from("workshops_organized")
        .update(payload)
        .eq("id", editing.id);
    } else {
      await supabase.from("workshops_organized").insert(payload);
    }

    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  const handleDelete = async (row: WorkshopOrganized) => {
    if (!confirm("Remove this organized workshop?")) return;

    await supabase
      .from("workshops_organized")
      .delete()
      .eq("id", row.id);

    fetchData();
  };

  return (
    <AdminLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Workshops Organized</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Workshop
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white p-4 border rounded">
          <AdminForm
            fields={[
              {
                name: "description",
                label: "Workshop Description",
                type: "textarea",
                required: true,
              },
              { name: "year", label: "Year", type: "text" },
            ]}
            initialData={editing || {}}
            submitLabel={editing ? "Update Workshop" : "Add Workshop"}
            onCancel={() => setShowForm(false)}
            onSubmit={handleSave}
          />
        </div>
      )}

      {!loading && (
        <AdminTable
          columns={[
            { key: "description", label: "Workshop" },
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
