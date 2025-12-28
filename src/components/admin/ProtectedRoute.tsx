import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (user && user.user_metadata?.role === "admin") {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Checking access...
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
