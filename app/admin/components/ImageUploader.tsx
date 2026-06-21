"use client";

import { useUpload } from "../hooks/useUpload";
import { ImageIcon, X, Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = "Image" }: ImageUploaderProps) {
  const { upload, uploading, error } = useUpload();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file);
    if (url) onChange(url);
  }

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest mb-2 text-[var(--text-muted)]">
        {label}
      </label>
      {value ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-[var(--border)]">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-lg transition-colors bg-black/70 hover:bg-black/90"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-surface)] cursor-pointer transition-colors hover:border-[#4f8ef7]">
          <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-[#4f8ef7] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-[var(--text-muted)] opacity-70">Uploading to R2...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6 text-[var(--text-muted)] opacity-50" />
              <span className="text-xs text-[var(--text-muted)] opacity-70">Click to upload (max 5MB)</span>
            </div>
          )}
        </label>
      )}
      {error && <p className="text-xs mt-1.5 text-red-400">{error}</p>}
    </div>
  );
}
