// src/components/Input.jsx
import React from "react";

export function Input({ label, ...props }) {
  return (
    <label className="block mb-4 text-arcadeOffWhite">
      <span className="block mb-1">{label}</span>
      <input
        className="
          w-full bg-arcadeBlack text-arcadeOffWhite 
          border-2 border-arcadePink rounded-lg 
          px-4 py-2 transition-colors 
          focus:border-arcadeDeepPink focus:outline-none"
        {...props}
      />
    </label>
  );
}
