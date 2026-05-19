const STATUS_TEXT = {
  received:  "Pranuar",
  preparing: "Në përgatitje",
  analyzing: "Në analizë",
  verifying: "Verifikim",
  completed: "Përfunduar",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        status === "completed" ? "bg-brand text-white" : "bg-brand-soft text-brand"
      }`}
    >
      {STATUS_TEXT[status] || status}
    </span>
  );
}

export const STATUS_LABELS = STATUS_TEXT;
