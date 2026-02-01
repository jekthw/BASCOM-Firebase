"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function formatDate(value) {
  if (!value) return "—";
  try {
    const date = value?.toDate ? value.toDate() : new Date(value);
    return isNaN(date.getTime()) ? "—" : date.toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

export default function UserPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <p className="text-bc-dblue font-poppins">Memuat profil...</p>
      </div>
    );
  }

  const fields = [
    { label: "Nama Lengkap", value: user.fullName },
    { label: "Email", value: user.email },
    { label: "NIS", value: user.nis },
    { label: "Nama Ibu", value: user.motherName },
    { label: "Tahun Lahir", value: user.birthYear },
    { label: "Role", value: user.role },
    { label: "Akun Dibuat", value: formatDate(user.createdAt) },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-screen bg-slate-100 py-20 relative pt-28">
        {/* Profile image placeholder */}
        <div className="mb-8">
          <img src="/profilecirc.png" alt="Profile" className="w-32 h-32 rounded-full object-cover ring-4 ring-bc-dblue/20" />
        </div>

        <div className="w-full max-w-xl px-6">
          <h1 className="text-2xl font-bold text-bc-dblue font-poppins mb-6 text-center">
            Profil Saya
          </h1>
          <div className="bg-white rounded-xl shadow-md overflow-hidden font-poppins">
            {fields.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4 border-b border-slate-100 last:border-0"
              >
                <span className="text-slate-500 text-sm font-medium">{label}</span>
                <span className="text-bc-dblue font-medium break-all">
                  {value ?? "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
