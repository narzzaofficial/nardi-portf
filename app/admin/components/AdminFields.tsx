"use client";

// Shared input field styles for admin forms
export function AdminInput({
  label, type = "text", value, onChange, placeholder, required, ...rest
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  [key: string]: unknown;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
        style={{color:"rgba(238,238,242,0.5)"}}>
        {label}{required && <span style={{color:"#f87171"}}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#eeeef2",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "#4f8ef7")}
        onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
      />
    </div>
  );
}

export function AdminTextarea({
  label, value, onChange, placeholder, rows = 3, required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
        style={{color:"rgba(238,238,242,0.5)"}}>
        {label}{required && <span style={{color:"#f87171"}}> *</span>}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all resize-none"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#eeeef2",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "#4f8ef7")}
        onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
      />
    </div>
  );
}

export function AdminTagInput({
  label, value, onChange, placeholder,
}: {
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = e.currentTarget.value.trim();
      if (val && !value.includes(val)) onChange([...value, val]);
      e.currentTarget.value = "";
    }
  }

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
        style={{color:"rgba(238,238,242,0.5)"}}>
        {label}
        <span className="ml-1 normal-case font-normal" style={{color:"rgba(238,238,242,0.3)"}}>
          (press Enter to add)
        </span>
      </label>
      <div className="rounded-lg px-3 py-2 min-h-[44px] flex flex-wrap gap-2 cursor-text"
        style={{background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)"}}>
        {value.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs"
            style={{background:"rgba(79,142,247,0.15)", color:"#4f8ef7"}}>
            {tag}
            <button type="button" onClick={() => onChange(value.filter((_,j) => j !== i))}
              className="hover:opacity-60 transition-opacity">×</button>
          </span>
        ))}
        <input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-20 bg-transparent outline-none text-sm"
          style={{color:"#eeeef2"}}
        />
      </div>
    </div>
  );
}

export function AdminSelect({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
        style={{color:"rgba(238,238,242,0.5)"}}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none"
        style={{
          background: "#1a1a20",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#eeeef2",
        }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
