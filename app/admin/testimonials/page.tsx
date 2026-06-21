"use client";

import { useEffect, useState } from "react";
import { getAll, addItem, updateItem, deleteItem, COLLECTIONS, Testimonial } from "../../../lib/firestore";
import { AdminInput, AdminTextarea } from "../components/AdminFields";
import { Plus, Pencil, Trash2, X, Save, Loader2, Quote } from "lucide-react";

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [id, setId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [order, setOrder] = useState(0);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getAll<Testimonial>(COLLECTIONS.TESTIMONIALS);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = () => {
    setId(null);
    setText("");
    setAuthor("");
    setRole("");
    setCompany("");
    setOrder(items.length);
    setIsEditing(true);
  };

  const openEdit = (item: Testimonial) => {
    setId(item.id || null);
    setText(item.text);
    setAuthor(item.author);
    setRole(item.role);
    setCompany(item.company);
    setOrder(item.order || 0);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = { text, author, role, company, order };
    
    if (id) {
      await updateItem(COLLECTIONS.TESTIMONIALS, id, data);
    } else {
      await addItem(COLLECTIONS.TESTIMONIALS, data);
    }
    
    await fetchItems();
    setIsEditing(false);
    setSaving(false);
  };

  const handleDelete = async (idToDelete: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    await deleteItem(COLLECTIONS.TESTIMONIALS, idToDelete);
    await fetchItems();
  };

  if (isEditing) {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-2xl">{id ? "Edit Testimonial" : "New Testimonial"}</h1>
          <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-[var(--tag-bg)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <AdminTextarea label="Testimonial Quote" value={text} onChange={setText} required rows={4} />

          <div className="grid grid-cols-2 gap-6">
            <AdminInput label="Author Name" value={author} onChange={setAuthor} required />
            <AdminInput label="Company" value={company} onChange={setCompany} required />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <AdminInput label="Role" value={role} onChange={setRole} required />
            <AdminInput label="Sort Order" type="number" value={order.toString()} onChange={v => setOrder(parseInt(v) || 0)} />
          </div>

          <div className="pt-4 flex gap-4">
            <button type="submit" disabled={saving} className="flex-1 bg-[var(--text)] text-[var(--bg)] font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50">
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? "Saving..." : "Save Testimonial"}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--tag-bg)] transition-colors">
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
          <h1 className="font-display font-bold text-3xl mb-1">Testimonials</h1>
          <p className="text-[var(--text-muted)]">Manage recommendations from colleagues and clients.</p>
        </div>
        <button onClick={openNew} className="bg-[#4f8ef7] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#4f8ef7]" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 admin-panel">
          <p className="text-[var(--text-muted)] mb-4">No testimonials added yet.</p>
          <button onClick={openNew} className="text-[#4f8ef7] font-semibold hover:underline">Add your first testimonial</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map(item => (
            <div key={item.id} className="admin-panel p-6 flex flex-col sm:flex-row gap-6 justify-between group">
              <div className="flex-1">
                <Quote className="w-6 h-6 text-[var(--border)] mb-2" />
                <p className="text-sm text-[var(--text-muted)] italic mb-4">"{item.text}"</p>
                <div>
                  <h4 className="font-semibold text-[var(--text)] text-sm">{item.author}</h4>
                  <p className="text-xs text-[var(--text-muted)] opacity-70">{item.role}, {item.company}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(item)} className="p-2 hover:bg-[var(--tag-bg)] rounded-md text-[var(--text-muted)] hover:text-[#4f8ef7] transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id!)} className="p-2 hover:bg-[var(--tag-bg)] rounded-md text-[var(--text-muted)] hover:text-[#f87171] transition-colors">
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
