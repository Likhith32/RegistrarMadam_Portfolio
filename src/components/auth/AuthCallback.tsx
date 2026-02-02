import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const finalizeAuth = async () => {
      // Let Supabase finish restoring the session
      await supabase.auth.getSession();

      if (!mounted) return;

      // 🔑 IMPORTANT:
      // Do NOT check roles here
      // Do NOT redirect to dashboard
      // Do NOT make auth decisions here
      navigate("/admin/login", { replace: true });
    };

    finalizeAuth();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      Signing you in…
    </div>
  );
}
