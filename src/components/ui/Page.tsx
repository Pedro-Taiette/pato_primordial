import { Link } from "react-router-dom";

export const Page = ({ title, children }: { title?: string; children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-radial-neon text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-primary-light/20 border border-primary-lightest/30 grid place-items-center shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-105 transition">
              <span className="text-primary-light font-display text-lg font-bold">PP</span>
            </div>
            <h1 className="text-2xl font-display font-semibold tracking-tight text-primary-light group-hover:text-primary-lightest transition">
              {title ?? "Pato Primordial"}
            </h1>
          </Link>
        </header>

        <div className="panel-neon p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
