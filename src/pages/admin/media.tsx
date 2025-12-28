import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminForm from "@/components/admin/AdminForm";

type MediaItem = {
  id: string;
  title: string;
  source: string;
  year: number;
  description: string;
  image_url: string;
};

export default function MediaAdmin() {
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<MediaItem | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("media")
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
      title: formData.title,
      source: formData.source,
      description: formData.description,
      image_url: formData.image_url,
      year: formData.year ? Number(formData.year) : null,
    };

    if (editing) {
      await supabase.from("media").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("media").insert(payload);
    }

    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  const handleDelete = async (row: MediaItem) => {
    if (!confirm("Remove this media entry?")) return;

    await supabase.from("media").delete().eq("id", row.id);
    fetchData();
  };

  return (
    <AdminLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Media</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Media
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white p-4 border rounded">
          <AdminForm
            fields={[
              { name: "title", label: "Title", type: "text", required: true },
              { name: "source", label: "Source", type: "text", required: true },
              { name: "year", label: "Year", type: "text" },
              { name: "image_url", label: "Image URL", type: "text" },
              {
                name: "description",
                label: "Description",
                type: "textarea",
              },
            ]}
            initialData={editing || {}}
            submitLabel={editing ? "Update Media" : "Add Media"}
            onCancel={() => setShowForm(false)}
            onSubmit={handleSave}
          />
        </div>
      )}

      {!loading && (
        <AdminTable
          columns={[
            { key: "title", label: "Title" },
            { key: "source", label: "Source" },
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
