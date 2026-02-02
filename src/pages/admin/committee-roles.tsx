import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminForm from "@/components/admin/AdminForm";

type CommitteeRole = {
  id: string;
  title: string;
  institution: string;
  badge: string;
  years: string;
  description: string;
};

export default function CommitteeRolesAdmin() {
  const [data, setData] = useState<CommitteeRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CommitteeRole | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("committee_roles")
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
        .from("committee_roles")
        .update(formData)
        .eq("id", editing.id);
    } else {
      await supabase.from("committee_roles").insert(formData);
    }

    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  const handleDelete = async (row: CommitteeRole) => {
    if (!confirm("Remove this committee role?")) return;

    await supabase.from("committee_roles").delete().eq("id", row.id);
    fetchData();
  };

  return (
    <AdminLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Committee Roles</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Role
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white p-4 border rounded">
          <AdminForm
            fields={[
              { name: "title", label: "Role / Position", type: "text", required: true },
              { name: "institution", label: "Institution", type: "text" },
              { name: "badge", label: "Committee / Designation", type: "text" },
              { name: "years", label: "Years", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
            ]}
            initialData={editing || {}}
            submitLabel={editing ? "Update Role" : "Add Role"}
            onCancel={() => setShowForm(false)}
            onSubmit={handleSave}
          />
        </div>
      )}

      {!loading && (
        <AdminTable
          columns={[
            { key: "title", label: "Role" },
            { key: "badge", label: "Committee" },
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
