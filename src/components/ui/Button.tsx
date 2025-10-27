export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className="bg-primary/20 border border-primary-light text-primary-light font-display font-semibold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:bg-primary/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
  >
    {children}
  </button>
);
