import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zkiqeyhmoipzqawqqrvv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpraXFleWhtb2lwenFhd3FxcnZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjcyNTQ1MCwiZXhwIjoyMDgyMzAxNDUwfQ.ptlyfuhFDLW0Mp_Aec2Bxks-UPJ2FJAW_EqvLsN6tmc" // ⚠️ NEVER expose this in frontend
);

async function makeAdmin() {
  const userId = "f979cbe6-6a3e-44cb-97eb-33ff6871d587";

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    app_metadata: {
      role: "admin",
    },
  });

  if (error) {
    console.error("Failed:", error);
  } else {
    console.log("✅ User promoted to admin");
  }
}

makeAdmin();
