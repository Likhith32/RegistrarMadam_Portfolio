import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ LISTEN FOR MAGIC-LINK LOGIN (CRITICAL)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;

      if (user?.user_metadata?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleMagicLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:8080/admin/dashboard",
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Magic link sent! Check your email 📩");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleMagicLogin}
        className="w-full max-w-md rounded bg-white p-6 shadow"
      >
        <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">
          Admin Login
        </h1>

        {error && (
          <div className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded bg-green-100 px-3 py-2 text-sm text-green-700">
            {message}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Admin Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Sending link..." : "Send Magic Link"}
        </button>
      </form>
    </div>
  );
}
