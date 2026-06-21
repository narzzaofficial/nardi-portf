"use client";

import { useEffect, useState } from "react";
import { getAll, addItem, updateItem, deleteItem, COLLECTIONS, Certification } from "../../../lib/firestore";
import { AdminInput } from "../components/AdminFields";
import { ImageUploader } from "../components/ImageUploader";
import { Plus, Pencil, Trash2, X, Save, Loader2, Award } from "lucide-react";

export default function CertificationsAdmin() {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [order, setOrder] = useState(0);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getAll<Certification>(COLLECTIONS.CERTIFICATIONS);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = () => {
    setId(null);
    setTitle("");
    setIssuer("");
    setDate("");
    setImageUrl("");
    setOrder(items.length);
    setIsEditing(true);
  };

  const openEdit = (item: Certification) => {
    setId(item.id || null);
    setTitle(item.title);
    setIssuer(item.issuer);
    setDate(item.date || "");
    setImageUrl(item.imageUrl || "");
    setOrder(item.order || 0);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = { title, issuer, date, imageUrl, order };
    
    if (id) {
      await updateItem(COLLECTIONS.CERTIFICATIONS, id, data);
    } else {
      await addItem(COLLECTIONS.CERTIFICATIONS, data);
    }
    
    await fetchItems();
    setIsEditing(false);
    setSaving(false);
  };

  const handleDelete = async (idToDelete: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    await deleteItem(COLLECTIONS.CERTIFICATIONS, idToDelete);
    await fetchItems();
  };

  if (isEditing) {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-2xl">{id ? "Edit Certification" : "New Certification"}</h1>
          <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[rgba(238,238,242,0.5)]" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <AdminInput label="Title" value={title} onChange={setTitle} required />
            <AdminInput label="Issuer" value={issuer} onChange={setIssuer} required />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <AdminInput label="Date (Optional)" value={date} onChange={setDate} placeholder="e.g. Oct 2023" />
            <AdminInput label="Sort Order" type="number" value={order.toString()} onChange={v => setOrder(parseInt(v) || 0)} />
          </div>

          <ImageUploader label="Credential Badge/Image (Optional)" value={imageUrl} onChange={setImageUrl} />

          <div className="pt-4 flex gap-4">
            <button type="submit" disabled={saving} className="flex-1 bg-[#eeeef2] text-[#0d0d0f] font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50">
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? "Saving..." : "Save Certification"}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl mb-1">Certifications</h1>
          <p className="text-[rgba(238,238,242,0.5)]">Manage your credentials and courses.</p>
        </div>
        <button onClick={openNew} className="bg-[#4f8ef7] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#4f8ef7]" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 admin-panel">
          <p className="text-[rgba(238,238,242,0.5)] mb-4">No certifications added yet.</p>
          <button onClick={openNew} className="text-[#4f8ef7] font-semibold hover:underline">Add your first certification</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="admin-panel p-5 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-[rgba(139,92,246,0.12)] shrink-0">
                  <Award className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#eeeef2] line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-[rgba(238,238,242,0.5)]">{item.issuer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(item)} className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-md text-[rgba(238,238,242,0.5)] hover:text-[#4f8ef7] transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id!)} className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-md text-[rgba(238,238,242,0.5)] hover:text-[#f87171] transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
