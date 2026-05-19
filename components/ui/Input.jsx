export function Input({ label, id, error, className = "", ...props }) {
  return (
    <label htmlFor={id} className="block">
      {label && (
        <span className="mb-2 block text-sm font-medium text-ink">
          {label}
        </span>
      )}
      <input
        id={id}
        className={`block w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors focus:border-brand focus:outline-none ${
          error ? "border-red-500" : ""
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="mt-1 block text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

export function Textarea({ label, id, error, className = "", ...props }) {
  return (
    <label htmlFor={id} className="block">
      {label && (
        <span className="mb-2 block text-sm font-medium text-ink">
          {label}
        </span>
      )}
      <textarea
        id={id}
        rows={4}
        className={`block w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors focus:border-brand focus:outline-none ${
          error ? "border-red-500" : ""
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="mt-1 block text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}
