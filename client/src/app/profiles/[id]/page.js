"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfileDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Missing profile ID");
      return;
    }
    async function fetchProfile() {
      try {
        const docRef = doc(db, "profiles", String(id));
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
          setProfile(null);
          setError(null);
        } else {
          setProfile({ id: snap.id, ...snap.data() });
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [id]);

  const imgSrc =
    profile?.imageData && profile.imageData.startsWith("data:image")
      ? profile.imageData
      : profile?.imageData || "/profile.png";

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-bc-blue w-full h-18" />
      <div className="flex justify-center px-6 2xl:px-6 w-full mx-auto py-12">
        {loading ? (
          <p className="text-bc-blue font-poppins">Memuat profil...</p>
        ) : error ? (
          <div className="space-y-4">
            <p className="text-red-600 font-poppins">{error}</p>
            <Link
              href="/profiles"
              className="text-bc-dblue underline font-poppins"
            >
              Kembali ke Profil Alumni
            </Link>
          </div>
        ) : !profile ? (
          <div className="space-y-4">
            <p className="text-slate-600 font-poppins">Profil tidak ditemukan.</p>
            <Link
              href="/profiles"
              className="text-bc-dblue underline font-poppins"
            >
              Kembali ke Profil Alumni
            </Link>
          </div>
        ) : (
          <article className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-sm">
            <img
              src={imgSrc}
              alt={profile.name || "Profil Alumni"}
              className="w-full object-cover h-64 sm:h-80"
            />
            <div className="p-6 sm:p-8 font-poppins">
              <h1 className="text-2xl sm:text-3xl font-bold text-bc-blue mb-2">
                {profile.name || "—"}
              </h1>
              {profile.title && (
                <p className="text-slate-700 text-lg mb-1">{profile.title}</p>
              )}
              {profile.year && (
                <p className="text-sm text-bc-gold mb-4">
                  Tahun Lulus: {profile.year}
                </p>
              )}
              {profile.content ? (
                <div className="text-slate-800 whitespace-pre-wrap prose max-w-none">
                  {profile.content}
                </div>
              ) : null}
            </div>
            <div className="px-6 sm:px-8 pb-6">
              <Link
                href="/profiles"
                className="inline-flex items-center gap-2 text-bc-dblue font-semibold hover:underline"
              >
                <span className="material-symbols-rounded">arrow_back</span>
                Kembali ke Profil Alumni
              </Link>
            </div>
          </article>
        )}
      </div>
      <Footer />
    </div>
  );
}
