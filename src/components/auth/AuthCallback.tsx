import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        navigate("/admin/login");
        return;
      }

      const user = data.session?.user;

      if (user?.user_metadata?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/admin/login");
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      Signing you in…
    </div>
  );
}
