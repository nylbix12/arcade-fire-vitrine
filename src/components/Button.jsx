// src/components/Button.jsx
import React from "react";

export function Button({
  children,
  variant = "primary", // "primary" | "secondary" | "unset"
  ...props
}) {
  const base = "inline-flex items-center justify-center text-base font-semibold rounded-lg transition ";
  const styles = {
    primary: `
      bg-arcadePink text-white 
      hover:bg-arcadeDeepPink active:scale-95 
      focus:ring-4 focus:ring-arcadePink/50`,
    secondary: `
      bg-arcadeGold text-arcadeBlack 
      hover:bg-yellow-400 active:scale-95 
      focus:ring-4 focus:ring-arcadeGold/50`,
    unset: `text-arcadePink hover:text-arcadeDeepPink`,
  };

  return (
    <button className={base + styles[variant]} {...props}>
      {children}
      {/* petite icône animée en fin de texte */}
      <span className="ml-2 transform transition-transform group-hover:translate-x-1">➔</span>
    </button>
  );
}
