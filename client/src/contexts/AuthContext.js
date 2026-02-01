 "use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    async function initAuth() {
      try {
        // persist auth in localStorage
        await setPersistence(auth, browserLocalPersistence);
      } catch (err) {
        console.warn("Failed to set auth persistence", err);
      }

      async function setSessionCookie(idToken) {
        try {
          await fetch("/api/sessionLogin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
            credentials: "include",
          });
        } catch (e) {
          console.warn("Failed to set session cookie", e);
        }
      }

      unsubscribe = onAuthStateChanged(auth, async (u) => {
        if (u) {
          try {
            const idToken = await u.getIdToken();
            console.log("AuthContext: ID Token obtained on auth state change", idToken ? "(present)" : "(missing)");
            if (idToken) {
              await setSessionCookie(idToken);
            }
            const ref = doc(db, "users", u.uid);
            const snap = await getDoc(ref);
            const profile = snap.exists() ? snap.data() : {};
            setUser({ uid: u.uid, email: u.email, ...profile });
          } catch (err) {
            console.error("Failed to load user profile", err);
            setUser({ uid: u.uid, email: u.email });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    }

    initAuth();
    return () => {
      try {
        unsubscribe();
      } catch (e) {}
    };
  }, []);

  const signup = async ({ nis, email, password, fullName, motherName, role, birthYear }) => {
    if (!/^\d{6}$/.test(nis)) throw new Error("NIS must be a 6-digit code");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    await setDoc(doc(db, "users", uid), {
      nis,
      email,
      fullName,
      motherName,
      role,
      birthYear: birthYear || null,
      createdAt: serverTimestamp(),
    });
    return cred.user;
  };

  const login = async (identifier, password) => {
    let email = identifier;
    if (/^\d{6}$/.test(identifier)) {
      // identifier is NIS; lookup email
      const q = query(collection(db, "users"), where("nis", "==", identifier));
      const snap = await getDocs(q);
      if (snap.empty) throw new Error("No account found for that NIS");
      email = snap.docs[0].data().email;
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await cred.user.getIdToken();
    console.log("AuthContext: ID Token obtained after login", idToken ? "(present)" : "(missing)");
    if (idToken) {
      await fetch("/api/sessionLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        credentials: "include",
      });
    }
    return cred;
  };

  const logout = async () => {
    try {
      await fetch("/api/sessionLogout", { method: "POST", credentials: "include" });
    } catch (e) {
      console.warn("Failed to clear session cookie", e);
    }
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

