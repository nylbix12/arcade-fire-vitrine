// src/features/dates/DateCard.jsx
import React from "react";

export default function DateCard({ date, lieu, ville, statut, onEdit, onDelete }) {
  const dateStr = new Date(date.seconds * 1000).toLocaleDateString();
  return (
    <div className="
      group bg-arcadeOffWhite p-6 rounded-xl shadow-md 
      hover:shadow-2xl hover:-translate-y-1 transition">
      <h3 className="text-xl font-display mb-2 text-arcadeBlack">{dateStr}</h3>
      <p className="text-base mb-3">{lieu} — {ville}</p>
      {statut === "sold-out" && (
        <span className="inline-block bg-arcadeGold text-arcadeBlack px-3 py-1 rounded-full mb-4">Sold-out</span>
      )}
      <div className="flex gap-3">
        <button onClick={onEdit} className="text-arcadePink group-hover:text-arcadeDeepPink">✏️ Éditer</button>
        <button onClick={onDelete} className="text-red-600 hover:text-red-800">🗑️ Supprimer</button>
      </div>
    </div>
  );
}
