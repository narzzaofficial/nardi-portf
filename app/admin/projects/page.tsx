"use client";

import { useEffect, useState } from "react";
import { getAll, addItem, updateItem, deleteItem, COLLECTIONS, Project } from "../../../lib/firestore";
import { AdminInput, AdminTextarea, AdminTagInput, AdminSelect } from "../components/AdminFields";
import { ImageUploader } from "../components/ImageUploader";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";

export default function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [id, setId] = useState<string | null>(null);
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState<string[]>([]);
  const [impact, setImpact] = useState("");
  const [accent, setAccent] = useState("#4f8ef7");
  const [liveUrl, setLiveUrl] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState(true);
  const [order, setOrder] = useState(0);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getAll<Project>(COLLECTIONS.PROJECTS);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = () => {
    setId(null);
    setNumber("");
    setTitle("");
    setDescription("");
    setTech([]);
    setImpact("");
    setAccent("#4f8ef7");
    setLiveUrl("");
    setSourceUrl("");
    setImageUrl("");
    setFeatured(true);
    setOrder(items.length);
    setIsEditing(true);
  };

  const openEdit = (item: Project) => {
    setId(item.id || null);
    setNumber(item.number);
    setTitle(item.title);
    setDescription(item.description);
    setTech(item.tech || []);
    setImpact(item.impact || "");
    setAccent(item.accent || "#4f8ef7");
    setLiveUrl(item.liveUrl || "");
    setSourceUrl(item.sourceUrl || "");
    setImageUrl(item.imageUrl || "");
    setFeatured(item.featured ?? true);
    setOrder(item.order || 0);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = { number, title, description, tech, impact, accent, liveUrl, sourceUrl, imageUrl, featured, order };
    
    if (id) {
      await updateItem(COLLECTIONS.PROJECTS, id, data);
    } else {
      await addItem(COLLECTIONS.PROJECTS, data);
    }
    
    await fetchItems();
    setIsEditing(false);
    setSaving(false);
  };

  const handleDelete = async (idToDelete: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await deleteItem(COLLECTIONS.PROJECTS, idToDelete);
    await fetchItems();
  };

  if (isEditing) {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-2xl">{id ? "Edit Project" : "New Project"}</h1>
          <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-[var(--tag-bg)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <AdminInput label="Number (e.g. 01)" value={number} onChange={setNumber} required />
            <AdminInput label="Title" value={title} onChange={setTitle} required />
          </div>
          
          <AdminTextarea label="Description" value={description} onChange={setDescription} required rows={4} />
          
          <div className="grid grid-cols-2 gap-6">
            <AdminInput label="Impact Metric" value={impact} onChange={setImpact} placeholder="e.g. Increased performance by 50%" />
            <AdminSelect 
              label="Accent Color" 
              value={accent} 
              onChange={setAccent} 
              options={[
                { label: "Blue (#4f8ef7)", value: "#4f8ef7" },
                { label: "Green (#34d399)", value: "#34d399" },
                { label: "Purple (#8b5cf6)", value: "#8b5cf6" },
                { label: "Orange (#f59e0b)", value: "#f59e0b" },
                { label: "Pink (#ec4899)", value: "#ec4899" },
              ]}
            />
          </div>

          <AdminTagInput label="Technologies" value={tech} onChange={setTech} placeholder="Type and press Enter" />
          
          <div className="grid grid-cols-2 gap-6">
            <AdminInput label="Live URL" type="url" value={liveUrl} onChange={setLiveUrl} placeholder="https://" />
            <AdminInput label="Source URL (GitHub)" type="url" value={sourceUrl} onChange={setSourceUrl} placeholder="https://" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <AdminSelect 
              label="Featured (Homepage)" 
              value={featured ? "yes" : "no"} 
              onChange={v => setFeatured(v === "yes")} 
              options={[{ label: "Yes", value: "yes" }, { label: "No (Other Projects)", value: "no" }]}
            />
            <AdminInput label="Sort Order" type="number" value={order.toString()} onChange={v => setOrder(parseInt(v) || 0)} />
          </div>

          <ImageUploader label="Cover Image" value={imageUrl} onChange={setImageUrl} />

          <div className="pt-4 flex gap-4">
            <button type="submit" disabled={saving} className="flex-1 bg-[var(--text)] text-[var(--bg)] font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50">
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? "Saving..." : "Save Project"}
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
          <h1 className="font-display font-bold text-3xl mb-1">Projects</h1>
          <p className="text-[var(--text-muted)]">Manage both Featured and Other projects.</p>
        </div>
        <button onClick={openNew} className="bg-[#4f8ef7] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#4f8ef7]" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 admin-panel">
          <p className="text-[var(--text-muted)] mb-4">No projects found.</p>
          <button onClick={openNew} className="text-[#4f8ef7] font-semibold hover:underline">Create your first project</button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="admin-panel p-5 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center font-display font-bold text-lg" style={{background: `${item.accent}15`, color: item.accent}}>
                  {item.number}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    {item.title}
                    {item.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--tag-bg)] text-[var(--text-muted)] uppercase tracking-wider">Featured</span>}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] opacity-70 truncate max-w-md">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
