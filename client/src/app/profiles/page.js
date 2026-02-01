"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import Alumni from "@/components/Alumni";
import Footer from "@/components/Footer";

export default function ProfilesPage() {
  const { user, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const q = query(
          collection(db, "profiles"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setProfiles(
          snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (err) {
        console.error("Failed to load profiles", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfiles();
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />
      <div className="bg-bc-blue w-full h-18" />
      <div className="flex flex-col px-6 2xl:px-55">
        <div className="flex flex-wrap items-center gap-4 mt-28 mb-7">
          <h1 className="text-5xl sm:text-5xl text-bc-blue underline font-bold">
            Profil Alumni
          </h1>
          {isAdmin && (
            <Link
              href="/profiles/add"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-300 text-bc-dblue font-bold hover:bg-yellow-400 transition-colors shrink-0"
              title="Tambah profil alumni"
              aria-label="Tambah profil alumni"
            >
              <span className="material-symbols-rounded text-3xl">add</span>
            </Link>
          )}
        </div>
        <SearchForm
          id="search"
          placeholder="Search for ..."
          className="w-86 md:w-96"
        />
      </div>

      <div className="px-6 w-full h-max py-20 relative flex flex-row justify-center">
        {loading ? (
          <p className="text-bc-blue font-poppins">Memuat profil...</p>
        ) : error ? (
          <p className="text-red-600 font-poppins">{error}</p>
        ) : profiles.length === 0 ? (
          <p className="text-slate-600 font-poppins">Belum ada profil alumni.</p>
        ) : (
          <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {profiles.map((p) => (
              <div key={p.id}>
                <Alumni
                  text={p.name || p.title || "—"}
                  img={p.imageData || ""} // Changed from imageUrl to imageData
                  href={`/profiles/${p.id}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
