import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminForm from "@/components/admin/AdminForm";

export default function DailyActivitiesAdmin() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  /* -------- FETCH -------- */
  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("daily_activities")
      .select("*")
      .order("activity_date", { ascending: false });

    setData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* -------- SAVE -------- */
  const handleSave = async (formData: any) => {
    const { error } = editing
      ? await supabase
          .from("daily_activities")
          .update(formData)
          .eq("id", editing.id)
      : await supabase
          .from("daily_activities")
          .insert(formData);

    if (error) {
      alert("A report for this date already exists.");
      return;
    }

    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  /* -------- DELETE -------- */
  const handleDelete = async (row: any) => {
    if (!confirm("Delete this daily report?")) return;
    await supabase.from("daily_activities").delete().eq("id", row.id);
    fetchData();
  };

  const fields = [
    { name: "activity_date", label: "Date", type: "date", required: true },
    { name: "highlights", label: "Today's Highlights", type: "textarea" },
    { name: "meetings", label: "Meetings / Collaborations", type: "textarea" },
    { name: "work_done", label: "Work Done Today", type: "textarea" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ];

  const columns = [
    { key: "activity_date", label: "Date" },
    { key: "highlights", label: "Highlights" },
    { key: "meetings", label: "Meetings" },
    { key: "work_done", label: "Work Done" },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Daily Activities</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Today's Report
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-6 bg-white p-4 border rounded">
          <AdminForm
            fields={fields}
            initialData={
              editing
                ? editing
                : {
                    activity_date: new Date().toISOString().split("T")[0],
                  }
            }
            submitLabel={editing ? "Update Report" : "Save Report"}
            onCancel={() => setShowForm(false)}
            onSubmit={handleSave}
          />
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-sm text-gray-600">Loading daily activities…</div>
      ) : (
        <AdminTable
          columns={columns}
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