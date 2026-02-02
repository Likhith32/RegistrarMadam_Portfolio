import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const navigatedRef = useRef(false);
  const [checking, setChecking] = useState(true);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ 1. Check existing session ONCE on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (user?.app_metadata?.role === "admin") {
        navigatedRef.current = true;
        navigate("/admin/dashboard", { replace: true });
      } else {
        setChecking(false);
      }
    };

    checkSession();
  }, [navigate]);

  // ✅ 2. Listen ONLY for real sign-in events
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "SIGNED_IN" &&
        !navigatedRef.current &&
        session?.user?.app_metadata?.role === "admin"
      ) {
        navigatedRef.current = true;
        navigate("/admin/dashboard", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // ✅ 3. Send magic link to LOGIN page (NOT dashboard)
  const handleMagicLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:8081/admin/login",
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Magic link sent! Check your email 📩");
    }

    setLoading(false);
  };

  // 🔄 Loading while session is being checked
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleMagicLogin}
        className="w-full max-w-md rounded bg-white p-6 shadow"
      >
        <h1 className="mb-6 text-center text-xl font-semibold">
          Admin Login
        </h1>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        {message && <p className="mb-3 text-sm text-green-600">{message}</p>}

        <input
          type="email"
          required
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </form>
    </div>
  );
}
