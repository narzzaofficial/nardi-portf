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
      <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{color:"rgba(238,238,242,0.5)"}}>
        {label}
      </label>
      {value ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border" style={{borderColor:"rgba(255,255,255,0.1)"}}>
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-lg transition-colors"
            style={{background:"rgba(0,0,0,0.7)"}}
          >
            <X className="w-4 h-4" style={{color:"#eeeef2"}} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-colors"
          style={{borderColor:"rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.02)"}}>
          <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{borderColor:"#4f8ef7",borderTopColor:"transparent"}} />
              <span className="text-xs" style={{color:"rgba(238,238,242,0.4)"}}>Uploading to R2...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6" style={{color:"rgba(238,238,242,0.3)"}} />
              <span className="text-xs" style={{color:"rgba(238,238,242,0.4)"}}>Click to upload (max 5MB)</span>
            </div>
          )}
        </label>
      )}
      {error && <p className="text-xs mt-1.5" style={{color:"#f87171"}}>{error}</p>}
    </div>
  );
}
