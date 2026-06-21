"use client";

import { useEffect, useState } from "react";
import { getAll, addItem, updateItem, deleteItem, COLLECTIONS, Article } from "../../../lib/firestore";
import { AdminInput, AdminTextarea } from "../components/AdminFields";
import { ImageUploader } from "../components/ImageUploader";
import { Plus, Pencil, Trash2, X, Save, Loader2, Calendar } from "lucide-react";

export default function ArticlesAdmin() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState("");
  const [readTime, setReadTime] = useState("");
  const [tag, setTag] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [order, setOrder] = useState(0);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getAll<Article>(COLLECTIONS.ARTICLES);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = () => {
    setId(null);
    setTitle("");
    setExcerpt("");
    setDate("");
    setReadTime("");
    setTag("");
    setCoverImageUrl("");
    setOrder(items.length);
    setIsEditing(true);
  };

  const openEdit = (item: Article) => {
    setId(item.id || null);
    setTitle(item.title);
    setExcerpt(item.excerpt);
    setDate(item.date);
    setReadTime(item.readTime);
    setTag(item.tag);
    setCoverImageUrl(item.coverImageUrl || "");
    setOrder(item.order || 0);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = { title, excerpt, date, readTime, tag, coverImageUrl, order };
    
    if (id) {
      await updateItem(COLLECTIONS.ARTICLES, id, data);
    } else {
      await addItem(COLLECTIONS.ARTICLES, data);
    }
    
    await fetchItems();
    setIsEditing(false);
    setSaving(false);
  };

  const handleDelete = async (idToDelete: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    await deleteItem(COLLECTIONS.ARTICLES, idToDelete);
    await fetchItems();
  };

  if (isEditing) {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-2xl">{id ? "Edit Article" : "New Article"}</h1>
          <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-[var(--tag-bg)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <AdminInput label="Title" value={title} onChange={setTitle} required />
          <AdminTextarea label="Excerpt" value={excerpt} onChange={setExcerpt} required rows={3} />
          
          <div className="grid grid-cols-2 gap-6">
            <AdminInput label="Date (e.g. Oct 12, 2023)" value={date} onChange={setDate} required />
            <AdminInput label="Read Time (e.g. 5 min)" value={readTime} onChange={setReadTime} required />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <AdminInput label="Tag (e.g. AI Engineering)" value={tag} onChange={setTag} required />
            <AdminInput label="Sort Order" type="number" value={order.toString()} onChange={v => setOrder(parseInt(v) || 0)} />
          </div>

          <ImageUploader label="Cover Image" value={coverImageUrl} onChange={setCoverImageUrl} />

          <div className="pt-4 flex gap-4">
            <button type="submit" disabled={saving} className="flex-1 bg-[var(--text)] text-[var(--bg)] font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50">
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? "Saving..." : "Save Article"}
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
          <h1 className="font-display font-bold text-3xl mb-1">Articles</h1>
          <p className="text-[var(--text-muted)]">Manage your latest thoughts and writings.</p>
        </div>
        <button onClick={openNew} className="bg-[#4f8ef7] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" /> Add Article
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#4f8ef7]" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 admin-panel">
          <p className="text-[var(--text-muted)] mb-4">No articles added yet.</p>
          <button onClick={openNew} className="text-[#4f8ef7] font-semibold hover:underline">Write your first article</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="admin-panel p-5 flex flex-col group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--tag-bg)] text-[var(--text-muted)] uppercase tracking-wider">
                  {item.tag}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="p-1.5 hover:bg-[var(--tag-bg)] rounded-md text-[var(--text-muted)] hover:text-[#4f8ef7] transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(item.id!)} className="p-1.5 hover:bg-[var(--tag-bg)] rounded-md text-[var(--text-muted)] hover:text-[#f87171] transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-[var(--text)] mb-1 line-clamp-2">{item.title}</h3>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] opacity-70 mb-3 font-mono">
                <Calendar className="w-3 h-3" /> {item.date} &bull; {item.readTime}
              </div>
              <p className="text-sm text-[var(--text-muted)] line-clamp-2">{item.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
