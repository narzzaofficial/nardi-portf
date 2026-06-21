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
      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5 text-[var(--text-muted)]">
        {label}{required && <span className="text-red-400"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] focus:border-[#4f8ef7]"
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
      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5 text-[var(--text-muted)]">
        {label}{required && <span className="text-red-400"> *</span>}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all resize-none bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] focus:border-[#4f8ef7]"
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
      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5 text-[var(--text-muted)]">
        {label}
        <span className="ml-1 normal-case font-normal opacity-70">
          (press Enter to add)
        </span>
      </label>
      <div className="rounded-lg px-3 py-2 min-h-[44px] flex flex-wrap gap-2 cursor-text bg-[var(--bg)] border border-[var(--border)] focus-within:border-[#4f8ef7] transition-all">
        {value.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-[#4f8ef7]/15 text-[#4f8ef7]">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((_,j) => j !== i))}
              className="hover:opacity-60 transition-opacity">×</button>
          </span>
        ))}
        <input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-20 bg-transparent outline-none text-sm text-[var(--text)]"
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
      <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5 text-[var(--text-muted)]">
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] focus:border-[#4f8ef7]"
      >
        {options.map(o => (
          <option key={o.value} value={o.value} className="bg-[var(--bg)]">{o.label}</option>
        ))}
      </select>
    </div>
  );
}
