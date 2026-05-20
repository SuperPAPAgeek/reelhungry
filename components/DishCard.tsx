"use client";

import { useEffect, useRef } from "react";

interface Dish {
  id: number;
  name: string;
  category: string;
  price: number;
  video: string;
  description: string;
  allergens: string[];
}

interface DishCardProps {
  dish: Dish;
  isMuted: boolean;
}

const ALLERGEN_ICONS: Record<string, string> = {
  gluten: "🌾",
  lácteos: "🥛",
  huevo: "🥚",
  frutos_secos: "🥜",
  pescado: "🐟",
  marisco: "🦐",
  soja: "🫘",
  apio: "🥬",
};

export default function DishCard({ dish, isMuted }: DishCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  return (
    <div ref={cardRef} className="snap-item relative w-full bg-black overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={`/videos/${dish.video}`}
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* Gradiente inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      {/* Overlay superior: logo */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-6 pointer-events-none">
        <span className="text-white/60 text-xs tracking-[0.3em] uppercase font-light">
          ReelHungry
        </span>
      </div>

      {/* Overlay inferior: info del plato */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
        {/* Categoría */}
        <span
          className="inline-block text-xs tracking-widest uppercase font-medium mb-2"
          style={{ color: "var(--warm-accent)" }}
        >
          {dish.category}
        </span>

        {/* Nombre y precio */}
        <div className="flex items-end justify-between mb-2">
          <h2 className="text-2xl font-semibold leading-tight pr-4">
            {dish.name}
          </h2>
          <span
            className="text-xl font-bold shrink-0"
            style={{ color: "var(--warm-accent)" }}
          >
            {dish.price.toFixed(2)}€
          </span>
        </div>

        {/* Descripción */}
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          {dish.description}
        </p>

        {/* Alérgenos */}
        {dish.allergens.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 uppercase tracking-wider">
              Alérgenos
            </span>
            <div className="flex gap-2">
              {dish.allergens.map((allergen) => (
                <span
                  key={allergen}
                  title={allergen}
                  className="text-base"
                >
                  {ALLERGEN_ICONS[allergen] ?? "⚠️"}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
