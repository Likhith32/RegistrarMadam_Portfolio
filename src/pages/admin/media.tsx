import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import PortalModal from "@/components/ui/PortalModal";
import AdminForm, { AdminField } from "@/components/admin/AdminForm";

/* ===================== TYPES ===================== */
type MediaItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  year: number;
  source: string;
  created_at: string;
};

/* ===================== FORM FIELDS ===================== */
const mediaFields: AdminField[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "source", label: "Source", type: "text", required: true },
  {
    name: "year",
    label: "Year",
    type: "number",
    required: true,
    min: 2000,
    max: 2100,
  },
  {
    name: "image_url",
    label: "Media Image",
    type: "image",
    required: true,
  },
  { name: "description", label: "Description", type: "textarea" },
];

/* ===================== PAGE ===================== */
export default function AdminMedia() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /* ===================== FETCH MEDIA ===================== */
  const fetchMedia = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("year", { ascending: false });

    if (!error && data) setMedia(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  /* ===================== CREATE / UPDATE ===================== */
  const handleSubmit = async (data: Record<string, any>) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    console.log("📤 SUBMIT DATA:", data);

    try {
      let imageUrl = data.image_url;

      // Upload new image if File object
      if (data.image_url instanceof File) {
        const file = data.image_url;
        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;

        console.log("⬆️ Uploading:", fileName);

        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(fileName, file);

        if (uploadError) {
          console.error("❌ Upload error:", uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from("media")
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
        console.log("✅ Image uploaded:", imageUrl);
      } else if (editing && typeof data.image_url === "string") {
        // Keep existing URL when editing
        imageUrl = data.image_url;
      }

      const payload = {
        title: data.title,
        source: data.source,
        year: Number(data.year),
        description: data.description || null,
        image_url: imageUrl,
      };

      console.log("💾 Saving:", payload);

      if (editing) {
        await supabase.from("media").update(payload).eq("id", editing.id);
      } else {
        await supabase.from("media").insert(payload);
      }

      handleClose();
      await fetchMedia();
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to save media. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ===================== DELETE ===================== */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this media item?")) return;
    
    const item = media.find((m) => m.id === id);
    
    await supabase.from("media").delete().eq("id", id);
    
    if (item?.image_url) {
      try {
        const urlParts = item.image_url.split("/");
        const fileName = urlParts[urlParts.length - 1];
        
        if (fileName) {
          await supabase.storage.from("media").remove([fileName]);
        }
      } catch (err) {
        console.error("⚠️ Storage cleanup failed:", err);
      }
    }
    
    fetchMedia();
  };

  /* ===================== MODAL HANDLERS ===================== */
  const handleClose = useCallback(() => {
    console.log("❌ Closing modal");
    setEditing(null);
    setIsOpen(false);
  }, []);

  const handleEdit = useCallback((item: MediaItem) => {
    console.log("✏️ Edit:", item.title);
    setEditing(item);
    setIsOpen(true);
  }, []);

  const handleAdd = useCallback(() => {
    console.log("➕ Add new media");
    setEditing(null);
    setIsOpen(true);
  }, []);

  return (
    <AdminLayout>
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow">
            Media / Press Coverage
          </h2>
          <p className="text-white/80 text-sm">
            Manage portfolio media items
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          disabled={isOpen}
          className="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2
                     text-sm font-semibold text-gray-800 shadow-lg
                     hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} /> Add Media
        </motion.button>
      </motion.div>

      {/* CONTENT */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-white/40 backdrop-blur"
            />
          ))}
        </div>
      ) : media.length === 0 ? (
        <div className="rounded-2xl bg-white/60 p-6 text-center text-gray-700">
          No media added yet.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl
                         bg-white/70 backdrop-blur-xl border border-white/40
                         shadow-lg transition-all"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/5] bg-gray-100 flex items-center justify-center">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
              </div>

              {/* INFO */}
              <div className="p-4">
                <p className="text-xs text-gray-500">
                  {item.source} • {item.year}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
              </div>

              {/* ACTIONS */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-full bg-white/90 p-2 shadow hover:bg-white"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-full bg-red-500/90 p-2 text-white shadow hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✅ PORTAL MODAL - Renders outside main DOM to prevent blur */}
      <PortalModal
        open={isOpen}
        onClose={handleClose}
        title={editing ? "Edit Media" : "Add Media"}
      >
        <AdminForm
          fields={mediaFields}
          initialData={editing || {}}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          submitLabel={editing ? "Update" : "Create"}
          isModal={false} // Not using modal wrapper since PortalModal handles it
        />
      </PortalModal>
    </AdminLayout>
  );
}