'use client';

import { useEffect, useRef } from 'react';

export default function LayerGraphic() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="layer-graphic">
      <h3>Estratigrafia — a leitura do subsolo</h3>
      <p className="lead">
        Cada camada de solo conta a história geológica do terreno. Interpretamos o perfil para transformar dados em decisões.
      </p>
      <div className="layer-stack">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
}
