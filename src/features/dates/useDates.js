import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  onSnapshot
} from "firebase/firestore";
import { db } from "../../services/firebase";

export function useDates() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "dates"),
      orderBy("date", "asc")
    );

    // 1) fetch initial data immediately
    getDocs(q).then(snapshot => {
      setDates(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });

    // 2) then listen for live updates
    const unsubscribe = onSnapshot(q, snapshot => {
      setDates(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });

    return unsubscribe;
  }, []);

  return dates;
}
