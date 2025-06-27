import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addDoc, doc, getDoc, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
export default function DateForm() {
  const { id } = useParams();
  const isNew = id === "new";
  const nav = useNavigate();
  const [form, setForm] = useState({ date: "", lieu: "", ville: "", statut: "à venir" });
  useEffect(() => {
    if (!isNew) {
      getDoc(doc(db, "dates", id)).then(snap => {
        const data = snap.data();
        setForm({
          date: new Date(data.date.seconds * 1000).toISOString().substr(0,10),
          lieu: data.lieu,
          ville: data.ville,
          statut: data.statut
        });
      });
    }
  }, [id]);
  const handle = async e => {
    e.preventDefault();
    const payload = { ...form, date: new Date(form.date) };
    if (isNew) await addDoc(collection(db, "dates"), payload);
    else await updateDoc(doc(db, "dates", id), payload);
    nav("/dates");
  };
  const remove = async () => { if (!isNew) { await deleteDoc(doc(db, "dates", id)); nav("/dates"); } };
  return (
    <form onSubmit={handle} className="p-6 bg-arcadeOffWhite">
      <h2 className="text-xl mb-4">{isNew ? "Ajouter" : "Modifier"} une date</h2>
      <input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} className="mb-3 p-2 border w-full" required />
      <input placeholder="Lieu" value={form.lieu} onChange={e=>setForm(f=>({...f,lieu:e.target.value}))} className="mb-3 p-2 border w-full" required />
      <input placeholder="Ville" value={form.ville} onChange={e=>setForm(f=>({...f,ville:e.target.value}))} className="mb-3 p-2 border w-full" required />
      <select value={form.statut} onChange={e=>setForm(f=>({...f,statut:e.target.value}))} className="mb-4 p-2 border w-full">
        <option>à venir</option>
        <option>sold-out</option>
        <option>annulé</option>
      </select>
      <div className="flex gap-2">
        <button type="submit" className="bg-arcadeGold px-4 py-2">Enregistrer</button>
        {!isNew && <button type="button" onClick={remove} className="bg-red-600 text-white px-4 py-2">Supprimer</button>}
      </div>
    </form>
  );
}