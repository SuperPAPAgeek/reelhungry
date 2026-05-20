"use client";

import { useState, useRef, useEffect } from "react";
import DishCard from "./DishCard";
import CategoryFilter from "./CategoryFilter";

interface Dish {
  id: number;
  name: string;
  category: string;
  price: number;
  video: string;
  description: string;
  allergens: string[];
}

interface VideoFeedProps {
  dishes: Dish[];
}

export default function VideoFeed({ dishes }: VideoFeedProps) {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [isMuted, setIsMuted] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevCategory = useRef("todos");

  const filtered =
    activeCategory === "todos"
      ? dishes
      : dishes.filter((d) => d.category === activeCategory);

  function handleCategoryChange(category: string) {
    if (category === activeCategory) return;
    setIsAnimating(true);
    prevCategory.current = activeCategory;
    setActiveCategory(category);

    // Volver al inicio del feed al cambiar categoría
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "instant" });
    }

    setTimeout(() => setIsAnimating(false), 300);
  }

  return (
    <div className="relative h-dvh w-full max-w-md mx-auto">
      {/* Filtros de categoría */}
      <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />

      {/* Feed de videos */}
      <div
        ref={containerRef}
        className="snap-container"
        style={{
          opacity: isAnimating ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {filtered.map((dish) => (
          <DishCard key={dish.id} dish={dish} isMuted={isMuted} />
        ))}

        {filtered.length === 0 && (
          <div className="snap-item flex items-center justify-center">
            <p className="text-white/40 text-sm">Sin platos en esta categoría</p>
          </div>
        )}
      </div>

      {/* Botón de sonido */}
      <button
        onClick={() => setIsMuted((prev) => !prev)}
        className="fixed bottom-8 right-4 z-50 w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-black/70"
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? (
          // Icono mute (SVG inline para evitar dependencias)
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          // Icono sonido activo
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </div>
  );
}
