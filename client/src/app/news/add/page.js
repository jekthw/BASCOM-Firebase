"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddNewsClient from "@/components/AddNewsClient";

export default function AddNewsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      router.replace("/news");
      return;
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <p className="text-bc-dblue font-poppins">Memuat...</p>
      </div>
    );
  }
  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div>
      <Navbar />
      <AddNewsClient />
      <Footer />
    </div>
  );
}
