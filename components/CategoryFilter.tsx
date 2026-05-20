"use client";

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "entrantes", label: "Entrantes" },
  { id: "hamburguesas", label: "Hamburguesas" },
  { id: "acompañamientos", label: "Acompañamientos" },
  { id: "postres", label: "Postres" },
];

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex gap-2 px-4 pt-safe overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 py-4 min-w-max">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
                transition-all duration-200
                ${isActive
                  ? "text-black"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }
              `}
              style={isActive ? { backgroundColor: "var(--warm-accent)" } : {}}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
