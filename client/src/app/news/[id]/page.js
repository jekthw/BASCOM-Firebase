"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Navbar from "@/components/Navbar";
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

export default function NewsArticlePage() {
  const params = useParams();
  const id = params?.id;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Missing article ID");
      return;
    }
    async function fetchArticle() {
      try {
        const docRef = doc(db, "news", String(id));
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
          setArticle(null);
          setError(null);
        } else {
          setArticle({ id: snap.id, ...snap.data() });
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load article", err);
        setError(err.message);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);

  const imgSrc = article?.imageData && article.imageData.startsWith("data:image")
    ? article.imageData
    : article?.imageData || "/smaga.png";

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-bc-blue w-full h-18" />
      <div className="flex justify-center px-6 2xl:px-6 w-full mx-auto py-12">
        {loading ? (
          <p className="text-bc-blue font-poppins">Memuat artikel...</p>
        ) : error ? (
          <div className="space-y-4">
            <p className="text-red-600 font-poppins">{error}</p>
            <Link href="/news" className="text-bc-dblue underline font-poppins">
              Kembali ke Berita
            </Link>
          </div>
        ) : !article ? (
          <div className="space-y-4">
            <p className="text-slate-600 font-poppins">Artikel tidak ditemukan.</p>
            <Link href="/news" className="text-bc-dblue underline font-poppins">
              Kembali ke Berita
            </Link>
          </div>
        ) : (
          <article className="bg-white w-full rounded-xl overflow-hidden shadow-sm">
            <img
              src={imgSrc}
              alt={article.title || "Artikel"}
              className="w-full object-cover w-full"
            />
            <div className="p-6 sm:p-8 font-poppins">
              <h1 className="text-2xl sm:text-3xl font-bold text-bc-blue mb-2">
                {article.title || "—"}
              </h1>
              <time className="text-sm text-bc-gold block mb-4">
                {formatDate(article.date || article.createdAt)}
              </time>
              {article.summary && (
                <p className="text-slate-700 text-lg mb-4 font-medium">
                  {article.summary}
                </p>
              )}
              {article.content ? (
                <div className="text-slate-800 whitespace-pre-wrap prose max-w-none">
                  {article.content}
                </div>
              ) : null}
            </div>
            <div className="px-6 sm:px-8 pb-6">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-bc-dblue font-semibold hover:underline"
              >
                <span className="material-symbols-rounded">arrow_back</span>
                Kembali ke Berita
              </Link>
            </div>
          </article>
        )}
      </div>
      <Footer />
    </div>
  );
}
