export const Section = ({
  title,
  description,
  children,
  card,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  card?: boolean;
}) => {
  return (
    <section className={`mb-10 ${card ? "panel-neon p-6 md:p-8" : ""}`}>
      <div className="mb-5 flex items-center gap-3">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        <h2 className="text-lg md:text-xl font-display font-bold text-primary-light tracking-wide">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-slate-300/80 text-sm mb-4">{description}</p>
      )}
      <div className="grid gap-4">{children}</div>
    </section>
  );
};
