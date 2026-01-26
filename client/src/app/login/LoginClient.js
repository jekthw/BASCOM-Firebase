 "use client"
import React, { useState } from "react";
import Header from "@/components/Header";
import InputField from "@/components/InputField";
import Button from "@/components/Buttons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const { login } = useAuth();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(identifier, password);
      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to sign in");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      <Header />
      <div className="container mx-auto flex items-center justify-center py-8 md:my-28 px-4 font-poppins">
        <div className="w-full max-w-md">
          <form className="bg-none sm:bg-white rounded-2xl sm:shadow-2xl overflow-hidden" onSubmit={handleSubmit}>
            <div className="p-6 md:p-7">
              <div className="space-y-4 sm:space-y-5">
                <h1 className="text-slate-900 text-lg font-bold">Sign In</h1>
                <div className="flex flex-col gap-2">
                  <label htmlFor="user-input" className="text-slate-700 text-sm font-medium">
                    NIS/Email
                    <span className="text-pink-500 ml-1">*</span>
                  </label>
                  <InputField id="user-input" placeholder="NIS/Email" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="pass-input" className="text-slate-700 text-sm font-medium">
                    Password
                    <span className="text-pink-500 ml-1">*</span>
                  </label>
                  <InputField id="pass-input" placeholder="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  <a href="/" className="text-bc-blue text-xs underline ml-auto">Lupa Password?</a>
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
              </div>
            </div>

            <div className="sm:bg-slate-50 px-4 sm:px-6 md:px-8 py-4 border-t border-slate-400 md:border-slate-200">
              <div className="flex flex-col gap-4">
                <Button variant="primary" className="!w-full" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-center">
                  <span className="text-slate-600 text-sm">Datamu belum terdaftar? </span>
                  <a href="/register" className="text-bc-blue hover:text-blue-700 font-semibold text-sm transition-colors">
                    Buat akun
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
