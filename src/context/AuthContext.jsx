import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const AuthContext = createContext({ user: null, logout: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  // ✅ Fonction logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("✅ Déconnecté avec succès");
        window.location.href = "/login"; // ✅ Redirection après logout
      })
      .catch((error) => {
        console.error("❌ Erreur lors de la déconnexion :", error);
      });
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
