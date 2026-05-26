"use client";

export function AmbientBackground() {
  return (
    <div className="bg-ambient" aria-hidden>
      <div className="ambient-sphere sphere-1" />
      <div className="ambient-sphere sphere-2" />
      <div className="ambient-sphere sphere-3" />
    </div>
  );
}
