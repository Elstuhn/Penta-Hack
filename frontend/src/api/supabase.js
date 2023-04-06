import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);

export default supabase;
