"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card p-6 rounded-md shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md bg-background text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md bg-background text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition"
        >
          Ingresar
        </button>
      </form>
    </main>
  );
}
