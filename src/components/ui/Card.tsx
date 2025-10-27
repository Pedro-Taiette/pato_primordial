export const Card = ({
  title,
  children,
  footer,
}: {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  return (
    <div
      className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4 shadow-neon hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition"
    >
      {title && (
        <div className="mb-2 text-primary-light font-semibold font-display">
          {title}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
};