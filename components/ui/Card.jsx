export default function Card({ children, className = "", as: Comp = "div", ...props }) {
  return (
    <Comp
      className={`bg-white rounded-2xl border border-line p-6 lg:p-8 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
