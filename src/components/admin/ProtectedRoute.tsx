import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProtectedRoute() {
  const [status, setStatus] = useState<
    "loading" | "admin" | "unauthorized"
  >("loading");

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      const user = data.session?.user;

      if (user?.app_metadata?.role === "admin") {
        setStatus("admin");
      } else {
        setStatus("unauthorized");
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Checking access…
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
