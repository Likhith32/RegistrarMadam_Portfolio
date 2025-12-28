import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminForm from "@/components/admin/AdminForm";

type InvitedTalk = {
  id: string;
  title: string;
  event: string;
  speaker: string;
  date: string;
};

export default function InvitedTalksAdmin() {
  const [data, setData] = useState<InvitedTalk[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<InvitedTalk | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("invited_talks")
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
        .from("invited_talks")
        .update(formData)
        .eq("id", editing.id);
    } else {
      await supabase.from("invited_talks").insert(formData);
    }

    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  const handleDelete = async (row: InvitedTalk) => {
    if (!confirm("Remove this invited talk?")) return;

    await supabase.from("invited_talks").delete().eq("id", row.id);
    fetchData();
  };

  return (
    <AdminLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Invited Talks</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Talk
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white p-4 border rounded">
          <AdminForm
            fields={[
              { name: "title", label: "Talk Title", type: "text", required: true },
              { name: "event", label: "Event", type: "text", required: true },
              { name: "speaker", label: "Speaker", type: "text" },
              { name: "date", label: "Date", type: "text" },
            ]}
            initialData={editing || {}}
            submitLabel={editing ? "Update Talk" : "Add Talk"}
            onCancel={() => setShowForm(false)}
            onSubmit={handleSave}
          />
        </div>
      )}

      {!loading && (
        <AdminTable
          columns={[
            { key: "title", label: "Title" },
            { key: "event", label: "Event" },
            { key: "date", label: "Date" },
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
