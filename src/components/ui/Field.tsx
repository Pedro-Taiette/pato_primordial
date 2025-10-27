export const Field = ({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) => (
  <label className="grid gap-1">
    <span className="text-sm text-slate-200">{label}</span>
    {children}
    {hint && <span className="text-xs text-slate-400">{hint}</span>}
  </label>
);