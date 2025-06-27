import React from "react";
import { useDates } from "./useDates";
import DateCard from "./DateCard";
import { Link, useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Button } from "../../components/Button";
export default function DatesPage() {
  const { dates, loading } = useDates();
  const nav = useNavigate();
  const handleDelete = async id => {
    if (confirm("Supprimer cette date ?")) {
      await deleteDoc(doc(db, "dates", id));
    }
  };
  const handleEdit = id => nav(`/dates/${id}`);

  if (loading) return <div>Chargement...</div>;
  return (
    <div className="p-6 bg-arcadeBlack min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl text-arcadeOffWhite">Dates de tournée</h1>
        <Link to="/dates/new">
    <Button variant="secondary">+ Ajouter une date</Button>
  </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dates.map(d => (
          <DateCard
            key={d.id}
            {...d}
            onEdit={() => handleEdit(d.id)}
            onDelete={() => handleDelete(d.id)}
          />
        ))}
      </div>
    </div>
  );
}

