"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import Article from "@/components/Article";
import Footer from "@/components/Footer";

function formatDate(value) {
  if (!value) return "—";
  try {
    const d = value?.toDate ? value.toDate() : new Date(value);
    return isNaN(d.getTime()) ? String(value) : d.toLocaleDateString("id-ID", { dateStyle: "long" });
  } catch {
    return String(value);
  }
}

export default function NewsPage() {
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const q = query(
          collection(db, "news"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setNews(
          snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (err) {
        console.error("Failed to load news", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />
      <div className="bg-bc-blue w-full h-18" />
      <div className="flex flex-col px-6 2xl:px-55">
        <div className="flex flex-wrap items-center gap-4 mt-28 mb-7">
          <h1 className="text-5xl sm:text-5xl text-bc-blue underline font-bold">
            News Update
          </h1>
          {isAdmin && (
            <Link
              href="/news/add"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-300 text-bc-dblue font-bold hover:bg-yellow-400 transition-colors shrink-0"
              title="Tambah berita"
              aria-label="Tambah berita"
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

      <div className="px-6 2xl:px-49 w-full h-max py-20 relative flex flex-row justify-center">
        {loading ? (
          <p className="text-bc-blue font-poppins">Memuat berita...</p>
        ) : error ? (
          <p className="text-red-600 font-poppins">{error}</p>
        ) : news.length === 0 ? (
          <p className="text-slate-600 font-poppins">Belum ada berita.</p>
        ) : (
          <div className="flex flex-col gap-7">
            {news.map((n) => (
              <Article
                key={n.id}
                date={formatDate(n.date || n.createdAt)}
                variant="wide"
                text={n.summary || n.title || "—"}
                img={n.imageData || "/smaga.png"} // Changed from imageUrl to imageData
                href={`/news/${n.id}`}
                title={n.title || "—"}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
